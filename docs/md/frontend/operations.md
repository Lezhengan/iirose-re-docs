# 操作 DOM 与 JS 自定义指南

> 页面运行在 `messages.html` 的全局作用域，**登录后**在 DevTools Console 即可执行下述代码。
> 本页聚焦"可操作的 DOM + 事件 hook 点"，供高度自定义（脚本/插件/自动回复/媒体控制）使用。
> 全部函数与行号基于 `reference/src/messages.js`。

## 一、核心可操作 DOM

| DOM | 说明 | 常用操作 |
|---|---|---|
| `#moveinput`（全局 `moveinput`） | 底部聊天输入框 | 取值 `moveinput.val()`；赋值后调用 `Utils.service.moveinputDo(moveinput.val())` 直接发送 |
| `#moveinputSendBtnSend` | 发送按钮 | `.click()` 触发发送 |
| `#homeHolderMsgContentInputBox` | 首页消息输入框 | 同上，发到首页频道 |
| `#demandAgent` | 侧边栏媒体点播框 | 输入内容后 `demandFunc(内容)` 点播 |
| `#videoPlayer`（全局 `videoPlayer`） | 共享视频播放器 | `videoPlayer[0].play()/pause()`、`currentTime`、`src` |
| `#radioPlayer`（全局 `radioPlayer`） | 电台播放器 | 同上 |
| `#volumecontrol` | 音量滑块 | 拖动/赋值控制音量 |
| 侧边栏按钮 | 全部面板入口 | `functionBtnDo(编号)`（表见[侧边栏](md/frontend/sidebar.md)） |

## 二、消息收发 hook 点

### 1. 拦截服务端消息：`socket.__onmessage`（L13350）

所有 WS 推送都从这里分发。**追加自己的监听**：

```js
var _onmsg = socket.__onmessage;
socket.__onmessage = function (e) {
  // 先处理自己的逻辑
  console.log("收到消息:", e.data);
  // 再交给原分发器（保证 UI 正常）
  return _onmsg.call(this, e);
};
```

> 注意：某些安全模式下客户端会把 `__onmessage` 转移给 `_onmessage`（L18975），监听方式可两者都挂。

### 2. 发送命令

```js
// 直接发送（绕过 UI，见 functions.md 第五节）
socket.send(JSON.stringify({ m: "内容", mc: "255,255,255", i: "id_" + Date.now() }));
```

### 3. 聊天渲染函数 `msgfetch(t, o, i, a)`（L14034）

群聊消息渲染入口（消息对象：`{i 头像, m 内容, mc 颜色, nc 名字色, se 性别, uid}`）。可包装以实现"消息过滤/统计"：

```js
var _msgfetch = msgfetch;
window.msgfetch = function (obj, o, i, a) {
  if (obj.uid === "目标uid") console.log("来自目标的消息:", obj.m);
  return _msgfetch.call(this, obj, o, i, a);
};
```

### 4. 发言过滤器：`Utils.Filter.pubMsg` / `Utils.Filter.run`

`moveinputDo` 发送前会过 `Utils.Filter.pubMsg(内容)`（群聊）与 `Utils.filter.run(内容)`（弹幕）。可注入内容改写：

```js
var _pubMsg = Utils.Filter.pubMsg;
Utils.Filter.pubMsg = function (t) {
  return _pubMsg.call(this, "[自定义] " + t);   // 给所有发言加前缀
};
```

### 5. 劫持输入框发送（改写发言 / 插件开发）

花园有**两个聊天输入框**，发送链路都会汇入 `Utils.service.moveinputDo`：

| 输入框 | 位置 | Enter 发送链路 |
|---|---|---|
| `#moveinput` | 底部主聊天框 | `inputSend`(L4029) → `moveinputDo` |
| `#homeHolderMsgContentInputBox` | 首页频道框（`homeHolder` 面板，messages.html 静态定义，tab 切换显隐） | `keydown`(L33503) → 房间tab `moveinputDo(t)` / 广播等tab `moveinputDo("~ "+t)` / 私信tab 不发 |

用户按回车发送的完整链路：

```
#moveinput keydown → Utils.service.inputSend(L4029)
  → Utils.service.moveinputDo(文本)(L2832，解析 @ / @@ / <> / ~ / # 命令)
      → 普通文本过 Utils.Filter.pubMsg 过滤(L2251)
        → msgfetch({m:...})(L14034，渲染本地气泡)
          → socket.send(JSON)
```

四个劫持层级（由细到粗）：

| 层级 | 拦截点 | 覆盖范围 | 适用场景 |
|---|---|---|---|
| ① 输入框 `keydown`（capture 阶段） | 用户按 Enter 时 | 仅手动输入框 | 转换/指令类插件（如"古风小生"） |
| ② `Utils.service.moveinputDo` | 输入框统一入口 | 手动输入 + 表情/快捷面板发出 | 内容改写 |
| ③ `msgfetch` | 群聊/私聊发送函数 | 所有聊天消息（含脚本发出） | 全量改写 / 统计 |
| ④ `socket.send` | 所有 WS 出站 | 一切消息（含命令、点播卡） | 深度 hook（**需过滤防误伤**） |

**方案 ①（推荐，最安全）**——在捕获阶段接管 Enter，改写后走官方完整链路（`activeElement` 判断焦点框，**双输入框通吃**）：

```js
document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter" || e.ctrlKey) return;
  var inp = e.target;
  if (!inp || inp.tagName !== "TEXTAREA") return;
  if (inp.id !== "moveinput" && inp.id !== "homeHolderMsgContentInputBox") return;
  var before = inp.value;
  if (!before.trim() || /^[@<>~#]/.test(before)) return;   // 命令/空输入放行
  var conv = keigo(before);                                // 你的转换函数
  if (conv === before) return;                             // 无变化 → 放行原发送
  e.preventDefault();
  e.stopImmediatePropagation();
  // 首页框：房间tab 直接发；广播等tab 转弹幕；私信tab 放行
  var isHome = inp.id === "homeHolderMsgContentInputBox";
  var curP = 0;
  try { curP = isHome ? Objs.homeHolder.Variable.currentP : 0; } catch (err) {}
  if (isHome && curP === 2) return;
  inp.value = "";
  Utils.service.moveinputDo(isHome && curP !== 1 ? "~ " + conv : conv);
}, true);
```

**方案 ②（可随时开关）**——monkey-patch 统一入口，正则跳过所有命令前缀：

```js
var _origDo = Utils.service.moveinputDo;
var keigoOn = true;                        // 悬浮球开关
Utils.service.moveinputDo = function (e, t) {
  if (keigoOn && typeof e === "string" && e && !/^[@<>~#]/.test(e)) {
    e = keigo(e);                          // 只转"普通文本"，命令不动
  }
  return _origDo.call(this, e, t);
};
```

**方案 ④（你现在 Hook `socket.send` 的做法）**——必须过滤，否则会拦坏内部命令和点播卡：

```js
var _send = socket.send.bind(socket);
socket.send = function (d) {
  if (typeof d === "string" && d[0] === "{") {          // 聊天消息都是 JSON
    try {
      var o = JSON.parse(d);
      if (o && typeof o.m === "string" && o.m && !/^m__/.test(o.m) && o.g === undefined) {
        o.m = keigo(o.m);                               // 改内容
        d = JSON.stringify(o);
      }
    } catch (e) {}
  }
  return _send(d);
};
```

**防误伤清单**（不改写的消息）：

| 特征 | 原因 |
|---|---|
| 开头 `@` / `@@` / `<>` / `~` / `#` | `moveinputDo` 把它们当命令解析（面板/点播/弹幕） |
| `m` 字段以 `m__` 开头 | 点播卡片（`m__4@…`），改写会破坏卡片格式 |
| 有 `g` 字段的 JSON | 私聊消息（`msgfetch(0, …, t, i)` 路径），如需改写要走另一分支 |
| 纯文本命令（`%` 进房、`+@` whois、`Te#` 行情…） | 不是 JSON，方案 ④ 的 `d[0]==="{"` 已天然排除 |

> 提示：方案 ④ 里改的是已过 `pubMsg` 的内容（普通群聊文本前可能有不可见防伪字符），转换正则一般不受影响；方案 ①② 改的是用户原始输入，最干净。

## 三、自动发送与插入文本

```js
// 向输入框插入文本（不动发送）
insertText(moveinput[0], "插入的内容");

// 插入并发送（等价于输入后回车）
Utils.service.autoSendLink("https://example.com", moveinput);

// 直接触发一次群聊发送（走完整过滤流程）
Utils.service.moveinputDo("你好，这是脚本发的");

// 媒体点播
demandFunc("歌名");
```

## 四、图床上传与 `r.iirose.com` 拼接

> 核心机制：**上传域与展示域分离**。上传到 `f.iirose.com`，服务器返回**相对路径**，前端再拼接 `http://r.iirose.com/` 前缀。

### 完整链路（源码）

```
配置（index.js L129-140）
  Urls.upload.img        = "https://f.iirose.com/"        ← 上传域
  Urls.uploadedPrefix.img = "http://r.iirose.com/"        ← 展示前缀（CDN 域）

上传（messages.js）
  Constant.URL.uploadImg = Urls.upload.img + "lib/php/system/file_upload.php"
  Utils.uploadImg(file, callback)                         ← L6233
    FormData: { i: uid, "f[]": file }  POST file_upload.php
    → 服务器返回相对路径 e.responseText（如 "i/25/8/8/12/xxxx.jpg"）

拼接（多处，如 L2555 / L14428 / L19383）
  Constant.URL.uploadedPrefixImg + e.responseText
  = "http://r.iirose.com/" + "i/25/8/8/12/xxxx.jpg"        ← 完整图片 URL
```

### 完整图片 URL 格式

```
http://r.iirose.com/i/年/月/日/时/文件名.png
例：http://r.iirose.com/i/20/1/1/0/5220-64.png（L27752）
```

### 自己调用上传

```js
// 1. 用官方函数（自动带 uid、自动拼前缀）—— 推荐
Utils.uploadImg(file, function (xhr) {
  if (xhr.status === 200 && xhr.responseText) {
    var url = Constant.URL.uploadedPrefixImg + xhr.responseText;
    console.log("图片地址:", url);
    // 插入输入框并发送
    Utils.service.autoSendLink(url, moveinput);
  }
});

// 2. 手动 POST（等价实现）
var fd = new FormData();
fd.append("i", uid);
fd.append("f[]", file);
fetch(Constant.URL.uploadImg, { method: "POST", body: fd })
  .then(r => r.text())
  .then(t => console.log("图片地址:", Constant.URL.uploadedPrefixImg + t));
```

> 图片格式白名单 `Assets.filter.uploadImg`（L15437）：`jpg jpeg png gif bmp webp jfif apng avif`；大小上限 `Constant.Assets.uploadSizeLimitImg`。
> 返回路径以 `i/` 开头表示图片；文件/媒体/流分别对应 `uploadedPrefix.file/media/stream`（当前均为 `http://r.iirose.com/`）。

## 五、图片 / 媒体放大查看器（showImg）

> 聊天图片、相册、名片相册点击放大都走这里。核心是 `showImg`（L1832）+ `#albumShowHolder` 查看器 + `Init.imgResizer`（L33872，基于 **iscroll-zoom** 实现缩放拖拽）。

### 1. 调用入口：`showImg(url[, force])`

```js
// 点击任意图片触发（onclick 内联，imgSrcOri 取原图 URL）
showImg(Utils.imgSrcOri(this));

// 直接调用：放大一张图
showImg("http://r.iirose.com/i/25/8/8/12/xxxx.jpg");

// 强制显示（即使查看器处于隐藏态）
showImg("http://r.iirose.com/...", 1);

// 取原图地址（支持 lazyload：有 src 用 src，否则 data-src）
Utils.imgSrcOri(imgElement);
```

`showImg` 内部（L1832-1836）：
1. 首次调用执行 `Init.imgResizer()`（加载 `lib/js/app/server/imgclip/iscroll-zoom.js`）
2. `Utils.imgReady.set(#albumShow, url)` 设置图片（带加载完成回调）
3. `#albumShowHolder.stop().fadeIn(250)` 淡入全屏查看器

图片加载完成后 `Utils.service.imgContain(browserWidth, browserHeight)` 自适应 contain（L4430）+ `refreshScroll()`。

### 2. 查看器 DOM 结构

```html
<div id="albumShowHolder" class="fullBoxFixed pointer" style="display:none;background-color:rgba(0,0,0,0.9);">
  <div class="mediaShowHolder">            <!-- = #albumShowHolderAnimate，关闭时 scale(0.9) 动画 -->
    <div style="display:inline-block;">
      <img id="albumShow" decoding="async"
           oncontextmenu="event.stopPropagation();Utils.AppUtils.menu('1_0_',this.getAttribute('src'));return false;">
      <div style="height:100%;width:100%;position:absolute;top:0;left:0;"></div>
    </div>
  </div>
</div>
```

| 元素 | 说明 |
|---|---|
| `#albumShowHolder` | 全屏黑罩（rgba(0,0,0,0.9)），点击空白关闭 |
| `#albumShowHolderAnimate`（.mediaShowHolder） | 缩放动画容器 |
| `#albumShow` | 图片本体，挂 IScroll 缩放；右键=下载媒体菜单 `Utils.AppUtils.menu('1_0_', src)` |

### 3. 交互行为（L36266-36271 鼠标事件）

| 操作 | 行为 |
|---|---|
| 滚轮 | 以鼠标位置为中心缩放（`wheelAction: "zoom"`，`zoomMax: 100`） |
| 拖拽 | 自由滚动查看（`freeScroll`） |
| 点击已缩放的图片 | `resetScroll()` 复位到原始比例/位置 |
| 点击空白（非图片） | `fadeOut(250)` 关闭 + `scale(0.9)` 收缩动画 |
| 右键图片 | 弹出 `Utils.AppUtils.menu('1_0_', src)` 下载菜单 |

### 4. 自己扩展（CSS / JS）

```css
/* 改查看器背景 */
#albumShowHolder { background-color: rgba(0,0,0,0.75) !important; }
```

```js
// 打开时自动执行逻辑：监听图片加载
var img = document.getElementById("albumShow");
img.addEventListener("load", function () { console.log("查看器已显示:", this.src); });
```

### 5. 媒体查看器（showMedia，L1838）

同一套容器的音频/视频版本：`showMedia(0=音频/1=视频, url, force)`，对应 `#audioShowHolder`/`#videoShowHolder`，内部结构同 `#albumShowHolder`（`#audioShow`/`#videoShow`）。

```js
showMedia(1, "http://r.iirose.com/...mp4", 1);   // 全屏播放视频
showMedia(0, "http://r.iirose.com/...mp3", 1);   // 全屏播放音频
```

## 六、综合示例

### 示例 1：群聊消息统计机器人（只读，不发消息）

```js
// 在 Console 粘贴运行
window.__msgLog = [];
var _onmsg = socket.__onmessage;
socket.__onmessage = function (e) {
  var d = e.data;
  try {
    var j = JSON.parse(d);
    if (j && j.m && j.uid) window.__msgLog.push({ uid: j.uid, m: j.m, t: Date.now() });
  } catch (err) {}
  return _onmsg.call(this, e);
};
// 之后查看 window.__msgLog 即可
```

### 示例 2：自动回复（收到指定关键词后回复一次）

```js
var _onmsg2 = socket.__onmessage;
socket.__onmessage = function (e) {
  var d = e.data;
  if (typeof d === "string" && d[0] === "{") {
    try {
      var j = JSON.parse(d);
      if (j.m && j.m.indexOf("你好") > -1) {
        setTimeout(function () {
          Utils.service.moveinputDo("你好呀");   // 群聊回复
        }, 500);
      }
    } catch (err) {}
  }
  return _onmsg2.call(this, e);
};
```

> ⚠️ 示例仅供学习。请勿用于刷屏/轰炸/骚扰，遵守房规。

### 示例 3：控制共享视频

```js
// 暂停/播放/跳转
videoPlayer[0].pause();
videoPlayer[0].currentTime = 120;   // 跳到 2 分钟
```

### 示例 4：一键打开面板并插入文本

```js
functionBtnDo(18);                 // 打开翻译机
insertText(moveinput[0], "hello"); // 预填输入框
```

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
