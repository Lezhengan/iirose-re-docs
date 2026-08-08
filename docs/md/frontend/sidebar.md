# 侧边栏（functionHolder）

> 页面左侧可折叠的功能栏。DOM 静态定义在 `reference/src/messages.html`，点击回调统一走全局函数 `functionBtnDo(编号)`。
> 展开/收起、滚动位置记忆等由全局 `functionHolder`（jQuery）管理（messages.js L12147）。

## 容器结构

```
<div id="functionHolder">            ← 侧边栏根（275px 宽，默认隐藏，左边滑出）
└─ <div style="width:275px">
   ├─ 头部区（头像/昵称/心情）
   ├─ 分组① 版块
   ├─ 分组② 消费
   ├─ 分组③ 工具
   ├─ 分组④ 功能
   ├─ 分组⑤ 系统
   ├─ 分组⑥ 其他（音量/开关/选择器）
   └─ 分组⑦ 盒子（扩展：订阅/联系人/私聊）
```
- 遮罩层：`#functionHolderDarker`（点击关闭）
- 分组标题：`.functionButtonGroup`，点击 `functionBtnDo('*', this)` 展开/收起子项（`.functionItemBox`）

## 子元素类型速查

> 下表为 `messages.html` 中侧边栏各 id 的**真实标签与元素类型**（HTML 属性名大小写不敏感，源码部分写成 `Id=`，等价 `id=`）。
> 高度自定义时可直接用 jQuery 选取这些元素读写。

| id | 标签 | class / 关键属性 | 推断类型与用途 |
|---|---|---|---|
| `#functionHolder` | `div` | `position:absolute;left:-275px;display:none` | 侧边栏**根容器**（滑出动画，隐藏时在屏幕左侧外） |
| `#functionHolderDarker` | `div` | `z-index:90000`，`rgba(0,0,0,0.5)`，`onclick` 内联关闭 | **全屏遮罩层**（点击关闭侧边栏，带淡出动画） |
| `#functionHolderImg` | `div` | `class="fullBox"`，JS `prepend(Mod.img())`（L12150） | **背景图容器**（div，内部放 `<img>`，可替换壁纸） |
| `#functionHolderInfoIcon` | `div` | 50×50 圆形头像框（CSS），JS `prepend(Mod.img())`（L12151） | **头像图标容器**（div + 内部 `<img>`） |
| `#functionHolderInfoName` | `div` | `class="textOverflowEllipsis"`；CSS 白色粗体+黑描边；JS `innerHTML = window.myself2`（L23518） | **昵称文本 div**（单行省略，显示我的名字） |
| `#moodShower` | `div` | `class="textOverflowEllipsis"`；CSS 右上角 12px 白字 | **心情文本 div**（实时更新） |
| `#userREBtn` | `span` | `class="functionBtnFont"` | **按钮文字 span**（"账号设置"，文字动态生成） |
| `#demandAgent` | `input` | `placeholder="媒体点播"`，`maxlength=2000`，Enter → `functionBtnDo(0)+demandFunc(值)` | **媒体点播输入框**（侧边栏唯一的 input） |
| `#functionHolderDvider` | `div` | `class="divider"`，`height:1px` | **分割线**（div） |
| `#timeHolder` | `span` | `class="functionBtnFont"` | **时钟 span**（显示当前时间） |
| `#functionHolderExtBox` | `div` | `class="functionItemBox"`，默认 `display:none` | **扩展盒子容器**（订阅/联系人/私聊的父级） |
| `#extSubscribeHolder` | `div` | `class="functionItemBox"`，默认隐藏 | **订阅的房间列表盒**（侧边栏"盒子"tab 之一） |
| `#extContactsHolder` | `div` | `class="functionItemBox"`，默认隐藏 | **联系人列表盒** |
| `#extPmHolder` | `div` | `class="functionItemBox"` + `box-shadow` 卡片效果 | **私聊会话盒**（弹层式） |

相关按钮通用元素（`.functionButton` / `.functionBtnIcon` / `.functionBtnFont`）：

| class | 标签 | 说明 |
|---|---|---|
| `.functionButton` | `div` | 按钮行，`onclick="functionBtnDo(编号, this)"`（传入 `this` 做高亮/收起） |
| `.functionBtnIcon` | `span` | 图标（`font-family:md`，Material Design Icons，如 `mdi-fire`） |
| `.functionBtnFont` | `span` | 按钮文字（14px，`white-space:pre`） |
| `.functionBtnGroupIcon` | `span` | 分组标题的展开/收起箭头图标 |
| `.functionItemBox` | `div` | 分组子项容器（折叠内容，默认 `display:none`） |
| `.divider` | `div` | 分割线（1px，`#functionHolderDvider` 使用） |
| `.fullBox` | `div`/`video` | 撑满父容器（背景图用 div、背景视频用 video） |
| `.textOverflowEllipsis` | `div` | 单行文本省略 |

```js
// 自定义示例：改昵称显示 + 换侧边栏背景
functionHolderInfoName.innerText = "我的新昵称";
$("#functionHolderImg img").attr("src", "https://.../bg.jpg");
// 点播：输入框赋值并触发
demandAgent.value = "歌名";
demandFunc(demandAgent.value);
```

## 头部区

| DOM id | 内容 | 行为 |
|---|---|---|
| `#functionHolderImg` | 背景图 | 按用户设置替换 |
| `#functionHolderInfoIcon` | 头像图标 | 点击 → `functionBtnDo(0)` + `getProfile([...])` 打开自己资料 |
| `#functionHolderInfoName` | 昵称 | 同上 |
| `#moodShower` | 心情文本 | 实时更新 |

## 分组按钮速查

> 各按钮点击后的**实际内部行为**（源码逐编号解析）见[按钮内部行为](sidebar-actions.md)。

所有按钮格式：`functionButton` 含 `functionBtnIcon`（Material Design Icons 类）+ `functionBtnFont`（按钮名）。

### 版块

| 按钮名 | `functionBtnDo` | 图标 class | 面板 |
|---|---|---|---|
| 歌单 | `1` | `mdi-music-box-multiple` | 媒体歌单 |
| 信箱 | `2` | `mdi-mailbox` | 离线留言 `leaveMsgHolder` |
| 论坛 | `22` | `mdi-forum` | 用户主页/论坛 `postHolder` |
| 贴吧 | `3` | `mdi-message` | 论坛 `forumHolder` |
| 任务板 | `4` | `mdi-clipboard-check-multiple` | 任务 `taskHolder` |
| 朋友圈 | `5` | `mdi-camera-iris` | 动态 `timelineHolder` |
| 搜索 | `6` | `mdi-account-search` | 用户搜索 `userSearchHolder` |
| 排行榜 | `7` | `mdi-podium` | 财富榜 `wealthHolder` |
| 房间推荐 | `101` | `mdi-fire` | 热推房间 `roomSplashHolder` |

### 消费

| 按钮名 | `functionBtnDo` | 图标 class | 面板 |
|---|---|---|---|
| 商城 | `8` | `mdi-shopping` | 商城 `mallHolder` |
| 银行 | `110` | `mdi-bank` | 银行 `bankHolder` |
| 炒股 | `9` | `mdi-chart-areaspline` | 股票 `stockOldHolder` |
| 商店 | `10` | `mdi-store` | 商店 `shopHolder` |
| 活动 | `11` | `mdi-briefcase` | 赚钱/活动 `makeMoneyHolder` |
| 三方 | `111` | `mdi-wallet-giftcard` | 伴侣/三方 `partner` |
| （加密币） | `112` | `mdi-bitcoin` | 加密币行情（`display:none` 隐藏） |
| （股票） | `113` | `mdi-chart-box` | 股票行情（隐藏） |
| （中华币） | `114` | `mdi-chart-line` | 中华币行情（隐藏） |

### 工具

| 按钮名 | `functionBtnDo` | 图标 class | 面板 |
|---|---|---|---|
| 便签 | `12` | `mdi-microsoft-onenote` | 便签 `noteHolder` |
| 骰子 | `13` | `mdi-dice-5` | 骰子选择器 |
| 配对 | `14` | `mdi-gender-male-female` | 配对 `pairHolder` |
| 链接 | `15` | `mdi-link` | 发链接/心情面板 |
| 艾特 | `16` | `mdi-at` | @ 面板 |
| 符号 | `17` | `mdi-symbol` | 符号 `symbolsHolder` |
| 翻译机 | `18` | `mdi-google-translate` | 翻译 `translateHolder` |
| 浏览器 | `19` | `mdi-web` | 内置浏览器 `browserHolder` |
| 游戏机 | `20` | `mdi-nintendo-switch` | 游戏模拟器 `gameEmulatorHolder` |
| 终端 | `21` | `mdi-powershell` | 外壳/皮肤 `shellHolder` |

### 功能

| 按钮名 | `functionBtnDo` | 图标 class | 面板 |
|---|---|---|---|
| 声音 | `50` | `mdi-music-note` | 声音设置 `buzzHolder` |
| 状态 | `51` | `mdi-human` | 个人状态 `statusHolder` |
| 签名 | `52` | `mdi-grease-pencil` | 改签名/心情 `moodHolder` |
| 广播 | `53` | `mdi-podcast` | 弹幕发送 `danmakuSendHolder` |
| 绘画 | `54` | `mdi-draw` | 绘画 `paintHolder` |
| 通话 | `55` | `mdi-phone-in-talk` | 通话 `callHolder` |
| 房间 | `56` | `mdi-earth` | 地图/房间列表 |
| 上传 | `57` | `mdi-upload` | 上传图片 `uploadHolder` |

### 系统

| 按钮名 | `functionBtnDo` | 图标 class | 面板 |
|---|---|---|---|
| 角色扮演 | `85` | `mdi-drama-masks` | 角色设置 `roleSetHolder` |
| 调色盘 | `80` | `mdi-palette` | 调色板 `paletteHolder` |
| 账号设置 | `81` | 动态 | 账号设置 `userREHolder`（按钮文字存 `#userREBtn`，动态生成） |
| 设置 | `82` | `mdi-cog` | 系统设置 `setupHolder` |
| 关于 | `83` | `mdi-information-outline` | 关于 `aboutHolder` |
| 登出 | `84` | `mdi-logout` | 退出登录 |
| 重载 | `87` | `mdi-reload` | 刷新页面 |
| 菜单 | `86` | `mdi-menu` | 系统菜单 |

### 其他（特殊项 + 开关）

| 项 | DOM id | 行为 |
|---|---|---|
| 媒体点播输入框 | `#demandAgent` | 回车 → `demandFunc(值)`，可点播媒体 |
| 音量 | `#functionBtnVolume` / `#volumeMuteBtn` / `#volumeBox` / `#volumeprogress` / `#volumequantity` / `#volumecontrol` | 静音/拖动条控制音量 |
| 空媒体播放器 | `#emptyMediaPlayerBtn` | `functionBtnDo(90)` 开关（睡眠时禁用） |
| 壁纸加载 | `#wallpaperLoadingBtn` | `functionBtnDo(93)` 开关 |
| 睡眠模式 | `#sleepModeBtn` | `functionBtnDo(91)` 开关 |
| 壁纸视频 | `#wallpaperVideoSwitchBtn` | `functionBtnDo(99)` 开关 |
| 背景移动 | `#bgMoveBtn` | `functionBtnDo(121)` 开关 |
| 歌词 | `#lyricBtn` | `functionBtnDo(122)` 开关 |
| 系统音量 | `#systemVolumeBtn` | `functionBtnDo(94)` 弹出选择器 `selectArr0_10` |
| 壁纸模糊 | `#wallpaperBlurBtn` | `functionBtnDo(97)` 选择器 `selectArr0_10` |
| 背景亮度 | `#bgBrightnessBtn` | `functionBtnDo(123)` 选择器 `5_0` |
| 广播模式 | `#danmakuModeBtn` | `functionBtnDo(98)` 选择器 `danmakuSelectArr` |
| 基础背景 | `#baseWallpaperBtn` | `functionBtnDo(120)` 选择器 `baseWallpaperSelectArr` |
| 剪贴板解析 | — | `functionBtnDo(95)` |
| 自定义功能菜单 | — | `functionBtnDo(96)` → `Utils.service.functionMenu()`（内含"上线位置"等） |
| 时间显示 | `#timeHolder` | 只读时钟 |

### 盒子（扩展区 `#functionHolderExtBox`）

| DOM id | 内容 |
|---|---|
| `#extSubscribeHolder` | 订阅的房间 |
| `#extContactsHolder` | 联系人 |
| `#extPmHolder` | 私聊会话 |

## 相关源码

- `functionHolder` / `functionHolderBox` 等全局引用：messages.js L12147-12152
- 面板开关逻辑：`functionBtnDo(e)` messages.js L14436（完整编号表见[前端函数调用速查](../functions.md)）
- 折叠分组：`functionBtnDo('*', this)`（L14439）

## 图标（mdi 字体）来源

侧边栏每个按钮的图标都是 **Material Design Icons（mdi）字体图标**，调用链如下：

1. **HTML 静态 class**：按钮图标写在 `messages.html`（登录后加载），共 **68 个** `functionBtnIcon mdi-*`：

```html
<div class="functionButton" onclick="functionBtnDo(1,this);">
  <span class="functionBtnIcon mdi-music-box-multiple"></span>
  <span class="functionBtnFont">歌单</span>
</div>
```

2. **字体 CSS 动态加载**：登录后 messages.js L2067 注入：

```js
Utils.getStyle(static + "lib/css/app/server/materialdesigniconsV7_4_47.css");
```

即 **mdi 7.4.47** 版（`@font-face` 定义 `font-family:md`，`.mdi-*::before` 渲染码点）。图标名 = class 名（`mdi-mailbox`、`mdi-forum`、`mdi-fire`…）。

3. **CSS 覆盖自定义**：改 class 即可换图标，例如：

```css
/* 把"歌单"按钮图标换成另一个 mdi 图标（需先查该图标的 content 码点） */
.functionButton[onclick="functionBtnDo(1,this);"] .functionBtnIcon { font-family: md; }
```

> 全量图标名清单见 [DOM 完整索引](dom-index.md) 的 mdi-* 图标全集。

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
