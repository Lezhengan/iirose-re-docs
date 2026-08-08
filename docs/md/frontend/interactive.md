# 可交互 DOM 全解

> 「用户可以操作到的 DOM」完整清单：所有能**点击**、**输入**、**拖动**、**拖放文件**的元素，以及每个元素的自定义 JS 操作方式。
> 本文是[操作 DOM / JS 自定义](operations.md)的**完整索引**；operations.md 只列了核心 8 项，这里按类别给全。
> 逆向依据：`messages.html` 内联事件 + `reference/src/messages.js` 事件绑定。

## 一、输入类（键盘 / 文本）

| DOM | 标签 | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|---|
| `#moveinput`（全局 `moveinput`） | textarea | 聊天输入，**回车发送**（`keydown → Utils.service.inputSend`） | `.val()` 取值；赋值后 `Utils.service.moveinputDo(val)` 发送 | L14125 |
| `#moveinputSendBtnSend` | div.mdi-send-outline | 点击发送（有内容才发） | `.click()` | messages.html |
| `#moveinputSendBtnFunc` | div.mdi-arrange-send-backward | 功能发送（切换模式） | `.click()` | messages.html |
| `#homeHolderMsgContentInputBox` | textarea | 首页频道消息输入：Enter → L33503，**房间tab** `moveinputDo(值)`、**广播等tab** `moveinputDo("~ "+值)`（弹幕）、私信tab 不发 | 赋值后 `Utils.service.moveinputDo(val)`；双框劫持见 [operations.md 方案①](../frontend/operations.md) | L33503 |
| `#demandAgent` | input | 侧边栏点播框，**回车点播** `demandFunc(值)` | 赋值后 `demandFunc(val)` | L16580 / messages.html |
| 各面板动态输入 | input/textarea | 充值金额、搜索框、便签、限制数值等（随面板动态生成） | `$("#panelHolder").find("input").val(x)` | — |

## 二、媒体控制

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `#videoPlayer`（`videoPlayer`） | 共享视频播放器 | `videoPlayer[0].play()/pause()`、`.currentTime`、`.src` | messages.html |
| `#radioPlayer`（`radioPlayer`） | 电台播放器（结束自动下一首） | 同上 | messages.html |
| `#videoPlayerCloseHandle` | 点击关闭视频播放 | `.click()` | messages.html |
| `#myvideoholder` | 我的摄像头浮层，点击唤起摄像头 | `videopointer.click()` | messages.html |
| `#audioShowHolder` / `#audioShow` | 浮层音频（点开关/暂停） | `muteFunc(audioShow,1,...)` | messages.html |
| `#videoShowHolder` / `#videoShow` | 浮层视频（同上） | 同上 | messages.html |
| `#albumShow` | 相册大图，右键弹出菜单 `Utils.AppUtils.menu('1_0_',src)` | `$('#albumShow').attr('src', url)` | messages.html |
| `#previewsound` | 预览音效（试听） | 改 `src` 播放 | messages.html |
| `#textToSpeechPlayer` | TTS 语音播报 | 改 `src` 播放 | messages.html |
| `#phoneForwardPlayer` / `#phoneIncomingPlayer` | 通话铃声（出错回退默认铃声） | 改 `src` | messages.html |

## 三、音量

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `#volumecontrol` | 音量滑块（拖动 → `127 * volume` 定位，存 Cookie `volumecontrol`） | 设置 `.style.left = 127*vol + 'px'` | L15332-15355 |
| `#volumeprogress` | 音量进度条 | 改 `backgroundColor` | 同上 |
| `#volumequantity` | 音量填充量 | 改 `.style.width` | 同上 |
| `#functionBtnVolume` / `#volumeMuteBtn` | 音量开关 / 静音按钮 | `.click()` | L2023 |
| `#systemVolumeBtn` | 系统音量开关 | `.click()` | — |

## 四、弹层 / 遮罩

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `#functionHolderDarker` | 侧边栏全屏遮罩，**点击关闭侧边栏**（含音效） | 模拟关闭：`.click()` | messages.html |
| `#selectHolderBox` | 选择菜单容器（点击自身阻止冒泡，保持菜单） | `$('#selectHolderBox').html(...)` 可塞自定义菜单 | messages.html |
| `#faceHolder` + `.faceButton` | 表情面板（`.faceButton` 点击打开表情） | `Utils.service.emoji()` 打开 | messages.html |
| `.faceHolderPageItem mdi-close` | 表情面板关闭 | `panelAnimate(3,0,null,1)` | messages.html |
| `#initshowBox` | 初始化加载屏 | — | L12075 |

## 五、侧边栏 / 身份区

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `.functionButton` ×70 | 侧边栏全部按钮，`onclick=functionBtnDo(编号)` | `functionBtnDo(编号)`（表见[侧边栏](sidebar.md)） | messages.html |
| `.functionHolderInfo`（含 `#functionHolderInfoIcon` / `#functionHolderInfoName`） | 点头像/昵称 → `functionBtnDo(0)+getProfile(...)` **打开自己的名片** | `getProfile([myself2,namecolor,avatar,sex,uid])` | messages.html |
| `#moodShower` | 心情文本 | 直接改 `.textContent` | — |
| `#userREBtn` | "账号设置"按钮文字 | 改文字（CSS 定制用） | — |
| `#functionHolderImg` | 侧边栏背景图容器 | `$('#functionHolderImg').prepend(Mod.img())` 换背景 | — |
| `#demandAgent` | 见输入类 | — | — |
| `.whoisTouch` | 名片头部按钮（打开资料卡） | `whois(name/uid)` | — |

## 六、拖拽 / 拖放

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `#bodyDragBox` | **文件拖放层**（拖文件到窗口提示） | `dragFunc(0,$("#bodyDragBox"))` | L36210 |
| 面板标题栏 | 面板拖动（`Utils.Drag` 绑定，`sp-choose` 等也用它） | 改 `position` 即可 | L3303 / L9040 |
| `.sp-choose` | 日期选择器开关 | `$('.sp-choose').click()` | L3303 |

## 七、其它

| DOM | 交互行为 | 自定义操作 | 源码 |
|---|---|---|---|
| `#downloadFile` | 下载中转（`<a>`） | 改 `href` 触发下载 | — |
| `#contentCopyHolder` | 复制中转 | `document.execCommand('copy')` | — |
| `#alertHolder` | 消息通知容器（自动消失） | `_alert(...)` 入队 | L1712 |

## 八、表情 / 图包面板（`#faceHolder`）

「图包」= 表情面板（`Utils.service.emoji()` 打开）的**第 4 个分类**（p=4，"我的图包"），是**用户自定义表情收藏**。DOM 结构与源码（reference/src/messages.js L32589-32890，`Init.faceHolder`）：

```
#faceHolder（整个表情面板，display 控制显隐）
├─ div:first（分类 tab 条：最近/颜文字/表情/贴图/图包…）
│  └─ span[eq]（分类 tab，eq=0~6，点击调 Init.faceHolderBuild / panelAnimate(18)）
├─ div:next（内容区，动态 append）
│  └─ .emojiContentBox[index="4"]（图包分类的盒子）
│     ├─ .emojiContent（内容滚动区）
│     │  └─ .faceHolderBox[p="包id"]（每个图包一格）
│     │     ├─ .faceHolderBoxChildItem[c="图片链接"]（单个表情）
│     │     │  └─ .faceHolderBoxChildItemC > .emojiImg img
│     │     └─ .faceHolderBoxChildItem[带 mdi-* 图标]（p=0 我的图包专属按钮）
│     └─ .emojiPage（图包页码条）
│        └─ .faceHolderPageItem[p="包id"] > .emojiPageImg img（图包封面缩略图）
```

**"我的图包"（p=0）专属按钮**（L32782，点表情后 `panelAnimate(18,...)` 展开）：

| 按钮图标 | 功能 |
|---|---|
| `.mdi-cog` | 进入管理模式（拖拽排序，`Utils.Drag.sortable`） |
| `.mdi-plus` | 从输入框图片加入图包 |
| `.mdi-upload` | 上传本地图片（`btnUpload`） |
| `.mdi-camera` | 拍照添加 |
| `.mdi-magnify` | 搜索表情（`btnSearch`） |

**核心对象与函数**（全部源码核实）：

- `Objs.faceHolder.faceHolderBoxChildPArr4` — 图包页集合（jQuery）
- `Objs.faceHolder.emojiExtArr` — 服务端返回的图包 id 列表
- `Objs.faceHolder.btnUpload` / `.btnSearch` — 上传/搜索按钮
- `faceHolderP2[4]` — 当前选中的图包页；`faceHolderP3[4]` — 各页滚动位置
- `Utils.service.addToEmoji(图片链接)`（L4361）— **把一个图片加入我的图包**（自动切到图包分类）
- `Utils.emojiManager(包id, true/false)`（L32751）— 添加/移除图包
- `socket.send(")~版本号")`（L32617）— 请求我的图包列表（`myEmojiVer`/`myEmoji` 存 localStorage）
- 图包数据接口：`lib/system/data/shop/emoji/index`（列表）、`lib/system/data/shop/emoji/data/{包id}`（每包表情）

```js
// 示例：把当前输入框里的图片链接加入图包
Utils.service.addToEmoji("https://example.com/a.png");

// 示例：模拟点击某图包页
Objs.faceHolder.faceHolderBoxChildPArr4.eq(1).click();

// 示例：JS 直接插入一张图包表情到输入框（图包数据结构 [链接, 兜底图]）
// 参考 L32743：图包表情实际请求 static + "lib/assets/emoji/包id/文件名"
```

## 九、常用操作速记

```js
// 关闭侧边栏
document.getElementById('functionHolderDarker').click()

// 打开表情面板
Utils.service.emoji()

// 打开自己的名片
getProfile([myself2, namecolor, avatarconv(avatar2), sex, uid])

// 播放/暂停共享视频
videoPlayer[0].pause(); videoPlayer[0].currentTime = 120

// 音量 50%（0~1）
var v = 0.5;
volumecontrol.style.left = (127 * v) + 'px';
volumequantity.style.width = (127 * v) + 'px';
Cookie('volumecontrol', v);   // 同步持久化

// 点播一首歌
demandFunc("歌名")
```

## 免责声明

> 本页元素均为 IIROSE 官方前端自带的**交互控件**，正常点击/输入不违反规则。
> 通过脚本模拟点击、自动输入、拖放注入等**自动化操作**可能不被平台允许，请用于学习与研究，遵守房规与平台条款，由此产生的一切后果由使用者自行承担。
