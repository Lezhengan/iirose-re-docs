# 经济系统面板

本文逆向 IIROSE 的三个「花钱 / 赚钱」类全屏面板：**商店** `shopHolder`（面板 509）、**商城** `mallHolder`（面板 13）、**排行榜（财富榜）** `wealthHolder`（面板 7）。源码位置均为 `web_re/src/messages.js`。

## 面板总览

| 面板 | 全屏编号 | 输入框入口 | 打开时发送 | `fullPanel` 定义 |
|---|---|---|---|---|
| 商店 `shopHolder` | 509 | `@$`（L2844） | `socket.send("=$")` | L25887 |
| 商城 `mallHolder` | 13 | `@}`（L2846） | `g-`（已初始化则 `gf`） | L30443 |
| 排行榜 `wealthHolder` | 7 | `@^`（L2856） | `=-` + `$<time>` / `#` | L22230 |

> 面板标题均取自语言包 `languageArr[24]`（L9966 起定义）：商店 = `languageArr[24][12]`「商店」，商城 = `languageArr[24][9]`「商城」，排行榜 = `languageArr[24][7]`「排行榜」（财富榜是口语叫法）。

---

## 一、商店（shopHolder，面板 509）

### 1. 入口链路

```
输入框 `@$`（L2843-2844）
  → Probe.init.shopHolder || Init.fullPanel(509)
  → panelAnimate(14, 1)
  → socket.send("=$")      // 请求商店基础数据（金币等）
```

商店挂在 `Objs.panelHolder`（普通弹层，非 `hidePanel` 全屏遮罩）。

### 2. 面板结构（DOM）

商店是「1 个主面板 + 12 个子面板」的二级结构。主面板（`mainBox`）里是 8 个分类入口，每个入口点开后生成对应的子面板 `boxArr[t]`（t=0..11）。

```
#shopHolder                                      (Mod.template(13) 外壳)
├── div (mainBox, 面板头)                        ← This.children("div")
│   ├── 标题栏：icon "store" + 标题 languageArr[24][12]「商店」
│   ├── 金币显示 .coinHolder                      (mainContent 首个子元素内)
│   └── 返回按钮 (panelAnimate(14))
└── div (mainContent, 滚动区)                     ← mainBox.children("div:eq(1)").children("div")
    └── 8 个分类入口（Mod.template(33) 卡片，onclick=panelEnter('mainBox', t)）
```

8 个分类入口来自语言包 `languageArr[15]`（`H`，L25889）与图标数组 `Z`（L25891-25909），`H[1]`~`H[8]` 对应：

| t | 图标 | 名称（`H[t+1][0]`） |
|---|---|---|
| 0 | ring | 饰品（accessory） |
| 1 | tag-text-outline | 称呼（rank） |
| 2 | city-variant | 房间（room） |
| 3 | star-face | 运气（luck） |
| 4 | treasure-chest | 福引/宝箱（lottery） |
| 5 | microsoft-xbox-controller | 游戏（game） |
| 6 | human | 虚拟形象（role） |
| 7 | sticker-emoji | 表情（emoji） |

> `Z` 数组 L25892-25909 还包含房间子页图标 `home/home-account/city/cube` 等，用于 t=8..11。

### 3. 子面板（panelEnter / clickPanel，t=0..11）

`panelEnter(e, t)`（L25958）按需构建子面板 DOM，随后 `clickPanel(t)`（L26012）初始化并发送请求：

| t | 子面板 | clickPanel 里发送的命令（行号） |
|---|---|---|
| 0 | 饰品 | `=~10`（L26016） |
| 1 | 称呼 | 无网络请求，读本地 `rank`（L26019） |
| 2 | 房间 | 无请求，构建 `b_0/b_1/b_2` 下拉（L26022） |
| 3 | 运气 | 无请求，输入模式（L26038） |
| 4 | 福引/宝箱 | 无请求，按钮触发（L26041） |
| 5 | 游戏 | `;$`（L26048） |
| 6 | 虚拟形象 | `=~11`（L26058） |
| 7 | 表情 | `=~12`（L26068） |
| 8 / 9 / 10 / 11 | 房间子页 | `=^*` + `^` / `#` / `!` / `@`（L26078） |

### 4. 发送命令（socket.send）

| 命令 | 含义 | 行号 |
|---|---|---|
| `=$` | 打开商店，请求基础数据 | L2844 |
| `=~10` / `=~11` / `=~12` | 请求饰品 / 角色 / 表情列表 | L26016 / L26058 / L26068 |
| `=~4` + `t` + `s` | 购买（t=0饰品/1角色/2表情，s=道具 id） | L26258 |
| `=~2` + `t` + `id` | 穿戴/装备（t=0 时 id 为 `accessory`，带 `*` 前缀表镜像方向） | L26261 |
| `=~3` + `t` + `id` | 卸下（t=2 表情时带序号 s） | L26263 |
| `=~51` + `链接` | 保存自定义虚拟形象图片链接 | L26958 / L26962 |
| `=*1` + `称呼` | 修改称呼（2000 钞/次） | L26085 |
| `=*0` | 清除称呼 | L25966 |
| `=%` + `t` | 运气下注（金额 t，最小 10） | L26092 |
| `;$` | 请求游戏数据 | L26048 |
| `;$` + `e` | 玩游戏（e=1 回 HP / 2 回 AP / 3 入场券） | L26126 |
| `;$` + `e` + `"` + `n` | 批量购买游戏道具 n 件 | L26120 |
| `=` | 福引/宝箱抽一次（100 钞） | L26980 |
| `=^*` + `^/#/!/@` | 请求房间子页（住宅/酒店/沙盒） | L26078 |
| `=^-3` + `房间id` | 拆除/回收房间 | L26860 |
| `=^+_` + `uid` | 查询房屋成员 | L26879 |
| `=^!` + `房间id` + `>` + `密码` | 设置房间保护密码 | L26894 |
| `=^^` + 类型 + `JSON` | 保存/建房（`houseConfirm` 构造，L26767） | L26767 |

### 5. 接收端处理

商店相关推送在 `socket.__onmessage`（L13350）里按首字符分派，落在反引号 `` ` `` 分支（L13585-13616）：

| 推送首字符 | 处理函数 | 含义 |
|---|---|---|
| `` `% `` | `getLuck`（L13586） | 运气结果 |
| `` `$ `` | 直接刷新 `coinHolder`（L13587） | 金币变化 |
| `` `? `` | 福引结果（`-` 未中 / `$` 中奖，L13588-13596） | 宝箱抽奖 |
| `` `@ `` | `buildPanel` / 装备 / 表情状态（L13616） | 商店列表数据 |
| `` `^ `` | `houseGet`（L13616） | 房屋数据 |
| `` `# `` | `wealthHolder.get`（L13616） | 排行榜 |
| `` `~ `` | `roomPasswordCheck`（L13616） | 房间密码校验 |
| `` `! `` | 保护密码确认回调（L13616） | 房屋保护密码 |

其他相关分派：

- `|`（L13582-13584）：余额变化 `|$`、`|$#@`（更新金币并刷新房屋下拉），关注/粉丝/打赏/印象等。
- `]`（L13632-13634）：`]!`/`]@`（房屋成员）、`]#`（房间重建 `roomRebuild`）、`]*`（房间 ID 校正 `roomIdCorrect`）。
- `)`（L13638-13639）：`)!` → `shopHolder.function.game`（游戏结果）。
- `_`（L13439）：运气/金币 `+10000` 直接改本地 `Variable.coin`。

### 6. 列表数据源

`buildPanel(v, y)`（L26182）通过 ajax 拉取：

```
lib/system/data/shop/accessory/index
lib/system/data/shop/role/index
lib/system/data/shop/emoji/index
lib/system/data/shop/role/roleSystem
```

（L26199，`v`=0/1/2/50）。返回按换行分条目，每 36 条一页，构建 `.shopItemPage` 分页（`shopItemPageHolder` / `shopItemPageSwichHolder` / `shopPagePointer`）。

### 7. 关键数据字段 / DOM 类

- `coinHolder`：主面板金币显示；`updateCoin()`（L27023）统一刷新金币及各子面板余额（`luckCoin` / `lotteryCoin` / `gameCoin`）。
- 饰品卡片 `.shopItem`，属性 `aid`（道具 id）、`st`（0=未拥有 / 1=已拥有 / 2=已装备）；`itemChange`（L26244）根据 `st` 决定按钮是「购买 / 穿戴 / 卸下」。
- 分页类：`.shopItemPageHolder`、`.shopItemPage`、`.shopItemPageSwichHolder`、`.shopPagePointer`。
- 房间子面板：`houseArr` / `saveHouse` / `houseSelectObj` / `houseEdit*` 等（房屋编辑，L26678 起）。

---

## 二、商城（mallHolder，面板 13）

### 1. 入口链路

```
输入框 `@}`（L2845-2846）
  → 已初始化 ? socket.send("gf")                    // 刷新
  : Init.fullPanel(13) + socket.send("g-")          // 首次打开：请求商城首页
  → panelAnimate(48, 1) + mallHolder.function.lib(8, 1)
```

### 2. 面板结构（DOM）

挂在 `Objs.hidePanel`。结构与用户主页 `postHolder` 几乎一致（`shopBox` / `shopBoxContent`）：

```
#mallHolder
├── div (shopBox, 面板头)
│   ├── 标题栏：icon "shopping" + 标题 languageArr[24][9]「商城」
│   ├── 返回按钮 (panelAnimate(48); lib(8))
│   └── 「个人中心」按钮 → event(0)
└── div (shopBoxContent, 滚动区)                     ← shopBox.children("div:eq(1)").children("div")
```

- `shopBox` = `This.children("div")`，`shopBoxContent` = 内容滚动区。
- 个人中心 `manageBox`、搜索 `searchBox`、商品详情 `itemDetailsBox`、店铺页 `storePage` 等由 `event`（L30767）按需构建。

### 3. 发送命令（socket.send）

商城命令由 `event` / `btnProcesser`（L31085）/ `lib` 拼接生成，接收端分派（见下）能反推出完整命令表。核心命令：

| 命令 | 含义 | 行号 |
|---|---|---|
| `g-` | 打开商城/请求首页 | L2846 |
| `gf` | 商城已初始化时刷新 | L2846 |
| `g+` | 打开个人中心（event(0) 构建 manageBox） | L30772 |

个人中心子菜单（L30773-30778）：购物车 `event(5)`、已购买 `event(6)`、收藏夹 `event(7)`、关注店铺 `event(8)`、卖家中心 `event(4)`。其触发的具体 `socket.send` 多为拼接串（`gu0..5`、`g%`、`g|` 等），完整语义见接收端分派表，个别发送端字面量**（待核实）**。

### 4. 接收端处理（case `g`，L13759-13851）

`g` 首字符推送按第二字符分派到 `mallHolder.function.initData / action / orderUpdate`：

| 推送 | 处理函数 |
|---|---|
| `g-` `g+` `g^` `g~` `g%` `g!` `g&` `g@` `g|` `g;` `g_` | `initData(0..10, data)` |
| `gu` `go` | `initData(12/13, data)` |
| `g#` `g*` `g?` `g$` `gf` `gm` `gp` `gd` `gk` `gw` `gr` `gx` `gq` `gn` `ge` `gl` | `action(0..16, data)` |
| `ga` | `orderUpdate(e[2], e.substr(3))` |

`initData(e, a)`（L32138）、`action`（L31085 附近）、`orderUpdate`（L32003）的每个分支含义较多，逐分支语义**（待核实）**。

### 5. 关键数据结构

- `Assets.pageJson`（list/item 两页）、`Assets.typeIndex`、`Assets.itemJSON` / `storeJSON`、`Assets.favoriteStore`、`Assets.serviceJSON`（`x`=不退不换 / `7`=七天无理由 / `s`=包邮，L30450-30454）。
- 商品卡片类沿用 `.cardTag` 体系；订单数据经 `orderUpdate` 解析（字段含订单号、商品、数量、价格、退款等，与离线消息 `m` 分支的订单通知同构）。

---

## 三、排行榜 / 财富榜（wealthHolder，面板 7）

### 1. 入口链路

```
输入框 `@^`（L2855-2856）
  → Probe.init.wealthHolder || Init.fullPanel(7)
  → panelAnimate(38, 1)
  → 距上次请求 > 3600 秒时：
      socket.send("=-" + (已加载过 ? "$"+Variable.time : "#"))
```

- 首次/无缓存：`=-#`（请求全量）
- 已加载过：`=-$<上次时间戳>`（增量）

### 2. 面板结构（DOM）

挂在 `Objs.hidePanel`，标题 `languageArr[24][7]`「排行榜」，图标 `podium`，无底部按钮（只有返回，L22231）。

```
#wealthHolder
└── div.content (滚动区)                             ← This.children("div:eq(1)").children("div")
    ├── .cardTag × N（用户卡片）
    └── .boardLine（分区标题线，共 3 条）
```

### 3. 接收端解析（function.get，L22235-22239）

推送格式（`` `# `` → `wealthHolder.get(e.substr(2))`，L13616）：

```
<时间戳>"<条目1><条目2>...
条目 = 昵称>性别>标签图>颜色>头像>uid>数值        (按 `>` 分割)
```

字段映射（`n = 条目.split(">")`）：

| 下标 | 字段 |
|---|---|
| n[0] | 昵称 |
| n[1] | 性别（1 男 / 2 女） |
| n[2] | 标签图片 |
| n[3] | 颜色（6 位 hex） |
| n[4] | 头像 |
| n[5] | uid |
| n[6] | 数值（财富/贡献值） |

### 4. 分区规则

设总条数 `c`，三个分割点：`p = c - 73`、`u = c - 53`、`m = c - 3`（L22238）。

| 区间 | 条数 | 数值颜色 | 序号 | 标签 |
|---|---|---|---|---|
| `[0, p)` | 73 | 金（`f2d022`/`ce9222`） | 从 1 重排 | `languageArr[19][2]` |
| `[p, u)` | 20 | 灰（`d0d0d0`/`909090`） | 从 1 重排 | `languageArr[7][41]`（货币单位「钞」） |
| `[u, m)` | 50 | 金 | 从 1 重排 | `languageArr[7][241]` |
| `[m, c)` | 3 | 深（`bebebe`/`202020`） | 从 1 重排 | `languageArr[7][41]` |

- 3 条 `.boardLine` 分区线插在 `p-1`、`u-1`、`m-1` 之后，文案取自 `languageArr[7][239]` / `[240]` / `[242]`（日文版源码为「富豪ランキング / 貢献ランキング / 皇室ランキング」，即「富豪排行榜 / 贡献排行榜 / 皇室排行榜」，简体中文精确文案**（待核实）**）。
- 过滤：`u <= h`（后半区）且 `l <= 0`（数值 ≤ 0）的条目被跳过（L22238）。

---

## 关键源码位置（messages.js）

| 位置 | 内容 |
|---|---|
| L2832-2881 | `moveinputDo` 快捷命令分派 |
| L20943 | `Init.fullPanel(N, e)` 定义 |
| L25887 | shopHolder 定义（`mainBox` / `mainContent` / `coinHolder` / `boxArr`） |
| L25958 / L26012 | `panelEnter` / `clickPanel` 子面板构建与初始化 |
| L26182 / L26244 | `buildPanel`（ajax 列表）/ `itemChange`（买/穿/卸） |
| L26678-26793 | 房屋：`houseGet` / `houseFill` / `houseConfirm` / `roomRebuild` / `roomIdCorrect` |
| L26794-26998 | `btnProcesser`（房屋买卖/拆除/密码/模板/福引/虚拟形象） |
| L27023 | `updateCoin` 金币刷新 |
| L30443 | mallHolder 定义 |
| L30767 / L31085 / L32003 / L32138 | mallHolder `event` / `btnProcesser` / `orderUpdate` / `initData` |
| L22230-22245 | wealthHolder 定义与 `get` 解析 |
| L13350 | `socket.__onmessage` 总入口 |
| L13582-13584 / L13585-13616 / L13632-13639 | 商店/财富/房屋相关推送分派 |
| L13759-13851 | 商城推送分派（case `g`） |

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
