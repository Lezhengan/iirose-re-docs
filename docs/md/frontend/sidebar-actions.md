# 侧边栏按钮内部行为（functionBtnDo 全解）

> 侧边栏所有按钮统一走全局函数 `functionBtnDo(编号, 按钮, 参数)`（L14436），本文给出每个编号点击后的**实际内部执行**（源码行号基于 `reference/src/messages.js`）。
> 对应面板的 DOM 结构见[侧边栏](md/frontend/sidebar.md)与[面板系统](md/features/panels.md)；编号与 @命令速查见[前端函数调用速查](md/functions.md)。

## 通用流程（L14437-14445）

点击任意侧边栏按钮时，若侧边栏正显示：

1. **先关闭侧边栏**：非移动端 `#functionHolder.css("left", 宽度)` 滑出回退 + `#functionHolderDarker.fadeOut(250)`；移动端 `body` 平移还原
2. 若按钮带 `did` 属性（淡出动画期间残留），淡出回调 `removeAttribute("did")` 清除——用于防止**淡出动画未结束就重复点击**时重复触发
3. 然后执行下方 `switch(e)` 对应编号

> 例外：**开关类按钮不会关闭侧边栏**。`Constant.Others.functionBtnNoCloseArr = [90, 91, 92, 93, 99, 121, 122]`（L9688）——空媒体播放器 / 睡眠 / 影院 / 壁纸加载 / 壁纸视频 / 背景移动 / 歌词，在 PC 上点击后侧边栏保持打开，方便连续操作；移动端则全部关闭。

## 一、版块（L14447-14516）

| 编号 | 按钮 | 内部执行 | 说明 |
|---|---|---|---|
| 1 | 歌单 | `moveinputDo("@")`（`did` 防重） | 打开共享媒体歌单面板 |
| 2 | 信箱 | `moveinputDo("@!")` | 打开离线留言 `leaveMsgHolder` |
| 3 | 论坛 | `moveinputDo("@]")` | 打开论坛 `forumHolder` |
| 4 | 任务板 | `moveinputDo("@%")` | 打开任务 `taskHolder` |
| 5 | 朋友圈 | `moveinputDo("@&")` | 打开动态 `timelineHolder` |
| 6 | 搜索 | `moveinputDo("@#")` | 打开用户搜索 `userSearchHolder` |
| 7 | 排行榜 | `moveinputDo("@^")` | 打开财富榜 `wealthHolder` |
| 101 | 房间推荐 | `moveinputDo("@+")` | 打开热推房间 `roomSplashHolder`（见[热推房间](md/features/hot-rooms.md)） |

## 二、消费（L14468-14516）

| 编号 | 按钮 | 内部执行 | 说明 |
|---|---|---|---|
| 8 | 商城 | `moveinputDo("@}")` | 打开商城 `mallHolder` |
| 9 | 炒股 | `moveinputDo("@)")` | 打开股票 `stockOldHolder` |
| 10 | 商店 | `password ? 首次 moveinputDo("@$") : _alert("需登录")` | **未登录不响应**，弹 `languageArr[7][34]` |
| 11 | 活动 | `Init.fullPanel(508)` + `panelAnimate(42, 1)` | 赚钱/活动面板，**不走输入框命令** |
| 110 | 银行 | `moveinputDo("@.")` | 打开银行 `bankHolder` |
| 111 | 三方 | `moveinputDo("@;")` | 打开伴侣 `partner` |
| 112 | 加密币 | `Init.movePanel(12)` + `panelAnimate(25, 1, 0, "cryptoHolder")` + `socket.send("Tk#")` | 打开行情面板并**请求加密币行情** |
| 113 | 股票 | `Init.movePanel(13)` + `panelAnimate(25, 1, 0, "stockHolder")` + `socket.send("Te#")` | 打开行情面板并**请求股票行情** |
| 114 | A股 | `Init.movePanel(14)` + `panelAnimate(25, 1, 0, "chinaHolder")` + `socket.send("Ta#")` | 打开行情面板并**请求A股行情** |

## 三、工具（L14483-14516）

| 编号 | 按钮 | 内部执行 | 说明 |
|---|---|---|---|
| 12 | 便签 | `moveinputDo("@=")` | 打开便签 `noteHolder` |
| 13 | 骰子 | `moveinputDo("@_")`（`did` 防重） | 打开骰子选择器 |
| 14 | 配对 | `moveinputDo("@*")` | 打开配对 `pairHolder` |
| 15 | 链接（心情正） | `Init.fullPanel(501)` → `Objs.moodHolder.function.event(2, type=1)` + `input.val("")` + `panelAnimate(7, 1)` + `focusI(input)` | 打开**发心情（正面）**面板并自动聚焦输入框 |
| 16 | 心情负 | 同 15，`type=2` | 打开发心情（负面）面板 |
| 17 | 符号 | `Init.movePanel(3)` + `panelAnimate(29, 1)` | 打开符号 `symbolsHolder`（浮动面板） |
| 18 | 翻译机 | `Init.movePanel(4)` + `panelAnimate(30, 1)` | 打开翻译 `translateHolder`（浮动面板） |
| 19 | 浏览器 | `9==device ? _alert : Init.movePanel(5) + panelAnimate(31, 1)` | 内置浏览器 `browserHolder`；**小游戏端（device=9）拒绝** |
| 20 | 游戏机 | `moveinputDo("@-")` | 打开游戏模拟器 `gameEmulatorHolder` |
| 21 | 终端 | `moveinputDo("@~")` | 打开皮肤/外壳 `shellHolder` |
| 22 | 贴吧 | `moveinputDo("@?")` | 打开用户主页/论坛 `postHolder` |

## 四、功能（L14517-14544）

| 编号 | 按钮 | 内部执行 | 说明 |
|---|---|---|---|
| 50 | 声音 | `Init.fullPanel(503)` + `panelAnimate(9, 1)` | 打开声音设置 `buzzHolder` |
| 51 | 状态 | `Init.fullPanel(502)` + `panelAnimate(8, 1)` | 打开个人状态 `statusHolder` |
| 52 | 签名 | `password ? moodHolder.event(2, type=0) + input.val(当前心情) + panelAnimate(7, 1) + focusI(input) : _alert` | 修改心情，**自动预填当前心情文本**；未登录弹提示 |
| 53 | 广播 | `password ? Init.fullPanel(500) danmakuSendHolder + panelAnimate(6, 1) + focusI(input) : _alert` | 打开弹幕发送 `danmakuSendHolder` 并聚焦；**需登录** |
| 54 | 绘画 | 未初始化 `Init.movePanel(7)`，否则 `panelAnimate(32, 1)` | 打开绘画 `paintHolder`（浮动面板） |
| 55 | 通话 | `Init.fullPanel(504)` + `panelAnimate(10, 1)` | 打开通话 `callHolder` |
| 56 | 房间 | `Probe.mapOpenType = 1` + `moveinputDo("@@")` | 打开地图；`mapOpenType` 标记打开方式 |
| 57 | 上传 | `Init.fullPanel(505)` + `panelAnimate(11, 1)` | 打开上传图片 `uploadHolder` |

## 五、系统（L14545-14572）

| 编号 | 按钮 | 内部执行 | 说明 |
|---|---|---|---|
| 80 | 调色盘 | `focusI(inputholdermain)` + `Init.palette()` + `panelAnimate(20, 切换)` | 初始化调色板并打开；`panelAnimate` 第三参用于切换显示/隐藏 |
| 81 | 账号设置 | `Init.fullPanel(2)` + `bgmSeter(4, 背景乐)` / `vidSeter(4, 视频)` 恢复设置 + `panelAnimate(23, 1)` | 打开 `userREHolder`；重复打开会**先恢复用户背景乐/视频设置** |
| 82 | 设置 | `Init.fullPanel(506)` + `panelAnimate(12, 1)` | 打开系统设置 `setupHolder` |
| 83 | 关于 | `Init.fullPanel(507)` + `panelAnimate(13, 1)` | 打开关于 `aboutHolder` |
| 84 | 登出 | `cursorSH(0,1)` + `roomListDarker.fadeIn(250)` → `goLoginPage()` | 显示过渡遮罩后跳登录页 |
| 85 | 角色扮演 | `moveinputDo("@(")` | 打开角色设置 `roleSetHolder` |
| 86 | 系统菜单 | `device==5 且版本<84 ? Main.showMenu() : Utils.service.systemMenu()` | 老 APP 走原生菜单，否则前端菜单 |
| 87 | 重载 | `roomListDarker.fadeIn(250)` → `location._reload()` | 过渡遮罩后整页刷新 |

## 六、开关与选择器（L14573-14656）

> 开关类（90/91/92/93/99/121/122）点击**不关闭侧边栏**（见通用流程）；选择器类（94/97/98/120/123）走 `Utils.buildSelect` 弹菜单。

| 编号 | 项 | 内部执行 | 说明 |
|---|---|---|---|
| 90 | 空媒体播放器 | `Objs.emptyMediaPlayer.switch(!Probe.emptyMediaPlayer)` | 取反切换 |
| 91 | 睡眠模式 | `Utils.sleepMode(!Probe.sleepMode)` | 取反切换 |
| 92 | 影院模式 | `Utils.service.cinemaModeSwitch(1)` | 单次开启 |
| 93 | 壁纸加载 | `Utils.service.wallpaperLoading(!Probe.wallpaperLoading)` | 取反切换 |
| 94 | 系统音量 | `buildSelect(selectArr0_10)` → `Cookie("systemVolume", t)` + `initVolume(2)` | 选值写入 Cookie 并应用 |
| 95 | 剪贴板解析 | APP：`Main.getClipboardData()` 直接解析；网页：`Utils.sync(3, [...])` 弹输入框粘贴 | 解析剪贴板内容为媒体/文本 |
| 96 | 自定义功能菜单 | `Utils.service.functionMenu()` | 弹菜单：清屏 / 锁屏 / **上线位置切换**（见[函数速查](md/functions.md)第九节） |
| 97 | 壁纸模糊 | `buildSelect(selectArr0_10)` → `Cookie("wallpaperBlur", t)` + `backdropFilter: blur(10t px)` | 0 关闭，1-10 为 10-100px 模糊 |
| 98 | 广播模式 | `buildSelect(danmakuSelectArr)` → `Utils.danmakuMode(t)` | 切换弹幕模式 |
| 99 | 壁纸视频 | `Utils.wallpaperVideoSwitch(!Probe.wallpaperVideoSwitch)` | 取反切换 |
| 100 | 用户资料 | `t.getAttribute("u")` → `findUserByUid(uid)` → `buildPm(0, s, 1, i)`；不在线则用 `Assets.extPm[uid]` 缓存 | 点击头像/昵称私聊入口 |
| 120 | 基础背景 | `buildSelect(baseWallpaperSelectArr)` → `baseWallpaper(t)` | 选择基础壁纸；`>1e5` 弹自定义壁纸菜单 |
| 121 | 背景移动 | `Utils.bgMove(!Probe.bgMove)` | 取反切换 |
| 122 | 歌词 | `Utils.lyric(!Probe.lyric)` | 取反切换 |
| 123 | 背景亮度 | `buildSelect(serviceSelectJSON["5_0"])` → `setBgBrightness(t)` | 选择亮度 |

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。所有按钮均为**官方正常功能**，本节仅解释其内部实现原理。其中涉及的输入框命令（`moveinputDo`）、行情请求等均与手动点击等价，不存在额外风险；但请勿将本页信息用于构造脚本批量请求行情、伪造面板状态或干扰他人正常使用，由此产生的一切后果由使用者自行承担。
