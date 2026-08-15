# 媒体系统面板

IIROSE 的「媒体播放系统」由 3 个对象组成：**`mediaListHolder`**（当前房间点歌列表）、**`demandHolder`**（媒体点播搜索面板）、**`mediaManager`**（全局媒体播放核心，挂在 `Objs.mediaManager` 上）。

| 面板 | 全局对象 | 初始化 | 入口 | 功能 |
|---|---|---|---|---|
| mediaListHolder | `Objs.mediaListHolder` | `Init.fullPanel(8)` | 输入框 `@`（L2874） | 展示当前"媒体分享房"的歌单/点歌记录 |
| demandHolder | `Objs.demandHolder` | `Init.fullPanel(510)` | 输入 `@关键词` / `#关键词` / `@ 关键词` / `<>链接`（L2918-2946） | 媒体点播搜索（音乐/视频/歌单） |
| mediaManager | `Objs.mediaManager` | 外部脚本 `media.js` / `backimg.js`（L12098） | 自动加载 | 全局媒体播放核心（`media` / `bgimg` 两套子对象） |

---

## 一、mediaListHolder（媒体列表 / 歌单）

### 1.1 入口与命令

输入框命令 `@`（`Utils.service.moveinputDo("@")`）触发（L2873-2874）：

```js
case "@":
  return void(isMediaShareRoom
    ? (Probe.init.mediaListHolder || Init.fullPanel(8),   // 按需初始化面板 8
       panelAnimate(39, 1),                                // 打开面板（动画槽 39）
       socket.send("%"))                                   // 请求歌单
    : _alert(languageArr[7][35]));                         // 非媒体分享房 → 提示"当前房间不支持"
```

要点：

- 仅当 `isMediaShareRoom`（当前处于媒体分享房）时有效，否则提示 `languageArr[7][35]`（"当前房间不支持"）（L2874）。
- 打开时客户端发送 `%` 请求歌单，服务端随后以 **`~` 前缀**推送歌单数据（见 1.3）。

### 1.2 面板结构与 DOM

面板在 `fullPanel` 的 `case 8` 中构建（L22247-22261）。标题 `languageArr[24][0]` = **「歌单」**（L22248；语言包见 L11149），图标 `music-box-multiple`，主题色 `c5659a`（亮色）/ `8a476c`（暗色）。

```
#mediaListHolder.panelHolderItem                ← Mod.template(13, P, M)
├─ <style>#mediaListHolder .mainColor{...}</style>
├─ .contentItemBgicon.mdi-music-box-multiple     ← Mod.template(12, j, B, ...)
│  └─ .contentItemBgiconText  「歌单」
├─ .contentItemContent
│  └─ .fullBox.textColor（overflow-x/y:auto; padding:12px）   ← Objs[P].content
│     ├─ .cardTag        （每条点歌记录，见下）
│     │  ├─ .cardTagBg.mdi-image-outline（[可选] 封面背景，reduceDataUsage2 时显示）
│     │  ├─ .cardTagI
│     │  │  ├─ .cardTagAvatar.whoisTouch2（头像，onclick=getProfile([...])）
│     │  │  ├─ .cardTagName.textColor（点播者名字）
│     │  │  ├─ .cardTagSex.mdi-gender-male / mdi-gender-female（性别）
│     │  │  ├─ .cardTagTime（点播时间）
│     │  │  └─ .cardTagNumber（# 序号）
│     │  ├─ .cardTagLineBox > .cardTagLine（分隔线）
│     │  └─ .cardTagC（歌曲名 + <span>品牌图标 + 歌手/来源</span>）
│     └─ .emptyShow（空状态，Mod.template(7, "music", ...)）
└─ .contentItemBtn
   └─ button.mainColor > .buttonIcon.mdi-keyboard-return 「返回」
      （onclick=panelAnimate(39,0,function(){...content.empty()...})）
```

- `Objs[P].content = Objs[P].This.children("div:eq(1)").children("div")`（L22250），即 `.contentItemContent` 内的滚动容器。
- 内容区通过 `Graphics.boxSuitScreen.add` 做自适应尺寸（L22257-22260）。

### 1.3 接收端解析（`~` 推送）

`onMsg` 中 `case "~"`（L13396-13398）把推送交给 `mediaListHolder.function.get(e.substr(1))`：

```js
case "~":
  Objs.mediaListHolder.function.get(e.substr(1));
  break;
```

`get(e)`（L22251-22256）把整串数据先按 `<` 切分成多条记录，每条再按 `>` 切字段：

```js
for (var ... d < c; ++d)
  t = (n = e[d].split(">"))[0],        // [0] 时间戳
  i = n[1].split('"'),                  // [1] 歌曲名 " 品牌码+歌手/来源
  o = n[2].substr(6),                   // [2] 后段 = 点播者名字
  a = n[2].substr(0, 6),                // [2] 前 6 位 = 名字颜色 hex
  s = n[3],                             // [3] 性别（1 男 / 2 女）
  r = reduceDataUsage6 ? avatarconv(n[4]) : "",  // [4] 头像
  n = "http" + n[5].replace(...),       // [5] 歌曲链接（无 http 前缀）
  t = Utils.timeFormater(t), ...
```

**每条点歌记录的字段（按 `>` 分隔）：**

| 下标 | 字段 | 说明 |
|---|---|---|
| `[0]` | 时间戳 | 点播时间，`Utils.timeFormater` 格式化 |
| `[1]` | `歌曲名"品牌码+歌手/来源` | 再按 `"` 切成 `i[0]`（歌名，可能含 `*Subsection*` 分段标记，替换为 `languageArr[9][2][21]`）和 `i[1]`（前 2 位为品牌码，后段为歌手/来源） |
| `[2]` | `颜色hex(6位)+点播者名字` | 前 6 位颜色 `a`，后段名字 `o` |
| `[3]` | 性别 | 1=男 / 2=女（决定 `cardTagSex` 图标与颜色） |
| `[4]` | 头像 | 仅在 `reduceDataUsage6`（省流量）时经 `avatarconv` 使用 |
| `[5]` | 歌曲链接 | 补 `http` 前缀后作为卡片封面（`reduceDataUsage2` 时） |

- 头像点击 `getProfile([名字, 颜色, 头像, 性别, null])`（L22253）打开点播者名片。
- 空数据时显示空状态占位（L22255）：`Mod.template(7, "music", languageArr[29][0])`。

### 1.4 关键数据 / 状态

- 面板无独立 `Variable`/`Assets`，只保留 `content`（DOM 容器）和 `function.get`（渲染）。
- 面板在 `hideFullPanelList` 中（L15445），并注册了返回/关闭处理（`objTmp.mediaListHolder`，L15843-15847）；其 `[1]` 返回回调为空操作（L16144），即无"后退一步"行为。

---

## 二、demandHolder（媒体点播搜索面板）

### 2.1 入口与命令

点播面板由输入框内容分流触发（L2908-2946）。当房间为 `mediaShareRoom` 且输入以 `@` / `#` / `<>` 开头时：

| 输入 | `searchMediaType` | 搜索类型 | 说明 |
|---|---|---|---|
| `@关键词` | `0` | `Audio`（音乐） | `"@" == e[0]` 且非 `"@ "` 前缀（L2921） |
| `#关键词` | `1` | `Video`（视频） | `"#" == e[0]`（L2921） |
| `@ 关键词`（@ 后有空格） | `2` | `Audiolist`（歌单） | `"@ " == e.substr(0, 2)`（L2921） |
| `<>链接` | — | 直接点播 | 解析具体链接（网易云/5sing/哔哩等）后 `demandSend`（L2948-3212） |

```js
Probe.init.demandHolder || Init.fullPanel(510);        // L2918 按需初始化面板 510
var d = Objs.demandHolder;
if (d.searchMediaKey = t) {
  ...
  if (d.searchMediaType != (strTmp2 = "#" == e[0] ? 1 : "@ " == e.substr(0, 2) ? 2 : 0)) {
    ... // 切换 Audio/Video/Audiolist 三个搜索分区（L2921-2944）
  }
  ...
  d.function.search(0), panelAnimate(17, 1, null, Probe.isChangepanelHide);  // L2945 打开面板（动画槽 17）
}
```

- 初次打开时从 Cookie `searchMediaType`（格式 `音频类型#视频类型#歌单类型`）恢复上次选择的引擎（L2923-2938）。
- `<>` 直接点播会先走各平台解析接口（5sing / 163Music / 163歌单 / bilibili / 抖音 / 快手 / 喜马拉雅 / 荔枝 / echo / 芒果 等，L2948-3212），解析出可播地址后调用 `demandSend(...)`（L3056、3062、3068、3074、3082、3089）。
- `Probe.getMediaLink` 非 0 时，demandHolder 作为"取链接"选择器被复用（如用户资料 BGM、商店/帖子背景音乐设置），选中后回调到对应设置入口（L27104-27106、L27269）。

### 2.2 面板结构与 DOM

面板在 `fullPanel` 的 `case 510` 中构建（L27052-27496）。标题 `languageArr[7][73]` = **「媒体点播」**（L27053；语言包见 L11012），图标 `album`，主题色 `000000`。面板自带一段 `<style>`（L27053）定义 `.demandHolderItem`、`.searchMediaImgBox`、`.searchMediaDuration`、`.searchMediaText*`、`.demandHolderPlayBtn` 等样式。

```
#demandHolder.panelHolderItem                  ← Mod.template(13, P, M, O)，O=CSS 文本
├─ <style>#demandHolder .searchMediaBoxPage{...} .demandHolderItem{...} ...</style>
├─ .contentItemBgicon.mdi-album
│  └─ .contentItemBgiconText 「媒体点播」
├─ .contentItemContent
│  └─ .fullBox.textColor（overflow:hidden）      ← Objs[P].content
│     ├─ headBox（高 80px 顶部栏，Objs[P].headBox）
│     │  ├─ 左：.buttonIcon.mdi-magnify + .buttonText.whoisTouch2   ← searchMediaKeywordHolder（关键词，点击可改）
│     │  ├─ 右：.buttonIcon.mdi-book-open-variant + .buttonText.whoisTouch2 ← searchMediaPageNumberHolder（页码 "当前 / 总页"，点击可跳页）
│     │  └─ 引擎切换条（3 个 .fullBox，display:none/flex）
│     │     ├─ searchAudioEngineSwitch（5 个引擎按钮）     ← searchAudioEngineSwitchBtnArr
│     │     ├─ searchVideoEngineSwitch（7 个引擎按钮）     ← searchVideoEngineSwitchBtnArr
│     │     └─ searchAudiolistEngineSwitch（4 个类型按钮） ← searchAudiolistEngineSwitchBtnArr
│     │        每个按钮 = .whoisTouch2（data-color=引擎色）> [icon img] + 名称 + .fullBox.pointer(t=类型号)
│     └─ 结果容器（3 个 .fullBox，display:none）
│        ├─ searchMediaBoxAudio（5 个子面板）              ← searchMediaBoxAudioItemArr
│        ├─ searchMediaBoxVideo（7 个子面板 + 各子列表）    ← searchMediaBoxVideoItemArr / _childItemArr
│        └─ searchMediaBoxAudiolist（4 个子面板 + 各子列表）← searchMediaBoxAudiolistItemArr / _childItemArr
│           每个子面板内是 .searchMediaBoxPage.fullBox[index=N]（分页容器）
└─ .contentItemBtn
   ├─ button 返回（keyboard-return）→ event(0)
   ├─ button 首页（page-first，默认隐藏）
   ├─ button 末页（page-last，默认隐藏）
   ├─ button 上一页（chevron-left）→ changePage()
   └─ button 下一页（chevron-right）→ changePage(1)
```

**单个搜索结果卡片 `.demandHolderItem`**（由 `demandMod` 生成，L27266-27270）：

```
.demandHolderItem.textColor.shopItemColor
├─ .searchMediaImgBox.mdi-[图标]（点击 window.open(链接)）
│  ├─ .fullBox > img（封面，可选）
│  └─ .searchMediaDuration（时长/集数，右下角）
├─ .searchMediaText
│  ├─ .searchMediaTextName（标题）
│  └─ .searchMediaTextAuthor（作者/描述）
├─ .divider
└─ .demandHolderPlayBtn
   └─ button.mainColor（onclick 生成 moveinputDo('<> 链接...') 或取链接回调）
      ├─ .buttonIcon.mdi-[play/headphones/playlist-plus/...]
      └─ .buttonText（「点播」/「播放」/「歌单」/「试听」等）
```

图标/按钮文案由媒体类型、付费状态（`o`：0 免费 / 2、3 付费需会员）和 `Probe.getMediaLink` 模式共同决定（L27269 内嵌三元表达式）。

### 2.3 搜索引擎与类型

引擎/类型的名称、颜色、图标由 `languageArr[9][0]` 提供（L27054-27063，语言包 L11017-11024）：

| 分区 | 引擎号 | 名称 | 颜色 | 后端接口 `d` |
|---|---|---|---|---|
| Audio（音乐） | 0 | 网易云音乐 | `dd1c04` | `163Music` |
| | 1 | 虾米音乐 | `ff410f` | `xiamiMusic` |
| | 2 | QQ音乐 | `10b256` | `qqMusic` |
| | 3 | 千千音乐 | `ee0016` | `taiheMusic` |
| | 4 | 酷狗音乐 | `1d82fe` | `kugouMusic` |
| Video（视频） | 0 | 爱奇艺 | `04cc04` | `iqiyi` |
| | 1 | 腾讯视频 | `7b7b7b` | `qqVideo` |
| | 2 | YouTube | `e7291f` | `content.googleapis.com/youtube/v3/` |
| | 3 | 哔哩哔哩 | `d14f76` | `bilibili` |
| | 4 | 番剧（B站） | `bc8f5c` | `bilibili`（`t=1`） |
| | 5 | 影视（B站） | `707070` | `bilibili`（`t=2`） |
| | 6 | 直播（B站） | `9e8bfe` | `bilibili`（`t=3`） |
| Audiolist（歌单） | 0 | 歌单 | `909090`/`404040` | `163Music`（`t=0`） |
| | 1 | 专辑 | 同上 | `163Music`（`t=1`） |
| | 2 | 歌手 | 同上 | `163Music`（`t=2`） |
| | 3 | 电台 | `95d071`/`6f9c53` | `163Music`（`t=3`） |

> 语言包 `languageArr[9][0]` 里其实还列出了「喜马拉雅FM / 荔枝FM / echo回声 / 5SING」等（L11019），但在 demandHolder 的搜索条里只渲染前 5 个音频引擎（`langAudio` 只取 `I[0][0..4]`，L27056），其余引擎未在搜索面板内呈现。

### 2.4 搜索接口（`function.search`，L27123-27221）

搜索通过 jQuery AJAX 发起（L27209-27219）：

```js
$.ajax({
  type: "GET",
  url: "http" == d.substr(0, 4) ? d : Urls.api + "lib/php/api/search_" + d + ".php",
  data: c,          // {s:关键词, l:10, p:页码} 或各引擎专用参数
  success: function (e) { o.function.demand(t, e, r, i, s, n) },
  error: function () { ... _alert(languageArr[7][122]) }
})
```

- 参数：`s`=关键词、`l`=每页条数(10)、`p`=页码（从 1 起，前端用 `r+1`）。
- 后端脚本名 `search_<d>.php`：`163Music` / `xiamiMusic` / `qqMusic` / `taiheMusic` / `kugouMusic` / `iqiyi` / `qqVideo` / `bilibili`（视频/歌单列表加 `_list` 后缀）。
- YouTube 例外：直接请求 `https://content.googleapis.com/youtube/v3/`（带 `key: AIzaSyCWNoM8YP5JlEeb3ug3xJwUiv3oruAzE8Y`，L27167）。
- 结果由 `function.demand`（L27271-27443）解析各平台 JSON 并渲染；二级列表（歌单/专辑/番剧选集等）走 `showChildList` / `searchChildList`（L27223-27265）。

### 2.5 点播发送（`demandSend` → `msgfetch` → `socket.send`）

**点播的本质是发送一条聊天消息，其内容 `m` 是一段 `m__4` 开头的媒体指令串**。

`demandSend(e, t, i, o, a, s, r, n, l)`（L12393-12411）生成指令头：

```js
if (e) d = "m__4*" + t;      // e=1：列表点播（歌单/专辑/歌手/电台），t=列表类型 0-3
else {
  if (d = "m__4@" + t, !a) return _alert(languageArr[7][64]), !1;  // e=0：单曲点播，t=品牌码
  ...
  music_brand = "@" + t;
  ...
  Utils.setPlayerSrc(shareMediaGetTime, a);   // 本地先播放（乐观更新）
}
```

随后通过 `msgfetch({i, m, mc, nc, se, uid})` 发送（L12401-12409），最终在 `msgfetch` 里 `socket.send`（L14114-14118）：

```js
socket.send(y + JSON.stringify({ m: f, mc: t.mc, i: v }));
```

其中 `f` 即过滤后的消息正文，对点播就是：

```
m__4@品牌>歌名>歌手>封面>颜色>链接
m__4*列表类型>歌名>歌手>封面>颜色>链接
```

| 字段 | 说明 |
|---|---|
| `m__4@品牌` | 单曲点播头，`品牌`=音乐源品牌码（0=网易云、1=虾米、2=QQ、3=千千、4=酷狗；`%8`=5SING、`!4`~`!6`、`%5`~`%7` 为喜马拉雅/荔枝/echo/抖音/快手等，见 L2955-3212） |
| `m__4*类型` | 列表点播头，`类型`=0 歌单 / 1 专辑 / 2 歌手 / 3 电台（L12395） |
| `歌名` | `htmlspecialchars` 后的标题 |
| `歌手` | 歌手/来源（可为空） |
| `封面` | 封面图 URL（`s`，缺省 `Fallback.demandPic.url`） |
| `颜色` | 封面主色（`e`，异步取色后回填，L12411） |
| `链接` | 可播媒体地址（`n`），部分平台追加 `#163=id` 等溯源参数 |

**媒体控制指令**（在 `msgfetch` 里与点播同通道发送，L14110-14114，前缀 `y`）：

| 输入 | 发送前缀 | 含义 |
|---|---|---|
| `切` / `cut` | `{0` | 切歌（当前点播） |
| `切全部` / `cut all` | `{1` | 切除全部点播 |
| `切歌单` / `cut playlist` | `{2` | 中止歌单点播 |
| `快进`/`快退`/`移到`/`fast`/`shift to` | `{3` + 方向/时间 | 跳转播放进度（L14110） |
| `停` / `abort` | — | 中止本机歌单点播（`demandPlaylistAbort`） |

### 2.6 接收端（`m__4` 消息 → `Mod.demandCard`）

聊天消息解析 `_getcontents` 中，当正文以 `m__4` 开头时先转成 `'` 前缀再按系统消息处理（L14130）：

```js
"m__4" == e[3].substr(0, 4) && (e[3] = "'" + e[3].substr(3));
```

随后 `case "4"`（L14138-14161）按第二个字符分发到 `Mod.demandCard`：

| 指令首段 | 分支 | 卡片 |
|---|---|---|
| `'4@...` | `case "@"` | `Mod.demandCard(0, 0, M, W)` — 音乐点播卡 |
| `'4#...` | `case "#"` | `Mod.demandCard(1, 0, M, W)` — 视频点播卡 |
| `'4*...` | `case "*"` | `Mod.demandCard(1, 1, M, W)` — 视频/列表点播卡 |
| `'4=...` | `case "="` | `Mod.demandCard(0, 1, M, W)` — 音乐/列表点播卡 |
| `'4%...` | `case "%"` | `Mod.demandCard(0, 0, M, W, 1)` — 音乐点播（广播样式） |
| `'4!...` | `case "!"` | `Mod.demandCard(1, 0, M, W, 1)` — 视频点播（广播样式） |

其中 `M = e[3].substr(3).split("&gt;")`（L14139），即把 `m__4@品牌>歌名>...` 的 `>` 段拆开喂给点播卡片渲染。

服务端广播"正在播放/即将播放"的推送则由 `shareMedia(e)`（L12345-12389）解析，字段同样以 `>` 分隔：

| 下标 | 字段 |
|---|---|
| `[0]` | 播放地址（`*` 开头为 YouTube，`http` 补全） |
| `[1]` | 总时长（秒） |
| `[2]` | 歌名/标题（含 `*Subsection*` 分段标记） |
| `[3]` | `品牌码2位+歌手/来源` |
| `[4]` | 点播者昵称 |
| `[5]` | 性别（1/2） |
| `[6]` | 封面（补 `http`） |
| `[7]` | 头像 |
| `[8]` | 剩余时长（倒计时，`时长-剩余=当前进度`） |
| `[9]` | 歌词（LRC，`unhtmlspecialchars` 两次） |

（L12347-12387；媒体分享房的实际播放状态 `shareMediaCurrentTime`、`shareMediaDuration` 等由此维护。）

---

## 三、mediaManager（全局媒体播放核心）

### 3.1 定义与加载

`Objs.mediaManager` 在 `Objs` 对象字面量中先占位为空对象（L9739）：

```js
mediaManager: {},
```

其真正的实现（`media`、`bgimg` 等子对象）**来自外部脚本**，在启动流程里按需动态加载（L12098）：

```js
reduceDataUsageProbe && (Objs.repertory.pubBgBox.append(/* #backimgholder1 / #backimgholder2 DOM */),
  Utils.getScript("lib/js/web/server/backimg.js")),
noFaze || ((musicRoom || videoRoom && !donotPlayVideo) &&
  (Utils.getScript("lib/js/web/server/media.js"), videoRoom) && ...),
bgsoundRoom && Utils.getScript("lib/js/web/server/bgsound.js")
```

- `lib/js/web/server/media.js`：在 **音乐房（musicRoom）或视频房（videoRoom）** 加载，构建 `Objs.mediaManager.media`（媒体播放）。
- `lib/js/web/server/backimg.js`：在 **省流量模式（reduceDataUsageProbe）** 下加载，构建 `Objs.mediaManager.bgimg`（背景图/动态壁纸，含 `#backimgholder1` / `#backimgholder2` 两个占位容器，L12098）。
- `lib/js/web/server/bgsound.js`：在 **bgsoundRoom** 加载。

> ⚠️ 这两个脚本**不在本仓库还原源码内**，因此 `mediaManager.media` / `mediaManager.bgimg` 的**内部字段定义**（`Variable.mediaRunning`、`getPlayerType` 等）以下均基于 `messages.js` 中的**调用点**反推，具体实现细节标注为「（待核实）」。

### 3.2 `mediaManager.media` 子对象（媒体播放，media.js 构建）

`messages.js` 中可观察到的 API 面：

| 引用 | 说明 | 源码 |
|---|---|---|
| `media.Variable.mediaRunning` | 是否正在播放（布尔） | L3646-3647 |
| `media.Variable.mediaPlayType` | 播放类型，切到音频时置 `0`（0=音乐/音频、1=视频，待核实） | L33051、L33056 |
| `media.function.getPlayerType()` | 返回播放器类型：`1`=视频、`2`=音乐 | L3646-3647 |
| `media.function.parse(str)` | 解析并设置房间媒体（`*` 表示清空） | L13680 |

用法示例（L3646-3647，`Utils.service.setMedia` 内）：

```js
if (mediaRoom && (shareMusicRoom ? Utils.service.isShareMediaPlaying()
  : shareVideoRoom ? 0 == Probe.prevDemandMediaType && Utils.service.isShareMediaPlaying()
  : musicRoom ? Objs.mediaManager.media.Variable.mediaRunning
  : Objs.mediaManager.media.Variable.mediaRunning && 2 == Objs.mediaManager.media.function.getPlayerType()))
  return Utils.service.beforeMediaPlay("0" == e ? void 0 : 2), !0;
else if (!noFaze && (shareVideoRoom || videoRoom) && (... 1 == getPlayerType() ...))
  return Utils.service.beforeMediaPlay("0" == e ? void 0 : 1), !0;
```

### 3.3 `mediaManager.bgimg` 子对象（背景图/动态壁纸，backimg.js 构建）

`messages.js` 中可观察到的字段：

| 字段 | 说明 | 源码 |
|---|---|---|
| `bgimg.backimgholder1` | 背景图容器 1（`#backimgholder1`，`.backimgholder`） | L4128、L4791、L12098 |
| `bgimg.backimgholder2` | 背景图容器 2（`#backimgholder2`，带 `transform:scale(1.1)`） | L4128、L4791、L12098 |
| `bgimg.videoBgObj` | 容器 1 内的 `<video>` 背景视频对象 | L4622-4623、L5815、L12098 |
| `bgimg.videoBgObj2` | 容器 2 内的 `<video>` 背景视频对象 | L4622-4623、L5815、L12098 |
| `bgimg.function.parse(str)` | 设置背景图/壁纸（`*` 表示清空） | L13680 |

- 两个 `backimgholder` 用 `style.transform` 的有无来切换"当前显示的是哪一层"（L4128、L4791：`backimgholder1[0].style.transform ? backimgholder2 : backimgholder1`），实现壁纸交叉淡入切换。
- 视频对象带 `playerRatioArr` / `playerRatio`（画面比例相关），窗口缩放时由 `Utils.resize.bgImgVideo` 统一 `adjustVideoSize`（L5813-5816）。

### 3.4 关联函数

**`Utils.service.beforeMediaPlay(e)`（L3611-3614）**——播放前的"空媒体播放器"开关协调：

- `e` 为 `undefined` 时：在 `Probe.emptyMediaPlayerManual` 与 `Probe.emptyMediaPlayer`/`Probe.emptyMediaPlayerVirtual` 之间同步。
- `e` 为 `0`（音乐）或 `1`（视频）时：根据 `Variable.Settings.mediaLoading[e]`（媒体加载设置）与页面可见性决定是否启用 `Objs.emptyMediaPlayer`（占位播放器），并调用 `emptyMediaPlayer.switch(...)`。

**`Utils.service.setMedia(e, t)`（L3644-3648）**——依据 `mediaManager.media` 状态与房间类型判断是否在播放音乐/视频，进而决定是否切"空媒体播放器"。

**`Objs.emptyMediaPlayer`（L33028-33074）**——"禁用媒体/睡眠模式"下替代真实播放器的**占位对象**，接口与真实播放器对齐：

| 方法 | 说明 |
|---|---|
| `play()` | 启动虚拟时钟计时 |
| `pasue()` | 暂停计时 |
| `seek(秒)` | 跳转 `currentTime` |
| `setSrc(player, src, duration, currentTime, fileType, subtitle)` | 记录"当前播放"元信息并开始计时 |
| `reset()` | 清空状态 |
| `switch(on, t)` | 开/关占位模式：接管/释放真实媒体元素（`videoPlayer2` / `shareMediaObj` / YouTube 等），并更新按钮/状态（L33048-33073） |

### 3.5 房主设置命令 `hx`（设置房间背景图/媒体）

`onMsg` `case "h"` 的 `x` 分支（L13680）：

```js
"x" == e[1] && ((e = e.substr(2).split("<"))[0] &&
  Objs.mediaManager.bgimg && (Objs.mediaManager.bgimg.function.parse("*" == e[0] ? "" : e[0]),
  _alert(languageArr[7][138][1])), e[1]) &&
  Objs.mediaManager.media && (Objs.mediaManager.media.function.parse("*" == e[1] ? "" : e[1]),
  _alert(languageArr[7][138][2]));
```

- 报文格式：`hx背景图<媒体`（`背景图` 与 `媒体` 用 `<` 分隔；各自为 `*` 时表示清空）。
- 提示文案 `languageArr[7][138]` = `["此房间数据已更新", "此房间壁纸已更新", "此房间媒体已更新"]`（L11012）。

---

## 四、命令 / 报文汇总

| 命令 | 方向 | 含义 | 源码 |
|---|---|---|---|
| `%` | 发 | 请求当前媒体分享房歌单（打开 mediaListHolder 时） | L2874 |
| `~...` | 收 | 歌单数据推送（`<` 分条、`>` 分字段） | L13396-13398 |
| `@关键词` | 发 | 打开 demandHolder 搜索音乐 | L2921 |
| `#关键词` | 发 | 打开 demandHolder 搜索视频 | L2921 |
| `@ 关键词` | 发 | 打开 demandHolder 搜索歌单 | L2921 |
| `<>链接` | 发 | 直接解析并点播链接 | L2948-3212 |
| `m__4@品牌>歌名>歌手>封面>颜色>链接` | 发（聊天正文） | 单曲点播 | L12397、L12404 |
| `m__4*类型>...` | 发（聊天正文） | 列表点播（0歌单/1专辑/2歌手/3电台） | L12395 |
| `{0` / `{1` / `{2` / `{3...` | 发（消息前缀） | 切歌 / 切全部 / 切歌单 / 快进快退移到 | L14110-14114 |
| `'4@/#/*/=/%/!...` | 收（聊天正文） | 点播卡渲染（`Mod.demandCard`） | L14138-14161 |
| `hx背景图<媒体` | 发 | 房主设置房间背景图/媒体（`*` 清空） | L13680 |
| `&...` | 收 | 分享媒体播放状态推送（`shareMedia`） | L13390-13392 |

---

## 五、关键源码位置（messages.js）

| 位置 | 内容 |
|---|---|
| L1395 | `mediaListHolder: [1, 1]`（panelParam 面板参数） |
| L1544 | `demandHolder: [3, 0]`（panelParam 面板参数） |
| L2832 | `Utils.service.moveinputDo`（输入框命令分发） |
| L2873-2874 | `@` 命令 → mediaListHolder + `socket.send("%")` |
| L2908-2946 | demandHolder 入口（`@`/`#`/`<>` 分流） |
| L2948-3212 | `<>` 链接解析（各平台）→ `demandSend` |
| L3611-3614 | `Utils.service.beforeMediaPlay` |
| L3644-3648 | `Utils.service.setMedia`（引用 `mediaManager.media`） |
| L9739 | `Objs.mediaManager = {}` 占位 |
| L12098 | 动态加载 `media.js` / `backimg.js` / `bgsound.js` |
| L12345-12389 | `shareMedia`（分享媒体推送解析） |
| L12393-12411 | `demandSend`（构造 `m__4` 指令） |
| L13351-13420 | `onMsg` 各 case（`%`/`&`/`~`/`,` 等） |
| L13680 | `hx` 命令 → `bgimg.function.parse` / `media.function.parse` |
| L14034-14118 | `msgfetch`（`socket.send(JSON.stringify({m, mc, i}))`） |
| L14130、L14138-14161 | 接收 `m__4` → `Mod.demandCard` |
| L14877-14884 | panelAnimate 槽 16/17（demandHolder） |
| L15039-15040 | panelAnimate 槽 39（mediaListHolder） |
| L15445 | `hideFullPanelList` 包含 `mediaListHolder` |
| L15843-15847、L16144 | `objTmp.mediaListHolder` 前进/后退 |
| L16166-16168 | `objTmp.demandHolder` 后退处理 |
| L22247-22261 | `fullPanel` case 8 = mediaListHolder |
| L22251-22256 | `mediaListHolder.function.get`（歌单解析） |
| L27052-27496 | `fullPanel` case 510 = demandHolder |
| L27266-27270 | `demandMod`（结果卡片 HTML） |
| L27271-27443 | `demand`（搜索结果渲染） |
| L33028-33074 | `Objs.emptyMediaPlayer`（占位播放器） |
| L9343-9364 | `Mod.template`（5 按钮 / 12 内容盒 / 13 面板壳） |
| L11017-11030 | `languageArr[9]`（媒体引擎/文案） |
| L11149 | `languageArr[24]`（面板标题，`[0]`=「歌单」） |

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
