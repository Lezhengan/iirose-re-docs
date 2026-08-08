# DOM 完整索引

> 从 `messages.html`（1.6MB）全量爬取的结果。本文是[DOM 结构](dom.md)的**补全索引**：dom.md 按功能讲主要元素，这里给全部静态 id 与 class 统计。
> 提取工具：[extract_all_dom.js](../../../web_re/extract_all_dom.js)（`node extract_all_dom.js messages.html --ids / --classes`）。
> 原始清单：[all_ids.txt](../../reference/all_ids.txt) / [all_classes.txt](../../reference/all_classes.txt)。

## 一、全部静态 id（101 个真实 id）

> `messages.html` 单行压缩，内联 JS 里会混入 `#)` 之类的**混淆伪 id**（提取结果尾部），下表已过滤，仅保留真实 DOM 元素。

**骨架 / 容器**

| id | 标签 | 说明 |
|---|---|---|
| `#mainContainer` | div.fullBoxFixed | 根容器 |
| `#mainHolder` / `#mainHolderBox` | div | 主内容区（含聊天） |
| `#panelHolder` | div.fullBoxFixed | 动态面板挂载点 |
| `#hidePanel` | div | 隐藏面板容器 |
| `#screendarker` | div.fullBox | 暗色遮罩 |
| `#bodyDragBox` | div.flexCenter | 拖拽提示层 |
| `#bodyBG` | div | 背景图/视频 |
| `#resourceHolder` | div | 资源加载容器 |
| `#topHolder` | div | 顶部信息条 |

**初始化 / 加载屏**

`#initshowBox`（div.fullBoxFixed）、`#initshowBoxContent`、`#initshowFontHead`（textOverflowEllipsis）、`#initshowFontFoot`、`#initshowFontContent`、`#initshowLoadTitle`（span）、`#initshowLoadBody`、`#roomListDarker`（div.fullBoxFixed 房间切换过渡）

**聊天 / 输入**

| id | 标签 | 说明 |
|---|---|---|
| `#msgholder` / `#msgholderDisplay` | div | 公屏消息框 |
| `#moveinput` | textarea | 底部输入框 |
| `#moveinputDisplay` / `#moveinputBubble` | div | 输入条 / 气泡 |
| `#moveinputSendBtnFunc` | div.mdi-arrange-send-backward | 功能发送 |
| `#moveinputSendBtnSend` | div.mdi-send-outline | 发送 |
| `#homeHolder` | div.fullBox | 首页面板 |
| `#homeHolderMsgContentInputBox` | textarea | 首页消息输入 |
| `#sessionHolder` | div.fullBox | 会话容器 |
| `#textSizeMeasurer` | div | 文本测量（隐藏） |
| `#pubBgBox` | div.fullBox | 公屏背景 |

**媒体**

| id | 标签 | 说明 |
|---|---|---|
| `#mediaBox` | div.fullBoxFixed | 共享媒体容器 |
| `#videoPlayer` | video | 视频播放器 |
| `#videoPlayerCloseHandle` | div.pointer | 关闭视频 |
| `#myvideoholder` | div | 我的摄像头 |
| `#radioPlayer` | audio | 电台播放器 |
| `#albumShowHolder` / `#albumShow` | div / img | 专辑展示 |
| `#audioShowHolder` / `#audioShow` | div / audio | 音频展示 |
| `#videoShowHolder` / `#videoShow` | div / video | 视频展示 |
| `#bgImgBox` / `#wallpaperBlurBox` / `#wallpaperBlur` | div.fullBox | 壁纸图层 |
| `#downloadFile` | a | 下载中转 |
| `#faceHolder` | div | 表情面板 |
| `#effectHolder` | div | 特效层 |
| `#contentCopyHolder` | div | 复制中转 |

**弹层 / 选择器**

`#selectHolder`（div.fullBox）、`#selectHolderBox`（div.textColor）、`#alertHolder`、`#danmakuHolder`、`#movePanelHolder`、`#functionPanelHolder`

**侧边栏（functionHolder 全系列）**

见[侧边栏](sidebar.md)。静态完整清单：`#functionHolder`、`#functionHolderDarker`、`#functionHolderImg`、`#functionHolderInfoIcon`、`#functionHolderInfoName`（textOverflowEllipsis）、`#moodShower`、`#userREBtn`（span.functionBtnFont）、`#demandAgent`（input.functionBtnFont）、`#functionHolderDvider`（div.divider）、`#timeHolder`（span.functionBtnFont）、`#functionHolderExtBox` / `#extSubscribeHolder` / `#extContactsHolder` / `#extPmHolder`（div.functionItemBox）

音量/开关按钮：`#functionBtnVolume`、`#volumeMuteBtn`（span.functionBtnIcon）、`#volumeBox`、`#volumeprogress`、`#volumequantity`、`#volumecontrol`、`#emptyMediaPlayerBtn`、`#wallpaperLoadingBtn`、`#sleepModeBtn`、`#wallpaperVideoSwitchBtn`、`#bgMoveBtn`、`#lyricBtn`、`#systemVolumeBtn`、`#wallpaperBlurBtn`、`#bgBrightnessBtn`、`#danmakuModeBtn`、`#baseWallpaperBtn`（均为 span.functionBtnFont）

**声音（17 个 audio）**

`#chatsound`（群聊）、`#privatechatsound`（私聊）、`#entersound`/`#exitsound`/`#movesound`（进出/移动）、`#hilightsound`/`#atsound`（高亮/@）、`#mailsound`/`#danmakusound`/`#systemsound`（邮件/弹幕/系统）、`#infosound`/`#previewsound`（信息/预览）、`#textToSpeechPlayer`（TTS）、`#phoneForwardPlayer`/`#phoneIncomingPlayer`（通话铃声）、`#radioPlayer`

**其他**

`#kq`（a 标签，用途待确认，源码无引用）

## 二、class 统计（高频类）

| class | 次数 | 用途 |
|---|---|---|
| `.functionButton` | 70 | 侧边栏按钮容器（`onclick=functionBtnDo(编号)`） |
| `.functionBtnIcon` | 70 | 按钮图标（span，mdi-*） |
| `.functionBtnFont` | 70 | 按钮文字（span） |
| `.fullBox` | 31 | 全屏盒子（`position:absolute` 铺满） |
| `.fullBoxFixed` | 11 | 全屏固定盒子 |
| `.functionButtonGroup` / `.functionBtnGroupIcon` | 10 | 侧边栏折叠分组/箭头 |
| `.functionItemBox` | 10 | 侧边栏内容盒子 |
| `.whoisTouch` | 9 | 名片头部按钮 |
| `.faceHolderPageItem` | 8 | 表情面板页脚 |
| `.textOverflowEllipsis` | 7 | 单行省略 |
| `.homeHolderMsgTitleUnread` | 6 | 首页未读标记 |
| `.homeHolderMsgBox` / `.homeHolderItem` / `.homeHolderItemChild` | 4/2/2 | 首页消息盒 |
| `.pointer` / `.noActive` / `.cursorAuto` | 4/4/3 | 交互状态 |
| `.mediaShowHolder` | 3 | 媒体展示层 |
| `.divider` | 1 | 分割线 |

**mdi-* 图标全集**（侧边栏按钮用，CSS 定制时按需覆盖）：`mdi-menu`、`mdi-apps`、`mdi-music-box-multiple`、`mdi-mailbox`、`mdi-forum`、`mdi-message`、`mdi-clipboard-check-multiple`、`mdi-camera-iris`、`mdi-account-search`、`mdi-podium`、`mdi-fire`、`mdi-credit-card-outline`、`mdi-shopping`、`mdi-bank`、`mdi-chart-areaspline`、`mdi-bitcoin`、`mdi-chart-box`、`mdi-chart-line`、`mdi-store`、`mdi-briefcase`、`mdi-wallet-giftcard`、`mdi-hexagon-multiple`、`mdi-microsoft-onenote`、`mdi-dice-5`、`mdi-gender-male-female`、`mdi-link`、`mdi-at`、`mdi-symbol`、`mdi-google-translate`、`mdi-web`、`mdi-nintendo-switch`、`mdi-powershell`、`mdi-package-variant`、`mdi-music-note`、`mdi-human`、`mdi-grease-pencil`、`mdi-podcast`、`mdi-draw`、`mdi-phone-in-talk`、`mdi-earth`、`mdi-upload`、`mdi-microsoft`、`mdi-drama-masks`、`mdi-palette`、`mdi-information-outline`、`mdi-logout`、`mdi-reload`、`mdi-dots-horizontal`、`mdi-playlist-plus`、`mdi-volume-high`、`mdi-music-off`、`mdi-sleep`、`mdi-filmstrip`、`mdi-pan`、`mdi-card-bulleted`、`mdi-volume-source`、`mdi-blur`、`mdi-brightness-6`、`mdi-bell-badge`、`mdi-image-area`、`mdi-clipboard-outline`、`mdi-clock-outline`、`mdi-inbox`、`mdi-star`、`mdi-account-multiple`、`mdi-comment-multiple-outline`

## 三、提取方法

```bash
# 全量 id（含标签/class，可查遗漏）
node extract_all_dom.js messages.html --ids
# class 出现次数统计
node extract_all_dom.js messages.html --classes
```

> 注意：单行 HTML 里的内联 JS 可能产生伪 id（如 `#)||-1<e.1V(`），提取结果需人工过滤（真实 id 均符合 `[a-zA-Z][\w-]*` 且能对应源码引用）。
