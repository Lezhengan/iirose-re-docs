# Electron 桌面壳

桌面客户端是 **web wrapper**：`BrowserWindow` 直接加载 `https://iirose.com/#device=windows`，无本地渲染代码。逆向产物：`src/main.js`（主进程 957 行）+ `src/preload.js`。

## 壳功能模块

| 模块 | 说明 |
|---|---|
| 单实例锁 | `requestSingleInstanceLock`，二次启动聚焦主窗口 |
| 自动更新 | `electron-updater`，源 `https://iirose.com/work/lab/win/iirose`，自建置顶更新小窗（进度/日志/立即安装） |
| 托盘 | 媒体加载 🎧 / 睡眠 💤 / 退出，Linux 与 Win/mac 两套实现 |
| 桌面共享 | 接管 `navigator.mediaDevices.getDisplayMedia`（三级回退），自建内联 HTML 选择器窗口，支持系统声音回环 |
| 下载管理 | `will-download` 自动存到用户目录，完成后回写页面 |
| 窗口管理 | 最小 600×400、防拖出屏幕、F11 全屏、F12/Ctrl+Shift+I DevTools |
| 多语言 | 6 套语言数组，从网页 `languageType` 动态切换 |

## 通信方式

### 网页 → 壳（preload 暴露 `window.Main`）

`contextBridge` 暴露 13 个 IPC 方法，`ipcMain.on` 处理：

| 方法 | 功能 |
|---|---|
| `getDownloadPath` | 获取下载目录 |
| `setDownloadPath` | 设置下载目录 |
| `fullScreen` / `simpleFullScreen` | 全屏 |
| `openDownloadPath` | 打开下载目录 |
| `openConsole` | 打开 DevTools |
| `clearCache` / `clearWebviewData` | 清缓存 |
| `defaultWindowSize` | 恢复默认窗口尺寸 |
| `openUrl` | 打开外部链接 |
| `getTray` / `setTray` / `setTrayMenu` | 托盘控制 |
| `exit` | 退出应用 |

### 壳 → 网页

主进程用 `win.webContents.executeJavaScript()` 直接向网页注入 JS，**强耦合远程页面内部实现**：

```js
executeJavaScript('frames[0].Utils.AppUtils.trayMenuBtnClick(0)')
```

约定的页面全局：`frames[0].Utils`、`languageType`、`theme`、`Objs.setupHolder` 等。

## 安全特性（注意）

| 配置 | 值 | 风险 |
|---|---|---|
| `webSecurity` | `false` | 关闭同源策略 |
| `allowRunningInsecureContent` | `true` | 允许混合内容 |
| `ignore-certificate-errors` | `true` | 忽略所有证书错误 |
| IPC handler | 无来源校验 | 任何加载内容可调用 `window.Main` 全部接口 |
| `openUrl` | 无白名单 | 可打开任意外部 URL |
| `runJs` | 注入任意 JS | 本质是远程代码执行通道 |

仅桌面共享 handler 做了 `*.iirose.com` 来源白名单校验。

## 自动更新接口

```
https://iirose.com/work/lab/<平台>/iirose/app.php
  android/iiroseW、android/iiroseL、win、mac、linux
```

`app-update.yml` 指向 `https://iirose.com/work/lab/win/iirose`。
