# IIROSE 蔷薇花园 · 前端逆向文档

> ⚠️ **版本提示**：本文档基于当前的 **IIROSE 4** 逆向构建。若后续花园更新 **IIROSE 5**（据传会大幅重构前端），文中 DOM 操作、前端函数与 WS 命令**大多可能失效**，请以最新客户端为准。

> 基于对 **iirose.com 网页端** 与 **Electron 桌面壳** 的完整逆向整理。
> 本仓库可直接部署到 GitHub Pages（docsify 驱动，零构建）。

## 项目说明

IIROSE（蔷薇花园）是一个多功能网页聊天室。本项目通过解包/还原其前端脚本，按 **5 大类**系统整理了：

### 架构与认证

| 章节 | 内容 |
|---|---|
| [应用架构](md/architecture.md) | 网页端 + Electron 壳的层级结构 |
| [登录认证](md/auth.md) | 已有账号/游客登录、密码加密、会话机制 |
| [域名与节点](md/domains.md) | 服务器域名体系与 WS 节点选择 |
| [Electron 壳](md/electron.md) | 桌面壳 IPC 与安全特性 |

### 网络协议

| 章节 | 内容 |
|---|---|
| [HTTP 接口](md/http-api.md) | 媒体解析/翻译/搜索/上传等全部 HTTP API |
| [P2P（WebRTC）](md/p2p.md) | PeerJS 信令、TURN、通话与大文件传输 |
| [WS 传输层](md/websocket/transport.md) | WebSocket 连接、TLS 指纹、压缩分帧 |
| [WS 发送命令](md/websocket/commands.md) | 客户端 → 服务器命令大全 |
| [WS 接收路由](md/websocket/messages.md) | 服务器 → 客户端消息前缀路由 |

### 前端专区（核心）

**函数与脚本**

| 章节 | 内容 |
|---|---|
| [前端函数调用速查](md/functions.md) | `functionBtnDo`/`moveinputDo`/`jumpToMaxPplRoom` 等用法示例 |
| [操作 DOM / JS 自定义](md/frontend/operations.md) | 收发 hook 点、图床拼接、脚本示例 |
| [可交互 DOM 全解](md/frontend/interactive.md) | 全部可点击/输入/拖动的元素 + 自定义操作 |

**DOM 与组件**

| 章节 | 内容 |
|---|---|
| [DOM 结构](md/frontend/dom.md) | `messages.html` 全部 DOM id 速查 |
| [DOM 完整索引](md/frontend/dom-index.md) | 全部静态 id + class 统计 + 图标全集 |
| [侧边栏](md/frontend/sidebar.md) | `functionHolder` 侧边栏结构与全部按钮 |
| [用户名片](md/frontend/profile-card.md) | 资料卡结构、全部字段、点赞/点踩命令 |
| [花园卡片 DOM](md/frontend/cards.md) | 歌曲卡片、房间卡片、聊天消息、信箱卡片 |
| [弹窗系统](md/frontend/dialogs.md) | `Utils.sync` 确认/输入框、选择菜单、通知写法 |
| [面板系统](md/features/panels.md) | `Objs` 25 个面板 |

### 房间与数据

| 章节 | 内容 |
|---|---|
| [热推房间](md/features/hot-rooms.md) | 「热推的房间」面板完整实现 |
| [地图与房间数据](md/features/map.md) | 地图树结构、房间列表 |
| [核心全局对象](md/global-objects.md) | `Utils` / `Variable` / `Probe` 等 |

## 逆向产物

| 文件 | 说明 |
|---|---|
| <a href="reference/src/messages.js" target="_blank">messages.js</a> | 登录后主应用还原源码（36600 行） |
| <a href="reference/src/messages.html" target="_blank">messages.html</a> | 主应用页面（全部 DOM 定义，1.6MB） |
| <a href="reference/src/login.js" target="_blank">login.js</a> | 登录/注册页还原源码 |
| <a href="reference/src/index.js" target="_blank">index.js</a> | 引导壳还原源码 |
| <a href="reference/extract_output.json" target="_blank">extract_output.json</a> | 接口/命令提取原始数据 |

> 逆向产物为原始 JS/JSON 文件，点击上方链接会在浏览器中**直接打开源码文本**（新标签页）。

## 部署到 GitHub Pages

本仓库结构：**`docs/` 目录即文档站点**（`docs/index.html` 是 docsify 入口）。

1. 将本仓库推送到 GitHub
2. 仓库 **Settings → Pages → Source** 选择 `main` 分支、目录选 **`/docs`**
3. 访问 `https://<用户名>.github.io/<仓库名>/` 即完成部署

本地预览：

```bash
node serve.js
# 打开 http://localhost:3001/
```

## 免责声明

> ⚠️ 本文档仅供**学习与逆向分析交流**，请勿用于商业或违规用途。

**可能不被平台允许、请勿实际使用的内容：**

- 消息拦截 / hook（`socket.__onmessage`、`msgfetch` 包装等）
- 绕过前端过滤器直接 `socket.send` 发送消息、弹幕、广播
- 自动发言、自动回复、机器人化操作
- 批量抓取用户信息、房间数据或爬取接口
- 模拟点击、外挂、任何影响他人体验的行为

**其他注意：**

- 客户端代码会随官方更新而变化，部分内容可能失效
- 违规使用（刷屏、轰炸、骚扰、爬取隐私等）可能导致**账号封禁**，后果由使用者自行承担
- 各篇文档页尾均附有相同免责声明

---

[CC BY-NC-ND 4.0（署名-非商业性使用-禁止演绎）](LICENSE) · Copyright (c) 2026 乐正安 · 仅供个人学习交流，禁止商用
