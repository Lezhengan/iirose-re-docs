# 核心全局对象

应用逻辑集中在以下命名空间（`frames[0]` 内，即 messages.html 层）。注意：`window.Main` 在该层被 Electron preload 的 IPC 接口占用，与网页逻辑无关。

## `Utils`（工具类，约 100 个方法）

| 成员 | 功能 |
|---|---|
| `Utils.privateChat` | 私聊逻辑 |
| `Utils.service` | 业务服务（`moveinputDo` 输入框命令、`admin` 房管、`parseText`、`pmOfflineMsg`、`isShareMediaPlaying`、`seekDemandMedia` 等） |
| `Utils.View` | 视图栈 / 面板切换（`addToStack`） |
| `Utils.RTC` | WebRTC 通话 |
| `Utils.P2P` / `Utils.Call` | P2P 信令 / 通话 |
| `Utils.AI` | AI 功能 |
| `Utils.mediaParse` | 媒体链接解析 |
| `Utils.emojiManager` | 表情管理 |
| `Utils.Filter` | 消息过滤（`pubMsg` 发言过滤、`run` 弹幕过滤） |
| `Utils.Mobile` / `Utils.LRUD` / `Utils.AppUtils` | 移动端 / LRU缓存 / 壳交互 |
| `Utils.database` | localStorage 封装（`roomHistory` 历史记录等） |
| `Utils.uploadImg` | 图片上传 |
| `Utils.blobToDataURL` / `dataURLtoBlob` / `deepCopy` / `copyData` | 工具函数 |
| `Utils.buildSelect` / `buildSelect2` / `buildPm` / `buildPm` | 组件构建 |
| `Utils.smallTools` | 小工具（`combineArtist` 艺术家合并等） |
| `Utils.sync` | 同步弹窗（确认框等） |
| `Utils.danmakuMode` / `adjustVideoSize` / `bgMove` | 弹幕模式 / 视频适配 / 背景移动 |

## `Variable`（全局状态）

```js
Variable = {
  coin,            // 金币
  room,            // 当前房间
  roomn,           // 当前房间名
  whoisArr,        // 房间在线用户列表
  myUserJson,      // 我的用户信息
  Stack: { URInfo: [] },   // 视图栈
  Text: { alarm, alarmGood }, // 提示文本
  ...
}
```

## `Info`（运行信息）

```js
Info = { room, admin, me, lang }
// Info.me: 用户信息 { name, uid, sex, rank, avatar, telVerified, ... }
// Info.lang: 语言（CN→undefined / JP / 其他）
```

## `Assets`（资源表）

```js
Assets = {
  roomJson,          // 房间详情映射
  roomNameJson,      // 房间id → 房间名
  subscribeRidArr,   // 订阅房间列表
  notiEmoji,         // 通知表情
  ...
}
```

## `Probe`（模块探测/开关）

```js
Probe.init = { worker, mapHolder, sessionHolder, homeHolder, userIcon, markdown, emojiJs, imgClip, ... }
// 已初始化面板标记，配合 Init.fullPanel 按需加载

Probe = {
  admin: { blockDemand, blockPubChat, blockDanmaku, ... },  // 房内管理限制
  telRequired,       // 是否要求绑定手机
  getMediaLink,      // 媒体解析开关
  danmakuModeCurrent,// 当前弹幕模式
  mapOpenType,       // 地图打开类型
  roomLoaded,        // 房间是否已加载
  emptyMediaPlayer,  // 空媒体播放器
}
```

## `Mod`（模板/文本）

```js
Mod.text(语言数组索引, key, 替换模式)   // 多语言文本
Mod.template(模板编号, ...)             // DOM 模板生成
```

## `languageArr`（多语言）

- 6 套语言包：`languageArr[0..5]` 或其他索引体系
- 简体中文关键包：`languageArr[7]`（界面）、`languageArr[24]`（功能名，`[8]`=「热推的房间」）、`languageArr[36]`（地图/弹幕详情）
- 从网页 `languageType` 切换：0日/1英/2繁/3简/4韩/5法

## `Cookie()` / `Temporary`

```js
Cookie(key, value)     // cookie 读写（登录态等）
Temporary = { initPm, taskP, postP, timelineP, ... }  // 临时状态
```

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
