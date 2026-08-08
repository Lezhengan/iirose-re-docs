# 面板系统（Objs）

应用 UI 由 `Objs` 对象下的 25 个"面板"（Holder）组成，每个面板有 `Assets`（数据）、`function`（事件/方法）、`Variable`（状态）三件套。面板按需通过 `Init.fullPanel(编号)` 或 `Probe.init.xxxHolder` 初始化。

## 面板清单

| 面板 | 编号 | 功能 |
|---|---|---|
| `mapHolder` | — | 地图 / 房间列表（核心） |
| `roomSplashHolder` | 18 | 热推房间封面（见[热推房间](hot-rooms.md)） |
| `sessionHolder` | — | 会话管理 |
| `mediaManager` | — | 媒体播放管理 |
| `pmHelper` | — | 私聊辅助 |
| `lyricHolder` | — | 歌词 |
| `demandHolder` | 510 | 媒体点播搜索 |
| `danmakuHolder` | — | 弹幕 |
| `homeHolder` | — | 首页/主页 |
| `emojiSearchHolder` | — | 表情搜索 |
| `leaveMsgHolder` | 9 | 离线消息 |
| `bankHolder` | — | 银行/金币 |
| `stockOldHolder` | — | 股票 |
| `cryptoHolder` | — | 加密币行情 |
| `stockHolder` | — | 股票行情 |
| `chinaHolder` | — | 中华币行情 |
| `timelineHolder` | — | 动态（朋友圈） |
| `taskHolder` | — | 任务 |
| `forumHolder` | — | 论坛 |
| `userSearchHolder` | — | 用户搜索 |
| `mediaListHolder` | — | 媒体列表 |
| `userREHolder` | — | 账号设置/认证（改用户名、手机绑定、微信推送） |
| `shopHolder` | — | 商店 |
| `postHolder` | — | 用户主页（信箱/收藏/关注/粉丝/公司） |
| `userMailBox` 等 | 201-211 | 资料子面板 |

## 初始化机制

```js
// 按需加载
Probe.init.demandHolder || Init.fullPanel(510);
// 或通过 Probe.init 标记已初始化模块
// worker / mapHolder / sessionHolder / homeHolder / userIcon / markdown / emojiJs / imgClip ...
```

## 面板通用结构

```js
Objs.面板名 = {
  Assets: { ... },      // 数据（roomJson、当前分页等）
  function: {
    event: function(n, ...) {},  // 面板事件（打开/切换/关闭）
    lib:   function(n, ...) {},  // 模板构建
    onMsg: function(msg) {},     // 处理服务端推送
    action/btnProcesser/...      // 面板特有操作
  },
  Variable: { ... }      // 运行状态
}
```

## 消息到面板的分发

`socket.__onmessage` 按前缀将消息路由到各面板：

| 前缀 | 面板 |
|---|---|
| `%` | `mapHolder`（房间/地图） |
| `T` | `cryptoHolder` / `stockHolder` / `chinaHolder` |
| `~` | `mediaListHolder` |
| `^` | `userSearchHolder` |
| `:` | `timelineHolder` / `taskHolder` / `forumHolder` |
| `&` | 媒体面板 |
| `?` | P2P（RTC 通话） |
