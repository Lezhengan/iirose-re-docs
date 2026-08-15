# 登录认证

## 登录接口

所有接口均为 **HTTP POST**，域名 `a.iirose.com`（或 `b.iirose.com`），JSON 或 form 编码，明文传输。

### 账号登录（已注册用户）

```
POST https://a.iirose.com/lib/php/system/login_member_ajax.php
参数: { n: 用户名, p: MD5(密码) }
```

> 注意：**密码必须先用 MD5 哈希**（小写 hex），再作为 `p` 提交。明文密码会登录失败。

成功返回：**用户 uid**，例如 `659a46e6cb378`（12 位 hex）。
失败返回：`1` = 密码错误，`2` = 用户名不存在。

### 游客登录

```
POST https://a.iirose.com/lib/php/system/login_guest_ajax.php
参数: { n: 用户名 }
```

成功返回空。游客 uid 由**客户端生成**：`X` + 时间戳 + 随机数（如 `X1659072200xxxx`），写入 cookie。

### 找回 / 重置

| 接口 | 参数 | 说明 |
|---|---|---|
| `lib/php/system/username_reset_ajax.php` | `{e}` | 按邮箱找回用户名 |
| `lib/php/system/password_reset_ajax.php` | `{n,q,a}` | 按安全问题重置密码 |

### 第三方登录

- QQ OAuth：`client_id=101685674`，回调完成后向 WS 发送 `$4...` 完成绑定
- 微信小程序：`device=9`，独立页面

## 会话与登录态

登录态**不依赖服务端 Session Cookie**，而是：

```
localStorage["cookie"] = {
  username, password(MD5), uid,
  roomname, roomcolor, roomattr, roominfo, roomowner,
  fp, sex, avatar, rank, ...
}
sessionStorage["autologin"] = 2   // 自动登录标记
```

- 自动登录：读取 `localStorage.cookie` 里的 `username + password(MD5)`，校验通过即恢复会话
- WS 认证：WebSocket 握手**不带 Cookie**，服务器通过 **TLS ClientHello 指纹（JA3）** 识别真实客户端（Electron/Chrome），Node 原生 TLS 连接会被静默丢弃（101 后无数据）

## 登录后流程

1. WS 连接建立后发送 `*`+JSON **进房认证包**完成登录（见下节），认证失败服务端回 `%*"`+错误码
2. `jumpToMaxPplRoom(0)` 按活跃度加权随机跳热门房间（见[热推房间](features/hot-rooms.md)）
3. 客户端从 WS 接收房间数据（`%` 前缀）初始化地图与会话

## WS 直连登录（机器人 / 自定义客户端）

> 网页端在 WS 认证前**已通过 HTTP 拿到 uid**；但协议本身**不强制**——登录包自带用户名+密码（MD5），**仅凭 `*`+JSON 即可完成认证进房**，这也是机器人（如 [iirosebot](https://github.com/XCWQW1/iirosebot)）免 HTTP 直连的原理。

### 连接地址

| 客户端 | 地址 |
|---|---|
| 官方网页/Electron | `wss://m{0,1,2,8}.iirose.com:443`（`isSocketHttp` 时 `ws://…:80` 明文） |
| iirosebot（第三方 bot） | `ws://m{0,1,2,""}.iirose.com:8777`（明文，按 `[0,1,2,None,8]` 轮换，失败 +1 并等 5 秒） |
| adapter-iirose（第三方 bot） | `wss://m1.iirose.com:8778` 等（节点 `m1/m2/m8/m9/m`，并行测速选最快） |

### 登录包：`*` + JSON

连接建立后立即发送（`fetchroom`，messages.js L23720-23733）：

```js
socket.send("*" + JSON.stringify({
  r: "房间id",          // 目标房间
  n: "用户名",
  p: md5(密码),         // 账号必填；游客不带
  i: "头像id",          // 游客
  nc: "名字颜色",        // 游客
  s: "性别",            // 游客
  uid: "uid",           // 游客/账号（HTTP 登录所得）
  st: "在线状态标记",
  mo: "心情/简介",
  mb: "客户端标识",
  mu: "01",            // 流量模式（关系到媒体播放，adapter 固定 "01"）
  rp: "房间密码",        // 密码房
  lr: "旧房间id",        // 切房后认证（iirosebot 带）
  fp: "@" + md5(用户名), // 指纹：adapter / iirosebot 用 "@" + md5(用户名)；官方前端用 "@" + 32 位随机串（见 commands.md）
  nt: "", vc: 0, ev: 0,  // 通知偏好 / 音效 / 环境音
  ros/roi/ron: …         // 角色扮演房：角色性别/头像/名字
}))
```

### 登录错误回包：`%*"` + 错误码

认证失败时服务端回 `%*"` 开头 + 错误码（iirosebot `transfer_plugin.py`）：

| 错误码 | 含义 |
|---|---|
| `0` | 用户名已被占用 |
| `1` | 用户不存在 |
| `2` | 密码错误 |
| `4` | **今日可尝试登录次数已达上限**（对应登录页"当日请求次数上限"，见 [http-api.md](http-api.md#登录错误码--请求限流)） |
| `5` | 房间密码错误 |
| `x…`（403） | 该账户封禁中 |
| 其他 | 未知错误码 |

### 消息压缩与心跳

- **gzip**：接收数据首字节为 `1` 时，剩余部分为 gzip 压缩内容；发送侧 > 256 字节时同样 gzip + 首字节 `1`（需 `binaryType='arraybuffer'`）
- **心跳**：官方前端收到服务端 `c` 后回发 `c`（每 2 秒）；adapter-iirose 每 30 秒直接发**空串 `''`** 保活
- **密码 MD5 判定**：登录包 `p` 若是 32 位小写 hex 则直接用，否则先 `md5(密码)`（adapter `getMd5Password`）
