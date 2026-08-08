# 弹窗系统（Dialog）

IIROSE 前端的全部交互弹窗由 **`#syncHolder`** 面板（面板编号 24）承载，通过 `Utils.sync` 按模式分发到不同的子容器；菜单/选择类弹窗则走 **`#selectHolder`**。本文档覆盖官方弹窗的全部写法（可原样调用，也可仿写自定义弹窗）。

> 逆向依据：`reference/src/messages.js`
> - `Utils.sync` 定义：L6185
> - `Utils.buildSelect` / `buildSelect2`：L6500 / L6522
> - `_alert` 定义：L1712
> - `Mod.Html` / `Mod.template`：L15374

## 1. `Utils.sync(mode, data, callback)` — 通用弹窗

官方所有确认框、输入框、提示框的统一入口（`#syncHolder`，面板编号 24）。调用时若已有弹窗在显示，会进入 `taskArr` 队列排队。

| mode | 子容器 | 用途 | 回调参数 |
|---|---|---|---|
| `0` | `syncAlertHolder` | 纯提示（一个确定按钮） | 无 |
| `1` | `syncConfirmHolder` | **确认框**（确定/取消） | `e`：`true`=确定，`false`=取消 |
| `2` | `syncPromptHolder` | 单行输入框 | `e`：输入内容；`null`=取消 |
| `3` | `syncTextareaHolder` | 多行输入框 | `e`：输入内容；`null`=取消 |
| `4` | `syncSliderHolder` | 滑动展示（头像/图片类） | 按场景 |

### 1.1 确认框 `sync(1, ...)`

官方真实用法示例（关机会话确认，L19669）：

```js
Utils.sync(1, "您确认要关机吗 ?", function (e) {
  e && doShutdown()   // 只有点「确定」才执行
})
```

支付确认（L25772）：

```js
Utils.sync(1, "请您确认支付信息\n\n微信付款 : 6.00 元", function (e) {
  e && socket.send("vp$2w6.00 备注")
})
```

删除二次确认（L29037）：

```js
Utils.sync(1, "[再次确认] 删除帖子 [无法恢复]", function (e) {
  e && doDelete()
})
```

### 1.2 输入框 `sync(2, ...)` / `sync(3, ...)`

参数为数组 `[提示文本, type/maxlength, maxlength, 默认值]`，回调第一个参数为输入值，**取消时返回 `null`**：

```js
// 单行文本（L19137）
Utils.sync(2, ["请输入要操作的时长 , 单位 : h时 | m分 | s秒", "text", 14, ""], function (e) {
  if (e !== null) applyDuration(e)
})

// 数字输入（L19243）
Utils.sync(2, ["请输入要限制的最大人数", "number", 9, ""], function (e) { ... })

// 多行文本（L19186）
Utils.sync(3, ["请输入内容 . . .", 1e4, ""], function (e) {
  if (e !== null) sendContent(e)
})
```

## 2. `Utils.buildSelect(el, options, callback, ...)` — 选择菜单

基于 **`#selectHolder`** 的弹出菜单，IIROSE 绝大多数交互（菜单、设置项、确认选择）用它。`options` 为 `[[值, 文本, 图标], ...]`，点击某项触发回调并自动关闭。

### 2.1 基本用法（点击触发元素，L4218）

```js
Utils.buildSelect2(null, [
  ["0", "选项一", Mod.template(23, "check")],
  ["1", "选项二", Mod.template(23, "close")]
], function (el, value) {
  // value 为选中项的值（字符串）
  switch (value) {
    case "0": break
    case "1": break
  }
})
```

### 2.2 绑定触发元素（`buildSelect`，L6500）

```js
Utils.buildSelect(triggerEl, options, callback)
// 触发元素需带 v 属性（当前值），点击后选项高亮当前值
```

### 2.3 多选（checkbox 模式）

选项元素加 `data-checkbox`，回调收到**逗号分隔的值列表**：

```js
Utils.buildSelect2(null, [
  ["a", "选项A"],
  ["b", "选项B"]
], function (el, values) { ... }, null, null, null, 1)   // r=1 → 多选
```

### 2.4 用法要点

- 第二版 `buildSelect2` 第一个参数传 `null` 即可弹出临时菜单（无触发元素绑定）
- 关闭菜单后可设置 `selectCallBackOnReturn`（返回回调，L6518）
- 单选项为空时会走 `_alert(languageArr[7][104])`（"无可选"提示）

## 3. `_alert(content, [title, sub, icon], isHtml, ...)` — 消息通知

右上角 `#alertHolder` 的轻量通知，4 秒自动消失，不阻塞操作：

```js
_alert("文件发送请求已发出 , 正在等待对方确认 . . .")        // 纯文本
_alert("标题 / 内容", ["标题", "副内容", "图标URL"])          // 带标题+系统通知+语音
_alert("<b>富文本</b>", 0, 1)                                // isHtml=1 时不解码 HTML
```

## 4. `Mod.template(index, ...)` — HTML 片段生成器

所有弹窗/卡片内容的构造工具（`Mod.Html`，L15374），按编号返回预设 HTML 骨架：

| index | 用途 | 示例 |
|---|---|---|
| `22` | 图片标签 | `Mod.template(22, "http...jpg")` |
| `23` | MDI 图标 span | `Mod.template(23, "check")` |
| `27` | 文本 | `Mod.template(27, "文本", 1)` |
| `52` | 带 max-height 的滚动文本块 | `Mod.template(52, "长文本", "max-height:200px;")` |

组合使用即拼出一个弹窗项：

```js
["1", "扫码支付", Mod.template(23, "qrcode")]
```

## 5. 自定义弹窗示例

以下为仿官方写法的**自定义示例**（非官方功能），可直接在控制台验证。

### 5.1 自定义确认框

```js
// 直接调用官方确认框
Utils.sync(1, "确定要执行自定义操作吗 ?", function (e) {
  if (e) console.log("用户点了确定")
})
```

### 5.2 自定义菜单（选择弹窗）

```js
Utils.buildSelect2(null, [
  ["play", "播放", Mod.template(23, "play")],
  ["stop", "停止", Mod.template(23, "stop")],
  ["cancel", "取消", Mod.template(23, "close")]
], function (el, value) {
  if (value === "play") playerFunction(0)
  if (value === "stop") playerFunction(1)
})
```

### 5.3 组合：输入 + 确认

```js
Utils.sync(2, ["请输入自定义内容", "text", 100, ""], function (input) {
  if (input === null) return                    // 用户取消
  Utils.sync(1, "确认发送 : " + input + " ?", function (ok) {
    if (ok) socket.send(input)                  // 自定义发送
  })
})
```

## 6. 相关 DOM

| id | 说明 |
|---|---|
| `#syncHolder` | 弹窗总容器（面板 24），子元素按模式显示 |
| `#syncConfirmHolder` | 确认框容器（含确定/取消按钮） |
| `#syncPromptHolder` / `#syncTextareaHolder` | 单行/多行输入容器 |
| `#syncAlertHolder` / `#syncSliderHolder` | 提示 / 滑动展示容器 |
| `#selectHolder` | 选择菜单容器，`.selectHolderBoxItem` 为选项项 |
| `#alertHolder` | 右上角消息通知容器 |

## 免责声明

> 本文档中的弹窗函数（`Utils.sync`、`Utils.buildSelect*`、`_alert`、`Mod.template`）是 IIROSE 官方前端自带的**公开交互 API**，正常使用不违反规则。
> 「自定义示例」为仿官方写法的演示，属自定义脚本；其中通过 `socket.send` 发送内容的行为可能不被平台允许，请谨慎使用，由此产生的封禁等后果由使用者自行承担。
