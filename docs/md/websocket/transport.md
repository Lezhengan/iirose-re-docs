# WebSocket 传输层

## 连接

官方网页端：

```
wss://m1.iirose.com:443   中国大陆（主）
wss://m8.iirose.com:443   海外/非 CN（主），国内备用
wss://m9.iirose.com:443   防 DDoS 兜底节点（Fallback.socketIpAntiDDOS）
（beta 世界为 m0）
```

第三方机器人端（[adapter-iirose](third-party.md) 实测）：

```
wss://m1.iirose.com:8778
wss://m2.iirose.com:8778
wss://m8.iirose.com:8778
wss://m9.iirose.com:8778
wss://m.iirose.com:8778   （不带编号的通用入口）
```

- 端口 `443` 与 `8778` 都指向同一 WS 服务；`8778` 是第三方客户端常用入口（adapter 会并行测速选最快节点，节点表 `['m1','m2','m8','m9','m']`）。
- 第三方客户端必须设置 `socket.binaryType = 'arraybuffer'`，收发按二进制字节流处理（见下「帧编码」）。

- 节点队列生成（**精确逻辑**，L2065 + L13306-13307）：
  1. 启动时（L2065）：CN 用户 `push("1")`，非 CN `push("8")` 到 `Fallback.socketIpArr`
  2. `SocketInit`：复制列表，多于 1 个则随机打乱
  3. 非 beta 世界：**CN 用户再追加 `m8`**（非 CN 不重复加），最后**永远追加 `m9` 防 DDoS 兜底**
  4. 最终队列：CN = `["1","8","9"]`，非 CN = `["8","9"]`，beta = `["0"]`
- **m0 / m2 真实存在但官方前端未使用**：`Fallback.socketIpArr` 默认 `[]`，当前前端代码不 push `0`/`2`；第三方 bot（iirosebot）的轮换表 `[0,1,2,None,8]` 会连 `m0`/`m1`/`m2`/`m8`/`m.iirose.com`，说明服务端有更多节点
- 连接地址 `wss://m{号}.iirose.com:443`（`isSocketHttp` 时走 `ws://…:80` 明文）
- 每次连接 `shift()` 弹出一个节点，**失败自动换下一个**；全部用尽后等 **10 秒**再从头重试（L14025）
- 特殊分支：国内用户在 m1 首次加载 6~100 秒内失败 → `Fallback.socketIpArr.pop()` 弹掉末尾兜底节点，避免再撞防 DDoS 节点（L14016-14023）
- **认证不靠 Cookie**：握手头无 Cookie，服务器通过 TLS ClientHello 指纹（JA3）识别真实浏览器/Electron 客户端；Node 原生 TLS 连接返回 101 但被静默丢弃（不发任何数据）

## 进入房间

连接建立后发送（`fetchroom`，L23733）：

```
socket.send("*" + JSON.stringify({ r: 房间id, n: 昵称, p: 密码, st: 状态, mo: 心情, fp: 指纹 }))
```

- 登录态另带 `lr`=上次房间、`i`=头像、`nc`=名字颜色、`s`=性别、`uid`、`li`=loginid、`la`=语言（完整字段见[发送命令](commands.md#进房--切房)）
- 服务器随后推送房间数据（`%` 前缀消息）
- 登录后跨房：`socket.send("m" + 房间id)`（密码房 `m房间id>密码`）

## 帧编码

> 收发两侧**同规则**：> 256 字节才 gzip 压缩，首字节 `0x01` 标记；否则直接原始字节。第三方客户端需设置 `socket.binaryType = 'arraybuffer'`。

1. **多消息拼接**：一次收到的数据可能包含多条消息，用 `\0` 分隔
2. **gzip 压缩**：消息总长 > 256 字节时整体 gzip 压缩，**首字节标记 `0x01`**，用 pako.gzip 解压
3. 解压后按 `\0` 分割为单条消息

```js
// 接收处理逻辑（还原自 socket.onmessage）
if (data[0] === 0x01) {
  data = pako.ungzip(data.slice(1));   // 解压
}
data = data.split("\0");               // 按消息分割
for (msg of data) if (msg) socket.__onmessage(msg);
```

```js
// 发送处理逻辑（第三方客户端，adapter-iirose send.ts）
const buf = new Uint8Array(Buffer.from(str));
if (buf.length > 256) {
  const gz = zlib.gzipSync(str);
  const out = new Uint8Array(gz.length + 1);
  out[0] = 1;                          // 首字节 1 = 后续为 gzip
  out.set(gz, 1);
  socket.send(out);                    // ArrayBuffer
} else {
  socket.send(buf);                    // 原始字节
}
```

## 断线重连

- **应用层心跳**：服务端不发 WebSocket 层 ping/pong，但会推送应用层 `c` 消息；客户端收到后通过 `patchedSetInterval` 每 2 秒回发一次 `socket.send("c")` 保活（L13687-13690）
- **第三方心跳差异**：adapter-iirose 不依赖服务端 `c`，而是每 30 秒主动发送**空字符串 `''`** 保活（`readyState===1` 时；`2/3` 或 socket 为空则触发重连）。两种心跳都可行（详见 [third-party.md](third-party.md#心跳与重连)）
- **断线**（`socket.onclose`）→ `location._reload()` **整页刷新**重新连接（不是透明重连）
- **连接失败**（`socket.onerror`）→ `socketRetry()` 删掉旧 socket 重建（L4424-4426），即换下一个节点重连——**无限重试，无重试次数上限**
- **被限流的表现**：服务端若对来源 IP 做了临时限制，前端**没有任何业务提示**（无"IP 被封"字样），只会表现为"连不上 → 换节点无限重试"（详见 [http-api.md 登录限流](../http-api.md#登录错误码--请求限流)）
- 掉线消息在本地以"离线私聊"形式缓存

## 双向流量特征

| 方向 | 格式 |
|---|---|
| 客户端 → 服务器 | 明文 ASCII / JSON 字符串（多数 <256 字节不压缩） |
| 服务器 → 客户端 | 首字符协议路由（见[接收路由](messages.md)），大消息 gzip |
