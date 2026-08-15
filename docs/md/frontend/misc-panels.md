# 其他面板（结缘/角色/私聊/首页/会话/表情）

本文档逆向 6 个非游戏面板：`pairHolder`（配对/结缘）、`roleSetHolder`（角色设置）、`pmHelper`（私聊辅助）、`homeHolder`（首页）、`sessionHolder`（会话管理）、`emojiSearchHolder`（表情搜索）。

---

## 1. pairHolder —— 配对/结缘（movePanel 2）

「配对」面板（官方名称「配对」，标题 `languageArr[24][17]`，简体 L11149 / 繁体「配對」L10804）用来寻找 CP 搭档：选择性别偏好与未注册用户限制后连线，匹配成功自动打开私聊。

### 入口

```
输入框快捷命令 @*（L2859-2860）
  → Probe.init.pairHolder || Init.movePanel(2)
  → panelAnimate(28, 1)
侧边栏按钮「配对」(functionBtnDo(14))
```

> ⚠️ 注意：任务里常说的 `@;` 其实**不是**配对——`@;` 走 `Utils.service.partner()`（L2877-2878），它只是弹一个菜单、点「0」后 `window.open("https://shop.imoe.xyz")`（L4561-4564）。配对的快捷命令是 `@*`。

### DOM 结构（L18208-18211）

```
#pairHolder（320 × 568.89px）
├── div:eq(0) 标题栏
├── div:eq(1) 内容区 content
│   ├── contentItemBgimg（160px 背景图 pair.jpg）
│   └── div（328.88px）
│       ├── boxArr[0]（page 0，选择页）
│       │   ├── selectArr[0] 性别偏好下拉（n=0，v=第一选项值）
│       │   └── selectArr[1] 未注册用户限制下拉（n=1）
│       └── boxArr[1]（page 1，配对中，loading 动画 + 「正在为您配对 . . .」）
└── div:eq(2) 底部按钮
    ├── button:first 停止（stopBtn，onclick=event(1,1)，初始隐藏）
    └── button:last  连线（onclick=event(0,1)）
```

### 选择项（`languageArr[17]`，简体 L11120）

| select | 值 | 选项 |
|---|---|---|
| 0（性别偏好） | `x` | 请选择配对性别 |
| 0 | `0` | 不限制 |
| 0 | `1` | 仅男性 |
| 0 | `2` | 仅女性 |
| 0 | `3` | 仅未知性别 |
| 0 | `4` | 不配对男性 |
| 0 | `5` | 不配对女性 |
| 0 | `6` | 不配对未知性别 |
| 1（未注册用户限制） | `x` | 未注册用户限制 |
| 1 | `0` | 不限制 |
| 1 | `1` | 仅注册用户 |
| 1 | `2` | 仅未注册用户 |

- 其余文案：`[12]`=停止、`[13]`=正在为您配对…、`[14]`=请勿重复配对、`[15]`=请选择配对性别、`[16]`=请选择未注册用户限制、`[17]`=连线。

### 命令（socket.send）

| 命令 | 含义 | 位置 |
|---|---|---|
| `` ` `` + `i` + `o`（如 `` `00 ``） | 开始配对；`i`=性别偏好(0-6)，`o`=未注册限制(0-2) | L18220 |
| `` `- `` | 停止配对 | L18225 |
| `` `! `` + `uid` | 收到配对请求但本地无该用户资料时，回复索取/确认 | L13627 |

### 接收端处理（`case "*"`，L13625-13628）

| 服务端报文 | 含义 | 客户端行为 |
|---|---|---|
| `*@` | 请勿重复配对 | 触发停止按钮 + `_alert(languageArr[17][14])` |
| `*!` + 数据 | 配对成功 | `event(2, privateMsgFunc(...))` 打开私聊 |
| `*` + `uid` | 匹配/请求 | 触发停止按钮；本地能找到该用户则 `event(2, buildPm(...))` 标记并开私聊，否则回 `` `! `` + uid |

`event(2)`（L18227-18228）会给对方私聊条目标记 `mdi-gender-male-female` 图标（`pmFull` 时加在会话 tab 上，否则加在私聊窗头部）。

### 持久化

`Utils.settings("pair", i + o)`（L18231-18235），存两个下拉的值（如 `"00"`），初始默认 `"xx"`（L18189）。

---

## 2. roleSetHolder —— 角色设置（fullPanel 10）

「角色扮演」设置面板，标题 `languageArr[1][8]` = 「角色扮演」（简体 L11003 / 繁体 L10658）。用于设置角色扮演房间里的**角色名字 / 性别 / 立绘图片**。

### 入口

```
输入框快捷命令 @(（L2861-2862）
  → Probe.init.roleSetHolder || Init.fullPanel(10)
  → panelAnimate(41, 1)
侧边栏按钮「角色扮演」(functionBtnDo(85))
```

### DOM 结构（L22466-22527）

```
#roleSetHolder（fullPanel 全屏面板）
├── roleSetBox（主视图）
│   ├── 标题栏（键盘返回按钮 + 铅笔编辑按钮）
│   └── content
│       ├── roleImg（当前立绘 <img>）
│       └── div.fullBox（遮罩）
├── roleEditBox（编辑表单，默认隐藏）
│   ├── 角色名字输入框（roleEditBoxNameInput，maxlength 100）
│   ├── 性别下拉（roleEditBoxSexSelect：未知/男/女）
│   ├── 角色图片上传（roleEditBoxRole_linkInput，uploadHelper）
│   └── 底部按钮：返回 / 角色库 / 保存
└── roleDatabaseBox（角色库，默认隐藏，$.get("lib/system/data/role") 填充）
```

### 性别选项（`Assets.roleSetSelectJSON`，L22482-22488）

| 值 | 文案 |
|---|---|
| `0` | 未知（`languageArr[18][3]`，L11121） |
| `1` | 男（`languageArr[8][0]`） |
| `2` | 女（`languageArr[8][1]`） |

角色库（L22494）：`$.get("lib/system/data/role")` 返回按 `\n` 分隔的角色行，每行 `图片路径'未知字段`，点击把图片和性别回填到编辑表单（`event(2)`）。

### 命令 / 报文

| 方向 | 报文 | 说明 | 位置 |
|---|---|---|---|
| 发送 | `}` + `JSON.stringify({s: 性别, i: 图片路径, n: 名字})` | 仅 `rolePlayRoom` 时发送（角色扮演房间） | L22510-22514 |
| 接收 | `s>` + `性别` + `>` + `图片` + `>` + `名字` | 服务端推送角色同步，写回 Cookie | L13636-13637 |

> 非角色扮演房间时，`event(3)` 只写本地 Cookie，不发 socket（L22506-22510 的条件 `rolePlayRoom`）。

### 持久化

`Cookie("rolePlayName")` / `Cookie("rolePlaySex")` / `Cookie("rolePlayImg")`（L22506-22513）；`Variable.rolePlay` 初始从 Cookie 读取（L22521-22524）。

---

## 3. pmHelper —— 私聊辅助（全局对象）

`pmHelper` 是顶部工具栏（`Objs.repertory.topBar`）里的一个**横条**，按未读私信为每个会话生成一个头像胶囊（带头像 + 未读数徽章），点击跳转会话。定义于 `Init.pmHelper()`（L33775-33842），由 `Init.pm` 调用（L33745）。

### DOM

```
Objs.repertory.topBar
└── .pmHelper（默认 display:none，translateY(-100%) 滑入）
    └── div（padding:1px，横向滚动）
        └── .pmHelperItem（每个会话一个，ip=会话id）
            ├── 头像 img
            ├── 匿名遮罩（* 开头 ip 显示 mdi-guy-fawkes-mask）
            ├── .pmHelperItemStatus（在线状态点）
            └── .pmHelperItemCounter（未读计数徽章）
```

### Variable / function

`Variable = { counter: {}, objs: {}, isHidden: 1 }`。

`function.manage(e, t, i)`（L33806-33840）：

| e | 行为 | 调用场景 |
|---|---|---|
| `0` | 新增会话头像胶囊 | 收到私信（L6585 附近） |
| `1` | 移除胶囊（动画收起） | 会话被关闭 / 未读清零 |
| `2` | 更新未读数 + 置顶到最左 | 切换会话 |
| `3` | 更新在线状态点颜色 | 用户上下线（L33772） |
| `4` | 更新头像底色（`darkOrLight` 决定文字黑白） | 颜色变化（L6585） |
| `5` | 更新头像图片 | 头像变化 |
| `6` | 批量重建全部未读胶囊 | 初始化未读私信（L16731） |

`tagClick(e)`（L33787-33789）：点胶囊 → 对应会话的 `userTag.click()` 跳转。

---

## 4. homeHolder —— 首页/主页（全局对象）

`homeHolder` 是**主界面右侧的消息面板**（`#homeHolder`，`$("#homeHolder")`，L12127），带 6 个 tab（主页 / 公屏 / 私信 / 广播 / 信箱 / 系统）和一个消息输入框。定义于 `Init.homeHolder()`（L33324-33553），在启动流程 `Init.homeHolder()`（L16661）中初始化。

### tab 布局与 NOTIFY 映射

`Variable.currentP` 是当前 tab 编号（0-5）。`msgContentBoxPageArr` 是 6 个消息页容器（tab 2 私信用 `{xxx}` 子结构）。

| tab | 名称 | 空态图标 | NOTIFY 常量 | push 里的 i |
|---|---|---|---|---|
| 0 | 主页（我的空间，占位 "I'm Coming Soon"） | — | — | — |
| 1 | 公屏 | forum | `NOTIFY.PUBCHAT`(1) | 1 |
| 2 | 私信 | message | `NOTIFY.PRICHAT`(2) | 2 |
| 3 | 广播 | podcast | `NOTIFY.DUM`(4) | 3 |
| 4 | 信箱 | email | `NOTIFY.MAIL`(3) | 4 |
| 5 | 系统 | bell-ring | `NOTIFY.SYS`(5) | 5 |

> 注意 `NOTIFY` 常量值（L9655-9663）与 tab 编号**不是一一对应**：`DUM=4`→tab 3（广播）、`MAIL=3`→tab 4（信箱）。push 里的映射见 L33352-33367。

### 核心方法

- `push(e, t)`（L33350-33371）：把 `[e, t]` 消息加入对应 `Assets.data[i]` 队列，并给未读徽章 +1。
- `commit(i)`（L33372-33385）：把队列批量渲染成 HTML 追加到对应消息页，处理懒加载图片与滚动。
- `mod(e, t, ...)`（L33404-33442）：单条消息 HTML 模板（`.homeHolderMsgBoxChild` 结构：头像/名字/性别/内容，带 `data-uid`、右键菜单等）。
- `template(0, t)`（L33443-33444）：公屏房间成员头像模板。
- `memberManage(e, t)`（L33446-33474）：公屏成员列表维护（0=新增、1=移除、2=置顶、3=状态、4=全量重建、5=增量刷新），与 `mapHolder` 的用户进出联动（L23273 / L23327 / L23582）。
- `scrollMsg` / `clearUnread` / `setEmptyShow` / `isInputBoxValid`（L33475-33484）。

### 消息输入框行为（L33496-33504）

输入框 `#homeHolderMsgContentInputBox`（`msgContentInputBox`）按当前 tab 分发：

| 当前 tab | 行为 |
|---|---|
| 1 公屏 | `Utils.service.moveinputDo(值)` 发公屏 |
| 3 广播 | `Utils.service.moveinputDo("~ " + 值)` 发广播 |
| 2 私信 | 不发送（需在会话窗口内发送） |
| 其余 | 输入框隐藏（`isInputBoxValid` 仅 1 / 2(私信已选) / 3 返回 true） |

### Variable

`init:[0,0,{0:0},0,0,0]`（各 tab 是否已初始化）、`input:[...,{...}]`（各 tab 输入草稿）、`unReadMsgNum`（未读数）、`pmNum` / `pmCurrentP`（私信会话）、`pubMemberObjs`（公屏成员 DOM 缓存）、`isMediaCoverShow`。

---

## 5. sessionHolder —— 会话管理（全局对象）

`sessionHolder` 是私聊模式的**最近会话列表容器**（`#sessionHolder`，L12132，仅 `pmFull` 模式存在）。定义于 `Init.sessionHolder()`（L33554-33563），由 `Init.pm`（L33688）初始化。

### DOM / 结构

```
#sessionHolder
└── .sessionHolderPmTaskBox（repertory.pmTaskBox，会话列表）
    ├── .sessionHolderPmTaskBoxItem（公屏 + 每个私聊对象一条）
    │   ├── 头像
    │   ├── .sessionHolderPmTaskBoxItemName（名字 + 性别）
    │   ├── .sessionHolderPmTaskBoxItemTime（时间）
    │   ├── msgBox（最后一条消息预览）
    │   └── counter（未读 @ 徽章）
    └── .sessionHolderEmptyHolder（"没有最近会话 . . ." 空态）
```

`function.addEmptyHolder()`（L33560-33562）追加空态占位。

### 会话数据结构

每个会话 `userTag` 上挂：`timeBox`、`msgBox`、`msgArr`（11 元组：`["", "", "", 0, "", "", "", 0, "", 0, ""]`，存最后一条消息与草稿）、`counter.msgNum`（未读数）。

公屏会话由 `initPubTag`（L33693-33700）创建；`Utils.service.pm.changer`（L33726-33729）负责切换会话（切换消息页/背景图/未读徽章/输入框占位与草稿）。

### 会话切换快捷键（`Utils.service.pm.switch`，L33730-33744）

| 键 | keyCode | 行为 |
|---|---|---|
| X | 88 | 切回上一个会话（`Temporary.chatPosBak`） |
| ← | 37 | 上一个会话 |
| → | 39 | 下一个会话 |
| ↑ | 38 | 跳回公屏 |
| ↓ | 40 | 最后一个会话 |

### 会话右键菜单（`Utils.service.pm.menu`，L33709-33725）

`Assets.select.pmSelectJSON` 菜单项：`1`=查看资料 / `p`=语音通话（需登录密码模式）/ `2`=关闭会话窗口。

---

## 6. emojiSearchHolder —— 表情搜索（fullPanel 511）

「表情搜索」面板，标题 `languageArr[36][12][0][0]` = 「表情搜索」（L11319）。搜索服务器图库表情，支持查看原图、加入图包、发送。

### 入口

- 由表情面板搜索触发：`Objs.faceHolder.function.event(8)`（L32700-32711）→ `Init.fullPanel(511)` + `panelAnimate(58, 1)`（首次打开会弹输入框 `Utils.sync` 输入关键词）。

### DOM 结构（L27498-27500）

```
#emojiSearchHolder（fullPanel 全屏面板）
├── 标题栏（返回按钮 + 搜索按钮 magnify）
└── content（滚动容器）
    ├── moreBtn（mdi-plus 加号，点击 event(4) 加载更多）
    └── 结果项（.whoisTouch2.shopItemColor，c=图片地址，onclick=event(2)）
        ├── img（表情缩略图，100×100）
        └── 勾选遮罩（已加入图包时显示 checkHtml）
```

### Variable / 搜索 API

`Variable = { page: 0, requested: 0, keyword: "", checkHtml: ... }`。

搜索请求（L32703-32709）：

```js
$.get(Urls.api + "lib/php/api/search_emoji.php", {
  k: 关键词,
  p: 翻页时 page + 1 : 1,
  l: isMobile ? 50 : 100
}, ...)
```

- 响应：`"*"` 开头表示还有下一页（去掉 `*` 后置 `t=1` 显示"加载更多"）；正文 `htmlspecialchars` 后按空格 `split(" ")` 得到图片地址数组（L32709）。
- `event(1)`（L27531-27535）渲染结果；`event(3)`=搜索、`event(4)`=加载更多（都转调 `faceHolder.function.event(8, 1|2)`，L27557-27559）。

### 结果项右键菜单（`event(2)`，L27537-27555）

`Assets.select`（L27509-27521）按"该图是否已在图包"分两组：

| 值 | 项 | 行为 |
|---|---|---|
| `0` | 查看（原图） | `showImg(c)` |
| `1` | 加入图包 | `faceHolder.function.event(6, c)` + 打勾 |
| `2` | 发送 | 切回原输入框、`faceHolder.function.event.call(e, 2)` 发送 |
| `3` | 加入图包 并 发送 | 先加入再发送，随后 `faceButton.click()` |
| `4` | 从图包中移除 | `Assets.myEmoji.splice(...)`（仅已加入时出现） |

---

## 关键源码位置汇总（messages.js）

| 位置 | 内容 |
|---|---|
| L2859-2862 / L2875-2876 | `@*` 配对、`@(` 角色设置、`@-` 游戏模拟器的输入框命令入口 |
| L2877-2878 / L4561-4564 | `@;` → `Utils.service.partner()`（打开外部链接，非配对） |
| L18187-18237 | pairHolder 构建 + function |
| L13625-13628 | pairHolder 接收端（`*@` / `*!` / `*uid`） |
| L22466-22527 | roleSetHolder 构建 + function |
| L13636-13637 | roleSetHolder 接收端（`s>sex>img>name`） |
| L33775-33842 | pmHelper 构建 + manage |
| L33324-33553 | homeHolder 构建 + function |
| L33496-33504 | homeHolder 输入框分发 |
| L33554-33563 | sessionHolder 构建 |
| L33688-33745 | pm 模式：pmTask / changer / switch / menu |
| L27498-27566 | emojiSearchHolder 构建 + function |
| L32700-32711 | emojiSearch 搜索请求（faceHolder.event(8)） |

---
> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
