# HTTP 接口大全

> 均为 GET/POST 明文请求，返回 JSON 字符串或原始文本。**域名按业务拆分**（index.js L114-141）：`a.iirose.com`=API、`b.iirose.com`=业务、`f.iirose.com`=上传、`r.iirose.com`=回显前缀、`z.iirose.com`=辅助(helper)、`w.iirose.com`=代理(agent)、`d.iirose.com`=盾/支付(shield)、`s.iirose.com`=静态、`mx.iirose.com`=地域检测。各章节标题已标注完整基础 URL，直接拼接接口名即可。

> ⚠️ **股票/加密币/A股行情没有 HTTP 接口**：数据全部走 WS（`Te`/`Tk`/`Ta` 前缀，`socket.send("Te#")` 请求），HTTP 仅有静态 logo 资源（`images/invest/*/icon.json` 与 `.png`）。注意这三个行情面板对应侧边栏**隐藏占位按钮**（`functionBtnDo(112/113/114)`，`display:none`），默认可见的"炒股"按钮（`functionBtnDo(9)`）打开的是旧版 `stockOldHolder` 面板。完整协议见 [投资/行情（WS）](md/websocket/commands?id=投资行情t-前缀)。

## 登录/账号（`https://a.iirose.com/lib/php/system/`）

| 接口 | 方法 | 参数 | 说明 |
|---|---|---|---|
| `login_member_ajax.php` | POST | `n`=用户名, `p`=MD5(密码) | 已注册账号登录，成功返回 uid |
| `login_guest_ajax.php` | POST | `n`=用户名 | 游客登录，成功返回空 |
| `username_reset_ajax.php` | POST | `e`=邮箱 | 找回用户名 |
| `password_reset_ajax.php` | POST | `n`=用户名, `q`=问题, `a`=答案 | 重置密码 |
| `socialAccGet.php` | POST | `v`=轮询ID | **QQ 扫码登录轮询**（L21311）：QQ 登录窗弹出后每 5 秒 POST 一次该轮询ID，成功返回扫码结果（非获取绑定账号） |
| `socialAcc.php` | POST | `t`=类型, `k`=凭证, `d`=设备, `b`=是否beta | 社交账号绑定/登录（微信/QQ 等，login.js L280） |
| `wxJsSdk.php` | GET | — | 微信 JS-SDK 签名（返回空格分隔字符串，供 `wx.config`，index.js L985） |
| `countip.php`（域 `b.iirose.com`） | POST | `ss`=屏幕分辨率, `pb`=可视区, `ck`=清理后 Cookie, `device`/`promoterID`/`partner`/`ref` 可选 | **访问统计埋点**（index.js L516-535），`countIp("*Login")`/`"*GuestLogin"`/`"*Language"` 只是事件标签，**不是 IP 限流** |

### 登录错误码 / 请求限流

登录页 4 个认证接口（账号登录/游客登录/找回用户名/重置密码）的错误返回约定（login.js L1603 语言包 `languageArr[2]`）：**单字符错误码**，`!` 特殊：

| 返回 | 含义 |
|---|---|
| `!` | **当日请求次数已达上限，请于24小时后重试**（4 个接口共用） |
| `1` | 密码错误 |
| `2` | 此用户名不存在 |
| `3` | 请求失败，请稍候再试（网络错误） |
| `0` | 此名字已被占用（游客昵称） |

- **计数与封禁全在服务端**：前端只在收到 `!` 时弹提示，源码中**没有任何本地计时/计次逻辑**（"24小时"仅文案，阈值不可见）。返回 `!` 的引用点：账号登录 L1118、游客登录 L1314、找回用户名 L1377、重置密码 L1446
- 聊天页进房认证（`*`+JSON）被限流时返回错误码 `4` → `sessionStorage.loginError=4` 踢回登录页显示同一句（messages.js L23469-23470）
- `loginError` 全表（messages.js L23464-23470）：`1`=用户名不存在、`2`=密码错误、`3`=名字被占、`4`=当日次数上限
- **手机验证码申请（`$5`）是另一道限流**（messages.js L21764-21767，返回 `4{code}`）：`1`=单 IP 每日最多 30 次、`2`=单账号每日最多 3 次、`4`=剩余次数提示

## 媒体解析（`https://a.iirose.com/lib/php/api/`）

> 解析输入"链接"（URL 或分享文本），返回可播放的媒体信息，客户端拼装为 `<> url"名字"封面"作者` 消息格式发送到房间（见 [点播/共享媒体](md/websocket/commands.md)）。
> 触发入口是 `Utils.service.moveinputDo("<> 链接")`（L2948-3263 的分发器）。**部分平台不走 API，直接拼 WS 命令**（下表"方式"列）。

| 接口 | 参数 | 平台 | 触发链接特征 | 返回处理 |
|---|---|---|---|---|
| `search_163Music.php` | `s`=关键词, `l`=1, `p`=1 | 网易云搜索（`@@ 歌名`） | `@@ 歌名`（L2883，**取第一首直发**）；`@ 歌名` 则是打开媒体搜索面板走 demandHolder 多引擎 | `result.songs[0]`，`fee=1` 弹 VIP 提示，拼 `<> 链接` 发送 |
| `parse_163Music.php` | `i`=歌曲id, `l`="" | 网易云单曲（带歌词） | `music.163.com/…/song?id=` | `data[0].url`，`c.music.`→`.music.` 替换 + `#163=id` 后缀 |
| `info_163Music.php` | `i`=歌曲id, `l`="" | 网易云单曲（fallback） | 同上其他格式 | `songs[0].rurl`，同上拼接 |
| `info_163Music_radio.php` | `i`=电台id, `n`=1 | 网易云电台/节目 | `163.com/#/dj`/`/program` | `program.mainSong.rurl`；`n=1` 仅出现在 **getMediaLink 分享文本解析路径**（L12775），`<> 链接` 分发器（L3052）只传 `i` |
| `search_163Music_list.php` | `i`=id, `t`=类型 | 网易云歌单/专辑/歌手 | `/playlist`、`/album`、`/artist` | 弹多级选择器选歌 |
| `parse_taiheMusic.php` | `i`=歌曲id | 太合音乐（百度音乐） | `music.taihe.com/song/` | `songurl.url[]` 取最后一个有效 `file_link` |
| `parse_kugouMusic.php` | `i`=id/hash, `t`=类型, `l`="" | 酷狗 | `kugou.com/song/#hash=`、`?id=`、`/mixsong/` | `t`=0 hash / 1 id / 2 分享 |
| `parse_qqMusic.php` | `i`=songmid, `url`=来源类型, `l`="" | QQ音乐 | `y.qq.com/n/ryqq`、`i.y.qq.com`、`c.y.qq.com/base` | `url`=0 mid / 1 五段式 / 2 c.y.qq.com；封面拼 `y.gtimg.cn/music/photo_new/T002R800x800M000{mid}.jpg` |
| `5sing.php` | `c`=歌手, `i`=歌曲id | 5sing | `5sing.kugou.com/m/detail/` | `data.hqurl\|\|lqurl\|\|squrl` |
| `parse_iqiyi.php` | `v`=视频id | 爱奇艺（视频） | `iqiyi.com/v_`/`w_` | 返回直连 id → `socket.send("dv0"+id)` |
| `parse_bilibili.php` | `i`=BV/av（b23.tv 用 `*` 前缀） | B站视频 | `bilibili.com/video/BV1`、`/av`、`bangumi`、`b23.tv` | 返回 `@链接` 转发，或 `socket.send("dv3"+id+"#"+分P)` |
| `parse_bilibiliLive.php` | `i`=直播间号 | B站直播 | `live.bilibili.com` | 返回 `[名字,作者,封面,流,封面]`，`t18` 命令渲染 + 直接播放 |
| `parse_mgtv.php` | `i`=视频id | 芒果TV | `mgtv.com/b/` | 返回 `[名字,副标题,地址]`，发 `m__4!4` 卡片 |
| `parse_tiktok.php` | 链接对象 | 抖音 | `v.douyin.com`、`m.douyin.com/share/video` | 无水印地址 |
| `parse_kuaishou.php` | 链接对象 | 快手 | `live.kuaishou.com`、`m.gifshow.com` | 无水印地址 |
| `lizhi.php` | 链接 | 荔枝FM | `lizhi.fm` | 播客音频 |
| `ximalaya.php` | 链接 | 喜马拉雅 | `ximalaya.com`、`xima.tv` | 播客音频 |
| `echo.php` | 链接 | Echo回声 | `app-echo.com` | 音乐 |
| `douban.php` | `c`=频道号 | 豆瓣FM **电台换台**（`radioNext` 切台，L16366） | 豆瓣电台切台按钮 | `song[0]` 歌曲信息（标题/歌手/播放地址），前端 `radioPlayer` 播放 |
| `cors_media.php`（域 `z.iirose.com`） | `t`=类型, `s`=网易云歌曲id | 媒体 CORS 代理（L35952） | **媒体加载时自动代理**：检测到 `music.163.com/song/media/outer/url?id=` 网易云外链即改写走该代理（L35952），非播放失败兜底 | 代理后的可播 URL |
| `search_${type}.php` | 动态拼接 | 表情/媒体通用搜索：非 http 前缀的 `d` 值拼成 `api/search_{d}.php`（L27211） | — | — |
| `search_emoji.php` | GET 关键词 | 表情搜索 | — | — |
| `translate.php` | POST `text` 等 | 文本翻译 | — | — |

**不走 API 直接拼 WS 命令的平台**（链接特征匹配后直发，L3090-3139）：

- **腾讯视频**：从链接提取 coverid/vid → `socket.send("dv1"+id)`（`v.qq.com/x/cover/`、`/x/page/`、`m.v.qq.com/play`）
- **YouTube**：不走 PHP API，前端直接调 YouTube IFrame API（`shareYoutubeGetTime`，L3121）解析

**点播类型编号**（`demandSend(类型,…)` 与 `m__4` 卡片平台索引）：

| 编号 | 平台 | 编号 | 平台 |
|---|---|---|---|
| 0 | 网易云（`m__4@0`） | `!4` | 芒果TV |
| 2 | QQ音乐 | `!8` | B站直播 |
| 3 | 太合 | `%8` | 5sing |
| 4 | 酷狗 | — | — |

## 支付（`https://d.iirose.com/lib/php/system/` / `iirose.com` 本域）

| 接口 | 参数 | 说明 |
|---|---|---|
| `pay.php` | `i`=支付token | 支付跳转（L25793，弹窗/新页打开） |
| `lib/html/wechatPay.html#token` | — | 微信扫码支付页（`https://iirose.com/lib/html/wechatPay.html#` + token） |

## 工具/数据（`https://a.iirose.com/lib/php/function/`）

| 接口 | 域 | 参数 | 说明 |
|---|---|---|---|
| `getLocation.php` | — | — | 返回用户地域，用于 WS 节点选择与语言 |
| `icon.php` | `i`=头像名, `s`=1 | 头像图标数据（L3265：GET `{i}` 返回 `|` 分隔的图标数据集；`s=1` 变体用于头像丢失重取并写回 Cookie，L33649） |
| `loadImgEdit.php` | `w.iirose.com`/`f.iirose.com` | `s`=编辑指令, `r`=尺寸 | 图片编辑/压缩加载（列表缩略图、主色调提取，L2550/L12411） |
| `loadImg.php` | `z.iirose.com` | `s`=图片URL | 图片防盗链代理加载（下载/转存，L4471） |
| `changes.php` | — | `v`=版本号, `l`=语言(0中/1英) | 更新日志动态数据（`\n#` 分节文本，L20958） |
| `lib/system/data/changes/changes_{cn\|en}` | 相对路径 | — | 更新日志静态数据（离线模式用） |
| `countip.php`（域 `b.iirose.com`） | POST | `ss`=屏幕尺寸, `pb`=窗口尺寸, `ck`=cookie, `ref`=来源页 | 页面访问统计（index.js L533） |
| `push.php` | POST | `act=reg` + 推送token | 推送服务注册（消息推送提醒，L16798） |
| `debug.php` | — | — | 调试接口（index.js L503） |

## 上传（`https://f.iirose.com/` → 回显 `http://r.iirose.com/`）

**上传域与展示域分离**：上传走 `f.iirose.com`，服务器返回**相对路径**，前端再拼接 `http://r.iirose.com/` 前缀得到完整资源 URL（图片 URL 形如 `http://r.iirose.com/i/年/月/日/时/文件名.png`）。

| 接口 | 参数 | 说明 |
|---|---|---|
| `lib/php/system/file_upload.php` | `i`=uid, `f[]`=文件 | 上传文件；返回**相对路径**文本（图片以 `i/` 开头） |
| — | — | `http://r.iirose.com/`（`Urls.uploadedPrefix.img`）= 回显前缀，前端拼接：`Constant.URL.uploadedPrefixImg + responseText` |

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
