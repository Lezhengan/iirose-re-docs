# P2P（WebRTC）

> IIROSE 的 P2P 基于 **WebRTC**，分两层：**通话**（音视频/摄像头/屏幕共享）与 **大文件传输**（DataChannel）。
> 信令通过 PeerJS 走 `wss://p.iirose.com`（`Urls.p2p`，index.js L125）。
> 源码位置均指 `reference/src/messages.js`。

## 一、架构概览

```
P2P 连接（WebRTC）
├─ 信令：PeerJS → wss://p.iirose.com:443/iirose
├─ ICE：动态 TURN（WS 请求）+ 静态 STUN + 兜底 TURN
└─ 数据通道：
   ├─ media（通话）：摄像头流 / 屏幕共享流 / 音频 + VAD
   └─ data（文件传输）：16KB 分块，>50MB 走 TURN 中继
```

| 组件 | 源码位置 | 说明 |
|---|---|---|
| `Utils.P2P` | L8371 | P2P 连接/传输管理（PeerJS 封装） |
| `Utils.RTC` | L5167 | WebRTC 工具（错误映射、`releaseRTC`、`vad`） |
| `Utils.Call` | L8368 附近 | 通话会话管理 |
| `mediaChat`（面板引擎） | L20114 附近 / L35590 | 通话 UI 引擎（`engine.V.video` / `V.scrOn`） |
| index.js 桥接 | L306-320 | `p2pReqFileAccess` / `p2pSave*` 原生保存 |

## 二、信令服务器（PeerJS）

连接建立在 PeerJS 库之上，库为动态加载：`loadLib`（L36358）从 `lib/js/app/server/RTC/peerjs.js` 获取。

```js
// L36402：PeerJS 连接（p2p 域 = 信令服务器）
new Peer(peerId, {
  host: "p.iirose.com",   // 信令服务器
  port: 443,
  path: "/iirose",
  secure: true,
  config: { iceServers: ... }
});
```

- 对端 ID 默认即用户 `uid`（`devId` L36363：`uid_deviceID`）
- 连接对象按对端缓存于 `this.peers`，自动重连（L36393 `t.reconnect()`）

## 三、ICE / TURN

TURN 凭证由 WS **动态下发**（`p=` 命令），缓存 5 分钟：

```js
// 请求 TURN（L36310）
socket.send("p=");

// 服务器响应（前缀 "p"），JSON：{ s: uris, u: username, p: credential, t: 有效期秒 }
// onCred 解析并缓存（L36324），过期后重新请求
```

```js
// ICE 组装（L36338 _buildIce）
iceStun  (静态 STUN 列表)
+ 动态 TURN（uris/username/credential）
+ iceFallbackTurn（兜底 TURN，直连失败时兜底）
```

## 四、通话（media）

通话面板引擎 `mediaChat`（见[面板系统](features/panels.md)），核心状态在 `engine.V`：`video`（开摄像头）、`scrOn`（开屏幕共享）、`sysOn`。

| 能力 | 实现 | 源码 |
|---|---|---|
| 摄像头呼叫 | `engine.callCamPeer(uid)` → `Peer.call(uid, MediaStream)` | L7597 |
| 屏幕共享呼叫 | `engine.callScrPeer(uid)` → 同上，传屏幕流 | L7759 |
| 接收摄像头流 | `peerStream[uid]` → `addVideoTile` | L7653 |
| 接收屏幕流 | `peerScrStream[uid]` | L7816 |
| 关闭视频 | `videoOff[uid].cam/scr` | L8073 `setPeerVideoKind` |
| 静音 | `Utils.RTC.vad.mute(uid)` + `peerAudio(uid).muted` | L8080 `mutePeer` |
| 音量 | `peerVol[uid]` + `peerAudio(uid).volume` | L8104 `setPeerVolume` |
| 视频瓦片 | `addVideoTile(uid, stream, 0, "cam"|"scr")` | L7653 |
| 呼叫重试/被拉黑 | `isBlocked`、`relaySuppressed` 检查后拒绝 | L7600 |

被呼叫处理（L35590）：收到呼叫 → `call.answer(localStream)` → `wireCall` 接线 → 若自己开着视频/屏幕则回拨给对方。

## 五、大文件传输（data）

`Utils.P2P` 常量（L8372-8376）：

| 常量 | 值 | 含义 |
|---|---|---|
| `MAX` | 100 GB | 单次传输理论上限 |
| `CAP_BLOB` | 2 GB | Blob 上限 |
| `TURN_CAP` | 50 MB | 超过此大小必须走 TURN 中继（直接 P2P 打洞失败场景） |
| `CHUNK` | 16 KB | DataChannel 分块大小 |

- 数据通道消息通过 `registerData(type, handler)` 注册（L36348 `dataHandlers`）
- 接收的文件在网页端**不落盘**，通过原生桥接分块写入本地：
  `p2pReqFileAccess()` → `p2pSaveOpen(文件名)` → `p2pSaveChunk(文件句柄, 数据)` → `p2pSaveClose(文件句柄)` / `p2pSaveAbort(文件句柄)`（index.js L306-320，`GV()` 转发到 Electron/移动端原生层）

## 六、相关 WS 命令

| 命令 | 方向 | 说明 |
|---|---|---|
| `p=` | 客户端 → 服务器 | 请求 TURN 凭证 |
| `p` 前缀响应 | 服务器 → 客户端 | TURN JSON（`{s,u,p,t}`） |

> 通话邀请/挂断/信令握手本身走 WS 的 `f` 系命令（见[发送命令](websocket/commands.md)），媒体流才走 WebRTC。
