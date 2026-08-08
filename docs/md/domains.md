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

最终队列：

| 地域 | 依次尝试 |
|---|---|
| 中国大陆 / 未知 | `m1` → `m8` → `m9` |
| 海外 | `m8` → `m9` |
| beta 世界 | `m0` |

`parent.userLocation` 由外层 index.js 检测（L485-498，缓存于 localStorage `"userLocation"`，格式 `时间戳>地区码`，3 天有效），messages.js 读取 `parent.userLocation` 选节点。

断线重连：无心跳协议，断线直接 `location._reload()` 整页重连。

## 实测参考

- 当前登录态实测连接：`wss://m8.iirose.com/`（海外节点，readyState=1）
- 节点对 TLS 指纹敏感：真实浏览器 / Electron 正常，Node 原生 TLS 被静默丢弃
