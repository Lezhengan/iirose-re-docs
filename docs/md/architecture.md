# 应用架构

## 双层结构

IIROSE 客户端 = **Electron 桌面壳 + 网页端应用**，网页端本身又是 **壳页 + iframe 主应用**。

```
Electron 主进程 (app.asar)
 └─ BrowserWindow 加载 https://iirose.com/#device=windows
     └─ 顶层窗口 iirose.com/（26702B 壳脚本，负责设备识别与 iframe 加载）
         └─ iframe[0] → https://iirose.com/messages.html  ← 真正的应用
              ├─ scriptLoader.js   （按需加载 95 个功能模块）
              ├─ jquery.js
              └─ 内联 1.4MB packed 脚本（已还原为 messages.js，36600 行）
```

- 网页代码必须在 `frames[0]`（messages.html 层）运行，`window.Main` 在 iframe 内被 Electron preload 的 IPC 接口占用。
- 应用逻辑集中在这套命名空间：`Utils` / `Objs` / `Probe` / `Variable` / `Temporary` / `Assets` / `Mod` / `Init` / `Fallback` / `Info`。

## 页面流程

```
index.html（引导壳）
 ├─ 检查 localStorage.device / 登录态
 ├─ 未登录/游客 → messages.html   ← 主应用（聊天/房间/媒体）
 ├─ 已退出登录 → i.html           ← 登录/注册页
 └─ 微信小程序(device=9) → lib/html/wechat/index.html
```

设备标识：`windows=7`、`mac=6`、`linux=10`（网页）/`11`（桌面壳）、`Android=5`、`iOS=2`、`wechat=9`。

## 启动流程（messages.html）

1. `Init.beforeShowBf` 初始化本地状态（`Utils.database` 读取 localStorage）
2. 建立 WebSocket（节点选择见[域名与节点](md/domains.md)）
3. 登录态校验：`localStorage.cookie` 存在则直接进房，否则弹登录框
4. 进房：`socket.send("%房间id")`
5. `Probe.init` 按需初始化面板：worker / mapHolder / sessionHolder / homeHolder / userIcon / markdown / emojiJs / imgClip 等
