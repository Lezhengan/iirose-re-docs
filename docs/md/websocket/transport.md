# WebSocket 传输层

## 连接地址与适用范围

以下来自本地源码/第三方配置，不代表 2026-09-06 已验证的线上可用性。

| 来源 | 地址 / 选择逻辑 |
|---|---|
| 官方网页快照 | `wss://m{N}.iirose.com:443`（候选节点编号由官方下发） |
| 第三方 adapter 配置 | 端口 `8778`，节点编号由官方下发，测速后选择 |

不能仅凭配置断言两种端口始终等价。`binaryType = 'arraybuffer'` 指定收到二进制消息后的表示方式，不会自动编码发送的字符串。本文能确认应用层认证包，不能据前端源码断言握手永远不带 Cookie，或服务器必定通过 JA3 拒绝所有非浏览器客户端。

## 认证、初始化与移动房间

连接建立后，前端通过 `*` 加 JSON 进行会话认证/房间初始化（messages.js L23733）。以下是**协议形状，不是可发送的账号样例**：

	type: * + JSON.stringify({r, n, p, st, mo, fp, ...其他条件字段})

`p` 按登录路径提供散列或相应认证值，不能把“密码”占位文字直接发送。登录态还可能带 `lr`、`i`、`nc`、`s`、`uid`、`li`、`la`，完整字段见[发送命令](md/websocket/commands.md)。`%` 前缀既有初始化消息也有错误变体，不能仅看首字符判断登录成功。跨房移动使用 `m房间ID`，密码房分支带 `>密码`；`%` 请求播放列表，不是加入房间。

<a id="frame-codec"></a>

## 字节编码与文本解码

源码发送包装位于 messages.js L13338，接收解码位于 L14004；发送侧将业务字符串编码为 UTF-8，超过 256 **字节**时 gzip，并在前面加 `0x01`。接收侧根据首字节判断是否解压，**不依据长度推断是否压缩**。

原始二进制 → 检查首字节 → 解压并得到字符串 / UTF-8 解码 → `socket._onmessage(text)` → 按业务前缀分派。

源码 L13328 的 `\0` 拼接用于本地排队读取逻辑，不能据此直接证明服务器总会在一条网络消息中用零字符合并多条业务消息。若某客户端实现零字符拆分，应标明它的来源或抓包依据。

### 可运行：无网络的编码/解码函数

环境：支持 TextEncoder/TextDecoder 的页面或 Node；压缩时由调用方传入与当前客户端一致的 `pako.inflate` / `pako.gzip`。这两个定义不会创建连接或发送数据。不支持直接传入 Blob；浏览器接收应先设置 binaryType，或另外读取 Blob。

```js
function decodeFrame(data, inflate) {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) :
    ArrayBuffer.isView(data) ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength) : null;
  if (!bytes) throw new TypeError("需要 ArrayBuffer 或字节视图");
  if (bytes[0] !== 1) return new TextDecoder("utf-8").decode(bytes);
  if (typeof inflate !== "function") throw new TypeError("压缩帧需要 inflate");
  const text = inflate(bytes.subarray(1), {to: "string"});
  if (typeof text !== "string") throw new TypeError("inflate 必须返回字符串");
  return text;
}

function encodeFrame(text, gzip) {
  if (typeof text !== "string") throw new TypeError("需要业务字符串");
  const bytes = new TextEncoder().encode(text);
  if (bytes.length <= 256) return bytes;
  if (typeof gzip !== "function") throw new TypeError("压缩帧需要 gzip");
  const compressed = gzip(bytes);
  const output = new Uint8Array(compressed.length + 1);
  output[0] = 1;
  output.set(compressed, 1);
  return output;
}
```

验证时至少覆盖空文本、中文、256/257 字节、带偏移的字节视图和压缩数据。解压器异常应由接收调用方捕获并关闭或重建异常连接，不能把损坏数据当作普通业务包。

## 心跳与重连

- **官方应用层心跳**：收到 `c` 后启动每 2,000 ms 发送 `c` 的定时逻辑（messages.js L13687）。该观察不能用来推断网络层是否存在 ping/pong。
- **第三方差异**：adapter 使用每 30 秒发送空字符串的策略；这是第三方实现，不是对所有节点都适用的线上保证。
- **断线**：官方快照的 `onclose` 触发页面重载；错误处理另有节点切换。第三方客户端应自行实现超时、重试上限和定时器清理，不要把两者生命周期混写。
- **失败归因**：连接失败或无数据不能单独证明 IP 限流、指纹拦截或密码错误；应区分网络失败、认证错误、解析错误和业务超时。

## 双向格式摘要

| 方向 | 业务层 | 传输表示 |
|---|---|---|
| 客户端 → 服务端 | 命令字符串 / JSON，可能包含中文 | UTF-8 字节；发送侧按上述阈值决定压缩 |
| 服务端 → 客户端 | 解码后按首字符路由，见[接收路由](md/websocket/messages.md) | 首字节 1 触发解压，否则按 UTF-8 解码 |

应用层字符串可读、gzip 压缩与 WSS 传输保护是不同概念，不应统称为“明文网络传输”。
