# 第三方开发指南（机器人 & 客户端）

> 本章是**所有第三方开发者**的入口文档，覆盖**机器人**（自动收发消息）和**自定义客户端**（替代官方 UI）两大场景。内容来自官方前端 `messages.js` 与 [koishi adapter-iirose](https://github.com/iirose-plugins/adapter-iirose)（`src/utils/ws/*`、`src/encoder/*`、`src/decoder/*`）的交叉比对，已用一套可运行实现验证。与官方网页端的差异会单独标注。

## 整体架构：WS + HTTP 双通道

蔷薇花园的通信模型是「**WS 承载房间内实时交互 + HTTP 承载辅助服务**」，第三方开发需要同时理解两者：

```
┌─ 第三方客户端 / 机器人 ──────────────────────────────────┐
│                                                          │
│  ┌─ WS（wss://m1.iirose.com:8778）────────────────────┐  │
│  │  • 进房认证（* + JSON）                            │  │
│  │  • 聊天 / 私聊 / 广播 / 弹幕                        │  │
│  │  • 股票 / 银行 / 商店 / 论坛 / 任务 / 朋友圈         │  │
│  │  • 点歌 / 点播 / 媒体管理                           │  │
│  │  • 关注 / 点赞 / 打分 / 转账                        │  │
│  │  • 房主管理 / 踢人 / 禁言                           │  │
│  │  • 用户资料 / 排行榜 / 房间列表                      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ HTTP ────────────────────────────────────────────┐  │
│  │  • 登录（限流检查）  → a.iirose.com/lib/php/system/ │  │
│  │  • 媒体解析（网易云/QQ/B站等）→ a.iirose.com/lib/php/api/ │
│  │  • 翻译  → a.iirose.com/lib/php/function/         │  │
│  │  • 支付  → d.iirose.com                           │  │
│  │  • 文件/图片上传 → f.iirose.com                     │  │
│  │  • 用户名搜索  → 见 http-api.md                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ 静态资源 ────────────────────────────────────────┐  │
│  │  • 头像  → s.iirose.com/images/icon/              │  │
│  │  • 上传回显 → r.iirose.com                         │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

> 详细 HTTP 接口（完整 URL、参数、响应）见 [http-api.md](md/http-api.md)；域名与节点划分见 [域名与节点](md/domains.md)；通用架构见 [应用架构](md/architecture.md)。

## 核心结论

1. **房间内主要业务命令走 WS**：聊天、私聊、广播、切房、进房认证、股票、银行、商店、论坛、任务、朋友圈、排行榜、点歌、点播、关注/点赞/打分/转账、房主管理、媒体管理——这些**房间内交互功能全部通过 WS 完成**。但媒体解析（网易云/QQ音乐/B站等链接解析）、翻译、支付、图片/文件上传、用户名搜索等**辅助功能走 HTTP**（详见 [http-api.md](md/http-api.md)）。
2. **实际可用地址**：第三方机器人用 `wss://{m1|m2|m8|m9|m}.iirose.com:8778`；官方网页端用 `wss://m{1,8,9}.iirose.com:443`（`isSocketHttp` 时为 `ws://…:80`）。
3. **免 HTTP 直连**：登录信息全部放在登录包 `*`+JSON 里（用户名 + 密码 MD5），**不需要先调 HTTP 登录接口拿 uid**，即可完成认证进房。

## 参考实现

- [iirosebot](https://github.com/XCWQW1/iirosebot)（Python，早期机器人，直连 `ws://…:8777` 明文）
- [adapter-iirose](https://github.com/iirose-plugins/adapter-iirose)（Koishi 适配器，TypeScript，直连 `wss://…:8778`，本文主要依据）

## 1. 连接

### 地址

| 客户端 | 地址 | 说明 |
|---|---|---|
| 官方网页/Electron | `wss://m{1,8,9}.iirose.com:443`（`ws://…:80`） | `m1`=CN 主、`m8`=海外/备用、`m9`=防 DDoS 兜底 |
| adapter-iirose | `wss://m.iirose.com:8778` | 并行测速选最快节点（候选 `m1/m2/m8/m9/m`） |
| iirosebot | `ws://m{0,1,2,""}.iirose.com:8777` | 明文，按 `[0,1,2,None,8]` 轮换 |

- 两个端口（`443` 与 `8778`）都指向 WS 服务，`8778` 是给第三方客户端使用的通用入口（adapter 实测可用）。
- 节点列表（adapter `connection.ts`）：`['m1', 'm2', 'm8', 'm9', 'm']`。其中 `m`（不带编号）等价于 `m.iirose.com`。

### 连接参数

```ts
socket.binaryType = 'arraybuffer';   // 必须：接收/发送都按二进制字节流处理
```

adapter 的 `ctx.http.ws(url)` 底层即标准 WebSocket 客户端，Node 端用 `ws` 库、浏览器端用原生 `WebSocket`。

### 节点测速与选择（adapter 做法）

1. 对 5 个节点并行 `wss://{node}.iirose.com:8778` 发连接，测 `open` 事件耗时；
2. 取**延迟最低**的可用节点建立正式连接；
3. 全部失败则按 `5s → 30s → 3min → maxRetryInterval`（默认 30 分钟）递增重试。

## 2. 二进制帧编码（gzip）

WS 收发都可能是二进制，`binaryType='arraybuffer'`：

### 发送（`send.ts`）

```ts
const uintArray = new Uint8Array(Buffer.from(data));
if (uintArray.length > 256) {
  const deflated = zlib.gzipSync(data);
  const out = new Uint8Array(deflated.length + 1);
  out[0] = 1;                  // 首字节 1 = 后续为 gzip
  out.set(deflated, 1);
  socket.send(out);            // ArrayBuffer
} else {
  socket.send(uintArray);      // 原始字节
}
```

- **> 256 字节**才压缩；`<= 256` 直接发原始 `Uint8Array`（不带标记字节）。

### 接收（`message.ts`）

```ts
const array = new Uint8Array(event.data);
let raw;
if (array[0] === 1) {
  raw = zlib.unzipSync(array.slice(1)).toString();  // 首字节 1 → gzip
} else {
  raw = Buffer.from(array).toString('utf8');        // 明文
}
// 解压后按 \0 分割为单条消息（与 transport.md 一致）
const messages = raw.split('\0').filter(m => m.length > 0);
```

> 官方前端用 pako 同逻辑（首字节 `0x01` 判定，见 [transport.md](md/websocket/transport?id=帧编码)），语义一致。一帧可能包含多条消息，用 `\0` 分隔。adapter 的 `message.ts` 未显式 split `\0`（实际由服务端逐帧保证），但为安全起见第三方实现应加上此步骤。

## 3. 登录包（`*` + JSON）

连接建立后，第一条业务消息即登录包：

```ts
socket.send('*' + JSON.stringify(loginObj));
```

### 正式账号字段（adapter `createLoginObj`）

| 字段 | 含义 | 说明 |
|---|---|---|
| `r` | 目标房间 id | 必填 |
| `n` | 用户名 | 必填，不带 `[*...*]` |
| `p` | 密码 MD5 | 见下方密码判定 |
| `st` | 在线状态 | `n`/`0`~`9`/`a`~`f`（见状态表） |
| `mo` | 签名/简介 | 可选 |
| `mb` | 客户端标识 | 可空串 |
| `mu` | 流量模式 | **`"01"`**（关系到媒体播放） |
| `lr` | 旧房间 id | 切房后重连认证用，可省略 |
| `rp` | 房间密码 | 密码房才填 |
| `fp` | 指纹 | **adapter 用 `"@" + md5(用户名)`**；官方前端用 `"@" + 32 位随机串（见 [commands.md](md/websocket/commands?id=进房--切房)） |

### 密码 MD5 判定（`password.ts`）

```ts
function getMd5Password(password) {
  if (!password) return null;
  return /^[a-z0-9]{32}$/.test(password) ? password : md5(password);
}
```

- 已是 32 位小写 hex 则**直接用**；否则先 `md5()`。
- 官方前端 login 接口同样要求先 MD5，两者一致。

### 在线状态 `st` 取值（`config.ts`）

`n`=无状态、`0`=会话中、`1`=忙碌中、`2`=离开中、`3`=就餐中、`4`=通话中、`5`=移动中、`6`=如厕中、`7`=沐浴中、`8`=睡觉中、`9`=上课中、`a`=作业中、`b`=游戏中、`c`=看剧中、`d`=挂机中、`e`=自闭中、`f`=请撩我。

### 游客模式（额外字段）

游客登录有独立字段（adapter 用 `smStart` + 固定 `smPassword` 触发）：

```ts
{
  r, n,
  i: 头像id, nc: 名字颜色, s: 性别,
  st, mo, uid, li, mb, mu, la, vc,
  fp: '@' + md5(用户名)
}
```

### 登录回包判定（`message.ts` 首包）

| 回包前缀 | 含义 |
|---|---|
| `%` | 登录成功（大包，含用户/房间列表） |
| `%*"0` | 名字被占用 |
| `%*"1` | 用户名不存在 |
| `%*"2` | 密码错误 |
| `%*"4` | 今日可尝试登录次数上限（换网络重试） |
| `%*"5` | 房间密码错误 |
| `%*"x` | 账户封禁 |
| `%*"n0` | 房间无法进入 |

## 4. 心跳与重连

### 心跳差异

| 客户端 | 心跳内容 | 间隔 |
|---|---|---|
| 官方网页端 | 收到服务端 `c` 后回发 `"c"` | 每 2 秒（收到即回） |
| adapter-iirose | 发送**空字符串 `''`** | 每 30 秒 |

- adapter 心跳（`heartbeat.ts`）：`readyState===1` 且状态 ONLINE 时 `send('')`；`readyState===2/3` 或 socket 为空则触发重连。
- **空串不会 gzip**（长度 0 ≤ 256，直接发空字节），服务端识别为保活。

### 重连策略

- 连接失败：换节点（见上节测速/递增重试）。
- 心跳失败（`readyState` 非 OPEN）：触发 `onConnectionLoss` 重连。
- 登录超时（默认 60s 未收到 `%` 首包）：判定登录失败。

## 5. 发送命令速查（业务载荷为明文文本，底层帧自动 gzip 封装）

> 下面列出的命令是**压缩前的明文文本**（即 `IIROSE_WSsend(bot, str)` 的 `str` 参数）。底层 `send.ts` 会自动将 > 256 字节的载荷 gzip 压缩并封装为二进制帧（首字节 `0x01`），详见第 2 节。

### 5.1 消息

| 命令 | 功能 |
|---|---|
| `{"m":"内容","mc":"颜色","i":"12位随机id"}` | 公屏消息 |
| `{"g":"对方uid","m":"内容","mc":"颜色","i":"…"}` | 私聊 |
| `~{"t":"内容","c":"颜色"}` | 全站广播（弹幕） |
| `{0{"m":"…","mc":"…","i":"…"}` | 切歌（`cut` 用此形式） |

- `i`（消息 id）：adapter 用 `Math.random().toString().substring(2,14)`（12 位）。
- 颜色 `mc`：6 位 hex（`rgbaToHex`，忽略 alpha）。默认 `66ccff`。
- 引用：`旧内容 (_hr) 发送者_时间戳秒 (hr_) 新内容`。
- @用户：` [*用户名*] `（两侧空格）；@房间：` [_房间id_] `。
- 图片：`[url#e]`；语音：URL 结尾必须 `.weba`；链接：`\url`。
- Markdown：内容以 `\\\*` + 换行开头。

### 5.2 房间

| 命令 | 功能 |
|---|---|
| `*{JSON}` | 进房认证（见第 3 节） |
| `m房间id` / `m房间id>密码` | 切房 / 密码房切房 |
| `=^v$1房间id` / `=^v$0房间id` | 订阅 / 取消订阅房间 |

### 5.3 经济（股票 / 银行 / 余额）

| 命令 | 功能 |
|---|---|
| `>#` | 拉取股票数据 |
| `>$数量` | 买入股票 |
| `>@数量` | 卖出股票 |
| `>*` | 拉取银行数据 |
| `>^a金额` | 存款 |
| `>^b金额` | 取款 |
| `>^c金额` | 贷款（官方前端扩展，adapter 未实现） |
| `>^d金额` | 还款（同上） |
| `>^z金额` | 定期存款（同上） |
| `=$` | 店铺列表（官方前端）；adapter 的 `getBalance` 也发 `=$`，但余额回包见 6.4，此命令语义待实测 |

### 5.4 商店（`g` 前缀）

| 命令 | 功能 |
|---|---|
| `g-` | 商店首页 |
| `g+` | 卖家中心 |
| `g&` | 收藏夹 |
| `g@` | 关注店铺 |
| `gc+id` | 加入购物车 |
| `gc-id` | 移除购物车 |
| `gu0` | 待付款订单 |
| `gu1` | 待收货订单 |
| `gu2` | 待确认订单 |
| `gu3` | 待评价订单 |
| `gu4` | 已完成订单 |
| `gu5` | 售后订单 |

### 5.5 用户与社交

| 命令 | 功能 |
|---|---|
| `$1` | 查询自身账号信息 |
| `$2{JSON}` | 更新自身资料（`{surname,name,birthday,tag,hobby,residence,website,family}`） |
| `$3+新用户名` | 修改用户名 |
| `+-username` | 按用户名查用户资料（adapter；**官方前端为 `=-+` + 小写用户名**，见 [commands.md](md/websocket/commands.md) 用户搜索差异） |
| `+#0uid` / `+#1uid` | 关注 / 取关 |
| `+^uid` | 关注 + 粉丝列表 |
| `+*uid [备注]` | 点赞 |
| `+!uid [备注]` | 点踩 |
| `+_*uid 分数` | 打分 |
| `+_*uid !` | 取消打分 |
| `+$` + JSON `{g:uid,c:金额,m:备注}` | 转账 |
| `:*uid` | 用户动态 |
| `:=` | 朋友圈 |
| `:-` | 论坛 |
| `:+` | 任务 |
| `=-#` | 排行榜 |
| `%` | 当前歌单 |
| `)@0..7` | 骰子（0~7 面） |
| `+@房间名` | whois 在线列表 |

### 5.6 媒体播放 / 点播

| 命令 | 功能 |
|---|---|
| `&1{JSON}` | 播放媒体（媒体分享房用 `&1`，其他房 `&0`）。JSON：`{s:播放地址(去http://前缀), d:时长秒, c:封面, n:名字, r:作者, b:平台标识, o:原链接, l:歌词}` |
| `m__4{平台}>{名字}>{作者}>{封面}>{颜色}>{码率}` | 点播卡片消息（音乐） |
| `dv3{id}#{分P}` | 点播 B 站视频 |
| `dv0{id}` / `dv1{id}` | 点播爱奇艺 / 腾讯视频 |

平台标识 `b`（`media_data.ts` typeMap）：

| 平台 | 值 |
|---|---|
| 通用音乐 / 通用视频 | `=0` / `=1` |
| 网易云 / 虾米 / QQ / 千千 / 酷狗 | `@0` `@1` `@2` `@3` `@4` |
| 喜马拉雅 / 荔枝 / 回声 / 5sing | `@5` `@6` `@7` `@8` |
| 爱奇艺 / 腾讯 / YouTube / B站 / 芒果 | `!0` `!1` `!2` `!3` `!4` |
| 抖音 / 快手 / 163MV / B站直播 | `!5` `!6` `!7` `!8` |

> 点播卡片消息里视频平台标识用 `*0`~`*8` 代替 `!0`~`!8`（`media_card.ts`）。

### 5.7 房主管理（`!` 前缀）

| 命令 | 功能 |
|---|---|
| `!!["公告"]` | 发房间公告 |
| `!#["用户名"]` | 踢人 |
| `!h3["类型","用户名","时长","原因"]` | 禁言（类型 41=聊天 / 42=点歌 / 43=全部） |
| `!h4["4","用户名","时长","原因"]` | 黑名单 |
| `!hw["4","用户名","时长","原因"]` | 白名单 |
| `!h6["1"]` / `!h6["1人数"]` | 设置最大人数（`1`=不限，`1+数字`=限） |

### 5.8 媒体房管理（`!` 前缀）

| 命令 | 功能 |
|---|---|
| `!11` | 切当前歌 |
| `!12["id"]` | 切指定媒体 |
| `!13` | 清空媒体列表 |
| `!14["id1-id2"]` | 交换两个媒体位置 |
| `!15["方向","秒"]` | 快退 / 快进（方向 `<`=快退 / `>`=快进） |
| `!16["时间"]` | 跳到指定时间（`mm:ss` 或秒） |

## 6. 接收报文解析速查

所有回包按**首字符/前缀**路由。字段多用 `>` 分隔（部分用 `"`、`<`）。

### 6.1 大包（用户/房间列表）

- 前缀 `%`，`message.substring(3)` 后按 `\"` 分三段：`parts[0]`=用户+房间、`parts[1]`=当前房间在线用户+历史消息、`parts[2]`=加载信息。
- `parts[0]` 按 `<` 分条，每条按 `>` 分字段。
- **房间**：`fields[0]` 匹配 `/^(?=.*[a-f])([a-f0-9]{10,}_?)+$/`，`fields[1]`=房间名，`fields[5]` 可含 `s://背景地址 简介&&…`。
- **用户**：`fields[0]` 含 `/`（头像路径），字段 `avatar`(0)、用户名(2)、颜色(3)、房间(4)、uid(8)。头像补全为 `http://s.iirose.com/images/icon/{avatar}.jpg`。
- 解析完成后 adapter 会触发一次 `>#`（股票）和 `>*`（银行）查询。

### 6.2 聊天消息

- **公屏**：前缀 `"`（单引号），11 字段：`时间(0) > 头像(1) > 用户名(2) > 内容(3) > mc(5) > uid(8) > 称号(9) > 消息id(10)`。`称号 === "'108"` 表示「花瓣」。
- **私聊**：前缀 `""`（双引号），`<` 分条、每条 11 字段：`时间(0) > uid(1) > 用户名(2) > 头像(3) > 内容(4) > mc(5) > 消息id(10)`。
- 引用内容解析：` (_hr) ` 与 ` (hr_) ` 包裹，`发送者_时间戳秒` 结尾。

### 6.3 成员进出

- 前缀 `"`，`parts[3]` 区分：`'1`=加入（末字符 `n`=新加入 / `d`=重连）、`'3`=离开、`'2`=移动（末尾 `3`+目标房间 id）。

### 6.4 经济数据

| 前缀 | 含义 | 字段 |
|---|---|---|
| `>` | 股票 | `substring(1).split('>')[0].split('"')` 长度 5：`总股(0) 总金(1) 单价(2) 我的持股(3) 我的总金(4)` |
| `>$` | 银行 | 按 `"` 拆：`总金(0) 收益(1) 存款(3).split(' ')[0] 余额(4) 利率(5).split(' ')` |
| `` `$ `` | 余额 | `substring(2)` 数字 |

### 6.5 社交回包

| 前缀 | 含义 |
|---|---|
| `$?` | 自身信息回包 |
| `+-` | 用户资料回包（`data.slice(1).split('>')`，字段见 `UserProfileByName.ts`） |
| `@` | 信箱（房间公告 / 关注 / 点赞 / 点踩 / 转账通知） |
| `=` | 广播（`>` 分隔：用户名(0) 内容(1) 颜色(2) 头像(5) 序列(6) 消息id(7)） |
| `~` | 歌单列表 |
| `:-` / `:+` / `:=` / `:*` | 论坛 / 任务 / 朋友圈 / 用户动态 |

以下三个回包前缀以竖线 `|` 开头（单独列出，避免与 Markdown 表格分隔符混淆）：

- `|^`：关注/粉丝列表
- `|_`：打分回包（`分数#倍数`）
- `|$`：转账回执
- `` `# ``：排行榜（前缀为反引号 + `#`）

### 6.6 撤回（`v0`）

- 公屏：`v0#用户ID_消息ID`
- 私聊：`v0*接收方"撤回方_消息ID`

## 7. Node.js 最小可运行骨架

```js
const WebSocket = require('ws');
const zlib = require('node:zlib');
const crypto = require('node:crypto');

const md5 = s => crypto.createHash('md5').update(s).digest('hex');

function send(ws, str) {
  const buf = Buffer.from(str);
  if (buf.length > 256) {
    const gz = zlib.gzipSync(str);
    const out = Buffer.alloc(gz.length + 1);
    out[0] = 1;
    gz.copy(out, 1);
    ws.send(out, { binary: true });
  } else {
    ws.send(buf, { binary: true });
  }
}

const ws = new WebSocket('wss://m1.iirose.com:8778');
ws.binaryType = 'arraybuffer';

ws.on('open', () => {
  send(ws, '*' + JSON.stringify({
    r: '房间id',
    n: '用户名',
    p: md5('密码'),          // 或直接填 32 位小写 MD5
    st: 'n',
    mo: '签名',
    mb: '',
    mu: '01',
    fp: '@' + md5('用户名'),
  }));
});

ws.on('message', (data) => {
  const arr = new Uint8Array(data);
  let raw;
  if (arr[0] === 1) raw = zlib.unzipSync(arr.slice(1)).toString();
  else raw = Buffer.from(arr).toString('utf8');

  // 一帧可能包含多条消息，用 \0 分隔
  const messages = raw.split('\0').filter(m => m.length > 0);
  for (const msg of messages) {
    console.log('[recv]', msg);

    if (msg.startsWith('%')) {
      console.log('登录成功，可开始发送命令');
    }
  }
});

// 心跳
setInterval(() => {
  if (ws.readyState === 1) send(ws, '');
}, 30_000);
```

## 8. 客户端开发额外要点

机器人只需收发消息，**自定义客户端**还需要实现 UI 渲染、媒体播放、文件交互等。以下按功能模块列出相关文档入口：

### 8.1 消息渲染

| 需求 | 参考文档 |
|---|---|
| 公屏/私聊消息字段结构 | [接收路由 § 聊天消息](md/websocket/messages.md)（本文第 6.2 节也有摘要） |
| 消息中的特殊格式：@用户 `[*name*]`、@房间 `[_id_]`、引用 `(_hr)…(hr_)`、图片 `[url#e]`、语音 `.weba`、链接 `\url`、Markdown `\\\*` | 本文第 5.1 节 |
| 消息卡片 DOM 结构（媒体卡片、通知卡片等） | [花园卡片 DOM](md/frontend/cards.md) |
| 用户消息颜色 `mc` 字段 | 6 位 hex，本文第 5.1 节 |

### 8.2 媒体播放

| 需求 | 参考文档 |
|---|---|
| 链接 → 媒体解析（获取可播放 URL） | [http-api.md § 媒体解析](md/http-api) |
| 点播/点歌 WS 命令 | 本文第 5.6 节（`&1{JSON}`、`m__4`、`dv3`） |
| 平台标识码（网易云 `@0`、QQ `@2`、B站 `!3` 等） | 本文第 5.6 节平台标识表 |
| 媒体房管理（切歌、清空、快进等） | 本文第 5.8 节 |
| 媒体系统面板（点歌面板、播放器 UI） | [媒体系统面板](md/features/media-panels.md) |

### 8.3 文件上传

| 需求 | 参考文档 |
|---|---|
| 上传 HTTP 接口 | [http-api.md § 上传](md/http-api) |
| 上传后回显 URL 规则 | `http://r.iirose.com/` + 相对路径；图片以 `i/` 开头 |
| 图片/文件消息格式 | `[url#e]`（图片）、`[url]`（文件），本文第 5.1 节 |

### 8.4 用户界面

| 需求 | 参考文档 |
|---|---|
| 用户资料解析（按用户名查询的回包字段） | 本文第 6.5 节 `+-` 前缀；[接收路由](md/websocket/messages.md) |
| 他人名片（whois 资料卡）的 DOM 与字段 | [用户名片](md/frontend/profile-card.md) |
| 自身资料编辑（`$2` 命令 + 面板） | [个人资料编辑](md/frontend/user-info.md) |
| 头像 URL 规则 | `http://s.iirose.com/images/icon/{avatar}.jpg`（本文第 6.1 节） |
| 在线状态 `st` 取值 | 本文第 3 节状态表 |

### 8.5 面板系统

| 需求 | 参考文档 |
|---|---|
| 全部面板编号 ↔ 名称 ↔ 面板 DOM 容器 | [面板系统](md/features/panels.md) |
| 经济面板（股票、银行、商店） | [经济系统面板](md/features/economy-panels.md) |
| 社交面板（论坛、任务、朋友圈） | [社交功能面板](md/features/social-panels.md) |
| 游戏模拟器面板 | [游戏模拟器面板](md/features/game-emulator.md) |
| 其他面板（地图、设置、通知等） | [其他面板](md/frontend/misc-panels.md) |
| 侧边栏按钮编号 ↔ 行为 | [侧边栏](md/frontend/sidebar.md)、[按钮内部行为](md/frontend/sidebar-actions.md) |

### 8.6 房间与地图

| 需求 | 参考文档 |
|---|---|
| 房间列表/地图数据解析 | [地图与房间数据](md/features/map.md) |
| 热推房间算法 | [热推房间](md/features/hot-rooms.md) |
| 大包解析（`%` 前缀，用户+房间列表） | 本文第 6.1 节；[接收路由](md/websocket/messages.md) |

### 8.7 前端函数参考

| 需求 | 参考文档 |
|---|---|
| 官方前端可调用的全局函数（`functionBtnDo`、`Utils.*` 等） | [前端函数调用速查](md/functions.md) |
| 可交互 DOM 元素（输入框、按钮等） | [可交互 DOM 全解](md/frontend/interactive.md) |
| JS 操作与自定义方案 | [JS 操作与自定义](md/frontend/operations.md) |

### 8.8 其他

| 需求 | 参考文档 |
|---|---|
| P2P 通话（WebRTC 信令） | [P2P（WebRTC）](md/p2p.md) |
| Electron 壳相关 | [Electron 壳](md/electron.md) |
| 全局对象速查（`Init`、`Mod`、`Utils` 等） | [核心全局对象](md/global-objects.md) |

---

> ⚠️ **免责声明**：本章内容仅供**学习与逆向分析交流**。文中协议、字段、端口、节点等**不保证与线上完全一致**，请以实测为准。其中描述的自动化能力（机器人直连、自动发言/回复、批量抓取用户或接口数据等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
