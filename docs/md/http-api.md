# HTTP 接口大全

> 均为 GET/POST 明文请求，返回 JSON 字符串或原始文本。**域名按业务拆分**（index.js L114-141）：`a.iirose.com`=API、`b.iirose.com`=业务、`f.iirose.com`=上传、`r.iirose.com`=回显前缀、`z.iirose.com`=辅助(helper)、`w.iirose.com`=代理(agent)、`d.iirose.com`=盾/支付(shield)、`s.iirose.com`=静态、`mx.iirose.com`=地域检测。
> 下表"域"列省略时即 `https://a.iirose.com/`。

## 登录/账号（`lib/php/system/`）

| 接口 | 方法 | 参数 | 说明 |
|---|---|---|---|
| `login_member_ajax.php` | POST | `n`=用户名, `p`=MD5(密码) | 已注册账号登录，成功返回 uid |
| `login_guest_ajax.php` | POST | `n`=用户名 | 游客登录，成功返回空 |
| `username_reset_ajax.php` | POST | `e`=邮箱 | 找回用户名 |
| `password_reset_ajax.php` | POST | `n`=用户名, `q`=问题, `a`=答案 | 重置密码 |
| `socialAccGet.php` | GET | — | 获取已绑定的社交账号 |
| `socialAcc.php` | POST | `t`=类型, `k`=凭证, `d`=设备, `b`=是否beta | 社交账号绑定/登录（微信/QQ 等，login.js L280） |
| `wxJsSdk.php` | GET | — | 微信 JS-SDK 签名（返回空格分隔字符串，供 `wx.config`，index.js L985） |

## 媒体解析（`lib/php/api/`）

> 解析输入"链接"（URL 或分享文本），返回可播放的媒体信息，客户端拼装为 `<> url"名字"封面"作者` 消息格式发送到房间。

| 接口 | 参数 | 平台 |
|---|---|---|
| `parse_163Music.php` | `v`/链接参数 | 网易云音乐（按链接类型分发） |
| `info_163Music.php` | `i`=id | 网易云单曲信息 |
| `info_163Music_radio.php` | `i`=电台id, `n`=1 | 网易云电台 |
| `search_163Music.php` | `s`=关键词, `l`=类型, `p`=页 | 网易云搜索（l: 1歌曲/2歌手/3专辑/4歌单/5电台/6歌词） |
| `search_163Music_list.php` | `i`=id, `t`=类型 | 网易云歌单/专辑/歌手详情（t: 0歌单/1专辑/2歌手/3其他） |
| `parse_kugouMusic.php` | 链接 | 酷狗音乐 |
| `parse_qqMusic.php` | 链接 | QQ音乐 |
| `parse_taiheMusic.php` | 链接 | 太合音乐（百度音乐） |
| `parse_bilibili.php` | `i`=id（BV/av，b23.tv 用 `*` 前缀） | B站视频（返回 `@...` 直接转发，或 `dv3` 直连指令） |
| `parse_bilibiliLive.php` | `i`=直播间号 | B站直播 |
| `parse_iqiyi.php` | 链接 | 爱奇艺 |
| `parse_mgtv.php` | 链接 | 芒果TV |
| `parse_tiktok.php` | 链接 | 抖音 |
| `parse_kuaishou.php` | 链接 | 快手 |
| `lizhi.php` | 链接 | 荔枝FM |
| `ximalaya.php` | 链接 | 喜马拉雅 |
| `5sing.php` | `c`=歌手, `i`=歌曲id | 5sing |
| `douban.php` | 链接 | 豆瓣FM |
| `echo.php` | 链接 | Echo |
| `cors_media.php`（域 `z.iirose.com`） | `t`=类型, `s`=网易云歌曲id | 媒体 CORS 代理（跨域播放兜底，L35952） |
| `search_${type}.php` | 动态拼接 | 表情/媒体通用搜索：非 http 前缀的 `d` 值拼成 `api/search_{d}.php`（L27211） |
| `search_emoji.php` | GET 关键词 | 表情搜索 |
| `translate.php` | POST `text` 等 | 文本翻译 |

## 支付（`lib/php/system/`）

| 接口 | 域 | 参数 | 说明 |
|---|---|---|---|
| `pay.php` | `d.iirose.com`（`Urls.shield`） | `i`=支付token | 支付跳转（L25793，弹窗/新页打开） |
| `lib/html/wechatPay.html#token` | `iirose.com` 本域 | — | 微信扫码支付页（`wechatPay.html#` + token） |

## 工具/数据（`lib/php/function/`）

| 接口 | 域 | 参数 | 说明 |
|---|---|---|---|
| `getLocation.php` | — | — | 返回用户地域，用于 WS 节点选择与语言 |
| `icon.php` | — | — | 图标资源（用户头像兜底） |
| `loadImgEdit.php` | `w.iirose.com`/`f.iirose.com` | `s`=编辑指令, `r`=尺寸 | 图片编辑/压缩加载（列表缩略图、主色调提取，L2550/L12411） |
| `loadImg.php` | `z.iirose.com` | `s`=图片URL | 图片防盗链代理加载（下载/转存，L4471） |
| `changes.php` | — | `v`=版本号, `l`=语言(0中/1英) | 更新日志动态数据（`\n#` 分节文本，L20958） |
| `lib/system/data/changes/changes_{cn\|en}` | 相对路径 | — | 更新日志静态数据（离线模式用） |
| `countip.php`（域 `b.iirose.com`） | POST | `ss`=屏幕尺寸, `pb`=窗口尺寸, `ck`=cookie, `ref`=来源页 | 页面访问统计（index.js L533） |
| `push.php` | POST | `act=reg` + 推送token | 推送服务注册（消息推送提醒，L16798） |
| `debug.php` | — | — | 调试接口（index.js L503） |

## 上传

**上传域与展示域分离**：上传走 `f.iirose.com`，服务器返回**相对路径**，前端再拼接 `http://r.iirose.com/` 前缀得到完整资源 URL（图片 URL 形如 `http://r.iirose.com/i/年/月/日/时/文件名.png`）。

| 接口 | 域 | 参数 | 说明 |
|---|---|---|---|
| `lib/php/system/file_upload.php` | `https://f.iirose.com/`（`Urls.upload.img`） | `i`=uid, `f[]`=文件 | 上传文件；返回**相对路径**文本（图片以 `i/` 开头） |
| — | `http://r.iirose.com/`（`Urls.uploadedPrefix.img`） | — | 回显前缀，前端拼接：`Constant.URL.uploadedPrefixImg + responseText` |

```js
// 完整链路（源码：messages.js L6233 uploadImg / L9640 URL 配置）
// Utils.uploadImg(file, cb) → POST f.iirose.com/lib/php/system/file_upload.php
//   表单：{ i: uid, "f[]": file }
// 回调 → "http://r.iirose.com/" + 返回的相对路径
```

- 客户端上传函数：`Utils.uploadImg(file, callback)`（L6233），内部 FormData 自动带 `i`=uid
- 拼接使用点：`Constant.URL.uploadedPrefixImg + e.responseText`（L2555 / L14428 / L19383 等）
- 图片格式白名单：`jpg jpeg png gif bmp webp jfif apng avif`（`Assets.filter.uploadImg`，L15437）
- 文件/媒体/流上传共用同一接口（`Urls.upload.file/media/stream` 均指向 `f.iirose.com/`），前缀均指向 `r.iirose.com/`

## 请求要点

- 所有请求**跨域**（a.iirose.com ≠ iirose.com），不携带 Cookie
- 认证靠 WS 会话（TLS 指纹）与 localStorage 登录态，HTTP 接口本身多为免鉴权（登录接口除外）
- 媒体解析接口返回的数据结构因平台而异，客户端用 `JSON.parse` 后按平台字段读取

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
