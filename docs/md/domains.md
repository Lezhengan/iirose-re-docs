# 域名与节点

## 域名体系

| 子域 | 用途 |
|---|---|
| `iirose.com` | 主站 / 页面（index / messages / i） |
| `a.iirose.com` / `b.iirose.com` | API / 业务接口 |
| `s.iirose.com` | 静态资源（css/js/图片） |
| `f.iirose.com` | 文件上传 |
| `r.iirose.com` | 上传后资源回显（CDN） |
| `p.iirose.com` | P2P / WebRTC 信令 |
| `d.iirose.com` | 盾 / 防护节点 |
| `ai.iirose.com` | AI 功能（index.js `Urls` 配置 L127，**HTTP 域名，与 WS 无关**，前端目前未实际调用） |
| `m1 / m8 / m9.iirose.com` | WebSocket 节点（`m9` = 防 DDoS 兜底；beta 世界另有 `m0`） |

## WebSocket 节点选择

节点名 = `m{编号}.iirose.com`，编号来自**节点队列**，队列由 `Fallback` 与地域检测共同生成（非 beta 世界）：

```js
// 源码 L15384-15411：Fallback 定义
Fallback = {
  ...
  socketIpArr: betaWorld ? ["0"] : [],   // beta 世界用 m0，正常为空
  socketIpAntiDDOS: "9"                   // 防 DDoS 兜底节点 = m9
}

// L2064-2065：初始化时按地域填入首节点
//   海外（parent.userLocation != "CN"）→ push "8"（m8）
//   中国大陆 / 未知                     → push "1"（m1）

// L13306-13311：SocketInit 组装最终队列
//   1) 复制 Fallback.socketIpArr（多于 1 个时打乱顺序，防探测）
//   2) 非 beta 且（中国大陆 / 未知）→ 再 push "8"
//   3) 统一 push "9"（m9 兜底）
//   4) shift() 取第一个作为当前连接，失败时逐个切换重试
//   连接地址：wss://m + 编号 + .iirose.com:443（isSocketHttp 时 :80）
```

**协议（ws/wss）选择**（L2062 + L13311）：

```js
isSocketHttp = isJavaSocket && (sdkCode < 24 || Utils.settings("socketHttpProtocol"));
// L13311 连接串：
a = isSocketHttp ? "ws://m" + e + ".iirose.com:80" : "wss://m" + e + ".iirose.com:443";
```

- `isSocketHttp` 为真 → 明文 `ws://m{节点}.iirose.com:80`；否则 → TLS `wss://m{节点}.iirose.com:443`
- 明文仅用于**安卓 Java WebView 且满足其一**：`sdkCode < 24`（安卓系统 < 7.0，TLS 兼容差）或设置项 `socketHttpProtocol` 开启（设置里可手动切换）
- **PC 网页 / Electron / 新安卓一律 `wss://…:443`**；登录与所有消息收发（登入、心跳、房间、聊天、行情等）都走这条 WS 连接，协议本身不区分功能
- **游客（未登录）同样建立 WS 连接并收发消息**：`SocketInit` 不依赖登录态；发言走 `inputSend`(L4029) → `msgfetch` → `socket.send` 无 `password` 检查（仅要求名字在房间在线列表，`X` 开头游客名可发）。游客被拦的只是私聊/商城/订阅等特定功能（代码中 `password ? … : _alert(languageArr[7][34])` 模式），普通群聊发言与收消息均不受限

最终队列：

| 地域 | 依次尝试 |
|---|---|
| 中国大陆 / 未知 | `m1` → `m8` → `m9` |
| 海外 | `m8` → `m9` |
| beta 世界 | `m0` |

`parent.userLocation` 由外层 index.js 检测（L485-498，缓存于 localStorage `"userLocation"`，格式 `时间戳>地区码`，3 天有效），messages.js 读取 `parent.userLocation` 选节点。

## beta 世界（测试服）

> 由 `betaWorld` 标志启用的**测试服**。目前官方**可能已关闭**——当前逆向的这份源码里 `betaWorld` 在初始化时被硬编码为 `!1`（false，L9606），beta 分支不可达。

与正式世界的差异（`betaWorld` 为真时生效）：

| 项 | 正式世界 | beta 世界 |
|---|---|---|
| 节点队列 | `["1","8","9"]`（CN）/ `["8","9"]`（海外） | **`["0"]`**，只连 `wss://m0.iirose.com:443`，不追加 m8/m9（L15409/L13307） |
| HTTP 接口 | 无后缀 | 部分接口追加 `?beta`（如 `socialAccGet.php?beta`，L21313/21361） |
| 启动提示 | 无 | 弹 beta 提示 `languageArr[7][237][0]`（L16665） |
| localStorage | 正常 key | 表情缓存带 `_beta` 后缀（`activeDisconnectionRestoreEmoji_beta`，L16490） |
| 连接全失败 | 等 10 秒无限重试 | 弹 `betaWorldFaild` 通知（L16764）→ 清 `betaWorld` Cookie → **整页刷新退回正式世界**（L14025） |

- 进入方式：`betaWorld` 标志（历史版本经 `betaWorld` Cookie 进入）
- 退出机制：`removeCookie("betaWorld")` + `location._reload()` 回正式服
- 其它差异点与正式版相同（登录包 `*`+JSON、`c` 心跳、`T` 行情等协议一致）

断线重连：无心跳协议，断线直接 `location._reload()` 整页重连。

## 实测参考

- 当前登录态实测连接：`wss://m8.iirose.com/`（海外节点，readyState=1）
- 节点对 TLS 指纹敏感：真实浏览器 / Electron 正常，Node 原生 TLS 被静默丢弃
