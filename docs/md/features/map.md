# 地图与房间数据

地图数据保存在 `Objs.mapHolder.Assets`，由服务器 `%` 前缀消息推送维护。

## 数据结构

### 地图树 `Assets.roomArr`

```
roomArr = [
  [地区id, "地区名", _, _, _, _, [
    [房子id, "房子名", _, _, _, _, [
      [房间id, "房间名", ..., 房间标记, ...]
    ]]
  ]]
]
```

实测顶层共 4 个地区：

| 地区 | 说明 |
|---|---|
| 社区 | `roomArr[0]`，房子 → 房间 |
| 住宅 | `roomArr[1]` |
| 旅馆 | `roomArr[2]`（`hotel` 特例 id `5b792cac2b37f`） |
| 沙盒 | `roomArr[3]` |

### 房间映射

| 数据 | 内容 |
|---|---|
| `Assets.roomJson` | 房间详情映射（约 493 个房间）：房间id → 信息 |
| `Assets.roomNameJson` | 房间id → 房间名（用于显示） |
| `Assets.subscribeRidArr` | 订阅的房间 id 列表 |
| `Assets.listBoxCurrentP` | 当前定位的房间id（地图打开时定位） |

## 地图命令

| 命令 | 功能 |
|---|---|
| `socket.send("=^v^")` | 请求公告（公告面板，带版本号） |
| `socket.send("=^v#")` | 请求订阅房间列表（侧边栏"订阅"tab） |
| `socket.send("=^v@")` | 房间信息面板：请求订阅者列表 |
| `socket.send("=^v!")` | 房间信息面板：请求房间资料（tab 切到房间信息） |
| `socket.send("=^v$0")` / `=^v$1` | 取消订阅 / 订阅房间（`$0`+rid 取消、`$1`+rid 订阅） |
| `socket.send("=^++")` | 房子编辑：添加成员（房主管理，`houseEditMemberAdminBtn`） |
| `socket.send("=^+_uid")` | 房子编辑：移除成员（房主） |
| `socket.send("=^~")` | 密码房间进入（带密码） |
| `socket.send("=^*^")` / `=^*#` / `=^*!` / `=^*@` | 商店「我的房子」页切换（家/社区/旅馆/沙盒 tab） |

> `=~N` 与 `=*0`/`=*1` 是**商店面板**命令（`=~1X` 商店分页、`=*0` 清排行名、`=*1名字` 设排行名），不是地图/房间列表命令，详见[发送命令](md/websocket/commands?id=房间--商店-前缀)。

## 进房 / 切房

```js
// 进入房间：socket.send("*" + JSON.stringify(s))（fetchroom，L23733）
// s 字段：r=房间id、n=昵称、p=密码、st=状态、mo=心情、fp=指纹等
socket.send("*" + JSON.stringify({ r: "房间id", n: "昵称", st: "状态", fp: "@" + "随机32位或md5(用户名)" }));

// 登录后切房（含密码房：m房间id>密码）
socket.send("m房间id");

// 地图面板内切房：mapHolder.function.roomchanger(房间id)
```

> `%房间id` **不是进房命令**——`%` 是服务器推送房间数据的前缀；进房统一走 `*`+JSON（首次/刷新）、登录后跨房走 `m`。

- 切房后服务端推送 `-` 前缀消息确认，必要时整页刷新
- 房间被改名/改属性：`-#房间id"新属性"` → 刷新页面
- 被踢出/房间关闭：`--` / `---` → 刷新父页面

## 初始房间与上线位置

**空间站是默认初始房间**（`Constant.rid.space = "5ce6a4b520a90"`，L9653），UI 上叫「空降中心」（L22930）。

| 场景 | 逻辑 | 源码位置 |
|---|---|---|
| 页面加载 | `roomn = Cookie("roomsave")`，无记录时默认空间站 | L9594 |
| 登录请求房间 | `sessionStorage.lastroom \|\| Constant.rid.space`——有上次房间则进入，否则进空间站 | L23676 |
| 切房时 | 写入 `Cookie("roomsave")` + `sessionStorage.lastroom` + `autologin=1` | L23620 |
| 回到空间站 | `mapHolder.function.lib(3)`：`roomsave=space`、`autologin=4`、**清除 lastroom**、刷新页面 | L22930 |

### 上线位置设置（功能菜单 → "g"）

侧边栏**功能菜单**（`functionBtnDo(96)` → `Utils.service.functionMenu()`，L4275）中有一个选项 `"g"`，切换 `Probe.implicitMove`（L4285）：

```js
// 功能菜单 "g"：切换"新上线位置"
Probe.implicitMove = !Probe.implicitMove;

// 开启后，切房会记录标记（L23620）
Probe.implicitMove && sessionStorage.setItem("implicitMove", 1);

// 下次登录请求：带 "#" 前缀 → 直接进入上次的房间（L23676）
d = (sessionStorage.getItem("implicitMove") ? "#" : "")
  + (sessionStorage.getItem("lastroom") || Constant.rid.space);
// 使用后清除标记（L23718）
```

- **关闭（默认）**：登录进入 `lastroom`（上次房间）或空间站
- **开启**：登录请求 `#lastroom`（`#` 前缀 = 隐式直接进入上次房间），并在进入后清除标记


## 房间限制

服务端推送 `.` 前缀（见[接收路由](md/websocket/messages.md)）：

```
.!N   发言限制（N: 0所有人/1普通+/2带星+/3仅房主/4白名单+/5仅白名单）
.@N   点播限制
.#NM  发言+点播限制
```

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
