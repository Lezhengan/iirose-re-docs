# 游戏模拟器面板

「游戏模拟器」面板 `gameEmulatorHolder`（`movePanel` 编号 9）是一个**运行在 `<iframe>` 里的 GBA 模拟器**（IodineGBA），外壳是一台画在面板里的"掌机"（带屏幕、十字键、A/B、L/R、SELECT/START）。它**不通过 socket 与服务器交互**，游戏 ROM、BIOS、存档都在本地 iframe 里跑，只有"分享截屏"会走 HTTP 上传接口。

## 入口链路

```
输入框快捷命令 @-（L2875-2876）
  → Probe.init.gameEmulatorHolder || Init.movePanel(9)
  → panelAnimate(57, 1)
侧边栏按钮「游戏机」(functionBtnDo(20))
```

- 输入框快捷命令：`@-`
- 标题：`languageArr[24][23]` = 「游戏机」（简体 L11149 / 繁体「遊戲機」L10804）
- 面板动画编号：57（`panelAnimate` case 57，L15120-15122：打开/关闭时同步调用 `sleep(t)` 暂停/恢复模拟器）
- 侧边栏按钮编号：20

## 面板结构（DOM）

面板由 `Mod.template(14)` 外壳（320 × 568.89px，居中）+ `Mod.template(12)` 标题区 + 两个底部按钮（电源 / 插卡）构成（L19621-19623），内容区在 `function.init()` 里一次性填充（L19765）：

```
#gameEmulatorHolder（320 × 568.89px）
├── div:eq(0) 标题栏（右上角：绿色电源LED + 齿轮设置按钮）
├── div:eq(1) 内容区 content
│   ├── screen（顶部 213.33px）
│   │   ├── input（隐藏，height:0；桌面端用于捕获键盘按键）
│   │   ├── iframe（模拟器画面，src = 模拟器页面）
│   │   └── div.fullBox（屏幕玻璃遮罩 screenGlass）
│   └── controler（手柄区，初始 display:none，开机后淡入）
│       ├── L / R 键（data-key 9 / 8）
│       ├── 十字方向键（data-key 6=上 / 4=右 / 7=下 / 5=左）
│       ├── B / A 键（data-key 1 / 0）
│       └── SELECT / START（data-key 2 / 3）
└── div:eq(2) 底部按钮区 contentItemBtn
    ├── button:eq(0) 电源（powerBtn，onclick = event(0)）
    └── button:eq(1) 插卡（onclick = event(1)，选卡）
```

关键 DOM 引用（L19765）：`screenFrame`（iframe）、`screenGlass`、`inputBox`（键盘捕获）、`controler`、`powerBtn`、`controlBtnArr = controler.find("div[data-key]")`、`powerLED`。

## Variable / Assets（L19623-19659）

| 字段 | 值/含义 |
|---|---|
| `Variable.power` | 0/1，电源状态 |
| `Variable.alive` | 1=可用；被置 0 后（刷新被拒）禁用所有按钮（L19745-19756） |
| `Variable.ready` | 模拟器页面加载完成后置 1（`powerOn()`，L19739-19741） |
| `Variable.mode` | `"gba"`（init 里写死） |
| `Variable.noSupportSound` | 纯 iOS 置 1 并强制音量 0 |
| `Assets.src` | `https://vm.iirose.com/lib/game/emulator/gba/`（模拟器页面地址） |
| `Assets.bios` | `https://vm.iirose.com/lib/game/emulator/gba/bios.bin`（BIOS） |
| `Assets.romPathJson` | 卡号 → ROM 文件名映射（见下表） |
| `Assets.settings` | `JSON.parse(Utils.settings("gameEmulatorHolder") || '{"gba":{},"gbc":{}}')`，localStorage 持久化 |
| `Assets.keypadArr` | `[90,88,222,13,39,37,38,40,83,65]`（键盘 keyCode 表，见按键映射） |
| `Assets.keyBtnPosArr` | `[7,6,8,9,3,5,2,4,1,0]`（键盘按键 → 屏幕手柄按钮 data-key 的映射） |

> `gameWindow` / `IodineGUI`（含 `Iodine` 核心、`mixerInput`、`emulator_target`）由 iframe 内的模拟器页面注入，**不在 messages.js 中定义**（待核实其赋值点，位于 `vm.iirose.com` 站外资源）。

## 内置 ROM 卡带（插卡菜单）

`event(1)`（L19673-19684）弹出 `Assets.selectJSON.gbaRom` 菜单：

| 值 | 名称 | `romPathJson` | ROM URL |
|---|---|---|---|
| `_` | 无卡（加载 BIOS） | — | `Assets.bios` |
| `0` | 自定义（输入 ROM 链接） | — | 用户输入的 `settings.romURL` |
| `*` | 设置自定义 | — | 弹输入框 |
| `1` | 精灵宝可梦 漆黑的魅影 | `pocketmon` | `.../rom/pocketmon.gba` |
| `2` | 最终幻想 6 | `ff6` | `.../rom/ff6.gba` |
| `3` | 塞尔达传说 缩小帽 | `zelda` | `.../rom/zelda.gba` |
| `4` | 恶魔城 晓月圆舞曲 | `castlevania` | `.../rom/castlevania.gba` |
| `5` | 光明之魂 2 | `soul2` | `.../rom/soul2.gba` |
| `6` | 火焰纹章 冰封烈焰 | `fireEmblem` | `.../rom/fireEmblem.gba` |

ROM 完整地址格式（L19689）：`https://vm.iirose.com/lib/game/emulator/gba/rom/<romPathJson[卡号]>.gba`

`loadGame()`（L19687-19689）：无卡或"自定义但未填链接" → 加载 BIOS；否则加载对应 ROM 或自定义链接。

## 键盘 ↔ 手柄按键映射

`keypadArr` 是键盘 keyCode 表，`keyBtnPosArr` 把"键盘键位"对应到"屏幕按钮 data-key"。核心是 Iodine 标准键值：`0=A, 1=B, 2=SELECT, 3=START, 4=右, 5=左, 6=上, 7=下, 8=R, 9=L`（L19733-19737 直接透传给 `Iodine.keyDown/keyUp`）。

| 键盘键 | keyCode | 手柄按键 | data-key |
|---|---|---|---|
| Z | 90 | A | 0 |
| X | 88 | B | 1 |
| `'` | 222 | SELECT | 2 |
| Enter | 13 | START | 3 |
| → | 39 | 右 | 4 |
| ← | 37 | 左 | 5 |
| ↑ | 38 | 上 | 6 |
| ↓ | 40 | 下 | 7 |
| S | 83 | R | 8 |
| A | 65 | L | 9 |
| 空格 | 32 | 全屏切换 | —（L19785） |

- 键盘捕获在隐藏 `inputBox` 的 `keydown/keyup` 上（L19779-19786）；按下时对应屏幕按钮变透明（`opacity:0.1`）做视觉反馈。
- 移动端直接 `touchstart/touchend` 绑定到屏幕按钮（L19766-19771）。

## 设置菜单（齿轮）

`settings()`（L19698-19728）弹出 `Assets.selectJSON["1_0"]`：

| 值 | 项 | 行为 |
|---|---|---|
| `0` | 全屏 | `makeObjFullScreen(screen)` |
| `1` | 音量调节 | 0-10 档，`Iodine.enableAudio/disableAudio` + `mixerInput.setVolume(t/10)`，存入 settings.volume |
| `2` | 分享截屏 | `emulator_target.toDataURL("image/jpeg")` → `Utils.uploadImg` 上传 → `autoSendLink` 把图片链接插入输入框 |
| `?` | 帮助 | 弹窗展示操作说明（L19723） |
| `8` | 重载 | `Iodine.restart()` |

## 命令 / 报文

> 该面板**没有 `socket.send` 游戏指令**，游戏逻辑完全在本机 iframe 内。相关"副作用"如下表：

| 操作 | 途径 | 说明 |
|---|---|---|
| 开机/关机 | `event(0)`（L19663-19671） | 开机：点亮 LED + 淡入手柄 + `screenFrame.src = Assets.src`；关机需二次确认 |
| 换卡 | `event(1)`（L19673-19684） | 仅本地，不联网 |
| 分享截屏 | HTTP `Utils.uploadImg` + `autoSendLink`（L19718-19719） | 上传图片、把链接写进当前输入框（非自动发送） |
| 睡眠模式联动 | `panelAnimate(57)` → `sleep(t)`（L15120-15122） | 打开面板 `sleep(1)` 继续、关闭 `sleep(0)` 暂停，电源 LED 绿/红切换 |
| 刷新拦截 | L845 | 游戏运行中（`Variable.ready && gameWindow.isGame`）拦截刷新，走 `doOnReload` 二次确认 |

## 刷新拦截与"离线"降级（L19743-19757）

运行中刷新会弹确认框；若用户拒绝刷新，客户端进入"离线保护"状态：

1. `Utils.service.disconnect()` 断开 socket；
2. `Variable.alive = 0`，电源 LED 变红；
3. 底部两个按钮被改写：电源键变成"确认刷新"，插卡键弹"此功能已被禁用，请您尽快存档后刷新"；
4. 之后 `panelAnimate(57)` 会直接提示禁用（L15121）。

## 持久化

- `Utils.settings("gameEmulatorHolder", JSON.stringify(settings))`（L19730-19731）——保存 `{"gba":{"card","romURL","volume"}, ...}`；
- 面板恢复：`panelSave` 把显示中的 `gameEmulatorHolder` 记入 `panelRecover`（L3415-3432），刷新后 `panelRecover` case 走 `functionBtnDo(20)` 重新打开（L33598-33599）。

## 关键源码位置（messages.js）

| 位置 | 内容 |
|---|---|
| L2875-2876 | `@-` 命令 → `Init.movePanel(9)` + `panelAnimate(57)` |
| L19621-19790 | 面板构建 + `function`（event/loadGame/sleep/settings/saveSettings/keyDown/keyUp/powerOn/doOnReload/init） |
| L19657-19659 | Assets（ROM 路径 / 键位表） |
| L19689 | ROM/BIOS 加载逻辑 |
| L19723 | 帮助文案（键位说明、休眠/存档注意事项） |
| L19765-19786 | init：DOM 构建 + 键盘/触屏绑定 |
| L15120-15122 | 面板动画 57 → `sleep(t)` 暂停/恢复 |
| L845 | 游戏运行中拦截页面刷新 |

---
> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
