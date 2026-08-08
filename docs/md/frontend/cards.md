# 花园自带卡片 DOM

前端大量使用**卡片式**动态渲染。本文汇总常用卡片的 DOM 结构与定位选择器（全部来自 `messages.js` 模板，可配合 CSS/JS 定制）。

## 一、歌曲卡片（媒体列表 `mediaListHolder`）

「点播」面板（面板编号 8）的歌单列表（reference/src/messages.js L22248-22256），每条一首歌：

```
.cardTag（歌曲卡片）
├─ .cardTagBg mdi-image-outline（封面背景）
│  └─ .cardTagBgImg img（封面图）
├─ .cardTagI
│  ├─ .cardTagAvatar（点歌手头像 → getProfile 名片）
│  ├─ .cardTagName（歌手名）
│  ├─ .cardTagSex（性别图标 ♂/♀）
│  ├─ .cardTagTime（点播时间）
│  └─ .cardTagNumber（#序号）
├─ .cardTagLineBox > .cardTagLine（装饰分割线）
└─ .cardTagC（歌名加粗 + 歌手小字）
```

```css
/* 示例：歌曲卡片圆角 + 阴影 */
.cardTag { border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.15); }
```

## 二、房间卡片（地图/热推通用）

由 `mapHolder.function.getRoomModHtml` 生成（reference/src/messages.js L22800），地图树、热推、选房器等所有房间列表通用：

```
.mapHolderRoomListItem.shopItem（房间卡片，属性 rid = 房间id）
├─ .fullBox 封面图（165.6×165.6）
└─ 文字区
   ├─ 房间名（textOverflowEllipsis，加粗）
   ├─ 房间简介（textOverflowEllipsis2Line，两行省略）
   └─ 底部行：.userStatusBox（在线状态点）+ 在线人数 + 性别/状态图标
```

- 点击 → `mapHolder.function.event(0, rid)` 进入房间
- 右键 → 房间目录/更多
- **定位**：`Objs.roomSplashHolder.content.find('.mapHolderRoomListItem[rid="房间id"]')`

## 三、聊天消息（群聊 `#msgholder`）

`msgfetch(t,o,i,a)` 渲染每条消息（reference/src/messages.js L14034）：

```
.msg（单条消息，属性 t=时间戳、data-id、effectNum 动画）
├─ .msgcontent
│  ├─ .roomChatContentBox
│  │  └─ .room_chat_content（气泡）
│  │     ├─ .chatContentHolder.publicMsgHasBubble（文本容器，bgDark/bgLight）
│  │     └─ .systemCardMediaShareImg（媒体分享卡片图）
│  ├─ .PubChatUserSettings（悬停操作：mdi-reply 回复、更多）
│  └─ .PubChatUserInfo
│     ├─ .senderP（发送者名，data-name，点击复制/查看）
│     └─ .senderRank（等级）
├─ .msgavatar（头像，data-uid、n="1_x" 属性，点击 → 名片）
└─ .accessoryImg / .accessoryImg2（头部装饰物）
```

其它消息类型：

| 类型 | 结构 |
|---|---|
| 系统消息 | `.msg.pubMsgSystem > .pubMsgSystemBox`（`.pubMsgSystemIcon` 头像 + `.pubMsgSystemMsg` 正文） |
| 时间分隔 | `.pubMsgTime > .pubMsgTimeBody` |
| 角色扮演 | `.roleLogMsgChild`（rolePlay 面板日志） |
| 纯文本流 | `.pureLogMsgChild`（简洁模式：`.pureLogMsgChildName` 名字 + `.pureLogMsgChildContent` 内容） |

**数据属性**是脚本过滤/统计的利器：

```js
// 例：遍历当前房间最近消息，取出发言者 uid 与原文
document.querySelectorAll('#msgholder .msgavatar').forEach(el => {
  console.log(el.dataset.uid, el.parentNode.querySelector('.chatContentHolder').innerText);
});
```

```css
/* 示例：隐藏系统消息 */
.msg.pubMsgSystem { display: none; }
/* 示例：自己消息左对齐样式调整 */
.msg[style*="float:right"] { ... }
```

## 四、信箱留言卡片（`leaveMsgHolder`）

「信箱」= `leaveMsgHolder`（面板编号 9，`mailbox` 图标），留言存 localStorage `"leaveMsg"`（3 天内自动清理，`clearOldMsg` L22448）。每条留言（reference/src/messages.js L22441）：

```
.cardTag（信箱留言卡片）
├─ .cardTagBg mdi-image-outline（背景）
│  ├─ .cardTagBgImg（封面/图片）
│  └─ .cardTagNew（新留言红点）
├─ .cardTagI
│  ├─ .cardTagAvatar（留言者头像，点击 → getProfile 名片）
│  ├─ .cardTagName（留言者名字）
│  ├─ .cardTagSex（性别）
│  ├─ .cardTagTime（留言时间）
│  └─ .cardTagNumber（#序号）
├─ .cardTagLineBox > .cardTagLine（分割线）
└─ .cardTagC（留言内容，含「回复xxx/商品订单/关注店铺」等类型自动排版）
```

内容行 `.cardTagC` 内会按留言类型自动渲染：回复评论（`cardTagLineLeaveMsg` 引用原文）、订单/退款/评价（`.leavemsgView` 点击跳转对应面板）、打赏、收藏等。

> 官方信箱**没有**任何"回赞"按钮，以下脚本是**自定义增强示例**（借官方 `+*uid` 点赞命令自己实现），非平台功能。

**自定义脚本示例：信箱自动回赞**（遍历留言 → 取名字 → 拿 uid → `+*uid` 点赞，localStorage 去重）：

```js
(function () {
  const KEY = 'iirose_liked';
  const liked = JSON.parse(localStorage.getItem(KEY) || '[]');
  const save = () => localStorage.setItem(KEY, JSON.stringify(liked));
  const userJson = Objs.mapHolder.Assets.userJson;

  // 在线用户：userJson 键 = 名字小写，值第 9 项（a[8]）就是 uid
  const uidOnline = name => {
    const u = userJson[name.toLowerCase()];
    return u ? u[8] : null;
  };

  // 离线用户：发 whois 查询，hook 响应提取 uid（+ 响应数据第 4 段 = uid）
  const pending = [];
  const orig = socket.__onmessage;          // 接收总入口（L13350）
  socket.__onmessage = function (e) {
    if (e[0] === '+' && pending.length) {
      const s = e.substr(1), t = s[0];
      if (t === '2' || t === '3') {          // whois 响应类型
        praise(s.substr(1).split('>')[3]);   // [0]颜色 [1]头像 [2]性别 [3]uid
        pending.shift();
      }
    }
    return orig.apply(this, arguments);
  };

  const praise = uid => {
    if (uid && !liked.includes(uid)) {
      socket.send('+*' + uid);               // 点赞
      liked.push(uid); save();
    }
  };

  document.querySelectorAll('#leaveMsgHolder .cardTag').forEach(card => {
    const name = card.querySelector('.cardTagName')?.innerText;
    if (!name) return;
    const uid = uidOnline(name);
    if (uid) return praise(uid);
    pending.push(name);
    socket.send('++' + name.toLowerCase());  // whois 查询（与 getProfile 相同）
  });
})();
```

**uid 获取方式（重要）**：

| 场景 | 方式 |
|---|---|
| 在线用户 | `userJson[名字小写][8]`（`userJson` 键是**名字小写**，值第 9 项为 uid） |
| 离线用户 | `socket.send('++' + 名字)` 发 whois 查询 → 服务器 `+` 响应，数据 `[颜色>头像>性别>uid>...]` **第 4 段就是 uid**（reference/src/messages.js L1869 `d[4]=e[3]`） |

> whois 响应会照常走 `whois()` 渲染名片（可能弹出名片面板），这是官方交互路径（`getProfile` 传名字同样会弹）；脚本可在拿到 uid 后关闭面板。
> 留言数据本身不含 uid，但**离线用户完全可查**——通过 whois 查询即可拿到。

---

> ⚠️ **免责声明**：本节仅供**学习与逆向分析交流**。基于上述 DOM/数据属性进行消息拦截、批量统计、自动操作等行为**可能不被平台允许**，可能导致账号封禁。请勿用于刷屏、轰炸、隐私爬取或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
