# WebSocket 传输层

## 连接地址

官方网页端：

```
wss://m1.iirose.com:443   中国大陆（主）
wss://m8.iirose.com:443   海外/非 CN（主），国内备用
wss://m9.iirose.com:443   防 DDoS 兜底节点
```

> beta 世界使用 `m0`。

第三方机器人端（[adapter-iirose](md/websocket/third-party.md) 实测）：

```
wss://m1.iirose.com:8778
wss://m2.iirose.com:8778
wss://m8.iirose.com:8778
wss://m9.iirose.com:8778
wss://m.iirose.com:8778   （不带编号的通用入口）
```

> 端口 `443` 与 `8778` 指向同一 WS 服务；`8778` 是第三方客户端常用入口。adapter 会并行测速选最快节点（候选 `['m1','m2','m8','m9','m']`）。
>
> 第三方客户端必须设置 `socket.binaryType = 'arraybuffer'`，收发按二进制字节流处理（见下「帧编码」）。
>
> 认证不靠 Cookie：握手头无 Cookie，服务器通过 TLS ClientHello 指纹（JA3）识别真实浏览器/Electron 客户端；Node 原生 TLS 连接返回 101 但被静默丢弃（不发任何数据）。
>
> 连接失败会自动换下一个节点重试，用尽后隔 10 秒从头再来，无限重试（无次数上限）。

## 进入房间

连接建立后立即发送进房认证包：

```
*{"r":"房间id","n":"昵称","p":"密码","st":"状态","mo":"心情","fp":"指纹"}
```

> 登录态另带 `lr`=上次房间、`i`=头像、`nc`=名字颜色、`s`=性别、`uid`、`li`=loginid、`la`=语言（完整字段见 [发送命令](md/websocket/commands?id=进房--切房)）。
>
> 服务器随后推送房间数据（`%` 前缀消息）。
>
> 登录后跨房：`m{房间id}`；密码房 `m{房间id}>{密码}`。

## 帧编码

> 收发两侧同规则：内容 > 256 字节才 gzip 压缩，首字节 `0x01` 标记；否则直接原始字节。一次收到的数据可能包含多条消息，用 `\0` 分隔。

**接收处理：**

```js
if (data[0] === 0x01) {
  data = pako.ungzip(data.slice(1));   // 解压
}
data = data.split("\0");               // 按消息分割
for (msg of data) if (msg) socket.__onmessage(msg);
```

**发送处理：**

```js
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

- **应用层心跳**：服务端不发 WebSocket 层 ping/pong，但会推送应用层 `c` 消息；客户端收到后每 2 秒回发一次 `c` 保活。
- **第三方心跳差异**：adapter-iirose 不依赖服务端 `c`，而是每 30 秒主动发送空字符串 `''` 保活。两种心跳都可行（详见 [third-party.md](md/websocket/third-party?id=4-心跳与重连)）。
- **断线**：`socket.onclose` 触发整页刷新重新连接（不是透明重连）。
- **连接失败**：`socket.onerror` 删掉旧 socket 重建，换下一个节点重连——无限重试，无重试次数上限。
- **被限流的表现**：服务端若对来源 IP 做临时限制，前端没有任何业务提示（无「IP 被封」字样），只表现为「连不上 → 换节点无限重试」（详见 [http-api.md 登录限流](md/http-api?id=登录错误码--请求限流)）。
- 掉线消息在本地以「离线私聊」形式缓存。

## 双向流量特征

| 方向 | 格式 |
|---|---|
| 客户端 → 服务器 | 明文 ASCII / JSON 字符串（多数 <256 字节不压缩） |
| 服务器 → 客户端 | 首字符协议路由（见 [接收路由](md/websocket/messages.md)），大消息 gzip |
