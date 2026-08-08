# 用户名片（whois 资料卡）

点击聊天/名片中任意**头像或昵称** → `getProfile(uid)` → 打开资料卡面板 `userInfoHolder`（全屏 `uInfoMode` 或弹窗两种形态）。
卡片为**动态模板**生成（reference/src/messages.js L1867-1965），全部使用 **class**（无 id），适合 CSS 定制。

## 入口

```js
getProfile(uid);          // 按 uid 打开名片
Objs.mapHolder.function.event.call(this, 7);  // 点击昵称/头像的 onclick
```

## 完整结构树

```
.whois_darker（全屏遮罩）
└─ .whoisInfoHolder（名片卡片主容器，box-shadow 卡片）
   ├─ .whoisInfoHead（头部，背景色=头像主色）
   │  ├─ .whoisAvatarBox（200×200 头像框）
   │  │  └─ .whoisAvatar（头像 img；点击 → mapHolder.event(7) 大图）
   │  ├─ .whoisHolderName（昵称，textOverflowEllipsis，title 悬停）
   │  ├─ .whoisHolderRank（等级/头衔文本）
   │  ├─ .whoisCpHolder（情侣/CP 展示）
   │  │  ├─ .whoisAvatar（CP 头像 92×92）
   │  │  └─ .whoisCp（CP 昵称，点击 getProfile）
   │  └─ .whoisButtonHolder（右侧 3 个斜切按钮区）
   │     ├─ .whoisHolderButton  mdi-account-star      → buttonProcesser(0, uid, ...) 查看/资料
   │     ├─ .whoisHolderButton  mdi-text-box-multiple  → buttonProcesser(1, uid) 写纸条/传私信
   │     └─ .whoisHolderButton  mdi-keyboard-return    → buttonProcesser(2) 关闭返回
   └─ .whoisInfoBox（可滚动内容区）
      └─ 每行字段：<div><div><div class="whois"><span class="whoisIcon mdi-XXX"></span>标签</div><div class="whoisC">值</div></div></div>
```

## 内容区字段一览（.whoisIcon 图标 → 含义 → 取值/示例）

| 图标 | 含义 | 取值 / 示例 |
|---|---|---|
| `mdi-account-supervisor-circle` | 账号状态 | `受限`（可点击跳转绑定社交账号/手机）或 `已认证`（信用<1万绿勾 / ≥1万王冠图标） |
| `mdi-gender-male-female` | 性别 | `♂`男(蓝) / `♀`女(粉) / `情侣` / `秘密`；0 不显示 |
| `mdi-diamond-stone` | 印象分 | `分数% \| 次数 次 \| 星级`，分数可负（`- 5`），例：`85 % \| 12 次 \| ★★★`；点 `mdi-sort-numeric-variant` 打分 |
| `mdi-wechat` | 微信推送 | 已开启的推送项列表（如 `私聊 \| 关注`）；全关则不显示该行 |
| `mdi-card-text-outline` / `mdi-card-bulleted-outline` | 姓 / 名 | 实名文本，例：`乐正` / `安` |
| `mdi-cake-variant` / `mdi-candle` | 生日 / 年龄 | 生日：`2026-08-08`；年龄：`20 岁`（未满周岁不显示年龄行） |
| `mdi-flag-variant` | 国籍 | 国家名，例：`中国`、`美国`（`e[15][0]` 为代码 `CN`，映射到名称） |
| `mdi-home-map-marker` | 现居 | 房间地址文本（含 `[_房间id_]` 标记），例：`蔷薇花园-[5b7ab80a2017d]`，点击进房 |
| `mdi-tag` / `mdi-heart` | 标签 / 爱好 | 逗号分隔，例：`唱歌, 跳舞, 旅行` |
| `mdi-account-multiple` | 好友 | 逗号分隔昵称，例：`小明, 小红`，每个可点击跳转名片 |
| `mdi-at` / `mdi-web` | 邮箱 / 网站 | 邮箱：`mailto:xxx@xx.com`；网站：空格分隔多个链接 |
| `mdi-storefront` | 店铺 | 店铺名（id 存 `sid` 属性），点击进商店 |
| `mdi-home` / `mdi-city` / `mdi-cube` | 家 / 旅馆 / 沙盒房间 | 房间名列表，按 rid 前缀自动分栏：`5b792cb650749_`=沙盒、`5b792cac2b37f_`=旅馆、其余=家；点击进房 |
| `mdi-home-account` | 会员房间 | 房间名列表，★=已订阅 |
| `mdi-shield-account` / `mdi-bank` / `mdi-cash-refund` | 信用 / 存款 / 贷款 | 数字，例：`88`、`1234`、`⚠️ 50`；信用/贷款可为负 |
| `mdi-hand-heart` / `mdi-lightning-bolt` | 捐款 / 贡献 | 数字，例：`100` |
| `mdi-chart-areaspline` | 股票 | 数字（股数），例：`50` |
| `mdi-wallet` | 金币 | 数字 + `钞`，例：`888 钞`；点 `mdi-credit-card-outline` 转账 `+$ {g:uid,c:数量,m:留言}`；点 `mdi-comment-text-outline` 附言转账 |
| `mdi-star` | 粉丝/关注 | `关注 N \| 粉丝 M`，例：`关注 3 \| 粉丝 5` |
| `mdi-eye` / `mdi-trophy` | 访问量 / 成就 | 数字，例：`1024` |
| `mdi-calendar-clock` | 上次登录 | 时间文本，例：`2026-08-08 12:00` |
| `mdi-fire` / `mdi-fireplace` | 今日活跃 / 总活跃 | 数字，例：`30` / `10240` |
| `mdi-account-clock` | 在线时长 | 数字 + 单位（分），例：`233 分` |
| `mdi-calendar` / `mdi-earth` | 注册时间 / 时区 | 时间文本 / 时区名，例：`2024-01-01` / `GMT+8 中国` |
| `mdi-identifier` | 用户唯一标识 | uid 大写，例：`5B7AB80A2017D` |
| `mdi-human-handsdown` | 「我的生活」 | 3 个分栏（含数量角标）：📷 相册 `mdi-image-album` / 🎙 录音 `mdi-microphone` / 🎬 视频 `mdi-filmstrip`，点击 `whoisMe(0/1/2)` 打开 |
| `mdi-music` | 背景音乐 | `.radioTitle` 歌名 + `.radioTitleA` 歌手，例：`告白气球` / `周杰伦`，点封面播放 |
| `mdi-ring` | 装饰物 | 饰品图片；`*` 前缀=镜像翻转；`108` 或 `*108`=无饰品不显示 |
| `mdi-information-outline` | 简介 | 个性签名文本（含媒体自动渲染），例：`欢迎来我的花园玩~` |
| `mdi-camera-burst` | 相册 | 缩略图行（空格分隔 URL），点击 `showImg` 大图 |

## 点赞 / 点踩（reference/src/messages.js L1964）

> 官方名片上**确实有**赞/踩按钮（正常功能，点按即可）。下表列出的是官方按钮的底层 WS 命令——仅作原理说明，**直接 `socket.send` 调用属于自定义脚本**，非官方交互方式。

| 操作 | 命令 |
|---|---|
| 点赞 | `socket.send('+*' + uid)` |
| 点踩 | `socket.send('+!' + uid)` |
| 带留言点赞 | `socket.send('+*' + uid + ' 留言内容')` |

前端反馈：点赞数 +1、追加赞者名单（`likeAdd()`）、`Graphics.effects.bravo` 撒花动画（点赞时）、赞后图标转为已赞状态。请求前会弹输入框（`Utils.sync`）确认。

## CSS 定制示例

```css
/* 名片卡片圆角 + 阴影 */
.whoisInfoHolder { border-radius: 16px; }

/* 头像变圆 */
.whoisAvatarBox .whoisAvatar img { border-radius: 50%; }

/* 隐藏指定字段（如贷款） */
.whoisInfoBox .whoisC:has(.mdi-cash-refund) { display: none; }

/* 昵称大字 */
.whoisHolderName { font-size: 24px !important; }
```

---

> ⚠️ **免责声明**：本节仅供**学习与逆向分析交流**。直接调用 `socket.send('+*')`/`'+!'` 等接口的行为可能被视为非官方操作而**不被平台允许**，批量刷赞/点踩可能导致账号封禁。请勿用于骚扰、数据爬取或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
