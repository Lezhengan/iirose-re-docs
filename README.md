# IIROSE 机器人开发文档

蔷薇花园（iirose.com）第三方机器人开发文档。

> **范围变更说明（2026-09-13）**：本仓库原为 IIROSE 前端逆向文档。为尊重并保证原作者的权益，前端逆向相关内容（还原源码、域名与节点、P2P、Electron 壳、DOM / 面板、HTTP 接口、审查报告等）已从仓库与站点**全部下架**，不再公开。线上只保留**机器人（第三方开发）**相关的 WebSocket 协议文档。

## 文档

docsify 站点位于 [`docs/`](docs/) 目录，打开即浏览：

- 本地预览：`node serve.js` → http://localhost:3001/
- **GitHub Pages 部署**：Settings → Pages → Source 选择 **`main` 分支的 `/docs` 目录**

## 内容（仅保留）

- [第三方开发指南](docs/md/websocket/third-party.md)：机器人 / 自定义客户端接入总览
- [WebSocket 传输层](docs/md/websocket/transport.md)
- [WebSocket 发送命令](docs/md/websocket/commands.md)
- [WebSocket 接收路由](docs/md/websocket/messages.md)

已下架内容见 [docs/README.md](docs/README.md) 的「已下架内容」一节。

> **版权声明**：出于版权考虑，不对此部分代码进行公开。此项目仅作为学习交流使用，支持正版，人人有责。

开发 IIROSE 插件或房间小程序请以官方新版开发文档与 API 为准：官方已提供嵌入式插件、沙盒插件与房间小程序两类接口说明，无需参考本仓库的逆向内容。

## 免责声明

> 用户使用本文档做出任何行为作者不可控，产生的后果文档作者概不负责，包括但不限于使用本文档所提及的功能时机器人账户被封禁等。

## 版权声明

[CC BY-NC-ND 4.0（署名-非商业性使用-禁止演绎）](LICENSE) · Copyright (c) 2026 乐正安 · 仅供个人学习交流，禁止商用
