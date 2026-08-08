# 热推房间（roomSplashHolder）

「热推的房间」**不是地图树里的房间分类**，而是一个独立的**全屏面板** `roomSplashHolder`（面板编号 18），展示热门房间的"封面"卡片。

## 入口链路

```
地图 tab「热推的房间」(fire 图标)
  mapSelectJSON["3_1"] → case "9" → functionBtnDo(101)
  → Utils.service.moveinputDo("@+")
  → roomSplashHolder.function.enter()      (面板18)
  → roomSplashHolder.function.update()     (渲染)
```

- 输入框快捷命令：`@+`
- 房间启动时也会自动执行 `moveinputDo("@+")` 打开该面板

## 面板结构

标题 = `languageArr[24][8]` = **「热推的房间」**，共 **4 个分区**：

| 分区 | 图标 | 数据源 |
|---|---|---|
| 热推 | fire | `jumpToMaxPplRoom(1)` ← 核心算法 |
| 历史 | history | `Utils.database("roomHistory")`（本机浏览历史） |
| 订阅 | star | `Assets.subscribeRidArr`（订阅房间列表） |
| 会员 | wallet-membership | `mapHolder.function.houseSelect(2,...)`（高级会员房间） |

每个房间卡片展示：封面图、房间名、在线人数（`mdi-temperature-celsius` 温度图标）、语言标签。点击卡片进入房间。

## 房间卡片与点击二级菜单（DOM）

房间卡片 = `mapHolder.function.getRoomModHtml(roomJson, 2)` → `mod(0, [1, ...])`（L22827 case 1），热推面板传第 8 参 `t[8]=2` 走**热推分支**。

### 卡片 HTML（热推分支）

```html
<div class="whoisTouch2 mapHolderRoomListItem shopItem" rid="房间id" n="2_1_"
     onclick="Objs.mapHolder.function.event.call(this,8);"
     oncontextmenu="event.stopPropagation();Objs.mapHolder.function.openRoomCatalog(this.getAttribute('rid'));return false;">
  <div style="height:165.6px;width:165.6px;float:left;position:relative;">
    <div class="fullBox"><img class="bgImg" src="封面"></div>          <!-- 封面图 -->
  </div>
  <div style="height:128.8px;width:100%;float:left;">
    <div class="textOverflowEllipsis">房间名</div>                     <!-- 房间名 -->
    <div class="textOverflowEllipsis2Line">简介</div>                  <!-- 简介（iconFilterMsg 过滤） -->
    <div class="textOverflowEllipsis">[锁图标] 在线人数 人在</div>       <!-- 锁/人数 -->
  </div>
</div>
```

- 位置：`#roomSplashHolder .roomSplashBox` 下（165.6 × 294.4px，`boxArr` 缓存 4 个分区容器）
- 属性：`rid`=房间id，`n="2_1_"`=热推卡片标记（决定菜单类型）
- `update()`（L24668-24669）还会在卡片上追加：右上角**热度分 + 温度图标**（热推分区）、左上角**语言标签**、左下角 `mdi-map-marker` 标记（当前所在房）

### 点击交互（与地图树条目相反！）

| 操作 | 行为 |
|---|---|
| **左键点击** | `event(8)` → 弹出**二级菜单**（加入房间/房间目录/房间信息） |
| **右键** | `openRoomCatalog(rid)` → 打开地图树目录浏览该房间（地图树条目是左键直接进房、右键弹菜单，热推卡片正好相反） |

### 二级菜单（#selectHolder）

菜单 = `Utils.buildSelect2(this, mapSelectJSON[y], 回调)`（L22746，通用菜单机制见[弹窗与通知](../frontend/dialogs.md)）。头部先渲染**房间信息卡**（封面、房间名、锁、地区、在线人数「人在」、房管数、简介，`Mod.template(25/24)` + 在线用户列表 `mod(4, rid)`），其后是菜单项（`mapSelectJSON` L23883-23891，均为 `.selectHolderBoxItem`）：

| 项 | 图标 | 动作 | 回调（L22747-22764） |
|---|---|---|---|
| `0` 加入房间 | `mdi-door` | 进房（密码房自动弹输入） | `roomchanger(rid)` |
| `1` 房间目录 | `mdi-folder` | 打开地图树目录 | `openRoomCatalog(rid)` |
| `2` 房间信息 | `mdi-bulletin-board` | 打开房间信息面板 | `showRoomInfo(rid,1)` |
| `3` 插入房间标签 | `mdi-map-marker` | 输入框插入 `[_rid_]` | `lib(10, e)` + 插入 |
| `b` 查看封面大图 | `mdi-image` | 全屏看封面 | `showImg(封面)`（仅地图分支出现） |

- 非当前房间 `y="2_1"` → `[加入房间, 房间目录, 房间信息]`
- 当前所在房间 → `y="2_0"` → `[房间目录, 房间信息]`（无"加入房间"）

### 脚本示例

```js
// 模拟左键点击热推面板第一张卡片 → 弹出二级菜单
Objs.roomSplashHolder.boxArr.eq(0).find(".mapHolderRoomListItem").first()[0].click();

// 对任意卡片元素直接弹菜单（event 的 this 需为卡片元素）
Objs.mapHolder.function.event.call(卡片元素, 8);

// 隐藏菜单里的"加入房间"（第一个 .selectHolderBoxItem，头部信息卡不在其中）
$("#selectHolder .selectHolderBox .selectHolderBoxItem").eq(0).hide();
```

> 该二级菜单是 `mapHolder.function.event(8)` 通用逻辑，地图树里的房间条目（右键触发）也复用同一套菜单。


## 核心算法：`jumpToMaxPplRoom(n)`（L3653）

**纯本地计算**，不依赖额外 socket 请求，使用已有数据：在线用户 `userJson` + 地图树 `roomArr` + 状态分表 `userStatusScoreJson`。

```js
function jumpToMaxPplRoom(n) {
  var d = {};                        // 房间id → 活跃度总分
  // 1. 遍历所有在线用户，按在线状态分累加到其所在房间
  for (i in userJson) {
    var a = userJson[i];
    var sc = userStatusScoreJson[a[11]];   // 状态分（挂机/活跃/聊天/刚加入）
    d[a[4]] = (d[a[4]] || 0) + sc;         // a[4] = 用户所在房间id
  }
  var b = [], h = 0;
  // 2. 递归 roomArr 树，收集房间id 与其活跃度（含地区过滤）
  (function z(u) {
    for (i in u) {
      var t = u[i], c = 0;
      if (t[6]) c += z(t[6]);              // 子树累加
      c += d[t[0]] || 0;                    // 房间自身
      if (t[7] != undefined && t[0] != "x") {   // 叶子房间
        l[t[0]] = c; b.push([c, t[0]]); h += c;
      }
    }
    return c;
  })(roomArr);

  // 3. 热推模式 n=1
  if (n) {
    b = b.filter(x => x[0] >= 10);         // 活跃分 ≥ 10
    h = h / b.length;                       // 平均分
    b.sort((x, y) =>
      (y[0] > h ? h - (y[0] - h) / 3 : y[0])   // 头部平滑：超过平均分的热门房被压缩 1/3
      - (x[0] > h ? h - (x[0] - h) / 3 : x[0]));
    return b;                               // 降序列表
  }

  // 4. 自动跳房模式 n=0（登录后）
  b = b.filter(x => x[0] >= 20);            // 截掉 <20
  b.sort((x, y) => y[0] - x[0]);
  // 按分数加权随机选房
  var e = b.length ? b[Math.round(Math.random() * (b.length - 1))] : null;
  return e;
}
```

### 要点

1. **活跃度计分**：房间分数 = 房内每个在线用户的"状态分"之和（状态分表 `userStatusScoreJson`，不同在线状态对应不同分值）
2. **过滤**：热推模式只保留**活跃分 ≥ 10** 的房间
3. **热度平滑**：高于平均分 `h` 的房间，分数被调整为 `h - (分-h)/3`，防止头部房间霸榜
4. **排序**：按平滑后分数降序
5. **自动跳房**（`n=0`）：登录后调用，截断 <20 分的房间，在降序列表中按权重随机选择，实现"热度加权随机跳热门房"

## 数据依赖

| 数据 | 来源 | 说明 |
|---|---|---|
| `userJson` | 房间在线列表（`+` whois） | 用户 → 所在房间 |
| `roomArr` | 地图数据（`%` 推送） | 房间树 |
| `userStatusScoreJson` | 客户端内置 | 状态分表 |
| `Assets.roomNameJson` | 地图数据 | 房间名映射 |
| `Utils.database("roomHistory")` | localStorage | 浏览历史（历史分区） |
| `Assets.subscribeRidArr` | `=^v#` 订阅列表 | 订阅分区 |

## 关键源码位置（messages.js）

| 位置 | 内容 |
|---|---|
| L2869-2870 | `@+` 命令 → 打开面板 |
| L22626 | 地图 tab 配置 `["9", "热推的房间", fire]` |
| L22786-22787 | tab 点击 → `functionBtnDo(101)` |
| L14625 附近 | `functionBtnDo` case 101 → `moveinputDo("@+")` |
| L24626-24676 | 面板构建 + `update()` 渲染 |
| L3653-3694 | `jumpToMaxPplRoom` 核心算法 |

## 屏蔽不想看的热推房间

> 官方**没有**屏蔽热推房间的功能，以下为**自定义脚本示例**（借官方房间列表数据结构自己实现过滤），非平台功能。

热推列表数据源为 `jumpToMaxPplRoom(1)` 返回的 `[活跃分, rid]` 数组（reference/src/messages.js L24660），渲染时对 `rid` 过滤即可实现屏蔽。提供两个层面：

### 方案 A：数据层（推荐，热推 + 自动跳房都生效）

包装 `Utils.service.jumpToMaxPplRoom`，过滤掉黑名单 `rid`：

```js
(function () {
  const black = JSON.parse(localStorage.getItem('iirose_splash_black') || '[]');
  const orig = Utils.service.jumpToMaxPplRoom;
  Utils.service.jumpToMaxPplRoom = function (n) {
    const list = orig.apply(this, arguments);
    // 数组模式返回 [活跃分, rid]，对象模式返回单房
    const arr = Array.isArray(list) ? list.filter(x => !black.includes(x[1])) : list;
    return arr;
  };
})();
```

### 方案 B：DOM 层（改渲染结果，不动函数）

面板重渲染后删除黑名单卡片（卡片带 `rid` 属性）：

```js
(function () {
  const black = JSON.parse(localStorage.getItem('iirose_splash_black') || '[]');
  const box = Objs.roomSplashHolder.content;
  const kill = () => black.forEach(rid =>
    box.find('.mapHolderRoomListItem[rid="' + rid + '"]').remove());
  new MutationObserver(kill).observe(box[0], { childList: true, subtree: true });
  kill();
})();
```

### 黑名单维护

```js
// 屏蔽当前房间（例：点击按钮调用）
localStorage.setItem('iirose_splash_black',
  JSON.stringify([...new Set([...JSON.parse(localStorage.getItem('iirose_splash_black') || '[]'), roomn])]));
// 查看 / 清空
JSON.parse(localStorage.getItem('iirose_splash_black') || '[]');
localStorage.removeItem('iirose_splash_black');
```

> 注意：`update()` 用 `htmlBak` 做内容缓存，仅当列表变化才重渲染，因此 MutationObserver 方案在刷新时会自动重挂载，无需担心性能。

---

> ⚠️ **免责声明**：本节内容仅供**学习与逆向分析交流**。其中描述的自动化能力（消息拦截/hook、绕过前端过滤直接 `socket.send` 发送消息/弹幕/广播、自动发言与回复、批量抓取用户或接口数据、模拟点击与机器人化操作等）**可能不被平台允许**，实际使用可能导致账号封禁。请勿用于刷屏、轰炸、骚扰、爬取隐私或任何影响他人体验的用途，由此产生的一切后果由使用者自行承担。
