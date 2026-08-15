# 编辑个人资料（userREHolder）

编辑/注册**自己的资料**面板（面板编号 2，全屏）。查看**别人的**名片见[用户名片（whois 资料卡）](profile-card.md)。

双形态：

- **已注册账号**（有 `password` Cookie）：打开时 `socket.send("$1")` 拉取服务端存档 → 表单回填 → 保存时**只提交变化字段**（`$2`+JSON）
- **游客 / 新注册**（无密码）：表单预填本机值 → 保存即注册（`$`+JSON，服务端返回 uid）

## 入口

```js
functionBtnDo(81);   // 侧边栏「设置/编辑资料」→ Init.fullPanel(2) → panelAnimate(23,1)
```

- 新注册/扫码登录后（`socialAccToken` 在 localStorage）也会自动进入
- 保存成功 → 写全量 Cookie → `autologin=4` → `location._reload()`（L21639-21641）

## 面板结构

```
#userREHolder（全屏，背景色随主题）
├─ .userREHolderItemArr[0]  主表单页（模版 13，头图标 account-cog=编辑 / account-plus=注册）
│  ├─ 头部：返回键 btnProcesser(6) | 保存键 submit()
│  └─ 表单字段（inputArr 0-12 / textareaArr 0 / selectArr 0-4 / selectBtnArr 0-9）
├─ .userREHolderItemArr[1]  头像选择页（btnProcesser(0) 确认 / 3 返回）
├─ .userREHolderItemArr[2]  系统图标页（openSystemIcon）
└─ .userREHolderItemArr[3]  图片裁剪（showImgClip）
```

## 数据请求与保存

```js
socket.send("$1");                 // 打开面板时拉取个人信息（已注册账号，L21580）
socket.send("$2" + JSON.stringify(n));  // 保存修改（已注册账号）
socket.send(JSON.stringify(n));         // 注册 / 游客建档（无密码账号）
```

> 与[登录认证](md/auth.md)的关系：保存包结构与登录包同源（用户名+密码+资料字段），注册成功后服务端把账号信息直接写入 Cookie 并刷新。

## `$1` 回包字段（`"` 分隔，server case 2，L21645-21741）

| 下标 | 字段 | 表单位置 |
|---|---|---|
| 0 | 密保问题 | selectArr[0] |
| 1 | 密保答案 | inputArr[3] |
| 2 | 邮箱（前导空格=隐藏） | inputArr[10] |
| 3 | 姓 | inputArr[4] |
| 4 | 名 | inputArr[5] |
| 5 | 生日（**秒级时间戳**） | inputArr[6] |
| 6 | 性别 | selectArr[1] |
| 7 | 现居 | inputArr[9] |
| 8 | 网站 | inputArr[11] |
| 9 | 爱好 | inputArr[8] |
| 10 | 家庭 | inputArr[12] |
| 11 | 简介 | textareaArr[0] |
| 12 | 相册/视频（`#vid=` 视频+`#vidt=` 视频类型，空格分隔） | selectBtnArr[3][4] |
| 13 | 名字颜色 | 色板 |
| 14 | 头像 | 头像框 |
| 15 | uid | — |
| 16 | 徽章图（labelImg） | selectBtnArr[2] |
| 17 | 对话框图（dialogImg） | selectBtnArr[0] |
| 18 | 相册（album，`albumUtils`） | — |
| 19 | 背景音乐（bgm） | selectBtnArr[7] |
| 20 | 背景图（bgImg） | selectBtnArr[1] |
| 21 | 标签 | inputArr[7] |
| 22 | 时间线图（timelineImg） | selectBtnArr[6] |
| 23 | 连接图（connectionImg） | selectBtnArr[5] |
| 24 | 已关联社交账号（`<` 分隔：平台序号+账号） | 社交按钮变齿轮 |
| 25 | 页面风格（style） | selectArr[4] |
| 26 | 「我的生活」相册/录音/视频/简介（`'` 分隔） | 3 个子面板 |
| 27 | 手机号（已绑定） | 手机按钮变重绑 |
| 28 | 推送订阅（`>` 分隔，`<` 内为 0/1 串+平台名） | 推送按钮变齿轮 |

## 提交字段（submit，L21586-21631）

```js
{
  username,          // 用户名（禁止 RTL 字符 ‮）
  password,          // 密码：有密码时 md5 后再传；游客注册明文传给 md5.js 处理
  question, answer,  // 密保
  surname, name,     // 姓 / 名
  sex,               // 性别
  birthday,          // 生日（Date.parse/1000 秒）
  tag, hobby,        // 标签 / 爱好
  residence,         // 现居
  email,             // 隐藏时前导空格 " "
  website,           // 网站（按 ,， http 拆分去重）
  family,            // 家庭
  dialogImg, bgImg, labelImg, picture, connectionImg, timelineImg,  // 各图片/视频
  bgm,               // 背景音乐
  style,             // 页面风格
  introduce,         // 简介
  album,             // 相册（空格拼接）
  color,             // 名字颜色（hex，去掉 #）
  avatar,            // 头像 aid
  mePhoto, meVoice, meVideo,  // 「我的生活」
  emoji,             // 游客注册：携带本地 emoji 收藏（myEmoji）
  promoterID,        // 游客注册：携带推广 ID（sessionStorage）
  cprobe: "1" + uniqueID()  // 头像/性别/颜色/对话框/徽章/背景变更时附加的变更指纹
}
```

**已注册账号差异提交**（L21615-21618）：只提交**发生变化**的字段（逐项对比 `t.info`），全没变化则直接关面板不发包。

## 客户端校验（submit）

| 条件 | 提示（`H[0][1][*]`） |
|---|---|
| 用户名为空 | 请输入用户名 |
| 新密码未填 | 请输入密码 |
| 密码 <6 或 >24 位 | 密码长度限制 |
| 两次密码不一致 | 两次输入的密码不一致 |
| 密码含非法字符（`lib(8)` 强度检查） | 1=太短 2=不含字母等 |
| 未选密保问题 / 空答案 | 请选择密保问题 |
| 已注册账号且 question 未定义 | 该账号暂不支持密码修改 |

## 接收端分发（L13387-13388）

| 服务端消息 | 处理 |
|---|---|
| `$?{数据}` | `server(2)` 个人信息回填（上表） |
| `$#{数据}` | `server(3)` 保存结果 |
| `$^{数据}` | `server(0)` 注册失败（用户名被占 → 提示） |
| `$*{数据}` | `lib(9)` 社交账号数据 |
| `$!s{0/1}` `$!t{0/1}` | 社交 / 手机认证状态（3 位=已验证，更新 `Info.me.verified`） |
| `$@{数据}` | `server(4)` 验证码结果（见下） |
| `$%{平台}{0/1}` | 社交绑定/解绑结果（0=已绑定、2=已解绑） |
| 其他（uid） | `server(1)` 注册成功 → 写 Cookie → reload |

### server(3) 保存结果

| 返回 | 行为 |
|---|---|
| 空 | 成功：写 `username/password/avatar/namecolor/colorpicker/sex/labelImg/dialogImg/bgImg/uid/cprobe` Cookie → `autologin=4` → reload |
| `1` | 失败（如用户名被占）→ `server(0,1)` 提示，保留输入 |
| 其他 | 失败提示 |

### server(4) 验证码结果（手机绑定，L21757-21774）

| 返回 | 含义 |
|---|---|
| `0` | 该手机号已被注册 |
| `1` | **IP 限流：单 IP 每日最多 30 次** |
| `2` | 账号限流：单账号每日最多 3 次 |
| `3` | 服务器故障 |
| `4` | 剩余申请次数提示 |

## 附加功能（btnProcesser，L21258-21577）

| case | 功能 |
|---|---|
| 0 | 应用所选头像/颜色 |
| 1 | 选择名字颜色 |
| 3 | 头像页返回主表单 |
| 4 | **URL 取图**（`uploadHelper(1)` 弹输入框） |
| 5 | 上传图片（`showImgClip` 裁剪） |
| 6 | 关闭面板（恢复 bgm/视频播放位置，返回聊天输入框） |
| 7 | **邮箱可见性切换**（mdi-eye ↔ mdi-eye-off，隐藏=前导空格） |
| 8 | 系统图标（7 类：男女/情侣/热门/风景/卡通/动漫） |
| 9 | QQ 绑定（`graph.qq.com` OAuth → `socialAccGet.php` 轮询 → `$4` 发送） |

账号命令（`$` 前缀）完整列表见[发送命令](md/websocket/commands?id=系统--认证-前缀用户设置面板-userreholder)。

## 脚本示例

```js
// 打开编辑资料面板
functionBtnDo(81);

// 直接读取当前账号资料（需面板打开过）
Objs.userREHolder.info;

// 修改名字颜色并保存（绕 UI，模拟面板保存）
socket.send("$2" + JSON.stringify({ color: "ff69b4" }));

// 请求验证码绑定手机
socket.send("$5" + "手机号");
```

> ⚠️ 以上 `socket.send` 直接操作绕过表单校验与 Cookie 更新，仅用于测试理解，**非官方交互方式**。

## CSS 定制示例

```css
/* 隐藏手机号输入框（已绑定手机时） */
#userREHolder .userRETel input { display: none; }

/* 主表单更宽 */
#userREHolder .userREHolderItemArr { width: 480px; }
```

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
