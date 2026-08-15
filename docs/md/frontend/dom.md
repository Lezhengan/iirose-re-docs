# DOM 结构速查

> 应用页 `messages.html`（`reference/src/messages.html`，单行压缩 1.6MB）静态定义全部 DOM；JS 通过 `getElementById` / jQuery `$("#id")` 引用，动态面板由 `Mod.template()` 生成后插入容器。
> 下列 id 均从 `messages.html` 标签中提取（共 201 个），下表为按功能分类的真实 id。

## 页面骨架

```
<body>
├─ #mainContainer
│  ├─ #screendarker           ← 暗色遮罩
│  ├─ #mainHolder             ← 主内容容器
│  │  ├─ #msgholder           ← 聊天区（消息框）
│  │  ├─ #moveinputDisplay    ← 底部输入条
│  │  ├─ #homeHolder          ← 首页/主页面板
│  │  ├─ #danmakuHolder       ← 弹幕区
│  │  └─ #panelHolder         ← 动态面板挂载点（面板切换动画）
│  ├─ #hidePanel              ← 隐藏面板容器
│  ├─ #functionHolderDarker   ← 侧边栏遮罩
│  └─ #functionHolder         ← 侧边栏（见[侧边栏](md/frontend/sidebar.md)）
├─ #bodyBG                    ← 背景图/视频
└─ #resourceHolder            ← 资源加载容器
```

## 初始化 / 加载屏

| id | 说明 |
|---|---|
| `#initshowBox` / `#initshowBoxContent` | 加载遮罩 |
| `#initshowFontHead` / `#initshowFontFoot` / `#initshowFontContent` | 加载屏文本区 |
| `#initshowLoadTitle` / `#initshowLoadBody` | 加载标题/正文 |
| `#initshowLineHorizon` / `#initshowBgGrid` | 加载动效元素 |
| `#roomListDarker` | 房间切换暗色过渡层 |

## 聊天

| id | 说明 |
|---|---|
| `#msgholder` / `#msgholderDisplay` | 公屏消息框（滚动显示房间广播） |
| `#moveinput` / `#moveinputDisplay` | 底部输入框（`moveinputDo` 解析内容） |
| `#moveinputBubble` | 输入气泡提示 |
| `#moveinputSendBtnFunc` / `#moveinputSendBtnSend` | 发送按钮 |
| `#homeHolder` / `#homeHolderMsgContentInputBox` | 首页面板与消息输入 |
| `#pubBgBox` | 公屏背景 |
| `#danmakuHolder` | 弹幕播放区 |
| `#textSizeMeasurer` | 文本宽度测量（隐藏） |

## 媒体播放

| id | 说明 |
|---|---|
| `#mediaBox` | 共享媒体容器 |
| `#videoPlayer` / `#videoPlayerCloseHandle` | 视频播放器 |
| `#myvideoholder` | 我的摄像头画面 |
| `#radioPlayer` | 电台/收音机 |
| `#albumShow(Holder)` / `#audioShow(Holder)` / `#videoShow(Holder)` | 专辑/音频/视频展示层 |
| `#bgImgBox` / `#wallpaperBlurBox` / `#wallpaperBlur` | 壁纸图层与模糊层 |
| `#bodyBG` | 背景图/视频（`Objs.repertory.bodyBG`） |
| `#downloadFile` | 下载中转 |

## 弹层 / 选择器 / 提示

| id | 说明 |
|---|---|
| `#selectHolder` / `#selectHolderBox` | 通用选择器（buildSelect） |
| `#faceHolder` | 表情面板 |
| `#alertHolder` | 弹窗（`_alert`） |
| `#effectHolder` | 特效层 |
| `#contentCopyHolder` | 内容复制 |
| `#topHolder` | 顶部信息条 |
| `#sessionHolder` | 会话管理容器 |
| `#movePanelHolder` / `#functionPanelHolder` | 移动面板/功能面板切换容器 |

## 侧边栏按钮（见[侧边栏](md/frontend/sidebar.md)）

`#functionHolder`、`#functionHolderDarker`、`#functionHolderImg`、`#functionHolderInfoIcon`、`#functionHolderInfoName`、`#moodShower`、`#userREBtn`、`#demandAgent`、`#functionHolderDvider`、`#timeHolder`、`#functionHolderExtBox`、`#extSubscribeHolder`、`#extContactsHolder`、`#extPmHolder`

音量/开关按钮组：`#functionBtnVolume`、`#volumeMuteBtn`、`#volumeBox`、`#volumeprogress`、`#volumequantity`、`#volumecontrol`、`#emptyMediaPlayerBtn`、`#wallpaperLoadingBtn`、`#sleepModeBtn`、`#wallpaperVideoSwitchBtn`、`#bgMoveBtn`、`#lyricBtn`、`#systemVolumeBtn`、`#wallpaperBlurBtn`、`#bgBrightnessBtn`、`#danmakuModeBtn`、`#baseWallpaperBtn`

## 声音（audio 元素）

| id | 说明 |
|---|---|
| `#chatsound` | 群聊消息音 |
| `#privatechatsound` | 私聊消息音 |
| `#entersound` / `#exitsound` / `#movesound` | 进出/移动音 |
| `#hilightsound` / `#atsound` | 高亮 / @ 音 |
| `#mailsound` / `#danmakusound` / `#systemsound` | 邮件 / 弹幕 / 系统音 |
| `#infosound` / `#previewsound` | 信息 / 预览音 |
| `#textToSpeechPlayer` | TTS 播放 |
| `#phoneForwardPlayer` / `#phoneIncomingPlayer` | 通话铃声 |

## JS 侧 DOM 引用

### `Objs.repertory`（L9723-9737）

```js
Objs.repertory = {
  albumShow:  document.getElementById("albumShow"),
  audioShow:  document.getElementById("audioShow"),
  videoShow:  document.getElementById("videoShow"),
  contentCopyHolder: document.getElementById("contentCopyHolder"),
  downloadFile: document.getElementById("downloadFile"),
  // + roomListDarker / topBar / mainHolder / bodyBG 等 jQuery 引用
}
```

### `Objs.btnJson`（按钮文本更新）

```js
Objs.btnJson = {
  cinemaModeBtn, wallpaperLoadingBtn, sleepModeBtn,
  wallpaperVideoSwitchBtn, bgMoveBtn, lyricBtn, danmakuModeBtn,
  emptyMediaPlayerBtn, systemVolumeBtn, ...
}
// 示例：更新按钮文字与图标状态（messages.js L6672）
Objs.btnJson.sleepModeBtn
  .html(languageArr[7][155] + " : " + (on ? languageArr[7][120] : languageArr[7][119]))
  .prev().attr("class", "functionBtnIcon mdi-sleep" + (on ? "" : "-off"));
```

## 面板 DOM 动态生成

面板（Holder）不是静态 HTML，由 `Mod.template(编号, ...)` 生成并挂到 `#panelHolder`，切换时用 `panelAnimate(编号)` 做动画：

```js
// 打开面板（messages.js L14436 functionBtnDo）
Probe.init.demandHolder || Init.fullPanel(510);   // 按需构建
panelAnimate(510, 1);                             // 动画显示
```

相关：见[面板系统](md/features/panels.md)、[前端函数调用速查](md/functions.md)。
