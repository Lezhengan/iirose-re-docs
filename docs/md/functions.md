# 前端函数调用速查

> 应用逻辑全部运行在 `messages.html`（iframe[0]）的全局作用域。**登录后**打开 DevTools（F12），在 Console 面板即可直接调用下述函数。
> 游客（未登录，`password` 为空）时部分功能会被拦截，弹出提示 `languageArr[7][34]`（需登录）。
> 源码位置均指 `reference/src/messages.js`。

## 一、打开面板：`functionBtnDo(编号)`

`functionBtnDo(e)`（L14436）是全局函数，等于点击侧边栏对应按钮。大部分面板同时对应一个输入框快捷命令 `moveinputDo("@xx")`。

| 编号 | @命令 | 面板/功能 |
|---|---|---|
| 1 | `@` | 共享媒体列表（房间内点播） |
| 2 | `@!` | 离线留言 `leaveMsgHolder` |
| 3 | `@]` | 论坛 `forumHolder` |
| 4 | `@%` | 任务 `taskHolder` |
| 5 | `@&` | 动态（朋友圈）`timelineHolder` |
| 6 | `@#` | 用户搜索 `userSearchHolder` |
| 7 | `@^` | 财富榜 `wealthHolder` |
| 8 | `@}` | 商城 `mallHolder` |
| 9 | `@)` | 股票 `stockOldHolder` |
| 10 | `@$` | 商店 `shopHolder` |
| 11 | — | 赚钱 `makeMoneyHolder` |
| 12 | `@=` | 便签 `noteHolder` |
| 13 | `@_` | 骰子选择器 |
| 14 | `@*` | 配对 `pairHolder` |
| 15 | — | 发心情（正面）`moodHolder` |
| 16 | — | 发心情（负面） |
| 17 | — | 特殊符号 `symbolsHolder` |
| 18 | — | 翻译 `translateHolder` |
| 19 | — | 内置浏览器 `browserHolder` |
| 20 | `@-` | 游戏模拟器 `gameEmulatorHolder` |
| 21 | `@~` | 皮肤/外壳 `shellHolder` |
| 22 | `@?` | 我的主页 `postHolder` |
| 50 | — | 嗡嗡 `buzzHolder` |
| 51 | — | 个人状态 `statusHolder` |
| 52 | — | 修改心情 |
| 53 | — | 弹幕发送 `danmakuSendHolder` |
| 54 | — | 绘画 `paintHolder` |
| 55 | — | 通话 `callHolder` |
| 56 | `@@` | 地图（房间列表） |
| 57 | — | 上传图片 `uploadHolder` |
| 80 | — | 调色板 `paletteHolder` |
| 81 | — | 账号设置 `userREHolder`（改用户名/绑手机/微信推送） |
| 82 | — | 系统设置 `setupHolder` |
| 83 | — | 关于/帮助 `aboutHolder` |
| 84 | — | 退出登录 |
| 85 | `@(` | 角色设置 `roleSetHolder` |
| 86 | — | 系统菜单 |
| 87 | — | 刷新页面 |
| 90 | — | 空媒体播放器开关 |
| 91 | — | 睡眠模式 |
| 92 | — | 影院模式 |
| 93 | — | 壁纸加载开关 |
| 95 | — | 解析剪贴板 |
| 96 | — | 功能菜单 |
| 98 | — | 弹幕模式选择 |
| 100 | — | 用户资料弹窗（配合 `t` 参数：`did` 属性上的 `u`） |
| 101 | `@+` | **热推的房间** `roomSplashHolder` |
| 110 | `@.` | 银行 `bankHolder` |
| 111 | `@;` | 伴侣 `partner` |
| 112 | — | 加密币行情 `cryptoHolder`（侧边栏按钮 `display:none` 隐藏，调用此编号可调出） |
| 113 | — | 美股行情 `stockHolder`（同上隐藏；**默认可见股票入口是 `9` 炒股 `stockOldHolder`**） |
| 114 | — | A股行情 `chinaHolder`（同上隐藏） |
| 120 | — | 默认壁纸选择 |
| 121 | — | 背景移动 |
| 122 | — | 歌词开关 |
| 123 | — | 背景亮度 |
| 500 | — | 帮助 `helpHolder` |
| 502 | — | 通话面板 |

```js
// 示例：一键打开热推的房间
functionBtnDo(101);

// 打开账号设置
functionBtnDo(81);

// 打开地图
functionBtnDo(56);
```

## 二、输入框命令：`Utils.service.moveinputDo(文本)`

`moveinputDo(e, t)`（L2832）是**输入框解析器**——用户在底部输入框输入的内容最终都走到这里，等价于"模拟输入并回车"。

| 输入 | 效果 |
|---|---|
| 普通文本 | 群聊公屏广播（走 `Utils.Filter.pubMsg` 过滤） |
| `@xx` | 快捷面板（见上表 @命令列） |
| `@@ 歌名` | 网易云**直搜直发**：取搜索结果第一首自动发送（L2883） |
| `@ 歌名` | 打开**媒体搜索面板**（`demandHolder`，结果列表手动选，L2908） |
| `~ 内容` | 发送弹幕（需绑定手机、房间允许） |
| `<> 链接` | 分享媒体（自动解析 B 站/网易云等） |
| `#…` | 特殊内容（频道/房间内指令） |

```js
// 在群聊发一句话（注意：会广播给全房间）
Utils.service.moveinputDo("大家好");

// 发送弹幕（同输入 "~ 内容"）
Utils.service.moveinputDo("~ 这是一条弹幕");

// 打开热推面板
Utils.service.moveinputDo("@+");

// 打开地图
Utils.service.moveinputDo("@@");

// 网易云直搜直发（取第一首，不走选择框）
Utils.service.moveinputDo("@@ 歌名");

// 打开媒体搜索面板手动选歌（仅媒体分享房间）
Utils.service.moveinputDo("@ 歌名");
```

## 三、房间操作：`Objs.mapHolder.function`

地图面板的方法，进房/切房/密码/选房都在这里。

| 方法 | 说明 |
|---|---|
| `roomchanger(房间id[, 强制])` | 切换到目标房间；自动处理密码房（弹输入框/发送 `=^~`） |
| `roompsdFunc(房间id[, 密码, 模式])` | 房间密码读取/设置 |
| `houseSelect(分区, 回调, 提示文本, 返回数组?)` | 房间选择器（地区→房子→房间），回调收到房间id |
| `findUserByUid(uid)` | 在在线列表 `userJson` 中查找用户 |
| `freshUser([强制])` | 刷新房间在线用户列表 |
| `fetchroom(模式)` | 重新请求房间数据（0/1/4 不同模式，4=当前房间登录载荷） |
| `lib(1, 房间id)` | 房间信息模板构建 |

```js
// 直接进入指定房间
Objs.mapHolder.function.roomchanger("5b7ab80a2017d");

// 回到默认房间（沙盒/空间）
Objs.mapHolder.function.roomchanger(Constant.rid.space);

// 弹出选择器，选完进入该房间
Objs.mapHolder.function.houseSelect(0, function (rid) {
  Objs.mapHolder.function.roomchanger(rid);
});

// 会员分区房间选择器（对应热推面板"会员"tab）
Objs.mapHolder.function.houseSelect(2, function (rid) {
  Objs.mapHolder.function.roomchanger(rid);
});

// 查询某个在线用户
var u = Objs.mapHolder.function.findUserByUid("用户uid");
if (u) console.log(u);
```

`houseSelect` 分区参数：`0`=输入房间名查询、`1`=按地区选择、`2/3/4/5`=按房间等级筛选（会员房等）。

## 四、热推房间算法：`Utils.service.jumpToMaxPplRoom(n)`

核心算法（L3653），见[热推房间](features/hot-rooms.md)。`n=1` 返回排序后的房间列表，`n=0` 或省略则自动跳房。

```js
// 1. 拿到当前最热的房间列表（纯本地计算，房间id数组）
var hot = Utils.service.jumpToMaxPplRoom(1);
console.log(hot.slice(0, 10));   // [[活跃分, 房间id], ...] 降序

// 2. 跳转到最热房间
var top = Utils.service.jumpToMaxPplRoom(1)[0];
Objs.mapHolder.function.roomchanger(top[1]);

// 3. 模拟"登录后自动跳热门房"（热度加权随机，内部直接跳房）
Utils.service.jumpToMaxPplRoom();

// 4. 拿到房间名/人数展示
hot.slice(0, 5).forEach(function (x) {
  console.log(Objs.mapHolder.Assets.roomNameJson[x[1]], x[0]);
});
```

## 五、消息发送（绕过 UI 直接 `socket.send`）

所有命令为明文文本（见 [WS 发送命令](websocket/commands.md)），`socket` 是全局 WebSocket 对象。

```js
// 群聊消息（JSON，m=内容，mc=颜色，i=消息唯一id）
socket.send(JSON.stringify({ m: "你好", mc: "255,255,255", i: "id_" + Date.now() }));

// 私聊（g=目标uid）
socket.send(JSON.stringify({ g: "目标uid", m: "私聊内容", i: "id_" + Date.now() }));

// 进入房间
socket.send("%房间id");

// whois 在线列表
socket.send("+@房间名");

// 关注 / 取关
socket.send("+#0目标uid");   // 0=关注，1=取关

// 请求用户资料
socket.send("f@" + "目标uid");
```

> 使用 `socket.send` 绕过 `moveinputDo` 时**不会经过** `Utils.Filter.pubMsg` 等过滤/权限检查，请自行确认言行合规（例如弹幕/广播类命令不要滥用）。

## 六、常用工具

| 表达式 | 功能 |
|---|---|
| `Variable.room` / `Variable.roomn` | 当前房间id / 房间名 |
| `Variable.coin` | 金币 |
| `Variable.myUserJson` | 我的用户信息 |
| `Variable.whoisArr` | 房间在线用户列表 |
| `Info.me` | 登录信息（uid/等级/是否绑手机等） |
| `Objs.mapHolder.Assets.roomNameJson` | 房间id → 房间名 |
| `Objs.mapHolder.Assets.roomJson` | 房间id → 房间详情 |
| `Utils.database("roomHistory")` | 本地浏览历史（逗号分隔房间id，最多 8 条，见[七](#七设置与本地数据)） |
| `Utils.settings(key, value)` | 设置项读写（localStorage，见[七](#七设置与本地数据)） |
| `Utils.sync(0, 文本, 回调)` | 确认弹窗（详见[弹窗与通知](frontend/dialogs.md)） |
| `Cookie(key, value)` | cookie 读写 |

```js
// 示例：列出当前房间在线用户
console.log(Variable.roomn, Variable.whoisArr);

// 示例：确认弹窗（防误触）
Utils.sync(0, "确认要这样做吗？", function (ok) {
  if (ok) console.log("已确认");
});
```

### 颜色工具（卡片主题色 / RGB↔hex）

媒体卡片主题色处理的一组工具（详见[卡片 DOM](frontend/cards.md#歌曲卡片主题色函数)）：

| 函数 | 行号 | 作用 |
|---|---|---|
| `rgb2hex("255,0,0")` | L1790 | RGB 串 → hex（**不带 #**） |
| `hex2rgb("f00")` | L1786 | hex（3 位自动补全）→ RGB 串 |
| `darkOrLight("RGB\|hex", 模式)` | L1795 | 判断颜色深浅（模式=1 按 RGB 串） |
| `Utils.getDLColor(浅色?, "R,G,B"[, 阈值])` | L6083 | 亮/暗主题自动适配（卡片取色核心） |
| `Utils.randomColor(1)` | L6019 | 随机色（1=HSL 亮色 / 0=纯随机） |
| `Utils.hslToRgb(h, s, l)` / `Utils.rgbToHsl(r, g, b)` | L6022/6028 | HSL ↔ RGB 双向转换 |

```js
rgb2hex("255,100,50");                    // "ff6432"
hex2rgb("ff6432");                         // "255,100,50"
Utils.getDLColor(0, "255,255,255", 400);   // 亮色主题下把纯白调深
Utils.randomColor(1);                      // 随机 HSL 亮色
darkOrLight("255,255,255", 1);             // true（亮色）
```

> `rgb2hex` / `hex2rgb` / `darkOrLight` 是**全局函数**；`getDLColor` 等是 `Utils` 方法。

## 七、设置与本地数据：`Utils.settings` / `Utils.database` / `removeSettings` / `removeDatabase`

（L6145-6157）读写"设置"和"本地数据库"两个持久层，是**官方存储机制的唯一入口**。

| 函数 | 说明 |
|---|---|
| `Utils.settings(key)` | 读取设置项 |
| `Utils.settings(key, value)` | 写入设置项 |
| `Utils.database(key)` | 读取本地数据 |
| `Utils.database(key, value)` | 写入本地数据 |
| `Utils.removeSettings(key)` | 删除设置项 |
| `Utils.removeDatabase(key)` | 删除本地数据项 |

**存储原理**：读写的是内存对象 `Assets.settings` / `Assets.database`（L15434-15435 从 localStorage 键 `"settings"` / `"database"` JSON 解析），后台定时任务（L2789-2792）检测到变化后写回 localStorage。因此用这两个函数存的东西**刷新/重开都会保留**。

```js
// 读写任意设置（官方用它存"首页地址"）
Utils.settings("homePage", "https://example.com");
console.log(Utils.settings("homePage"));   // https://example.com

// 官方真实用法：记住上次停留的私聊分页
Utils.settings("pmPageP", Variable.pmTask.pageP);

// 本地数据：浏览历史（逗号分隔房间id，最多 8 条，L3703）
Utils.database("roomHistory", "5ce6a4b520a90,5b7ab80a2017d");
console.log(Utils.database("roomHistory").split(","));

// 删除
Utils.removeSettings("pmPageP");
Utils.removeDatabase("roomHistory");
```

## 八、面板动画：`panelAnimate(槽位, 开/关, ...)`

（L14791）**所有面板开合的统一动画入口**，等价于 `functionBtnDo` 的底层实现。签名 `panelAnimate(e, t, i, o, a, s, r, n)`：`e`=槽位、`t`=1开/0关、`i`=动画结束回调、`o`/`a`=目标面板元素（一般不用传）。只需记住槽位表即可。

常用槽位（完整 switch 见源码 L14791-15159）：

| 槽位 | 面板 | 槽位 | 面板 |
|---|---|---|---|
| 0 | 侧边栏 `functionHolder` | 33 | 通用面板开关（X 滑入滑出） |
| 3 | 表情面板 `faceHolder` | 34 | 论坛 `forumHolder` |
| 6 | 弹幕发送 `danmakuSendHolder` | 35 | 任务 `taskHolder` |
| 7 | 发心情 `moodHolder` | 36 | 动态 `timelineHolder` |
| 8 | 个人状态 `statusHolder` | 37 | 用户搜索 `userSearchHolder` |
| 9 | 嗡嗡 `buzzHolder` | 38 | 财富榜 `wealthHolder` |
| 10 | 通话 `callHolder` | 40 | 离线留言 `leaveMsgHolder` |
| 11 | 上传 `uploadHolder` | 41 | 角色设置 `roleSetHolder` |
| 12 | 系统设置 `setupHolder` | 42 | 赚钱 `makeMoneyHolder` |
| 13 | 关于 `aboutHolder` | 43 | 地图 `mapHolder` |
| 14 | 商店 `shopHolder` | 45 | 公告 `noticeHolder` |
| 16 | 共享媒体 `demandHolder` | 48 | 商城 `mallHolder` |
| 23 | 账号设置 `userREHolder` | 50 | 面板间切换（3D 翻转/位移） |
| 24 | 确认弹窗 `syncHolder` | 51 | 皮肤 `shellHolder` |
| 25 | 通用浮窗（X 滑入） | 52 | 房间信息 `roomInfoHolder` |
| 26 | 股票 `stockOldHolder` | 53 | 帮助 `helpHolder` |
| 27 | 便签 `noteHolder` | 54 | 更新日志 `changesHolder` |
| 28 | 配对 `pairHolder` | 56 | 热推房间 `roomSplashHolder` |
| 29 | 符号 `symbolsHolder` | 57 | 游戏模拟器 `gameEmulatorHolder` |
| 30 | 翻译 `translateHolder` | 58 | 表情搜索 `emojiSearchHolder` |
| 31 | 浏览器 `browserHolder` | 59 | 银行 `bankHolder` |
| 32 | 绘画 `paintHolder` | 60 | 手机绑定 `phoneHolder` |
| | | 61 | 我的主页 `postHolder` |
| | | 62 | 股票行情 `stockHolder` |

```js
// 打开热推的房间（等效 functionBtnDo(101)）
panelAnimate(56, 1);

// 关闭并等动画结束再执行
panelAnimate(56, 0, function () { console.log("已关闭"); });

// 打开更新日志
panelAnimate(54, 1);
```

> 注意：槽位**不等于** `functionBtnDo` 编号（如热推面板 `functionBtnDo(101)` → 槽位 56）。动画风格由 `Probe.panelAnimateType` 决定（1=横向、2=竖向、3=旋转、4=缩放）；临时跳过动画可设 `Probe.fullPanelNoAnimate = 1`。

## 九、菜单类：`Utils.service.functionMenu()` / `Utils.AppUtils.menu()` / `Utils.AppUtils.trayMenuBtnClick()`

### 1. `Utils.service.functionMenu()`（L4275）

"功能菜单"（侧边栏 `functionBtnDo(96)`）的弹层。选项（内部回调 `t`）：

| 选项 | 动作 |
|---|---|
| `c` | 清屏 `Utils.service.clearScreen()` |
| `l` | 锁屏引导 `Utils.service.lockScreenGuide()` |
| `g` | 切换 `Probe.implicitMove`（**上线位置**：开启后每次上线自动跳去最热房间，关闭则停留在上次房间），切换时弹提示 |

```js
// 打开功能菜单
Utils.service.functionMenu();

// 直接切换"上线位置"
Probe.implicitMove = !Probe.implicitMove;
```

### 2. `Utils.AppUtils.menu(菜单id, 参数)`（L6765）

媒体/链接右键"更多"菜单。`菜单id` 是 `Assets.AppUtils.appSelectJSON` 的键（如相册图片菜单 `'1_0_'`），`参数` 是操作对象（url/src）。菜单项：

| 选项 | 动作 |
|---|---|
| `1` | 下载媒体 `Utils.service.downloadFile(url, 文件名, 0, 1)`（PC 端 `Main.saveMedia`） |
| `2` | 解析文本 `Utils.service.parseText(url)`（链接/Base64） |
| `3` | 加入表情 `Utils.service.addToEmoji(url)` |
| `n` | 存入便签 `Utils.service.addToNote("1", url, 1)` |
| `w` | 设为壁纸 `Utils.service.setWallpaper(url)` |

```js
// 对一张图片弹出"更多"菜单
Utils.AppUtils.menu("1_0_", "http://r.iirose.com/i/20/1/1/0/xx.png");

// 直接下载一个文件（等效菜单"下载"项）
Utils.service.downloadFile("https://example.com/a.mp3", "a.mp3", 0, 1);
```

### 3. `Utils.AppUtils.trayMenuBtnClick(e)`（L36241）

桌面端（`device==5`）托盘按钮回调：`e=1` 切换睡眠模式，其它切换空媒体播放器。网页端无此功能。

```js
// 等效点击托盘"睡眠模式"
Utils.AppUtils.trayMenuBtnClick(1);
```

## 十、HTML 模板：`Mod.img(...)` / `Mod.text(...)`

### `Mod.img(e, t, i, o, a, s, r, n, l)`（L9531）

生成 `<img class="bgImg">` 的 HTML 字符串（默认包一层 `.bgImgBox` 容器），是全部图片 DOM 的模板来源。

| 参数 | 含义 |
|---|---|
| `e` | 图片地址（不传则 `display:none`） |
| `t` | 容器背景色（如 `"#424242"`） |
| `i` | 模式：`2`=只输出 `<img>` 不带容器；其它=带容器 |
| `o` | `onload` 事件字符串 |
| `a` | `onerror` 事件字符串（默认 `this.style.display='none'` 隐藏） |
| `s` | `object-fit`（`cover`/`contain`…） |
| `r` | `object-position` |
| `n` | 附加 CSS 样式 |
| `l` | 容器附加属性 |

```js
// 生成一张封面图（懒加载 + cover 裁剪）
Mod.img("http://r.iirose.com/i/20/1/1/0/xx.png", "#000", 0, null, null, "cover", "center");
// → <div class="bgImgBox" style="background-color:#000;"><img class="bgImg" loading="lazy" decoding="async" src="http://r.iirose.com/i/20/1/1/0/xx.png" style="object-fit:cover;object-position:center;"></div>

// 用法：挂到某个容器上换背景
$("#functionHolderImg").prepend(Mod.img("http://r.iirose.com/i/20/1/1/0/xx.png", "#000", 0, null, null, "cover", "center"));
```

### `Mod.text(e, t, i)`（L9539）

返回拼好的**多语言文案**字符串：

| e | 内容 |
|---|---|
| `0` | 备注：`"\n备注 : xxx"`（`t`=备注文本，`i`=是否转义） |
| `1` | 执行者房间：`"\n\n执行者 : 房间名"`（`t`=房间id，等于当前房间时显示"当前房间"） |
| `2` | 封禁提示（`t`=1房间限制点播/发言、2我被房间禁止、其它全局禁止；`i`=是否"点播"版） |
| `3` | 房管等级文案（`t`=等级值，`4`/`9`/`*` 为特殊值） |

```js
// "备注 : 请勿刷屏"
Mod.text(0, "请勿刷屏");
// "执行者 : 当前房间"
Mod.text(1, roomn);
```

## 十一、按需构建面板：`Init.fullPanel(N)` / `Init.movePanel(N)`

面板 DOM 不是启动就全部建好的。标准打开流程是：**先 `Init.fullPanel(编号)` 构建，再 `panelAnimate(槽位, 1)` 显示**。`Init.fullPanel(N)`（L20943）按编号把面板挂到 `#panelHolder` 并生成 `Objs[面板名]`；`Init.movePanel(N)`（L18047）构建移动端小浮窗。

`Init.fullPanel(N)` 编号：`0`=更新日志、`3`=论坛、`4`=任务、`5`=动态、`6`=用户搜索、`7`=财富榜、`9`=离线留言、`10`=角色设置、`13`=商城、`15`=房间信息、`509`=商店、`510`=共享媒体、`512`=我的主页

`Init.movePanel(N)` 编号：`0`=股票、`1`=便签、`2`=配对、`10`=银行

```js
// 标准打开流程：先构建再显示
Probe.init.demandHolder || Init.fullPanel(510);
panelAnimate(16, 1);

// 检查是否已构建
if (Probe.init.forumHolder) {
  panelAnimate(34, 1);   // 已构建直接显示
}
```

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
