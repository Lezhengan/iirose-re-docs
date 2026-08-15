# 社交功能面板

本文逆向 IIROSE 的六个社交类全屏面板：**论坛 `forumHolder`（3）**、**任务板 `taskHolder`（4）**、**朋友圈 `timelineHolder`（5）**、**信箱 `leaveMsgHolder`（9）**、**用户搜索 `userSearchHolder`（6）**、**用户主页/论坛浏览 `postHolder`（512）**。源码位置均为 `web_re/src/messages.js`。

> **面板标题说明**：以下「标题」均取自语言包 `languageArr[24]`（简体中文，L11149）真实值，与口语叫法略有出入——`forumHolder` 的标题是「**贴吧**」、`postHolder` 的标题是「**论坛**」、`timelineHolder` 是「**朋友圈**」、`taskHolder` 是「**任务板**」、`leaveMsgHolder` 是「**信箱**」、`userSearchHolder` 是「**搜索**」。

## 面板总览

| 面板 | 全屏编号 | 输入框入口 | 初始化发送 | `fullPanel` 定义 |
|---|---|---|---|---|
| 论坛 `forumHolder` | 3 | `@]`（L2836） | `:-` | L21932 |
| 任务板 `taskHolder` | 4 | `@%`（L2838） | `:+` | L21986 |
| 朋友圈 `timelineHolder` | 5 | `@&`（L2840） | `:=` | L22077 |
| 信箱 `leaveMsgHolder` | 9 | `@!`（L2858） | 本地 `localStorage` | L22263 |
| 搜索 `userSearchHolder` | 6 | `@#`（L2842） | 无（本地占位） | L22190 |
| 论坛/主页 `postHolder` | 512 | `@?`（L2848） | `function.enter()` | L27569 |

---

## 一、论坛 / 贴吧（forumHolder，面板 3）

### 1. 入口链路

```
输入框 `@]`（L2835-2836）
  → Probe.init.forumHolder || Init.fullPanel(3)
  → panelAnimate(34, 1)
  → 初始化时 function.init() 发送 socket.send(":-")    (L21978)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][3]`「贴吧」，图标 `forum`。底部两个按钮：返回（`panelAnimate(34)`）、发帖（`event(0)`，L21933）。

### 2. 面板结构（DOM）

```
#forumHolder
└── div.content (滚动区)                              ← This.children("div:eq(1)").children("div")
    └── .cardTag × N（帖子卡片，倒序 prepend）
```

帖子卡片模板（L21950 / 回复嵌入 L21948-21949）：

```
.cardTag
├── .cardTagBg.mdi-image-outline    (标签图片底 + .cardTagNew 未读高亮)
├── .cardTagI                       (左侧信息列)
│   ├── .cardTagAvatar              (头像，whoisTouch2 → getProfile)
│   ├── .cardTagName.textColor      (昵称)
│   ├── .cardTagSex                 (性别图标 mdi-gender-male/female)
│   ├── .cardTagTime                (时间)
│   └── .cardTagNumber              (#序号 + .cardTagReply 回复按钮)
├── .cardTagLine                    (分隔线)
└── .cardTagC
    ├── .cardTagCBox                (正文，pregmedia 解析)
    └── div[replyid]                (回复锚点，c=主题色)
```

### 3. 发送命令（socket.send）

| 命令 | 含义 | 行号 |
|---|---|---|
| `:-` | 打开/刷新帖子列表 | L21978 |
| `:-` + `JSON` | 发帖 / 回复 | L21967 |

发帖/回复报文（L21967-21970）：

```js
socket.send(":-" + JSON.stringify({
  t: inputcolorhex + e,     // 输入颜色 hex + 正文
  r: a,                     // 随机 id（"1" + 时间戳末5位 + 随机末7位）
  g: 回复目标的 13 位 uid    // 非回复时为 undefined
}))
```

### 4. 接收端处理与数据字段

推送分派（case `:`，L13403）：`:-` → `forumHolder.function.get(e.substr(2), 离线消息跳转的 replyid)`；另有 `@#`（L13620）→ `get(l[1], Number(l[0]))`（从离线消息跳转到指定回复）。

`get(e, t)`（L21938）解析：条目用 `<` 分隔，字段用 `>` 分隔：

| 下标 | 字段 |
|---|---|
| u[0] | 昵称 |
| u[1] | 头像 |
| u[2] | 性别（1 男 / 2 女） |
| u[3] | 颜色（前 6 位 = 主题色，`.substr(6)` = 名字色） |
| u[4] | 标签图片（徽章） |
| u[5] | 时间戳 |
| u[6] | 回复 id |
| u[7] | 主题色（`l`） |

- 回复嵌入格式：`[@` + 13 位 uid + `]`（L21945），渲染为嵌套在父帖 `.cardTagC` 内。

---

## 二、任务板（taskHolder，面板 4）

### 1. 入口链路

```
输入框 `@%`（L2837-2838）
  → Probe.init.taskHolder || Init.fullPanel(4)
  → panelAnimate(35, 1)
  → 初始化时 function.init() 发送 socket.send(":+")    (L22069)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][4]`「任务板」，图标 `clipboard-check-multiple`。底部按钮：返回、发布任务（`event(3)`，L21987）。

### 2. 面板结构（DOM）

任务卡片比论坛多出任务标题、赏金、接单/取消按钮：

```
.cardTag[fid]                     (自己的未完成任务带 fid 属性)
├── .cardTagBg.mdi-image-outline
│   ├── .cardTagMaskImg           (任务遮罩)
│   ├── .cardTagTitle             (任务标题，textOverflowEllipsis)
│   └── .cardTagNew
├── .cardTagI                     (同论坛：Avatar/Name/Sex/Time/Number)
├── .cardTagLineBox
│   └── .cardTagLine
└── .cardTagC
    ├── .cardTagCBox              (正文；顶部一行：赏金 + .taskOB 完成按钮 / .taskCB 取消按钮)
    │   ├── .cardTagTitleColor    (赏金/状态文本)
    │   ├── .taskOB               (「完成」按钮)
    │   └── .taskCB               (「取消」按钮)
    └── div[replyid]
```

### 3. 发送命令（socket.send）

| 命令 | 含义 | 行号 |
|---|---|---|
| `:+` | 打开/刷新任务列表 | L22069 |
| `:+` + `JSON` | 发布任务 | L22037 |
| `:+$` + `任务replyid` + `>` + `提交评论id` | 完成任务 | L22006 |
| `:+#` + `任务replyid` | 取消任务 | L22009 |

发布任务报文（L22037-22042）：

```js
socket.send(":+" + JSON.stringify({
  t: inputcolorhex + e,   // 输入颜色 hex + 正文
  r: n,                   // 随机 id
  m: 任务标题,            // 非回复时 = 任务标题
  c: 赏金,                // 非回复时 = 赏金
  g: 回复目标的 13 位 uid  // 非回复时为 undefined
}))
```

> 发布流程：`event(3)` → `event(1, [])`（输入标题）→ `event(2, l)`（输入赏金）→ `event(0, l)`（提交，L22050-22066）。

### 4. 接收端处理与数据字段

推送分派（case `:`，L13403）：`:+` → `taskHolder.function.get(e.substr(2), 离线消息跳转 id)`；另有 `@$`（L13620）→ `get(l[1], Number(l[0]))`。

`get(e, t)`（L21992）解析（条目 `<` 分隔、字段 `>` 分隔）：

| 下标 | 字段 |
|---|---|
| f[0] | 昵称 |
| f[1] | 头像 |
| f[2] | 性别 |
| f[3] | 颜色（`.substr(6)` = 名字色） |
| f[4] | 标签图片 |
| f[5] | 时间戳 |
| f[6] | 回复 id（`y`） |
| f[7] | 任务标题（`h`） |
| f[8] | 赏金（`b`） |
| f[9] | 状态（`g`，1=已完成 / 2=已取消） |
| f[10] | 主题色（`p`） |

- 回复嵌入 `[@...]`（L21999）；`<` 开头 + 带 `>` 的条目 = 任务状态变更通知（L22015，用于本地更新完成/取消标记）。

---

## 三、朋友圈 / 动态（timelineHolder，面板 5）

### 1. 入口链路

```
输入框 `@&`（L2839-2840）
  → Probe.init.timelineHolder || Init.fullPanel(5)
  → panelAnimate(36, 1, null, "")
  → 初始化时 function.init() 发送 socket.send(":=")    (L22182)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][5]`「朋友圈」，图标 `camera-iris`（进入用户主页时为 `text-box-multiple`，L22077）。底部按钮：返回、发布动态（`event(0)`）。

### 2. 面板结构（DOM）

朋友圈支持两个面板：`content`（自己的朋友圈）与 `content2`（他人的主页时间线，`This2`）。卡片按日期分组，中间插 `.boardLine` 日期线：

```
.cardTag[uid][date][time]         (uid = 动态作者，date = 日期，time = 时间戳)
├── .cardTagBg.mdi-image-outline
├── .cardTagI                     (Avatar/Name/Sex/Time/Number)
│   └── .cardTagNumber            (#序号 + .cardTagReply 删除/回复按钮)
├── .cardTagLineBox
│   └── .cardTagLine
└── .cardTagC
    ├── .cardTagCBox
    └── div[replyid]
```

### 3. 发送命令（socket.send）

| 命令 | 含义 | 行号 |
|---|---|---|
| `:=` | 打开/刷新动态 | L22182 |
| `:=` + `JSON` | 发布 / 回复动态 | L22160 |
| `:^` + `replyid` | 删除动态/评论 | L22102 |

发布/回复报文（L22160-22164）：

```js
socket.send(":=" + JSON.stringify({
  t: inputcolorhex + e,   // 输入颜色 hex + 正文
  r: r,                   // 随机 id
  g: 回复目标的 13 位 uid, // 非回复时为 undefined
  f: 动态作者的 uid        // 回复他人动态时 = 目标作者 uid（edit(4) 取得）
}))
```

### 4. 接收端处理与数据字段

推送分派（case `:`，L13403）：

| 推送 | 处理 |
|---|---|
| `:=` | `get(data, 离线消息跳转 id, 0, "")`（朋友圈主面板） |
| `:*` | `get(data, 0, 0, "2")`（用户主页时间线，content2） |
| `:%` | `edit(1, data)`（增量插入） |
| `:^` | `edit(3, data)`（删除） |
| `:!` | `edit(2, uid)`（删除某用户动态） |

另有 `@=`（L13620）→ `edit(5, l)`（从离线消息跳转）。`get(e, t, i, o, a)`（L22111）字段（`v = 条目.split(">")`）：

| 下标 | 字段 |
|---|---|
| v[0] | 昵称 |
| v[1] | 头像 |
| v[2] | 性别 |
| v[3] | 颜色（`.substr(6)` = 名字色） |
| v[4] | 标签图片 |
| v[5] | 时间戳 |
| v[6] | 回复 id |
| v[7] | 主题色 |
| v[8] | 动态作者 uid（写入卡片 `uid` 属性） |

---

## 四、信箱 / 离线消息（leaveMsgHolder，面板 9）

### 1. 入口链路

```
输入框 `@!`（L2857-2858）
  → Probe.init.leaveMsgHolder || Init.fullPanel(9)
  → 首次：Variable.probe 置 0 并 function.init()（读 localStorage）
  → panelAnimate(40, 1)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][1]`「信箱」，图标 `mailbox`，只有返回按钮。**离线消息完全存本地**（`localStorage["leaveMsg"]`），不走 socket 拉取历史。

### 2. 面板结构（DOM）

```
#leaveMsgHolder
└── div.content (滚动区)
    ├── .boardLine[line]          (「历史消息」分隔线)
    └── .cardTag × N
        ├── .cardTagBg / .cardTagI / .cardTagNumber
        ├── .cardTagLineBox > .cardTagLine
        └── .cardTagC(.cardTagSystemMsgColor 或行内色)
            ├── .cardTagLineLeaveMsg   (评论类通知里的内嵌分隔线)
            └── .leavemsgView          (「查看」跳转链接)
```

### 3. 数据存储与解析

- `Variable.leaveMsg = localStorage.getItem("leaveMsg")`（L22268）。
- 存储格式：`<时间戳>"<条目1><条目2>...`（L22445）。
- `clearOldMsg()`（L22448）：删除超过 `259200` 秒（3 天）的记录。
- `init()`（L22457）：清理后 `get(本地数据, 1)`（`t=1` 表示本地历史回放模式）。

`get(e, t)`（L22276）逐条解析：条目按 `>` 分字段；`p[0][0] == "'"` 时是**系统消息**（7 字段），`p[3]` 为系统消息载荷，`p[3][1]` 是消息类型：

| 类型 | 含义 |
|---|---|
| `$` | 金币变动 |
| `@` | 论坛回复（跳 `forumHolder`） |
| `%` / `#` | 任务相关（跳 `taskHolder`） |
| `=` | 动态相关（跳 `timelineHolder`） |
| `^` / `v` / `*` | 关注 / 提及 / 点赞（`*` 播放音效） |
| `h` | 系统提示 |
| `!` | 其他通知 |
| `_` | 房间通知 |
| `\|` | 房间/道具/称号变更 |
| `q` | 管理员消息（`Mod.Text.admin`） |
| `~` | 纯文本 |
| `s` / `p` | 称号 / 头像 |
| `m` | 商城订单（`m1`~`m9`/`ma`/`mb`：下单/发货/确认收货/评价/退款等） |
| `k` | 王冠被夺 / 获得王冠 |
| `c` | 充电 / 会员订单 |
| `f` | 帖子被赞/踩/评分/打赏（`fR`）/评论（`fC`） |

（类型分发 L22283-22440。）

### 4. 接收端处理

- 实时通知：`@*`（L13620）→ `get(e.substr(2))`。
- 进房离线私聊：`%`（L13362 / L13365）→ `Init.service.pmOfflineMsg(...)` → `get(...)`；`pmOfflineMsg` 定义 L33230。

---

## 五、用户搜索（userSearchHolder，面板 6）

### 1. 入口链路

```
输入框 `@#`（L2841-2842）
  → Probe.init.userSearchHolder || Init.fullPanel(6)
  → panelAnimate(37, 1)
  → init() 仅渲染占位提示，无网络请求   (L22221-22223)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][6]`「搜索」，图标 `account-search`。底部按钮：返回、搜索（`event(0)`）。

### 2. 面板结构（DOM）

```
#userSearchHolder
└── div.content (滚动区)
    └── .cardTag × N（结果卡片）
        ├── .cardTagBg.mdi-image-outline
        └── .cardTagI (Avatar/Name/Sex/Number)
```

### 3. 发送命令（socket.send）

搜索弹两种输入（`Assets.select[0]`，L22192-22198）：

| 方式 | 逻辑 | 命令 |
|---|---|---|
| 用户名（`0`） | 半角单字符 → 本地 `getProfile`；否则发请求 | `=-+` + 小写用户名（L22211） |
| UID（`1`） | 13 位 UID → 本地 `getProfile(uid, 1)` | 无（本地） |

```js
socket.send("=-+" + htmlspecialchars(toLowerCase(e)))   // L22211
```

### 4. 接收端处理与数据字段

推送分派：`^`（L13399-13400）→ `userSearchHolder.function.get(e.substr(1))`。

`get(e)`（L22200）字段（`r = 条目.split(">")`）：

| 下标 | 字段 |
|---|---|
| r[0] | 昵称 |
| r[1] | 性别 |
| r[2] | 标签图片 |
| r[3] | 颜色 |
| r[4] | 头像 |
| r[5] | uid |

---

## 六、用户主页 / 论坛浏览（postHolder，面板 512）

### 1. 入口链路

```
输入框 `@?`（L2847-2848）
  → Probe.init.postHolder || Init.fullPanel(512)
  → Objs.postHolder.function.enter()      (L30380)
  → init() 构建正式面板 DOM，Probe.directGoPostBrowser = 1   (L30383)
```

挂在 `Objs.hidePanel`，标题 `languageArr[24][2]`「论坛」，图标 `forum`。底部按钮：返回、目录（`event(100)`）。结构与商城 `mallHolder` 高度一致。

### 2. 面板结构（DOM）

```
#postHolder
├── div (postBox, 面板头；postBoxEnterBtn = 其最后按钮)
└── div (postBoxContent, 滚动区)          ← postBox.children("div:eq(1)").children("div")
    ├── .postBoxItemBox   (浏览器/条目区)
    └── .postBoxHomeBox   (首页区，data-homepagebox：hot/new/star/member/history)
```

`Assets`（L27573 起）包含大量模板：`folderJSONSample` / `articleJSONSample` / `homePageJSON` / `homePageJSONFolder` / `folderJSON` / `itemJSON` / `storeJSON` / `userJSON` / `roomJSON` / `myStore` 等（文件夹/文章/首页数据）。

### 3. 发送命令（socket.send）

| 命令 | 含义 | 行号 |
|---|---|---|
| `f+` | 打开个人中心（`event(0)` 构建 manageBox） | L28046 |

个人中心主菜单「我的面板 / 创作发布 / 数据统计 / 历史记录」及子项（订单 `fu0..5`、个人店铺 `f%`、购物车 `f!`、店主中心 `f^` 等）由 `event`（L28042 附近）/ `btnProcesser`（L28686）/ `lib` 拼接生成，具体发送端字面量**（待核实）**，完整命令见下方接收端分派表。

### 4. 接收端处理（case `f`，L13852-13951）

| 推送 | 处理函数 |
|---|---|
| `f-` `f+` `f^` `f~` `f%` `f!` `f&` `f@` `f\|` `f;` `f_` | `initData(0..10, data)` |
| `fu` `fo` | `initData(12/13, data)` |
| `f#` `f?` `f$` `ff` `fm` `fp` `fd` `fk` `fw` `fr` `fx` `fq` `fn` `fe` `fl` | `action(0..16, data)` |
| `fg` `f*` `f=` `fD` `fR` `fC` `fI` | `action(对应字符, data)` |
| `fa` | `orderUpdate(e[2], e.substr(3))` |

- `initData(e, a)`（L30152）、`action`（L28686 附近）、`orderUpdate`（L30015）逐分支语义**（待核实）**。
- 商品/文章卡片类与商城一致，沿用 `.cardTag` 体系。

---

## 关键源码位置（messages.js）

| 位置 | 内容 |
|---|---|
| L2832-2881 | `moveinputDo` 快捷命令分派 |
| L20943 | `Init.fullPanel(N, e)` 定义 |
| L21932 / L21986 / L22077 | forumHolder / taskHolder / timelineHolder 定义 |
| L22190 / L22263 | userSearchHolder / leaveMsgHolder 定义 |
| L22248 | `leaveMsgHolder.clearOldMsg` / `init`（L22457） |
| L27569 | postHolder 定义（`postBox` / `postBoxContent` / Assets） |
| L28042 / L28046 | postHolder `event`（个人中心）/ `f+` |
| L28686 / L30015 / L30152 | postHolder `btnProcesser` / `orderUpdate` / `initData` |
| L30380 / L30383 | postHolder `enter` / `init` |
| L13350 | `socket.__onmessage` 总入口 |
| L13359-13366 | `%` 推送 → `pmOfflineMsg` → leaveMsgHolder.get |
| L13399-13403 | `^`（搜索）、`:`（论坛/任务/动态）分派 |
| L13618-13620 | `@*` / `@#` / `@$` / `@=` 离线消息跳转分派 |
| L33230 | `pmOfflineMsg` 定义 |
| L9966 / L11149 | `languageArr` 定义 / 简体中文面板标题表 |

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
