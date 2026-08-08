if ("https:" == location.protocol) {
  var strTmp2, cookieStorage, referrer = document.referrer || ""; - 1 < referrer.indexOf("iirose.com/") && (referrer = (strTmp = sessionStorage.getItem("referrer")) ? (sessionStorage.removeItem("referrer"), strTmp) : "");
  try {
    null === (cookieStorage = localStorage.getItem("cookie")) && localStorage.setItem("cookie", "{}"), cookieStorage = JSON.parse(cookieStorage || "{}")
  } catch (e) {
    cookieStorage = {}, localStorage.setItem("cookie", "")
  }

  function CookieReal(e, t, n) {
    var o;
    if (void 0 === t) {
      for (var i, r = document.cookie.split("; "), a = 0, s = r.length; a < s; ++a)
        if ((i = r[a].split("="))[0] == e) return decodeURIComponent(i[1])
    } else void 0 !== n ? ((o = new Date).setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), document.cookie = e + "=" + encodeURIComponent(t) + "; expires=" + o.toGMTString() + "; path=/") : document.cookie = e + "=" + encodeURIComponent(t) + "; path=/"
  }

  function removeCookieReal(e) {
    document.cookie = e + "=; expires=Wed, 31 Dec 1969 23:59:59 GMT; path=/"
  }

  function Cookie(e, t) {
    if (void 0 === t) return cookieStorage[e];
    cookieStorage[e] = String(t), localStorage.setItem("cookie", JSON.stringify(cookieStorage))
  }

  function removeCookie(e) {
    cookieStorage.hasOwnProperty(e) && (delete cookieStorage[e], localStorage.setItem("cookie", JSON.stringify(cookieStorage)))
  }
  hashRun = function() {
    var o;
    return location.hash.substr(1).split("&").forEach(function(e) {
      var t = e.indexOf("="),
        n = e.substr(t + 1);
      switch (e.substr(0, t)) {
        case "s":
          13 == n.length && "{}" == localStorage.getItem("cookie") && sessionStorage.setItem("promoterID", n);
          break;
        case "r":
          13 == n.length && sessionStorage.setItem("roomjumper", n);
          break;
        case "act":
          15 == n.length && sessionStorage.setItem("act", n);
          break;
        case "p":
          switch (n) {
            case "1txy":
            case "mxz":
            case "sumall":
            case "sumallPay":
              sessionStorage.setItem("partner", n)
          }
          break;
        case "device":
          switch (n) {
            case "androidApp":
              5 != localStorage.getItem("device") && localStorage.setItem("device", 5);
              break;
            case "ios":
              2 != localStorage.getItem("device") && localStorage.setItem("device", 2);
              break;
            case "windows":
              7 != localStorage.getItem("device") && localStorage.setItem("device", 7);
              break;
            case "mac":
              6 != localStorage.getItem("device") && localStorage.setItem("device", 6);
              break;
            case "linux":
              10 != localStorage.getItem("device") && localStorage.setItem("device", 10);
              break;
            case "wechat":
              9 != localStorage.getItem("device") && localStorage.setItem("device", 9);
              break;
            case "wechat2":
              8 != localStorage.getItem("device") && localStorage.setItem("device", 8)
          }
          break;
        case "androidInitData":
          sessionStorage.setItem("androidInitData", decodeURIComponent(n));
          break;
        case "androidSetData":
          location.href = "https://iirose.com/lib/html/android/browserDataSeter.html#device=androidApp&action=set", o = !0;
          break;
        case "androidGetData":
          location.href = "https://iirose.com/lib/html/android/browserDataSeter.html#device=androidApp&action=get", o = !0;
          break;
        case "pd":
          sessionStorage.setItem("partnerData", decodeURIComponent(n));
          break;
        case "ln":
          sessionStorage.setItem("slink", n)
      }
    }), o
  }
}
document.domain = "iirose.com";
var mainUrl = "https://iirose.com/";
if (location != mainUrl && location != mainUrl + location.hash) "http:" == location.protocol ? !localStorage.length || localStorage.getItem("toHttps") ? location.href = mainUrl + (location.hash || "") : (() => {
  var t, n = localStorage.getItem("cookie");
  if (null === n ? -1 < document.cookie.indexOf("username=") && (t = ["breakautologin", "autologin", "loginError", "lastroom", "lrr", "refresh", "url", "device", "promoterID", "slink"], n = {}, document.cookie.split("; ").forEach(function(e) {
      2 == (e = e.split("=")).length && -1 == t.indexOf(e[0]) && (n[e[0]] = decodeURIComponent(e[1]))
    }), localStorage.setItem("cookie", JSON.stringify(n)), a = 1) : -1 < n.indexOf('"username":"') && (a = 1), a)
    for (var e, o = {}, i = 0, r = localStorage.length; i < r; ++i) o[e = localStorage.key(i)] = localStorage.getItem(e);
  var a, s = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (s)
    for (i = s.length; i--;) document.cookie = s[i] + "=; expires=Wed, 31 Dec 1969 23:59:59 GMT; path=/";
  localStorage.clear(), sessionStorage.clear(), localStorage.setItem("toHttps", 1), a ? ((a = document.getElementById("mainFrame")).onload = function() {
    addEventListener("message", function(e) {
      "done" == e.data && (location.href = mainUrl + (location.hash || ""))
    }), this.contentWindow.postMessage(JSON.stringify(o), "*")
  }, a.src = mainUrl + "lib/html/http2httpsLocalStorage.html") : location.href = mainUrl + (location.hash || "")
})() : (doNotJump = !1, referrer && sessionStorage.setItem("referrer", referrer), (doNotJump = location.hash ? hashRun() : doNotJump) || (location.href = mainUrl));
else if (location == mainUrl || (referrer && sessionStorage.setItem("referrer", referrer), !hashRun() && !void(location.hash = ""))) {
  isLocal = !1;
  var regexpLocation, isPWA, Urls = {
      domain: mainUrl,
      api: "https://a.iirose.com/",
      business: "https://b.iirose.com/",
      helper: "http://z.iirose.com/",
      helperS: "https://z.iirose.com/",
      output: "http://o.iirose.com/",
      outputS: "https://o.iirose.com/",
      agent: "http://w.iirose.com/",
      agentS: "https://w.iirose.com/",
      static: "https://s.iirose.com/",
      p2p: "https://p.iirose.com/",
      shield: "https://d.iirose.com/",
      ai: "http://ai.iirose.com/",
      checkLocation: "https://mx.iirose.com/",
      upload: {
        file: "https://f.iirose.com/",
        img: "https://f.iirose.com/",
        media: "https://f.iirose.com/",
        stream: "https://f.iirose.com/"
      },
      uploadedPrefix: {
        file: "http://r.iirose.com/",
        img: "http://r.iirose.com/",
        media: "http://r.iirose.com/",
        stream: "http://r.iirose.com/"
      }
    },
    userAgent = navigator.userAgent,
    userAgentLowerCase = userAgent.toLowerCase(),
    device = localStorage.getItem("device"),
    isFirefox = (-1 < userAgentLowerCase.indexOf("micromessenger") && (-1 < userAgentLowerCase.indexOf("miniprogram") ? 9 != device && localStorage.setItem("device", device = 9) : 8 != device && localStorage.setItem("device", device = 8)), device || localStorage.setItem("device", device = CookieReal("device") || 0), device = Number(device), -1 < userAgentLowerCase.indexOf("firefox")),
    realAppVersion = (5 == device && isFirefox && (onhashchange = function() {
      location.hash && (hashRun(), location.href = location.href.split("#")[0])
    }, (GVD = {
      initArr: [],
      callback: {}
    }).init = JSON.parse(sessionStorage.getItem("androidInitData") || "{}"), GV_INIT = function() {
      GVD.initArr.length && GVD.initArr.forEach(function(e) {
        GV.apply(null, e)
      }), delete GVD.initArr, delete window.GV_INIT
    }, GV = function(e, t) {
      if (window.GVS) {
        e.length && "function" == typeof e[e.length - 1] && (GVD.callback[n = Math.random()] = e[e.length - 1]);
        var n, o = e.callee.name;
        if (t) {
          for (var i, r = {}, a = n ? e.length - 1 : e.length, s = 0, c = t.length; s < c; ++s)
            if (s < a) r[s] = e[s];
            else {
              switch (t[s]) {
                case "String":
                  i = null;
                  break;
                case "int":
                case "float":
                case "double":
                  i = 0;
                  break;
                case "boolean":
                  i = !1;
                  break;
                case "long":
                  i = 0;
                  break;
                default:
                  i = null
              }
              r[s] = i
            } GVS(o, n, r, t)
        } else GVS(o, n)
      } else GVD.initArr.push(arguments)
    }, GVR = function(e, t) {
      var n = GVD.callback[e];
      delete GVD.callback[e], n(t)
    }, Main = {
      initLanguageArr: function() {
        GV(arguments, ["int"])
      },
      setSettings: function() {
        GV(arguments, ["String", "String"])
      },
      showMenu: function() {
        GV(arguments)
      },
      notifyToast: function() {
        GV(arguments, ["String", "boolean"])
      },
      notify: function() {
        GV(arguments, ["String", "String", "String", "String", "int", "boolean", "boolean"])
      },
      getPageBlur: function() {
        GV(arguments)
      },
      backgroundApp: function() {
        GV(arguments)
      },
      saveMedia: function() {
        GV(arguments, ["String", "String"])
      },
      getUniquePsuedoID: function() {
        GV(arguments)
      },
      onbeforeunloadSave: function() {
        GV(arguments, ["String"])
      },
      onbeforeunloadRead: function() {
        GV(arguments)
      },
      setClock: function() {
        GV(arguments, ["int", "int"])
      },
      rotate: function() {
        GV(arguments)
      },
      getNetType: function() {
        GV(arguments)
      },
      socialAccLogin: function() {
        GV(arguments, ["String"])
      },
      reload: function() {
        GV(arguments)
      },
      clearCache: function() {
        GV(arguments)
      },
      clearNetworkCache: function() {
        GV(arguments, ["boolean"])
      },
      getScreenInch: function() {
        GV(arguments)
      },
      getScreenPixel: function() {
        GV(arguments)
      },
      getScreenDensity: function() {
        GV(arguments)
      },
      getNotchInfo: function() {
        GV(arguments)
      },
      hasNavigationBar: function() {
        GV(arguments)
      },
      hasNotchInScreen: function() {
        GV(arguments)
      },
      getVersionCode: function() {
        GV(arguments)
      },
      getSdkCode: function() {
        GV(arguments)
      },
      clickWebview: function() {
        GV(arguments, ["float", "float"])
      },
      isNotificationEnabled: function() {
        GV(arguments)
      },
      isNotificationChannelEnabled: function() {
        GV(arguments)
      },
      updateNotificationInfo: function() {
        GV(arguments, ["String", "String", "String", "String", "String", "String", "String", "String", "String", "boolean", "String", "String"])
      },
      getShareData: function() {
        GV(arguments)
      },
      getClipboardData: function() {
        GV(arguments)
      },
      putClipboardData: function() {
        GV(arguments, ["String"])
      },
      clearWebviewData: function() {
        GV(arguments)
      },
      getScreenMode: function() {
        GV(arguments)
      },
      setScreen: function() {
        GV(arguments, ["String"])
      },
      setTimer: function() {
        GV(arguments, ["int", "int"])
      },
      clearTimer: function() {
        GV(arguments)
      },
      saveFile: function() {
        GV(arguments, ["String", "String"])
      },
      p2pReqFileAccess: function() {
        GV(arguments)
      },
      p2pSaveOpen: function() {
        GV(arguments, ["String"])
      },
      p2pSaveChunk: function() {
        GV(arguments, ["String", "String"])
      },
      p2pSaveClose: function() {
        GV(arguments, ["String"])
      },
      p2pSaveAbort: function() {
        GV(arguments, ["String"])
      },
      startScreenCapture: function() {
        GV(arguments, ["int", "int", "int"])
      },
      stopScreenCapture: function() {
        GV(arguments)
      },
      keepScreenOn: function() {
        GV(arguments, ["boolean"])
      },
      updateScreenCapture: function() {
        GV(arguments, ["int", "int", "int"])
      },
      updateAudioCapture: function() {
        GV(arguments, ["int", "int", "int"])
      },
      startAudioCapture: function() {
        GV(arguments, ["int", "int", "int"])
      },
      stopAudioCapture: function() {
        GV(arguments)
      },
      socket: function() {
        GV(arguments, ["int", "String"])
      },
      socketSend: function() {
        GV(arguments, ["String"])
      },
      pageReady: function() {
        GV(arguments)
      },
      getPushTokens: function() {
        GV(arguments)
      },
      showPage: function() {
        GV(arguments)
      },
      pay: function() {
        GV(arguments, ["int", "String"])
      },
      getCpuArch: function() {
        GV(arguments)
      },
      setCoreType: function() {
        GV(arguments, ["boolean"])
      },
      restartApp: function() {
        GV(arguments)
      },
      getData: function() {
        GV(arguments, ["String"])
      },
      setData: function() {
        GV(arguments, ["String", "String"])
      },
      openUrl: function() {
        GV(arguments, ["String"])
      },
      openPermissionPage: function() {
        GV(arguments)
      },
      ignoringBatteryOptimizations: function() {
        GV(arguments)
      },
      isIgnoringBatteryOptimizations: function() {
        GV(arguments)
      },
      openOemAutoStart: function() {
        GV(arguments)
      },
      openOemBackgroundSettings: function() {
        GV(arguments)
      },
      getSpValString: function() {
        GV(arguments, ["String"])
      },
      getSpValInt: function() {
        GV(arguments, ["String"])
      },
      getSpValBoolean: function() {
        GV(arguments, ["String"])
      },
      getSpValFloat: function() {
        GV(arguments, ["String"])
      },
      setSpValString: function() {
        GV(arguments, ["String", "String"])
      },
      setSpValInt: function() {
        GV(arguments, ["String", "int"])
      },
      setSpValBoolean: function() {
        GV(arguments, ["String", "boolean"])
      },
      setSpValFloat: function() {
        GV(arguments, ["String", "float"])
      },
      hideKeyboard: function() {
        GV(arguments)
      },
      debug: function() {
        GV(arguments, ["boolean"])
      },
      getDisplayMode: function() {
        GV(arguments)
      },
      setDisplayMode: function() {
        GV(arguments, ["int"])
      },
      getColorMode: function() {
        GV(arguments)
      },
      setColorMode: function() {
        GV(arguments, ["int"])
      },
      getDisplayInfo: function() {
        GV(arguments)
      }
    }), document.getElementsByTagName("html")[0].getAttribute("ver")),
    appVersion = localStorage.getItem("appcacheV"),
    deviceVersion = 5 == device ? isFirefox ? GVD.init.getVersionCode : Main.getVersionCode ? Main.getVersionCode() : 0 : 0,
    requireSSLResource = (5 == device && (sdkCode = isFirefox ? GVD.init.getSdkCode : Main.getSdkCode ? Main.getSdkCode() : 0, cpuArch = isFirefox ? GVD.init.getCpuArch : Main.getCpuArch ? Main.getCpuArch() : ""), 5 != device && 3 != device && 8 != device && 9 != device),
    bugArr = (requireSSLResource && (Urls.ai = Urls.ai.replace("http://", "https://")), ["QuotaExceededError", "exceeded the quota"]),
    ajax = (bugProcesser = function(s) {
      bugArr.forEach(function(e) {
        if (-1 < s.indexOf(e)) switch (e) {
          case "QuotaExceededError":
          case "exceeded the quota":
            for (var t = [], n = 0, o = localStorage.length; n < o; ++n) 0 == localStorage.key(n).indexOf("pmLog_") && t.push(localStorage.key(n));
            if (t.length) {
              alert("您的储存空间已满 , 需要清空私聊日志来解除故障 , 将为您运行清理向导");
              for (var i, r = Cookie("uid"), a = "以下为帐户日志列表 : \n", o = (t.forEach(function(e, t) {
                  e = e.substr(6);
                  a += "● " + t + " : " + ("guest" == e ? "游客" : e == r ? "当前帐户" : e) + "\n"
                }), a += "请输入您要清理的编号 : ", t.length);;)
                if (i = prompt(a))
                  if (t[i]) {
                    if (localStorage.removeItem(t[i]), !--o || !confirm("清理成功 , 您是否要继续清理 ?")) break;
                    t[i] = 0, a = a.replace(new RegExp("\\n● " + i + " : .*?\\n"), "\n")
                  } else alert("您的输入有误请重新输入");
              else if (!confirm("您没有选中任何清理 , 您是否要继续清理 ?")) break;
              alert("如果您在刷新后仍然不能正常运行程序 , 请继续清理\n如果您恢复了正常 , 请及时清理您的私聊日志 !")
            } else confirm("您的储存空间已满 , 您需要清空数据来恢复运行\n您要清空所有数据吗 ?") && localStorage.clear();
            confirm("是否要重载页面 ? 注 : 如果您想手动清理聊天日志 , 请点否 , 否则强烈建议您重载页面") && location._reload()
        }
      })
    }, function(e) {
      var t = new XMLHttpRequest;
      e.responseType && (t.responseType = e.responseType), !1 !== e.async && (t.timeout = e.timeout || 12e4);
      var n, o, i = "";
      if (e.data) {
        var r = e.data;
        if ("POST" == e.type) {
          var a = e.formData;
          for (s in r) void 0 !== r[s] && (void 0 === n && (n = a ? new FormData : ""), a ? n.append(s, r[s]) : n += "&" + s + "=" + encodeURIComponent(r[s]));
          !a && n && (n = n.substr(1), o = !0)
        } else {
          for (var s in r) void 0 !== r[s] && (i += "&" + s + "=" + encodeURIComponent(r[s]));
          i = i && "?" + i.substr(1)
        }
      }
      return t.open(e.type || "GET", e.url + i + ("POST" == e.type || void 0 === e.cache || e.cache ? "" : (i ? "&" : "?") + "_=" + Date.now()), void 0 === e.async || e.async), t.onreadystatechange = function() {
        4 == this.readyState && (200 == this.status ? e.success && e.success("blob" == e.responseType ? this.response : this.responseText) : e.error && e.error())
      }, o && t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(n), t
    }),
    userLocation = localStorage.getItem("userLocation"),
    strTmp = !1;
  if (userLocation) {
    let e = userLocation.split(">");
    userLocation = e[1], Date.now() / 1e3 - e[0] < 259200 && (strTmp = !0)
  }
  strTmp || ajax({
    url: Urls.checkLocation,
    cache: !1,
    success: function(e) {
      e ? (localStorage.setItem("userLocation", Math.round(Date.now() / 1e3) + ">" + e), userLocation = e) : null === userLocation && (userLocation = !1), frames[0].Temporary && frames[0].Temporary.onLocationLoad && (frames[0].Temporary.onLocationLoad(), delete frames[0].Temporary.onLocationLoad)
    },
    error: function() {
      null === userLocation && (userLocation = !1), frames[0].Temporary && frames[0].Temporary.onLocationLoad && (frames[0].Temporary.onLocationLoad(), delete frames[0].Temporary.onLocationLoad)
    }
  }), sendBug = function(e, t) {
    var n, o, e = "string" == typeof e ? e : e.stack || e.toString(); - 1 < e.indexOf("Blocked a frame with origin") || -1 < e.indexOf("Script error. @ :0:0") || (regexpLocation = regexpLocation || new RegExp(location.href, "g"), e = e.replace(regexpLocation, ""), n = Cookie("uid"), (o = {}).d = (appVersion || "now") + " | " + e + " | " + (new Date).toLocaleString() + " | " + userAgent + " | " + device + (5 == device && deviceVersion ? " : " + deviceVersion + (sdkCode ? " / SDK " + sdkCode + (cpuArch ? " " + cpuArch : "") : "") : "") + (n ? " | " + n : ""), void 0 !== t && (o.t = t, console.log(e)), ajax({
      type: "POST",
      url: "lib/php/system/debug.php",
      data: o
    }))
  }, onerror = function(e, t, n, o, i) {
    t && -1 < t.indexOf("://") && -1 == t.indexOf("iirose.com") || (bugProcesser(e), sendBug(i && i.stack ? i : ("Uncaught " == e.substr(0, 9) ? e.substr(9) : e) + " @ " + t + ":" + n + ":" + o))
  }, (isPWA = 5 == device ? (location.isAndroid = 1, location._reload = function() {
    (Main.reload ? Main : this).reload()
  }, isFirefox && (open = function(e) {
    var t;
    106 < deviceVersion ? (t = e.substr(0, 7), Main.openUrl("http://" == t || "https:/" == t ? e : location.href.split("?")[0].split("#")[0] + e)) : location.href = e
  }), 0) : (location._reload = location.reload, window.matchMedia && matchMedia("(display-mode: fullscreen), (display-mode: standalone), (display-mode: minimal-ui)").matches || navigator.standalone)) && ((strTmp = document.createElement("meta")).setAttribute("http-equiv", "Content-Security-Policy"), strTmp.setAttribute("content", "upgrade-insecure-requests"), document.head.appendChild(strTmp));
  var languageType = Cookie("language"),
    regionType = Cookie("region"),
    checkUser = (void 0 !== languageType && (languageType = Number(languageType), document.title = ["IIROSE", "IIROSE", "薔薇花園", "蔷薇花园", "IIROSE", "IIROSE"][languageType]), countIp = function(e) {
      var t, n = sessionStorage.getItem("promoterID"),
        o = sessionStorage.getItem("partner"),
        i = JSON.parse(JSON.stringify(cookieStorage));
      for (t in (device || e || n || o) && (i.extra = {}, e && (i.extra.comment = e), device && (i.extra.device = device), n && (i.extra.promoterID = n), o) && (i.extra.partner = o), ["roomcolor", "roomattr", "roominfo", "roomowner", "mood", "changeN", "reduceDataUsageMode", "msgvolume", "homePos", "homeHolderMsgP", "systemVolume", "wallpaperBlur"].forEach(function(e) {
          delete i[e]
        }), i)
        if ("extra" == t)
          for (var r in i[t]) "" === i[t][r] && delete i[t][r];
        else "" === i[t] && delete i[t];
      i = JSON.stringify(i), e = {
        ss: screen.width + "*" + screen.height,
        pb: document.documentElement.clientWidth + "*" + document.documentElement.clientHeight,
        ck: "{}" == i ? "" : i
      };
      referrer && (e.ref = referrer), ajax({
        type: "POST",
        url: Urls.business + "lib/php/system/countip.php",
        data: e
      })
    }, countUser = function() {
      var e;
      new RegExp("(Bot|Crawl|Spider|slurp|sohu-search|lycos|robozilla)", "i").test(userAgent) || (_hmt = [], (e = document.createElement("script")).src = "https://hm.baidu.com/hm.js?fc50aa8ad627b912bce4369e0058f3b7", e.async = !0, e.defer = !0, document.head.appendChild(e))
    }, !Cookie("username")),
    mainFrame = (checkUser ? (countIp(), countUser()) : onload = function() {
      countIp(), countUser()
    }, document.getElementById("mainFrame")),
    firstLoad = !1,
    isMobile = new RegExp("(Mobile|Android|iPhone|Windows Phone|iPad|iPod)", "i").test(userAgent),
    isAndroid = new RegExp("(Android)", "i").test(userAgent),
    isEdge = -1 < userAgent.indexOf("Edge"),
    isChrome = !isEdge && -1 < userAgentLowerCase.indexOf("webkit"),
    isIe = isEdge || -1 < userAgent.indexOf("Trident"),
    isIos = new RegExp("(iPhone|iPad|Mac|iPod)", "i").test(userAgent),
    isPureIos = isIos && (isMobile || -1 == userAgent.indexOf("Chrome")),
    isPcApp = 6 == device || 7 == device || 10 == device || 11 == device,
    netType = 5 == device ? isFirefox ? GVD.init.getNetType : Main.getNetType ? Main.getNetType() : 0 : 0;
  if (isPcApp && (isTrayOn = Main.getTray()), 5 == device)
    for (isNotificationChannelEnabled = (isNotificationEnabled = isFirefox ? GVD.init.isNotificationEnabled : Main.isNotificationEnabled ? Main.isNotificationEnabled() : 0) ? 112 < deviceVersion ? isFirefox ? GVD.init.isNotificationChannelEnabled : Main.isNotificationChannelEnabled() : "*" : "", strTmp = 0, strTmp2 = (isNotificationChannelEnabled = (isNotificationChannelEnabled ? "*" == isNotificationChannelEnabled ? "11111111" : isNotificationChannelEnabled : "00000000").split("")).length; strTmp < strTmp2; ++strTmp) isNotificationChannelEnabled[strTmp] = parseInt(isNotificationChannelEnabled[strTmp]);
  var donotPlayVideo = 0,
    mobileFullScreen = isMobile && 5 != device,
    supportAPI = (() => {
      var e;
      return !(!isMobile || 5 == device || isIos || !window.visualViewport || !((e = userAgent.match(/Chrome\/(\d+)/)) && 108 <= Number(e[1])))
    })();
  if (supportAPI && !Cookie("noFS") || (mobileFullScreen = !1), isMobile) {
    5 != device && (document.documentElement.style.backgroundColor = Cookie("theme") ? "#e0e0e0" : "#101010"), mobileFullScreenLock = Cookie("fsLock") || "portrait", KB = {}, nativeKeyboard = !1, kbK = 0, kbB = 0, kbPin = 0, kbPinH = 0;
    let c = !1,
      h = "";
    KB.saveSize = function(e) {
      .12 <= e && e <= .85 && softKeyboardSize[screenOrientation] != e && (softKeyboardSize[screenOrientation] = e, Cookie("softKeyboardSize", softKeyboardSize.join("*")))
    }, KB.sync = function(e) {
      var t = frames[0],
        n = nativeKeyboard && 5 == device ? Math.max(0, kbK - kbB) : 0,
        o = 0 < kbPin ? kbPin : Math.max(0, kbK - kbB),
        i = 0 < kbPin ? kbPinH || kbPin : kbK,
        r = -1 * o / scaleNum;
      try {
        var a, s = e ? "transform " + (t.speed250s || ".25s") + h : "";
        document.body.style.transition = s, t.document && t.document.body && (t.document.body.style.transition = s), setTransform(document.body, 0, 0 < n ? "translateY(" + -1 * n + "px)" : ""), 0 < o ? (a = t.cinemaMode && !t.Probe.home.cinemaModeTmpOff, t.document && t.document.body && setTransform(t.document.body, 0, o - n != 0 ? "translateY(" + -1 * (o - n) / scaleNum + "px)" : ""), t.Utils && t.Utils.service && t.Utils.service.cinemaFloat && t.Utils.service.cinemaFloat.keyboardShift(r, i / scaleNum, e ? 1 : 0), t.danmakuHolder && (t.danmakuHolder[0].style.transition = s, t.danmakuHolder[0].style.transform = "translateY(" + (!a || t.portrait && t.videoMain ? -1 * r : -1 * r - t.Variable.cinemaModeBoxN * t.browserHeight) + "px)"), t.Objs && t.Objs.repertory.topBar && (t.Objs.repertory.topBar[0].style.transition = s, t.Objs.repertory.topBar[0].style.transform = "translateY(" + (a && !t.videoMain ? Math.max(0, -1 * r - t.Variable.cinemaModeBoxN * t.browserHeight) : -1 * r) + "px)"), a && t.videoMain && t.videoDarkerPointer && t.portrait && t.Objs && (t.Probe.cinemaModeMainInputFocus = 1, t.Objs.repertory.mediaBox[0].style.transition = s, t.Objs.repertory.mediaBox[0].style.transform = "translateY(" + -1 * r + "px)", t.panelOpacity) && t.Objs.repertory.mediaBox.css({
          zIndex: 90001,
          boxShadow: t.Variable.cinemaMediaBoxShadow
        })) : (t.document && t.document.body && setTransform(t.document.body, 0, ""), t.Utils && t.Utils.service && t.Utils.service.cinemaFloat && t.Utils.service.cinemaFloat.keyboardShift(null, 0, e ? 1 : 0), t.danmakuHolder && (t.danmakuHolder[0].style.transition = s, t.danmakuHolder[0].style.transform = ""), t.Objs && t.Objs.repertory.topBar && (t.Objs.repertory.topBar[0].style.transition = s, t.Objs.repertory.topBar[0].style.transform = ""), t.cinemaMode && t.portrait && t.Probe && t.Probe.cinemaModeMainInputFocus && t.Objs && "t" == (t.Objs.repertory.mediaBox[0].style.transform || "")[0] && (t.Probe.cinemaModeMainInputFocus = 0, t.Objs.repertory.mediaBox[0].style.transition = s, t.Objs.repertory.mediaBox[0].style.transform = "", t.panelOpacity) && setTimeout(function() {
          t.Objs.repertory.mediaBox.css({
            zIndex: 1,
            boxShadow: ""
          })
        }, t.speed250))
      } catch (e) {}
    }, KB.emojiLift = function(e, t) {
      kbPin = 0 < e ? e : 0, kbPinH = 0 < t ? t : 0, KB.sync(0 < kbK ? 0 : 1)
    }, KB.onNative = function(e, t, n, o, i, r) {
      if (window.NKDBG) try {
        console.log("[NK] r=" + (+e).toFixed(4) + " open=" + t + " s=" + n + " a=" + i + " t=" + r + " K=" + (t ? Math.round(e * documentClientHeight) : 0) + " b=" + Math.round(kbB) + " pin=" + Math.round(kbPin))
      } catch (e) {}
      t = !!(t && 0 < e);
      if (!n || !i) {
        kbK = t ? e * documentClientHeight : 0, t && 0 < (s = softKeyboardSize[screenOrientation] * documentClientHeight) && kbK > s && (kbK = s);
        var a, s = frames[0];
        try {
          t ? (mainFrame.softKeyboard = 1, c || (KB.blurCancel(), s.Probe && s.Probe.isEmojiShowing && s.panelAnimate(3, 0, null, 0, 2), mainFrame.emoji && (mainFrame.emoji = 0), s.document && s.document.body && (s.document.body.style.transition = ""), n) || (kbB = s.document && s.document.activeElement ? getInputPos(s.document.activeElement, softKeyboardSize[screenOrientation] * documentClientHeight) : 0), n && (r && (KB.saveSize(e), kbK = e * documentClientHeight, 0 < (a = softKeyboardSize[screenOrientation] * documentClientHeight)) && kbK > a && (kbK = a), kbB = s.document && s.document.activeElement ? getInputPos(s.document.activeElement, kbK) : 0, 0 < kbPin && (kbPin = 0, kbPinH = 0), s.nkEmojiSwapHide) && s.nkEmojiSwapHide(), (n || !c) && s.Utils && s.Utils.alertPosSeter && s.Utils.alertPosSeter(kbB / scaleNum)) : (mainFrame.softKeyboard = 0, kbB = 0, kbPin <= 0 && s.Utils && s.Utils.alertPosSeter && s.Utils.alertPosSeter(), n && KB.blurEl && KB.blurArm(200))
        } catch (e) {}
        KB.sync(n && !i ? 1 : 0), c = t
      }
    }, KB.blurEl = null, KB.blurTimer = 0, KB.blurCancel = function() {
      KB.blurEl = null, KB.blurTimer && (clearTimeout(KB.blurTimer), KB.blurTimer = 0)
    }, KB.blurArm = function(e) {
      KB.blurTimer && clearTimeout(KB.blurTimer), KB.blurTimer = setTimeout(KB.blurFlush, e)
    }, KB.blurFlush = function() {
      var e = KB.blurEl;
      if (KB.blurCancel(), e) {
        try {
          e.ownerDocument.activeElement === e && (e.nkMuteBlur = 1, e.blur())
        } catch (e) {}
        e.nkMuteBlur = 0
      }
    }, KB.deferBlur = function(e) {
      if (!nativeKeyboard || !e) return !1;
      if (!(isFirefox ? void 0 !== GVD.init.kbRatio : window.Main && Main.hideKeyboard)) return !1;
      if (window.NKDBG) try {
        console.log("[NK] deferBlur")
      } catch (e) {}
      KB.blurEl = e, KB.blurArm(1500);
      try {
        Main.hideKeyboard()
      } catch (e) {}
      return !0
    }, KB.setNative = function(e) {
      nativeKeyboard = !!e, e || (kbK = 0, kbB = 0, kbPin = 0, kbPinH = 0, c = !1, mainFrame.softKeyboard = 0, KB.blurFlush(), KB.sync())
    }, KB.browserSet = function(e, t) {
      if (0 < e) {
        kbK = e;
        try {
          kbB = getInputPos(frames[0].document.activeElement, e)
        } catch (e) {
          kbB = 0
        }
      } else kbK = 0, kbB = 0;
      KB.sync(t ? 1 : 0)
    }, KB.settleTimer = 0, KB.settleLast = 0, KB.settle = function() {
      KB.settleTimer = 0;
      var e = documentClientHeight - document.documentElement.clientHeight;
      if (e < .12 * documentClientHeight || !mainFrame.softKeyboard) KB.settleLast = 0;
      else if (e > kbK && e != KB.settleLast) KB.settleLast = e, KB.settleTimer = setTimeout(KB.settle, 250);
      else {
        KB.settleLast = 0;
        var t = e / documentClientHeight;
        if (softKeyboardSize[screenOrientation] != t) {
          .12 <= t && t <= .85 && (softKeyboardSize[screenOrientation] = t, Cookie("softKeyboardSize", softKeyboardSize.join("*")));
          try {
            frames[0].onresize()
          } catch (e) {}
        }
        if (e != kbK) {
          KB.browserSet(e, 1);
          try {
            frames[0].Utils && frames[0].Utils.alertPosSeter && frames[0].Utils.alertPosSeter(kbB / scaleNum)
          } catch (e) {}
        }
      }
    }, KB.iwOn = 0, KB.rebasePending = 0, KB.rebaseOb = null, KB.rebaseArm = function() {
      if (KB.rebasePending = 1, !KB.rebaseOb) try {
        KB.rebaseOb = new MutationObserver(function() {
          KB.emojiClosed()
        }), KB.rebaseOb.observe(frames[0].faceHolder[0], {
          attributes: !0,
          attributeFilter: ["style"]
        })
      } catch (e) {}
    }, KB.emojiClosed = function() {
      if (KB.rebasePending) try {
        if ((!frames[0].Probe || !frames[0].Probe.isEmojiShowing) && 1 != mainFrame.softKeyboard) {
          if (KB.rebasePending = 0, KB.rebaseOb) {
            try {
              KB.rebaseOb.disconnect()
            } catch (e) {}
            KB.rebaseOb = null
          }
          KB.browserSet(0);
          try {
            frames[0].Utils && frames[0].Utils.alertPosSeter && frames[0].Utils.alertPosSeter()
          } catch (e) {}
          var e = document.documentElement.clientHeight;
          if (documentClientHeight != e && resizeBox(documentClientHeight = e, documentClientWidth = document.documentElement.clientWidth), window.NKDBG) try {
            console.log("[NK] rebaseHeal " + documentClientHeight)
          } catch (e) {}
        }
      } catch (e) {}
    }, window.onNativeKeyboard = KB.onNative, window.setNativeKeyboard = KB.setNative, window.setNkEmojiLift = KB.emojiLift, window.nkDeferBlur = KB.deferBlur, 5 != device && (() => {
      var o = document.querySelector('meta[name="viewport"]');

      function i(e) {
        try {
          var t, n;
          o && (n = -1 < (t = o.getAttribute("content") || "").indexOf("interactive-widget"), e && !n ? o.setAttribute("content", t + ",interactive-widget=resizes-content") : !e && n && o.setAttribute("content", t.replace(/,?interactive-widget=[^,]*/, "")), KB.iwOn = e ? 1 : 0, e ? m && u && (u = 0, m.removeEventListener("resize", l), m.removeEventListener("scroll", l)) : p())
        } catch (e) {}
      }
      isIos || document.addEventListener("fullscreenchange", function() {
        Cookie("kbFIW") || i(!document.fullscreenElement)
      });
      var n, r, a, s, c, l, u, t, d, m = window.visualViewport;

      function f(e, t) {
        c && (clearTimeout(c), c = 0);
        var n = e > .12 * documentClientHeight;
        if (n && !nativeKeyboard) {
          if (!s && 48 < screen.height - window.innerHeight) return void i(1);
          nativeKeyboard = !0
        }
        if (nativeKeyboard) {
          e = n ? e / documentClientHeight : 0;
          if (KB.onNative(e, n, t, e, !t, t), t && isIos) try {
            n && scrollTo(0, 0), g(600)
          } catch (e) {}
        }
      }

      function p() {
        m && !u && (u = 1, m.addEventListener("resize", l), m.addEventListener("scroll", l))
      }

      function g(e) {
        e = Date.now() + e;
        t < e && (t = e), d || (d = 1, function e() {
          Date.now() > t ? d = 0 : ((window.scrollY || document.documentElement.scrollTop) && scrollTo(0, 0), requestAnimationFrame(e))
        }())
      }
      m ? (!isIos && Cookie("kbFIW") && i(1), h = isIos ? " cubic-bezier(.38,.7,.13,1)" : " cubic-bezier(.4,0,.2,1)", c = s = a = r = n = 0, KB.apiProbe = function() {
        isIos || nativeKeyboard || (c = c || setTimeout(function() {
          if (c = 0, !(nativeKeyboard || documentClientHeight - document.documentElement.clientHeight >= .12 * documentClientHeight))
            if (document.fullscreenElement || document.webkitFullscreenElement) {
              if (mobileFullScreen = !1, Cookie("noFS", 1), inFullScreen = 0, document.exitFullscreen ? document.exitFullscreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(), window.NKDBG) try {
                console.log("[NK] zeroSig in FS -> exit & disable fullscreen")
              } catch (e) {}
            } else if (KB.iwOn) {
            if (window.NKDBG) try {
              console.log("[NK] zeroSig persists with IW on: 内核连 interactive-widget 也不认, 仅剩盲推可选")
            } catch (e) {}
          } else if (i(1), Cookie("kbFIW", 1), window.NKDBG) try {
            console.log("[NK] zeroSig -> IW(1)+cookie")
          } catch (e) {}
        }, 700))
      }, l = function() {
        var e, t;
        m.scale && .01 < Math.abs(m.scale - 1) || (e = document.documentElement.clientHeight, t = Math.round(e - m.height - m.offsetTop), isIos && (t < (e = Math.round(e - window.innerHeight)) ? (t = e, s = 1) : 0 < t && (s = 0)), t <= 0 && !nativeKeyboard) || (e = 0 < t ? t : 0, (t = Date.now()) - n < 100 && f(e, !1), n = t, a = e, r && clearTimeout(r), r = setTimeout(function() {
          f(a, !(r = 0))
        }, 100))
      }, u = 0, KB.iwOn || p(), d = t = 0, isIos && addEventListener("scroll", function() {
        nativeKeyboard && (0 < kbK || 0 < kbPin || mainFrame.softKeyboard) && ((window.scrollY || document.documentElement.scrollTop) && scrollTo(0, 0), g(400))
      }, {
        passive: !0
      })) : i(1)
    })(), (() => {
      var r = 0,
        l = null,
        u = null,
        a = 0,
        s = null;

      function c(e) {
        if (l) try {
          var t = window.visualViewport,
            n = innerHeight,
            o = document.documentElement.clientHeight,
            i = t ? Math.round(t.height) : -1,
            r = t ? Math.round(t.offsetTop) : -1,
            a = t ? t.scale : 1,
            s = t ? Math.round(n - t.height - t.offsetTop) : -1,
            c = navigator.virtualKeyboard && navigator.virtualKeyboard.boundingRect ? navigator.virtualKeyboard.boundingRect : null;
          l.textContent = "src:" + e + " nkb:" + (nativeKeyboard ? 1 : 0) + "\ninnerH:" + n + " clientH:" + o + " docCH:" + Math.round(documentClientHeight || 0) + "\nvv.h:" + i + " vv.ot:" + r + " scale:" + (+a).toFixed(3) + "\nvk.top:" + (c ? Math.round(c.top) : "无") + " vk.h:" + (c ? Math.round(c.height) : "无") + "\nocc:" + s + " kbK:" + Math.round(kbK) + " pin:" + Math.round(kbPin) + " softKb:" + (mainFrame.softKeyboard ? 1 : 0) + "\nouterH:" + outerHeight + " screenH:" + screen.height + " availH:" + screen.availHeight + " scrY:" + (window.screenY || 0) + "\nratio:" + (+(softKeyboardSize[screenOrientation] || 0)).toFixed(3), u.style.top = (0 < kbK ? Math.round((documentClientHeight || n) - kbK) : 0 < s ? n - s : -9) + "px"
        } catch (e) {
          l.textContent = "dbg err: " + e.message
        }
      }
      try {
        Object.defineProperty(window, "NKDBG", {
          configurable: !0,
          get: function() {
            return r
          },
          set: function(e) {
            var t, n, o, i;
            (r = e ? 1 : 0) ? l || (l = document.createElement("div"), u = document.createElement("div"), l.style.cssText = "position:fixed;top:38%;left:4px;z-index:2147483647;background:rgba(0,0,0,.75);color:#0f0;font:10px/1.4 monospace;padding:4px 6px;pointer-events:none;white-space:pre;", u.style.cssText = "position:fixed;left:0;width:100%;height:2px;z-index:2147483647;background:#f00;pointer-events:none;top:-9px;", document.documentElement.appendChild(l), document.documentElement.appendChild(u), t = window.visualViewport, n = function() {
              c("vv.rs")
            }, o = function() {
              c("vv.sc")
            }, i = function() {
              c("win.rs")
            }, t && (t.addEventListener("resize", n), t.addEventListener("scroll", o)), addEventListener("resize", i), a = setInterval(function() {
              c("tick")
            }, 500), s = function() {
              t && (t.removeEventListener("resize", n), t.removeEventListener("scroll", o)), removeEventListener("resize", i)
            }, c("init")): l && (clearInterval(a), a = 0, s && (s(), s = null), l.parentNode && l.parentNode.removeChild(l), u.parentNode && u.parentNode.removeChild(u), u = l = null)
          }
        })
      } catch (e) {
        window.NKDBG = 0
      }
    })(), 5 == device && (screenMode = (isFirefox ? GVD.init.getScreenMode : Main.getScreenMode ? Main.getScreenMode() : "0,1,2,3").split(","), nativeKeyboard = isFirefox ? !!GVD.init.nativeKb : !!Main.isNativeKeyboard && !!Main.isNativeKeyboard())
  }
  var static = Urls.static,
    calSpeedRatio = function(e) {
      return .5 * (void 0 !== e ? 0 == e ? isFirefox ? .02 : 0 : 1 / (isFirefox && 50 < e ? 50 : e) : 1)
    },
    speedRatio = calSpeedRatio(Cookie("speed")),
    supportSpaceEvenly = userAgent.split("Chrome/"),
    supportLazyLoad = "loading" in HTMLImageElement.prototype,
    supportSpaceEvenly = 2 == supportSpaceEvenly.length ? 60 < Number(supportSpaceEvenly[1].split(".")[0]) : 0,
    Probe = {
      emojiSupport: {
        unSupportEmoji: 0,
        unSupportColorEmoji: 0,
        unSupportTinyChar: 0,
        titleNotiText: 0
      }
    };
  (strTmp = userAgent.match(new RegExp("Windows NT (\\d+?\\.\\d+)", "i"))) && (strTmp = Number(strTmp[1]), Probe.emojiSupport.titleNotiText = strTmp < 10, Probe.emojiSupport.unSupportColorEmoji = strTmp < 6.3, Probe.emojiSupport.unSupportEmoji = strTmp < 6.2, Probe.emojiSupport.unSupportTinyChar = strTmp < 6), isMobile && !mobileFullScreen || (makeFullScreen = function() {
    var e = null,
      t = document.documentElement;

    function n() {
      if (isMobile && mobileFullScreenLock && isFullscreen() && screen.orientation && screen.orientation.lock) try {
        var e = screen.orientation.lock(mobileFullScreenLock);
        e && e.catch && e.catch(function(e) {
          if (window.NKDBG) try {
            console.log("[NK] fs lock reject: " + e.message)
          } catch (e) {}
        })
      } catch (e) {}
    }
    t.requestFullscreen ? e = t.requestFullscreen() : t.webkitRequestFullscreen ? e = t.webkitRequestFullscreen() : t.mozRequestFullScreen ? e = t.mozRequestFullScreen() : t.msRequestFullscreen && (e = t.msRequestFullscreen()), e && e.then && e.then(n).catch(function(e) {
      if (inFullScreen = 0, window.NKDBG) try {
        console.log("[NK] fs reject: " + e.message)
      } catch (e) {}
    }), setTimeout(function() {
      inFullScreen && !isFullscreen() ? inFullScreen = 0 : n()
    }, 600)
  }, isFullscreen = function() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || !1
  }, isMobile || (resetFullScreen = function() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
  }), inFullScreen = isFullscreen(), isChrome || isEdge || isFirefox ? null === document.onfullscreenchange ? document.onfullscreenchange = function() {
    document.webkitIsFullScreen || (inFullScreen = inFullScreen && 0), isMobile && (fullScreenSwitch = document.webkitIsFullScreen, setTimeout(function() {
      fullScreenSwitch = null
    }, 1e3))
  } : document.onwebkitfullscreenchange = function() {
    document.webkitIsFullScreen || (inFullScreen = inFullScreen && 0)
  } : isIe ? document.onmsfullscreenchange = function() {
    document.msFullscreenElement || (inFullScreen = inFullScreen && 0)
  } : document.onfullscreenchange = function() {
    document.fullscreenElement || (inFullScreen = inFullScreen && 0)
  });
  var scaleNum, setSizeN, PWAInstallprompt, sacleRatio = Math.max(screen.width, screen.height) / 1920;
  if (isMobile) {
    if (isDocumentClientSize = (strTmp = sessionStorage.getItem("documentClientSize")) ? (sessionStorage.removeItem("documentClientSize"), strTmp = strTmp.split("*"), documentClientHeight = Number(strTmp[0]), documentClientWidth = Number(strTmp[1]), 1) : (documentClientHeight = document.documentElement.clientHeight, documentClientWidth = document.documentElement.clientWidth, 0), (strTmp = Cookie("softKeyboardSize")) ? (strTmp = strTmp.split("*"), .12 <= (softKeyboardSize = [Number(strTmp[0]), Number(strTmp[1])])[0] && softKeyboardSize[0] <= .85 || (softKeyboardSize[0] = .4177396280400572), .12 <= softKeyboardSize[1] && softKeyboardSize[1] <= .85 || (softKeyboardSize[1] = .55470737913486)) : softKeyboardSize = [.4177396280400572, .55470737913486], 5 == device && nativeKeyboard) try {
      strTmp = ((isFirefox ? GVD.init.kbRatio : Main.getKbRatio ? Main.getKbRatio() : "") || "").split("*"), .12 <= Number(strTmp[0]) && Number(strTmp[0]) <= .85 && (softKeyboardSize[0] = Number(strTmp[0])), .12 <= Number(strTmp[1]) && Number(strTmp[1]) <= .85 && (softKeyboardSize[1] = Number(strTmp[1]))
    } catch (e) {}
    screenOrientation = documentClientHeight > documentClientWidth ? 0 : 1, onbeforeunload = function() {
      mainFrame.softKeyboard && sessionStorage.setItem("documentClientSize", documentClientHeight + "*" + documentClientWidth), window.onbeforeunload = null
    }, onunload = function() {
      window.onbeforeunload && onbeforeunload()
    }, fullScreenSwitch = null
  }
  getInputPos = function(e, t) {
    var n, o;
    return frames[0].moveinputO == e ? o = 0 : (o = void 0 !== e.eventClientY ? frames[0].browserHeight - e.eventClientY - (n = e.scaleN * e.clientHeight + e.scaleN * e.offsetN) : frames[0].browserHeight - frames[0].Utils.getAbsolutePos(frames[0].document, e).top - (n = e.clientHeight + (void 0 !== e.offsetN ? e.offsetN : frames[0].pmFull || "privatemsgInput" != e.className ? 44 : 14)), (e = frames[0].browserHeight - t / scaleNum) < n && (o += n - e), t < (o *= scaleNum) ? o = t : o < 0 && (o = 0)), o
  }, resizeBox = function(e, t) {
    mainFrame.height = e / scaleNum, mainFrame.width = t / scaleNum, mainFrame.style.top = (mainFrame.height - mainFrame.height * scaleNum) / -2 + "px", mainFrame.style.left = (mainFrame.width - mainFrame.width * scaleNum) / -2 + "px"
  }, onresize = function() {
    var e = document.documentElement.clientHeight,
      t = document.documentElement.clientWidth;
    if (isMobile) {
      if (documentClientWidth != t) {
        if (t == e) return;
        if (5 == device && mainFrame.softKeyboard) {
          mainFrame.softKeyboard = 0;
          try {
            frames[0].document.activeElement.blur()
          } catch (e) {}
          if (!nativeKeyboard) return
        }
        if (nativeKeyboard && 0 < kbPin) {
          try {
            frames[0].Probe && frames[0].Probe.isEmojiShowing && frames[0].panelAnimate(3, 0, null, 0, 1)
          } catch (e) {}
          KB.emojiLift(0)
        }
        screenOrientation = t < e ? 0 : 1, resizeBox(documentClientHeight = e, documentClientWidth = t)
      }
      if (null !== fullScreenSwitch && resizeBox(documentClientHeight = e, documentClientWidth = t), nativeKeyboard) 5 != device && documentClientHeight - e >= .12 * documentClientHeight ? (KB.setNative(!1), mainFrame.softKeyboard = 1, o = documentClientHeight - e, n = softKeyboardSize[screenOrientation] * documentClientHeight, KB.browserSet(0 < n && n < o ? n : o), KB.settleTimer && clearTimeout(KB.settleTimer), KB.settleTimer = setTimeout(KB.settle, 200)) : documentClientHeight != e && resizeBox(documentClientHeight = e, documentClientWidth = t);
      else if (documentClientHeight == e) mainFrame.softKeyboard = 0, mainFrame.emoji ? (mainFrame.emoji = 0, KB.rebaseArm()) : frames[0].Probe && frames[0].Probe.isEmojiShowing ? KB.rebaseArm() : (KB.browserSet(0), frames[0].Utils && frames[0].Utils.alertPosSeter && frames[0].Utils.alertPosSeter());
      else {
        var n = documentClientHeight - e,
          o = null;
        try {
          o = frames[0].document.activeElement
        } catch (e) {}
        var i, o = !(!o || "INPUT" != o.tagName && "TEXTAREA" != o.tagName && !o.isContentEditable);
        n < .12 * documentClientHeight || !o ? (o = frames[0].Probe && frames[0].Probe.isEmojiShowing, mainFrame.softKeyboard = 0, mainFrame.emoji ? (mainFrame.emoji = 0, KB.rebaseArm()) : o || (KB.browserSet(0), frames[0].Utils && frames[0].Utils.alertPosSeter && frames[0].Utils.alertPosSeter()), o ? KB.rebaseArm() : resizeBox(documentClientHeight = e, documentClientWidth = t)) : (mobileFullScreen && !KB.iwOn && (mobileFullScreen = !1), o = !!mainFrame.softKeyboard, mainFrame.softKeyboard = 1, 0 < (i = Math.round(softKeyboardSize[screenOrientation] * documentClientHeight)) ? o || KB.browserSet(i, 1) : KB.browserSet(n), KB.settleTimer && clearTimeout(KB.settleTimer), KB.settleTimer = setTimeout(KB.settle, 200), frames[0].Probe && frames[0].Probe.isEmojiShowing && frames[0].panelAnimate(3, 0, null, 0, 1), frames[0].Utils && frames[0].Utils.alertPosSeter && frames[0].Utils.alertPosSeter(kbB / scaleNum))
      }
    } else resizeBox(e, t)
  }, isMobile && (setTransform = function(e, t, n) {
    var o = e.style.transform || "",
      t = -1 < o.indexOf(t = t ? "Y" : "X") ? -1 < o.indexOf(" ") ? "translate" + t + o.split(t)[1].split(")")[0] + ")" : o : 0;
    e.style.transform = t ? n ? t + " " + n : t : n || ""
  }), setSize = function(e) {
    e = "s" == e[0] || "r" == e[0] ? e[0] : parseInt(e), scaleNum = "s" == e ? sacleRatio : "r" == e ? 1 : sacleRatio - .05 * sacleRatio * (10 - e + (isMobile ? 3 : 0)) + (isMobile ? .4 : 0), mainFrame.style.webkitTransform = mainFrame.style.transform = 1 == scaleNum ? "" : "scale(" + (document.documentElement.clientWidth + 1) / (document.documentElement.clientWidth / scaleNum) + ")", setSizeN = e, isMobile && (resizeBox(documentClientHeight, documentClientWidth), isDocumentClientSize) ? isDocumentClientSize = 0 : onresize()
  }, strTmp = (strTmp = Cookie("setSize")) || (5 == device && Main.getScreenInch ? 6.4 < (strTmp2 = isFirefox ? GVD.init.getScreenInch : Main.getScreenInch()) ? strTmp2 < 15 ? "10" : "s" : 5.4 < strTmp2 ? String(15 - Math.round((strTmp2 - 5.4) / .2)) : "15" : isMobile ? "13" : screen.width < 1920 ? "r" : "s"), setSize(strTmp), 5 == device || isIos && (8 == device || 9 == device) || location.hash || window.history && history.pushState && (onpopstate = function() {
    location.hash || (history.pushState("forward", null, Urls.domain), frames[0].Utils && frames[0].Utils.backward())
  }, history.pushState("forward", null, Urls.domain)), document.oncontextmenu = function() {
    return !1
  }, isMobile || (onkeydown = function(e) {
    if (8 == e.keyCode) e.preventDefault(), frames[0].Utils.backward();
    else if (e.ctrlKey && 76 == e.keyCode) e.preventDefault(), frames[0].Probe.init.lockScreen || frames[0].Init.lockScreen(), frames[0].Utils.service.lockScreen(!frames[0].Probe.lockScreen);
    else if (e.ctrlKey) switch (e.keyCode) {
      case 66:
      case 68:
      case 69:
      case 71:
      case 76:
      case 77:
      case 80:
      case 81:
      case 83:
      case 85:
      case 87:
      case 90:
        e.preventDefault()
    } else if (e.altKey) switch (e.keyCode) {
      case 88:
      case 37:
      case 38:
      case 39:
      case 40:
      case 65:
      case 67:
      case 68:
      case 69:
      case 77:
      case 78:
      case 83:
      case 86:
      case 87:
      case 90:
        e.preventDefault()
    } else switch (e.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        e.preventDefault()
    }
  }), navigator.serviceWorker && (navigator.serviceWorker.register("sw.js").then(function(e) {
    swRegistration = e, window.swUpdateCallback && (swUpdateCallback(e), delete window.swUpdateCallback)
  }), addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault(), PWAInstallprompt = e
  }), addEventListener("appinstalled", function() {
    PWAInstallprompt = null
  })), ajax({
    url: "version",
    cache: !1,
    success: function(e) {
      var n;
      e && (n = e, appVersion ? appVersion != n && (Cookie("changesV") || Cookie("changesV", appVersion), Cookie("updated", 1), navigator.serviceWorker ? (e = function(e) {
        var t = navigator.serviceWorker.controller || e.active;
        t && t.postMessage([1]), e.update && e.update(), localStorage.setItem("appcacheV", appVersion = n), 5 == device && Main.clearCache ? Main.clearNetworkCache ? Main.clearNetworkCache() : Main.clearCache() : isPcApp ? Main.clearCache() : location._reload()
      }, window.swRegistration ? e(swRegistration) : swUpdateCallback = e) : 5 == device && Main.clearCache ? (localStorage.setItem("appcacheV", appVersion = n), Main.clearNetworkCache ? Main.clearNetworkCache() : Main.clearCache()) : isPcApp ? (localStorage.setItem("appcacheV", appVersion = n), Main.clearCache()) : localStorage.setItem("appcacheV", appVersion = n)) : localStorage.setItem("appcacheV", appVersion = n))
    }
  }), (() => {
    var t = document.getElementById("loadingBox"),
      n = t.lastChild,
      o = null;
    startLoading = function() {
      n.innerHTML = "Now Loading . . .", t.style.display = "";
      var e = 0;
      o = setInterval(function() {
        n.innerHTML = "Now Loading ." + (0 == e ? "" : 1 == e ? " ." : " . ."), 3 == ++e && (e = 0)
      }, 1e3)
    }, stopLoading = function() {
      null !== o && (clearInterval(o), o = null, t.style.display = "none")
    }, startLoading()
  })(), sessionStorage.getItem("breakautologin") || checkUser ? mainFrame.src = "i.html" : mainFrame.src = "messages.html", 9 == device && (initWechatApi = function(e) {
    Probe.wechatSigninJS = 1;
    var t = document.createElement("script");
    t.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js", t.async = !0, t.addEventListener("load", e), t.addEventListener("error", function() {
      Probe.wechatSigninJS = 0
    }), document.head.appendChild(t)
  }, 8 == device ? initWechatApi(function() {
    ajax({
      url: Urls.api + "lib/php/system/wxJsSdk.php",
      cache: !1,
      success: function(e) {
        var n;
        e && (e = e.split(" "), wx.config({
          debug: !1,
          appId: "wx3e3bde6ae78bfd2e",
          timestamp: e[0],
          nonceStr: e[1],
          signature: e[2],
          jsApiList: [],
          openTagList: ["wx-open-launch-weapp"]
        }), wx.error(function(e) {
          n = 1
        }), wx.ready(function() {
          var t;
          n || (document.addEventListener("WeixinOpenTagsError", function(e) {
            document.getElementById("launch-btn").style.display = "none", document.body.removeChild(t)
          }), (t = document.createElement("div")).innerHTML = '<wx-open-launch-weapp id="launch-btn" username="gh_ec1dda3999eb" path="pages/index/index.html?uid=16" style="position:fixed;top:0;left:0;z-index:999999999;"><script type="text/wxtag-template"><div style="height:' + document.documentElement.clientHeight + "px;width:" + document.documentElement.clientWidth + 'px;"></div><\/script></wx-open-launch-weapp>', document.body.appendChild(t), btn.addEventListener("error", function(e) {
            document.getElementById("launch-btn").style.display = "none", document.body.removeChild(t)
          }))
        }))
      }
    })
  }) : (document.title = "蔷薇花园 IIROSE", mainFrame.src = "lib/html/wechat/index.html"))
}