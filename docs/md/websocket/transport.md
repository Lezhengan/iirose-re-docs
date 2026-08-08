# WebSocket 传输层

## 连接

```
wss://m1.iirose.com:443   中国大陆（主）
wss://m8.iirose.com:443   海外/非 CN（主），国内备用
wss://m9.iirose.com:443   防 DDoS 兜底节点
（beta 世界为 m0）
```

- 节点由 `Fallback.socketIpArr` + 地域检测生成队列（详见[域名与节点](../domains.md)），顺序随机化，失败自动切换下一个
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

## 断线重连

- **应用层心跳**：服务端不发 WebSocket 层 ping/pong，但会推送应用层 `c` 消息；客户端收到后通过 `patchedSetInterval` 每 2 秒回发一次 `socket.send("c")` 保活（L13687-13690）
- 断线后调用 `location._reload()` **整页刷新**重新连接（不是透明重连）
- 掉线消息在本地以"离线私聊"形式缓存

## 双向流量特征

| 方向 | 格式 |
|---|---|
| 客户端 → 服务器 | 明文 ASCII / JSON 字符串（多数 <256 字节不压缩） |
| 服务器 → 客户端 | 首字符协议路由（见[接收路由](messages.md)），大消息 gzip |
