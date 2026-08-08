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

1. `socket.send("%房间id")` 进入房间
2. `jumpToMaxPplRoom(0)` 按活跃度加权随机跳热门房间（见[热推房间](features/hot-rooms.md)）
3. 客户端从 WS 接收房间数据（`%` 前缀）初始化地图与会话
