if (document.domain = "iirose.com", parent.stopLoading(), loadSuccess = !0, "https://iirose.com/" != parent.location) sessionStorage.setItem("breakautologin", 1), parent.location.href = "https://iirose.com/";
else {
  var Cookie = parent.Cookie,
    removeCookie = parent.removeCookie,
    CookieReal = parent.CookieReal,
    removeCookieReal = parent.removeCookieReal;
  if (Cookie("username") && !sessionStorage.getItem("breakautologin")) location.href = "messages.html";
  else {
    5 == parent.device ? (parent.location._reload = function() {
      (Main.reload ? Main : this).reload()
    }, parent.isFirefox && (parent.open = open = function(e) {
      var a;
      106 < deviceVersion ? (a = e.substr(0, 7), Main.openUrl("http://" == a || "https:/" == a ? e : parent.location.href.split("?")[0].split("#")[0] + e)) : parent.location.href = e
    })) : parent.location._reload = parent.location.reload, window.NodeList && !NodeList.prototype.forEach && Object.defineProperty(NodeList.prototype, "forEach", {
      value: Array.prototype.forEach,
      enumerable: !1
    }), 6 != parent.device && 7 != parent.device && 11 != parent.device || (Main = parent.Main);
    var objTmp, objTmp2, panelParam, sendBug = parent.sendBug,
      betaWorld = (onerror = parent.onerror, !1),
      theme = "theme/",
      panelOpacity = 0,
      Variable = {
        resizeTask: {},
        Timer: {},
        regexp: {
          assets: {},
          char: {
            space: new RegExp(" ", "g")
          },
          unhtmlspecialchars: {
            backslash: new RegExp("&#092;", "g"),
            squot: new RegExp("&#039;", "g"),
            dquot: new RegExp("&quot;", "g"),
            gt: new RegExp("&gt;", "g"),
            lt: new RegExp("&lt;", "g"),
            and: new RegExp("&amp;", "g")
          },
          htmlspecialchars: {
            and: new RegExp("&", "g"),
            lt: new RegExp("<", "g"),
            gt: new RegExp(">", "g"),
            dquot: new RegExp('"', "g"),
            squot: new RegExp("'", "g"),
            backslash: new RegExp("\\\\", "g"),
            space: new RegExp(" ", "g"),
            has: new RegExp("[&<>\"'\\\\]"),
            has2: new RegExp("[\"'\\\\]"),
            has3: new RegExp("[&<> ]")
          }
        }
      },
      Urls = parent.Urls,
      device = parent.device,
      deviceVersion = parent.deviceVersion,
      isFirefox = parent.isFirefox,
      isMobile = (5 == device && isFirefox && (GV = parent.GV, Main = parent.Main), parent.isMobile),
      supportTouch = isMobile || "ontouchstart" in window && Cookie("touch"),
      isChrome = parent.isChrome,
      isEdge = parent.isEdge,
      isIe = parent.isIe,
      isIos = parent.isIos,
      isPcApp = parent.isPcApp,
      mobileFullScreen = parent.mobileFullScreen,
      browserWidth = document.documentElement.clientWidth,
      browserHeight = document.documentElement.clientHeight,
      portrait = browserWidth < browserHeight,
      scroll = Cookie("scroll"),
      scrollBar = !(supportTouch || isChrome || isFirefox || isEdge || isIe || scroll),
      scrollVar = !supportTouch && scroll,
      speedRatio = (scrollVar && (scrollBarSize = isChrome ? 5 : isFirefox ? 8 : isEdge || isIe ? 0 : 17), parent.speedRatio),
      static = ([1e3, 500, 250, 200].forEach(function(e) {
        window["speed" + e] = e * speedRatio;
        var a = e * speedRatio / 1e3 + "s";
        window["speed" + e + "s"] = "0" == a[0] && "0s" != a ? a.substr(1) : a
      }), parent.static),
      supportLazyLoad = parent.supportLazyLoad,
      panelStyle = 0;

    function panelSize(e, a, t, o) {
      return !panelStyle || 0 == (a = (void 0 === t ? panelParam[a] : void 0 === o ? panelParam[a][t] : panelParam[a][t][o])[0]) ? e : 1 == a ? e + 80 : e + 40
    }

    function panelMod(e, a, t, o) {
      var r, s, n, i, l, c, d;
      panelStyle && (c = (void 0 === a ? (r = panelParam[e][0], d = panelParam[e][1], Objs[e].This) : void 0 === t ? (r = panelParam[e][a][0], d = panelParam[e][a][1], Objs[e][a]) : (r = panelParam[e][a][t][0], d = panelParam[e][a][t][1], Objs[e][a][t]))[0], d = 1, r && (n = (s = c.lastChild.previousSibling).firstChild.lastChild, l = Utils.service.getScale(n), 1 != r && 2 != r || (s.style.top = 0, n.style.paddingTop = (n.paddingTopBak = 24) + 40 / l + "px", "gameNewIconHolder" == e && (n.nextSibling.style.paddingTop = n.style.paddingTop), i = 1), 1 != r && 3 != r || (s.style.bottom = 0, d) || (n.style.paddingBottom = (n.paddingBottomBak = 24) + 40 / l + "px", "gameNewIconHolder" == e && (n.nextSibling.style.paddingBottom = n.style.paddingBottom), i = 1), i) && (n.style.boxSizing = "border-box", Variable.resizeTask["panelMod_" + e + (a ? "_" + a + (t ? "_" + t : "") : "")] = function() {
        l = Utils.service.getScale(n), 1 != r && 2 != r || (n.style.paddingTop = n.paddingTopBak + 40 / l + "px", "gameNewIconHolder" == e && (n.nextSibling.style.paddingTop = n.style.paddingTop)), 1 != r && 3 != r || d || (n.style.paddingBottom = n.paddingBottomBak + 40 / l + "px", "gameNewIconHolder" == e && (n.nextSibling.style.paddingBottom = n.style.paddingBottom))
      }), d) && ((s = c.lastChild.style).height = 0, s.width = 0)
    }
    panelStyle && (panelParam = {
      gameNewSexHolder: [3, 1],
      gameLoadHolder: [3, 0],
      gameSetHolder: [3, 1],
      gameNewIconHolder: [3, 0],
      gameNewNameHolder: [3, 0],
      gameForgotNameHolder: [3, 0],
      gameForgotPasswordHolder: [3, 0]
    });
    for (var mainStyleSheetsIndex = 0, strTmp = 0, strTmp2 = document.styleSheets.length; strTmp < strTmp2; ++strTmp)
      if ("main" == document.styleSheets[strTmp].title) {
        mainStyleSheetsIndex = strTmp;
        break
      } var styleSheetsobj = document.styleSheets[mainStyleSheetsIndex].cssRules,
      languageType = (1 != speedRatio && (e => {
        for (var a = 0, t = e.length; a < t; ++a) - 1 < (e[a].style.cssText || "").indexOf("transition:") && "s" == e[a].style.transitionDuration.substr(-1) && (-1 < e[a].style.transitionDuration.indexOf(",") ? e[a].style.transitionDuration = e[a].style.transitionDuration.split(",").map(function(e) {
          return e.trim().slice(0, -1) * speedRatio + "s"
        }).join(",") : e[a].style.transitionDuration = e[a].style.transitionDuration.slice(0, -1) * speedRatio + "s")
      })(styleSheetsobj), parent.languageType),
      loginError = sessionStorage.getItem("loginError"),
      copyRightStr = "©2019 Corporation IIROSE, All Rights Reserved.";

    function unhtmlspecialchars(e) {
      return e = -1 < e.indexOf("&") && -1 < (e = -1 < (e = -1 < (e = -1 < (e = -1 < (e = -1 < e.indexOf("&#092;") ? e.replace(Variable.regexp.unhtmlspecialchars.backslash, "\\") : e).indexOf("&#039;") ? e.replace(Variable.regexp.unhtmlspecialchars.squot, "'") : e).indexOf("&quot;") ? e.replace(Variable.regexp.unhtmlspecialchars.dquot, '"') : e).indexOf("&gt;") ? e.replace(Variable.regexp.unhtmlspecialchars.gt, ">") : e).indexOf("&lt;") ? e.replace(Variable.regexp.unhtmlspecialchars.lt, "<") : e).indexOf("&amp;") ? e.replace(Variable.regexp.unhtmlspecialchars.and, "&") : e
    }

    function htmlspecialchars(e) {
      return e = Variable.regexp.htmlspecialchars.has.test(e) && -1 < (e = -1 < (e = -1 < (e = -1 < (e = -1 < (e = -1 < e.indexOf("&") ? e.replace(Variable.regexp.htmlspecialchars.and, "&amp;") : e).indexOf("<") ? e.replace(Variable.regexp.htmlspecialchars.lt, "&lt;") : e).indexOf(">") ? e.replace(Variable.regexp.htmlspecialchars.gt, "&gt;") : e).indexOf('"') ? e.replace(Variable.regexp.htmlspecialchars.dquot, "&quot;") : e).indexOf("'") ? e.replace(Variable.regexp.htmlspecialchars.squot, "&#039;") : e).indexOf("\\") ? e.replace(Variable.regexp.htmlspecialchars.backslash, "&#092;") : e
    }

    function hex2rgb(e) {
      return 3 == e.length && (e += e), parseInt(e.substr(0, 2), 16) + "," + parseInt(e.substr(2, 2), 16) + "," + parseInt(e.substr(4, 2), 16)
    }

    function avatarconv(e) {
      return "" === (e = String(e)) || -1 < e.indexOf("://") ? e : -1 < e.indexOf("/") ? static + "images/icon/" + e + (-1 < e.indexOf(".") ? "" : ".jpg") : static + "images/icon/system/900004.jpg"
    }
    supportTouch || scrollBar && (scrollfunc = isFirefox ? function(a) {
      (a = a[0]).style.overflowY = "hidden", a.style.overflowX = "hidden", a.addEventListener("DOMMouseScroll", function(e) {
        e = e.detail;
        0 < e ? a.scrollTop += 3 == e ? 100 : 200 : a.scrollTop -= -3 == e ? 100 : 200
      })
    } : function(a) {
      (a = a[0]).style.overflowY = "hidden", a.style.overflowX = "hidden", a.addEventListener("mousewheel", function(e) {
        e = e.wheelDelta;
        0 < e ? a.scrollTop -= 120 == e ? 100 : 200 : a.scrollTop += -120 == e ? 100 : 200
      })
    }), isMobile && !mobileFullScreen || (isMobile ? document.onclick = function() {
      parent.mobileFullScreen && !parent.inFullScreen && (parent.inFullScreen = 1, parent.makeFullScreen())
    } : document.ondblclick = function(e) {
      getSelection().toString().trim() || -1 != Utils.getFinalStyle(e.target, "cursor").indexOf("pointer") || (parent.inFullScreen ? (parent.inFullScreen = 0, parent.resetFullScreen()) : (parent.inFullScreen = 1, parent.makeFullScreen()))
    }), onresize = function() {
      for (var e in browserHeight = document.documentElement.clientHeight, browserWidth = document.documentElement.clientWidth, portrait = browserWidth < browserHeight, Probe.init.gameHolder && Objs.gameHolder.function.resize(), Graphics.boxSuitScreen.run(), Graphics.boxScale.run(), Variable.resizeTask) Variable.resizeTask[e]()
    }, onload = function() {
      isChrome ? scrollVar && (styleSheetsobj[4].style.height = styleSheetsobj[4].style.width = "5px") : (isFirefox || isEdge || isIe) && (scrollVar ? Utils.insertCss(["*{scrollbar-width:thin;scrollbar-color:rgba(" + (theme ? "0,0,0" : "255,255,255") + ",.2) transparent;scrollbar-track-color:transparent;-ms-scrollbar-track-color:transparent;-ms-overflow-style:-ms-autohiding-scrollbar;}"]) : Utils.insertCss(["*{-ms-overflow-style:none;scrollbar-width:none;}"])), scrollBar && scrollfunc(Objs.selectHolder.selectHolderBox), Graphics.boxScale.add(Objs.selectHolder.This, [
        [0, 1],
        [0, 1]
      ], [1, function() {
        return browserWidth < 748 ? browserWidth / 748 : 1
      }]), Init.fullPanel(0), Utils.img(Objs.gameHolder.gameLogo.children("div:first").prepend(Mod.img()), static + "images/page/i/logo.png"), Utils.getStyle(static + "lib/css/app/server/materialdesigniconsV7_4_47.css");
      var e, t = ['@font-face{font-family:"md";src:url("' + static + 'lib/system/font/md/materialdesignicons-webfontV7_4_47.woff2") format("woff2"),url("' + static + 'lib/system/font/md/materialdesignicons-webfontV7_4_47.woff") format("woff");font-weight:normal;font-style:normal;font-display:block;}'],
        a = Cookie("fontExt") || (isIos ? "0" : "*"),
        o = [];
      if ("0" != a && ("1" == a ? (e = Utils.database("fontCustom")) && e.split(" ").forEach(function(e, a) {
          t.push('@font-face{font-family:"fontCustom' + a + '";src:url("' + e + '");font-display:swap;}'), o.push("fontCustom" + a)
        }) : ("3" != a && "23" != a && "53" != a || (t.push('@font-face{font-family:"roboto";src:url("' + static + 'lib/system/font/roboto/Roboto-Regular.woff2") format("woff2"),url("' + static + 'lib/system/font/roboto/Roboto-Regular.woff") format("woff");font-display:swap;}'), o.push("roboto")), "4" != a && "24" != a && "54" != a || (t.push('@font-face{font-family:"monaco";src:url("' + static + 'lib/system/font/monaco/monaco.woff2") format("woff2"),url("' + static + 'lib/system/font/monaco/monaco.woff") format("woff");font-display:swap;}'), o.push("monaco")), (strTmp2 = "2" == a || "23" == a || "24" == a) || "5" == a || "53" == a || "54" == a ? strTmp2 ? (t.push('@font-face{font-family:"noto";src:url("' + static + 'lib/system/font/noto/NotoSansCJKsc-Regular.woff2") format("woff2"),url("' + static + 'lib/system/font/noto/NotoSansCJKsc-Regular.woff") format("woff");font-display:swap;}'), o.push("noto")) : (t.push('@font-face{font-family:"oppoSans";src:url("' + static + 'lib/system/font/oppoSans/OPPOSans-R.woff2") format("woff2"),url("' + static + 'lib/system/font/oppoSans/OPPOSans-R.woff") format("woff");font-display:swap;}'), o.push("oppoSans")) : (t.push('@font-face{font-family:"noto";src:url("' + static + 'lib/system/font/noto/NotoSansSC-Regular.woff2") format("woff2"),url("' + static + 'lib/system/font/noto/NotoSansSC-Regular.woff") format("woff");font-display:swap;}'), o.push("noto")))), parent.Probe.emojiSupport.unSupportEmoji && t.push('@font-face{font-family:"emoji";src:url("' + static + 'lib/system/font/emoji/emojione-svg.woff2") format("woff2"),url("' + static + 'lib/system/font/emoji/emojione-svg.woff") format("woff");font-display:swap;}'), (o.length || parent.Probe.emojiSupport.unSupportEmoji) && t.push("*{font-family:" + (o.length ? o.join(",") + "," : "") + "'PingFang SC','Microsoft YaHei',Consolas,Helvetica,Tahoma,Arial,STXihei,'微软雅黑',SimSun,Heiti,'黑体',sans-serif" + (parent.Probe.emojiSupport.unSupportEmoji ? ",emoji" : "") + ";}"), Utils.insertCss(t), void 0 !== languageType) {
        if (Init.translate(), Init.initialize(), loginError) {
          sessionStorage.removeItem("loginError"), Probe.loginError = 1;
          var r = function(e, a) {
            e ? (Objs.gameHolder.gameMenuSelectionItemArr.eq(1).click(), setTimeout(function() {
              Objs.gameLoadHolder.function.error(a)
            }, speed500)) : (Probe.guestLoginError = 1, Objs.gameHolder.gameMenuSelectionItemArr.eq(0).click(), Variable.socialAccToken || (Objs.gameNewSexHolder.function.event(0, 2 == Cookie("sex") ? 1 : 0), Objs.gameNewIconHolder.function.event.call(this, 0, Cookie("avatar")), Objs.gameNewNameHolder.function.event(3, hex2rgb(Cookie("namecolor")), 1)), setTimeout(function() {
              Objs.gameNewNameHolder.function.error(a)
            }, speed500))
          };
          switch (loginError) {
            case "3":
              r(0, languageArr[2][0]);
              break;
            case "2":
              r(1, languageArr[2][1]);
              break;
            case "1":
              r(1, languageArr[2][2]);
              break;
            case "4":
              r(Info.member.password, languageArr[2][4])
          }
        } else if (strTmp = localStorage.getItem("socialAccData")) {
          localStorage.removeItem("socialAccData"), Probe.socialAccRestore = 1, Variable.socialAccData = strTmp.split(" ");
          var s = function(e) {
            e ? (Objs.gameHolder.gameMenuSelectionItemArr.eq(1).click(), Objs.gameLoadHolder.function.event(3)) : Objs.gameHolder.function.guestMenu(null, "1")
          };
          switch (Variable.socialAccData[0]) {
            case "1":
              Probe.socialAccRestore = 0;
              break;
            case "2":
              s();
              break;
            case "3":
              s(1)
          }
        }
        sessionStorage.removeItem("breakautologin")
      }
      if (loginError || Probe.socialAccRestore || parent.loginChangeLang ? (parent.loginChangeLang && delete parent.loginChangeLang, panelAnimate(0, 0, null, loginError || Probe.socialAccRestore)) : void 0 !== languageType ? panelAnimate(0) : (Utils.buildSelect2(null, Assets.select["0_0"], function(e, a) {
          Utils.service.cursorSH(0, 1), Cookie("language", parent.languageType = languageType = Number(a)), parent.checkUser && parent.countIp("*Language"), 5 == device && Main.initLanguageArr(languageType), Init.translate(), Init.initialize(), panelAnimate(0)
        }, 1), Init.cursorFirstShow(), parent.checkUser && parent.countIp("*Login")), isMobile)
        for (var n = 0, i = document.styleSheets.length; n < i; ++n) try {
          Utils.service.clearStyle(document.styleSheets[n], ":hover")
        } catch (e) {}
      isPcApp ? parent.isTrayOn && Main.setTrayMenu([0, 1], [null, null]) : 5 == device && parent.isNotificationChannelEnabled[0] && Main.updateNotificationInfo && Main.updateNotificationInfo("i", "", "", "", "", "", "", "", null, !0, "", ""), supportLazyLoad || (Utils.insertCss([".lazyload,.lazyloading{visibility:hidden;}"]), Utils.getScript("lib/js/app/server/lazysizes.js"))
    };
    var resourceHolder = $("#resourceHolder"),
      Objs = (resourceHolder.append('<style type="text/css">' + (panelStyle ? "#gamePanelHolder>.panelHolderItem>.contentItemBgicon{padding:0 24px 0 64px;}#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child{position:fixed;top:0;left:0;height:40px;width:40px;padding:0;background:rgba(0,0,0,." + (theme ? 5 : 2) + ");}#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child>span:first-child{color:#" + (theme ? "fff" : "202020") + ";opacity:1;}#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child>span:last-child{display:none;}#gamePanelHolder>.panelHolderItem>.contentItemBtn{display:inline-block;background:transparent !important;width:auto !important;position:fixed;top:0;right:0;/*opacity:1 !important;*/}" + (panelOpacity ? "#gamePanelHolder>.panelHolderItem>.contentItemBgicon,#gamePanelHolder>.panelHolderItem>.contentItemBtn>button{text-shadow:1px 0 #000,-1px 0 #000,0 1px #000,0 -1px #000;}" : "") + "#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child ~ button{height:40px;width:auto;padding:0 24px;float:left;background:rgba(0,0,0,." + (theme ? 25 : 1) + ");}#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child ~ button>span:first-child{color:#" + (theme ? "fff" : "202020") + ";opacity:1;}#gamePanelHolder>.panelHolderItem>.contentItemBtn>button:first-child ~ button>span:last-child{color:#" + (theme ? "fff" : "202020") + ";}#gamePanelHolder>.panelHolderItem>.contentItemBtn>.mainBg_color{background:rgba(0,0,0,." + (theme ? 5 : 2) + ") !important;padding:0 12px 0 24px !important;}" : "") + "</style>"), {
        API: {},
        selectHolder: {
          This: $("#selectHolder"),
          selectHolderBox: $("#selectHolderBox"),
          emptyNotAllow: 0
        },
        repertory: {
          contentCopyHolder: document.getElementById("contentCopyHolder")
        }
      });

    function showImg(e, a) {
      Objs.repertory.albumShowHolder || (Objs.selectHolder.This.before('<div id="albumShowHolder" class="fullBox pointer" style="display:none;z-index:9999999;background-color:rgba(0,0,0,0.9);" onclick="Objs.repertory.albumShowHolder.stop().fadeOut(speed250,function(){Objs.repertory.albumShow.setAttribute(\'src\',\'\');});Objs.repertory.albumShowHolderAnimate.css(\'transform\',\'scale(0.0002)\');"><div style="height:100%;width:100%;display:flex;justify-content:center;align-items:center;position:absolute;top:0;left:0;transition:transform ' + speed250s + ';transform:scale(0.0002);"><img decoding="async" id="albumShow" style="max-height:100%;max-width:100%;"></div><div style="height:100%;width:100%;position:absolute;top:0;left:0;display:none;"></div></div>'), Objs.repertory.albumShowHolder = $("#albumShowHolder"), Objs.repertory.albumShow = document.getElementById("albumShow"), Objs.repertory.albumShowWrapper = Objs.repertory.albumShow.parentNode.nextSibling, Objs.repertory.albumShowHolderAnimate = Objs.repertory.albumShowHolder.children("div:eq(0)")), a ? "none" == Objs.repertory.albumShowWrapper.style.display && (Objs.repertory.albumShowWrapper.style.display = "") : "none" != Objs.repertory.albumShowWrapper.style.display && (Objs.repertory.albumShowWrapper.style.display = "none"), Objs.repertory.albumShow.src = e, Objs.repertory.albumShowHolder.stop().fadeIn(speed250), Objs.repertory.albumShowHolderAnimate.css("transform", "")
    }
    var Utils = {
        smallTools: {
          uniqueID: function() {
            return String(Date.now()).substr(-5) + String(Math.random()).substr(-7)
          },
          str2num: function(e) {
            for (var a = 0, t = 0, o = e.length; t < o; ++t) a += e.charCodeAt(t);
            return a
          }
        },
        service: {
          isNoInputFocus: function() {
            return "INPUT" != document.activeElement.tagName && "TEXTAREA" != document.activeElement.tagName
          },
          cursorSH: function(e, a) {
            if (!isMobile) {
              a && (Probe.cursorSHLock = !e), styleSheetsobj[0].style.cursor = "url(images/cursor/" + (e ? theme + "1" : "0") + ".cur),auto";
              for (var t = 0; t < 3; ++t) styleSheetsobj[1 + t].style.cursor = "url(images/cursor/" + (e ? theme + "3" : "0") + ".cur),text";
              clearInterval(Variable.Timer.cursorSHTimer), (Probe.isCursorShowed = e) && (Variable.Timer.cursorSHTimer = setInterval(function() {
                Probe.isCursorMoved ? Probe.isCursorMoved = 0 : Utils.service.cursorSH()
              }, 2500))
            }
          },
          goNewNameHolder: function(e, a, t) {
            Probe.init.gameNewNameHolder || Init.fullPanel(5);
            var o = Objs.gameNewNameHolder;
            o.sex.attr("class", "gamePaperItemContent mdi-gender-" + (a ? "female" : "male")), o.nameInput.val(t || ""), o.function.error(), this.setIconMainColor("gameNewNameHolder", e), panelAnimate(6, 1)
          },
          setIconMainColor: function(r, s) {
            var n, i = Objs[r];
            if (i.icon_select.attr("aid") != s) {
              Utils.img(i.icon_select, avatarconv(s)).attr("aid", s);
              try {
                n = JSON.parse(localStorage.getItem("iconMainColor") || "{}")
              } catch (e) {
                n = {}
              }
              var e = (n[r] || "").split(" "),
                a = function() {
                  i.icon_selectColor.css("display", "none"), i.icon_selectColorIcon.css("display", "");
                  var e = Cookie("namecolor"),
                    e = (Probe.guestLoginError || Probe.socialAccUseNameColor) && e && !Probe.nameColorInited ? (Probe.nameColorInited = 1, hex2rgb(e)) : "255,255,255";
                  i.function.event(3, e, 1)
                };
              e[0] == s ? e[1] ? i.function.lib(1, e[1].split("#")) : a() : (a(), -1 < s.indexOf("://") ? (Probe.init.picMainColorExt || (Probe.init.picMainColorExt = 1, Probe.init.picMainColor || (Probe.init.picMainColor = 1, Init.picMainColor()), Objs.API.colorThiefExt = {}, Objs.API.colorThiefExt.This = new Api.ColorThief(Objs.API.colorThiefExt.iconImg = resourceHolder.append("<img decoding=\"async\" onload=\"var color=Objs.API.colorThiefExt.This.getPalette(null);for(var i=0;i<9;++i){color[i]=color[i].join(',');}var json=JSON.parse(localStorage.getItem('iconMainColor'));var src=this.getAttribute('src');if(src.indexOf('loadImgEdit.php?s=')>-1){src=decodeURIComponent(src.split('loadImgEdit.php?s=')[1]);}json[Objs.API.colorThiefExt.id]=src+' '+color.join('#');localStorage.setItem('iconMainColor',JSON.stringify(json));Objs[Objs.API.colorThiefExt.id].function.lib(1,color);\" crossOrigin=\"*\" style=\"display:none;\">").children("img:last")[0], 1), Utils.getScript("lib/js/app/server/picMainColor_Ext.js")), n[r] = s, localStorage.setItem("iconMainColor", JSON.stringify(n)), Objs.API.colorThiefExt.id = r, Objs.API.colorThiefExt.iconImg.src = (-1 != s.indexOf(".googleusercontent.com/") ? Urls.agent : Urls.upload.file) + "lib/php/function/loadImgEdit.php?s=" + encodeURIComponent(s)) : $.get(Urls.api + "lib/php/function/icon.php", {
                i: s
              }, function(e) {
                var a, t = e.split("|"),
                  o = [];
                for (a in t) o.push(hex2rgb(t[a]));
                n[r] = s + " " + o.join("#"), localStorage.setItem("iconMainColor", JSON.stringify(n)), i.function.lib(1, o)
              }))
            }
          },
          socialAcc: function(e, s) {
            function a(e, r) {
              if (9 != device || 0 != r && 2 != r) {
                var t = function(t) {
                  var o;
                  n.Variable.requested2 || (n.Variable.requested2 = 1, n == Objs.socialAccLogin && (Probe.loadingSocialAcc = 1, o = Objs.selectHolder.This.after('<div class="mdi mdi-loading mdi-spin nowLoading fullBox flexCenter" style="display:none;background:rgba(0,0,0,0.7);color:rgba(255,255,255,0.75);z-index:1;"></div>').next().stop().fadeIn(speed500)), n.Variable.socialAccAjax = $.ajax({
                    type: "POST",
                    url: Urls.api + "lib/php/system/socialAcc.php" + (betaWorld ? "?beta" : ""),
                    data: {
                      t: r,
                      k: t,
                      d: device,
                      b: s ? 1 : 0
                    },
                    success: function(e) {
                      var a;
                      "0" == e[n.Variable.requested2 = 0] ? (a = e.substr(1).split(">"), (s ? n : (Objs.gameLoadHolder || Init.fullPanel(2), Objs.gameLoadHolder)).function.login(unhtmlspecialchars(a[0]), a[1], a[2])) : "4" == e[0] ? (e = e.substr(1).split(">"), Info.socialAcc.username = unhtmlspecialchars(e[0]), a = "1" == r ? (e[1] = e[1].split(" "), e[1][0]) : e[1], Info.socialAcc.icon = Info.guest.icon = "http" + a, null != e[2] && "0" != e[2] ? Info.socialAcc.sex = Info.guest.sex = "2" == e[2] ? 1 : 0 : Probe.socialAccGuestSexSelect = 1, Variable.socialAccToken = r + ("1" == r ? e[1][1] + " " + e[1][2] : t), Utils.service.socialAccPut(Info.socialAcc.username), Utils.service.socialAccLogin()) : n.function.error(languageArr[2]["!" == e ? 4 : "1" == e ? 5 : 6]), n == Objs.socialAccLogin && (Probe.loadingSocialAcc = 0, o.stop().fadeOut(speed1000, function() {
                        o.remove()
                      }))
                    },
                    error: function() {
                      n.Variable.socialAccAjax.aborted || n.function.error(languageArr[2][3]), n.Variable.requested2 = 0, n == Objs.socialAccLogin && (Probe.loadingSocialAcc = 0, o.stop().fadeOut(speed1000, function() {
                        o.remove()
                      }))
                    }
                  }))
                };
                switch (r) {
                  case "0":
                    var a, o = function() {
                      var e, a;
                      5 == device ? Main.socialAccLogin ? (Utils.service.qqSigninGetCodeResult = function(e) {
                        1 != e && n.function.error(languageArr[1][4][5][6].replace("*", languageArr[1][4][7][0]))
                      }, Main.socialAccLogin(r)) : n.function.error(languageArr[1][4][5][5]) : (n.Variable.qqUniqueID = Probe.socialAccRestore ? Variable.socialAccData[2] : Utils.smallTools.uniqueID(), e = Probe.socialAccRestore ? null : window.open("https://graph.qq.com/oauth2.0/authorize?client_id=101685674&response_type=token&scope=all&state=" + n.Variable.qqUniqueID + "_" + Math.floor(Date.now() / 1e3) + "_" + languageType + "_" + (s ? 3 : 2) + "&redirect_uri=https%3A%2F%2Fiirose.com%2Flib%2Fhtml%2Flogin%2Fqq.html", "_blank", "height=525,width=585,toolbar=no,menubar=no,scrollbars=no,status=no,location=yes,resizable=yes"), !isMobile && 8 != device || (Utils.service.qqSigninGetCode(), a = function() {
                        n.Variable.qqAjax = $.ajax({
                          type: "POST",
                          url: Urls.api + "lib/php/system/socialAccGet.php" + (betaWorld ? "?beta" : ""),
                          data: {
                            v: n.Variable.qqUniqueID
                          },
                          timeout: 6e4,
                          success: function(e) {
                            delete n.Variable.qqAjax, Utils.service.qqSigninGetCode(), (e = e.trim()) && Utils.service.qqSigninGetCode(e, n.Variable.qqUniqueID)
                          }
                        })
                      }, Probe.socialAccRestore ? a() : n.Variable.qqAjax = setTimeout(a, 5e3), Probe.socialAccRestore) || !e && 8 != device || (e && (n.Variable.qqWindowObj = e, n.Variable.qqClock = setInterval(function() {
                        e.closed && (delete n.Variable.qqWindowObj, Utils.service.qqSigninGetCode())
                      }, 1e3)), localStorage.setItem("socialAccVerify", n.Variable.qqUniqueID)))
                    };
                    Utils.service.qqSigninGetCode = function(e, a) {
                      void 0 !== n.Variable.qqAjax && ("number" == typeof n.Variable.qqAjax ? clearTimeout(n.Variable.qqAjax) : n.Variable.qqAjax.abort(), delete n.Variable.qqAjax), void 0 !== n.Variable.qqClock && (clearInterval(n.Variable.qqClock), delete n.Variable.qqClock, n.Variable.qqWindowObj) && (n.Variable.qqWindowObj.close(), delete n.Variable.qqWindowObj), void 0 !== e && (5 == device || void 0 !== a && n.Variable.qqUniqueID === a) && (t(e), 5 == device || Probe.socialAccRestore || QC.Login.signOut(), Probe.socialAccRestore) && (Probe.socialAccRestore = 0)
                    }, Probe.init.qqSigninJSLoaded || 5 == device || Probe.socialAccRestore ? o() : Probe.init.qqSigninJS || (Probe.init.qqSigninJS = 1, Probe.init.qqSigninJS2 || (Probe.init.qqSigninJS2 = 1, (a = document.createElement("script")).setAttribute("data-appid", "101685674"), a.setAttribute("data-redirectur", "https://iirose.com/lib/html/login/qq.html"), document.head.appendChild(a), Object.defineProperty(a, "src", {
                      get: function() {
                        return "https://connect.qq.com/qc_jssdk.js"
                      }
                    })), Utils.getScript("https://connect.qq.com/qc_jssdk.js", !0, function() {
                      document.head.removeChild(document.head.querySelector("script[data-appid]")), resourceHolder.append('<span id="qqLoginBtn" style="display:none;"></span>'), QC.Login({
                        btnId: "qqLoginBtn",
                        size: "C_S"
                      }), Probe.init.qqSigninJSLoaded = 1, Utils.buildSelect2(null, [
                        ["0", languageArr[1][4][5][2], Mod.template(23, "check")]
                      ], function(e, a) {
                        o()
                      }, 0, 1)
                    }, function() {
                      Probe.init.qqSigninJS = 0
                    }));
                    break;
                  case "1":
                    o = function() {
                      var e, a;
                      5 == device ? Main.socialAccLogin ? (a = function(e) {
                        1 != e && n.function.error(languageArr[1][4][5][0 == e ? 6 : 7].replace("*", languageArr[1][4][7][1]))
                      }, isFirefox ? Main.socialAccLogin(r, a) : a(Main.socialAccLogin(r))) : n.function.error(languageArr[1][4][5][5]) : 9 == device ? (a = function() {
                        parent.wx.miniProgram.navigateTo({
                          url: "/pages/login/login"
                        }), parent.onhashchange = function() {
                          parent.onhashchange = null;
                          var e = parent.location.hash;
                          parent.location.hash = "#device=wechat", "#wechatCode=" == e.substr(0, 12) ? Utils.service.wechatSigninGetCode(e.substr(12)) : "#device=wechat&failed" != e && "#device=wechat&faild" != e || n.function.error(languageArr[2][5])
                        }
                      }, parent.Probe.wechatSigninJS ? parent.wx && a() : parent.initWechatApi(a)) : (n.Variable.wechatUniqueID = Probe.socialAccRestore ? Variable.socialAccData[2] : Utils.smallTools.uniqueID(), e = Probe.socialAccRestore ? null : window.open("https://open.weixin.qq.com/connect/" + (8 == device ? "oauth2/authorize" : "qrconnect") + "?appid=" + (8 == device ? "wx3e3bde6ae78bfd2e" : "wxf7c19b8e598cf4b1") + "&redirect_uri=https%3A%2F%2Fiirose.com%2Flib%2Fhtml%2Flogin%2Fwechat.html&response_type=code&scope=snsapi_" + (8 == device ? "userinfo" : "login") + "&state=" + n.Variable.wechatUniqueID + "_" + Math.floor(Date.now() / 1e3) + "_" + languageType + "_" + (s ? 3 : 2) + "#wechat_redirect", "_blank", "height=525,width=585,toolbar=no,menubar=no,scrollbars=no,status=no,location=yes,resizable=yes"), !isMobile && 8 != device || (Utils.service.wechatSigninGetCode(), a = function() {
                        n.Variable.wechatAjax = $.ajax({
                          type: "POST",
                          url: Urls.api + "lib/php/system/socialAccGet.php" + (betaWorld ? "?beta" : ""),
                          data: {
                            v: n.Variable.wechatUniqueID
                          },
                          timeout: 6e4,
                          success: function(e) {
                            delete n.Variable.wechatAjax, Utils.service.wechatSigninGetCode(), (e = e.trim()) && Utils.service.wechatSigninGetCode(e, n.Variable.wechatUniqueID)
                          }
                        })
                      }, Probe.socialAccRestore ? a() : n.Variable.wechatAjax = setTimeout(a, 1e4), Probe.socialAccRestore) || !e && 8 != device || (e && (n.Variable.wechatWindowObj = e, n.Variable.wechatClock = setInterval(function() {
                        e.closed && (delete n.Variable.wechatWindowObj, Utils.service.wechatSigninGetCode())
                      }, 1e3)), localStorage.setItem("socialAccVerify", n.Variable.wechatUniqueID)))
                    }, Utils.service.wechatSigninGetCode = function(e, a) {
                      void 0 !== n.Variable.wechatAjax && ("number" == typeof n.Variable.wechatAjax ? clearTimeout(n.Variable.wechatAjax) : n.Variable.wechatAjax.abort(), delete n.Variable.wechatAjax), void 0 !== n.Variable.wechatClock && (clearInterval(n.Variable.wechatClock), delete n.Variable.wechatClock, n.Variable.wechatWindowObj) && (n.Variable.wechatWindowObj.close(), delete n.Variable.wechatWindowObj), void 0 !== e && (5 == device || 9 == device || void 0 !== a && n.Variable.wechatUniqueID === a) && (t(e), Probe.socialAccRestore) && (Probe.socialAccRestore = 0)
                    }, 5 == device || !isMobile || Probe.socialAccRestore || 9 == device || 8 == device ? o() : setTimeout(function() {
                      Utils.buildSelect2(null, [
                        ["0", languageArr[1][4][5][12][0], Mod.template(23, "android")],
                        ["1", languageArr[1][4][5][12][1], Mod.template(23, "qrcode-scan")],
                        ["2", languageArr[1][4][5][12][2], Mod.template(23, "wechat")]
                      ], function(e, a) {
                        switch (a) {
                          case "0":
                            setTimeout(function() {
                              Utils.service.downloadApp()
                            }, speed250);
                            break;
                          case "1":
                            o();
                            break;
                          case "2":
                            showImg(static + "images/system/wechatQR.jpg")
                        }
                      }, 0, 1)
                    }, speed250);
                    break;
                  case "2":
                    o = function() {
                      5 == device ? Main.socialAccLogin ? (Utils.service.googleSigninGetCodeResult = function(e) {
                        12500 == e ? n.function.error(languageArr[1][4][5][6].replace("*", languageArr[1][4][7][2])) : n.function.error("error code : " + e)
                      }, Main.socialAccLogin(r)) : n.function.error(languageArr[1][4][5][5]) : Variable.GoogleAuth.signIn({
                        scope: "email profile openid"
                      }).then(function() {
                        var e = Variable.GoogleAuth.currentUser.get();
                        Utils.service.googleSigninGetCode(e.getAuthResponse().id_token)
                      }, function(e) {
                        Utils.service.socialAccCanceled(r, e)
                      })
                    }, Utils.service.googleSigninGetCode = function(e) {
                      t(e), 5 != device && Variable.GoogleAuth.signOut()
                    }, Variable.GoogleAuth || 5 == device ? o() : (window.googleSigninInit || (googleSigninInit = function() {
                      gapi.load("auth2", function() {
                        gapi.auth2.init({
                          client_id: "658028994355-20bmtfb1ag4b9ujo4d5kdler0krv0pb4.apps.googleusercontent.com"
                        }).then(function() {
                          Variable.GoogleAuth = gapi.auth2.getAuthInstance(), Utils.buildSelect2(null, [
                            ["0", languageArr[1][4][5][2], Mod.template(23, "check")]
                          ], function(e, a) {
                            o()
                          }, 0, 1)
                        }, function(e) {
                          Utils.service.socialAccCanceled(r, e)
                        })
                      })
                    }), Probe.init.googleSigninJS || (Probe.init.googleSigninJS = 1, Utils.getScript("https://apis.google.com/js/platform.js?onload=googleSigninInit", !0, null, function() {
                      Probe.init.googleSigninJS = 0
                    })))
                }
              } else Utils.sync(0, languageArr[1][4][5][11])
            }
            var n = e;
            Utils.service.socialAccCanceled = function(e, a) {
              switch (e) {
                case "0":
                case "1":
                case "2":
                  a
              }
            }, n.Variable.errorShowing && n.function.error();
            Probe.socialAccDirectLogin ? a(0, Probe.socialAccDirectLogin) : Probe.socialAccRestore ? a(0, Variable.socialAccData[1]) : Utils.buildSelect2(this, Assets.select[4], a, 0, 1)
          },
          socialAccPut: function(e) {
            var a;
            switch (Variable.socialAccToken[0]) {
              case "0":
                a = "qqchat";
                break;
              case "1":
                a = "wechat";
                break;
              case "2":
                a = "google"
            }
            3 == Assets.select[5].length ? (Assets.select[5][2][1] = languageArr[1][4][5][10][0] + "   :   " + e, Assets.select[5][2][2] = Mod.template(23, a)) : Assets.select[5].push(["2", languageArr[1][4][5][10][0] + "   :   " + e, Mod.template(23, a)])
          },
          socialAccLogin: function() {
            panelAnimate(50), Probe.socialAccGuestSexSelect ? (Probe.init.gameNewSexHolder || Init.fullPanel(1), panelAnimate(2, 1)) : Utils.service.goNewNameHolder(Info.socialAcc.icon, Info.socialAcc.sex, Info.socialAcc.username)
          },
          clearStyle: function(e, a) {
            for (var t = e.cssRules, o = 0, r = t.length; o < r; ++o) - 1 < (t[o].selectorText || "").indexOf(a) && (e.deleteRule(o), --o, --r)
          },
          loadBlob: function(e, a, t) {
            var o = new XMLHttpRequest;
            o.open("GET", e), o.responseType = "blob", o.onreadystatechange = function() {
              4 == this.readyState && (200 == this.status ? a && a(this.response) : t && t())
            }, o.send()
          },
          getScale: function(e) {
            return e && -1 < ((e instanceof jQuery ? e[0] : e).style.transform || "").indexOf("scale(") ? ((e instanceof jQuery ? e[0] : e).style.transform || "").split("scale(")[1].split(")")[0] : 1
          },
          downloadApp: function() {
            Assets.select.app || (Assets.select.app = [
              ["0", languageArr[1][8][6], Mod.template(23, "download")],
              ["1", languageArr[1][8][7], Mod.template(23, "cpu-64-bit")]
            ], Assets.select.appCpu = [
              ["0", "arm64-v8a   |   " + languageArr[1][8][5]],
              ["1", "armeabi-v7a"],
              ["2", "x86"],
              ["3", "x86_64"]
            ]), Utils.buildSelect2(this, Assets.select.app, function(e, a) {
              function t(e, a) {
                var t;
                switch (a) {
                  case "0":
                    t = "";
                    break;
                  case "1":
                    t = "v7a";
                    break;
                  case "2":
                    t = "x86";
                    break;
                  case "3":
                    t = "x64"
                }
                link = Constant.Others.apk[0] + (t ? "?t=" + t : ""), isMobile && Utils.copyData(link) && Utils.sync(0, languageArr[1][4][5][13]), 5 == device || isFirefox ? parent.open(link) : 9 == device ? _alert(languageArr[1][8][4]) : parent.location.href = link
              }
              switch (a) {
                case "0":
                  t(0, "0");
                  break;
                case "1":
                  setTimeout(function() {
                    Utils.buildSelect2(e, Assets.select.appCpu, t)
                  }, speed250)
              }
            }, 0, 1)
          }
        },
        rgb2hex: function(e) {
          var a, e = e.split(",");
          return (1 == (a = Number(e[0]).toString(16)).length ? "0" + a : a) + (1 == (a = Number(e[1]).toString(16)).length ? "0" + a : a) + (1 == (a = Number(e[2]).toString(16)).length ? "0" + a : a)
        },
        darkOrLight: function(e) {
          return e = e.split(","), 382 < Number(e[0]) + Number(e[1]) + Number(e[2])
        },
        insertCss: function(e) {
          for (var a = 0, t = e.length; a < t; ++a) document.styleSheets[mainStyleSheetsIndex].insertRule(e[a], document.styleSheets[mainStyleSheetsIndex].cssRules.length)
        },
        getScript: function(e, a, t, o) {
          scriptLoader(e) && $.ajax({
            url: e,
            dataType: "script",
            cache: !0,
            async: !!a,
            success: t,
            error: o
          })
        },
        getStyle: function(e, a) {
          a ? ((a = document.createElement("link")).setAttribute("rel", "stylesheet"), a.setAttribute("href", e), document.head.insertBefore(a, document.styleSheets[mainStyleSheetsIndex].ownerNode)) : resourceHolder.append('<link href="' + e + '" rel="stylesheet">')
        },
        buildSelect: function(t, o, r, s, e, a) {
          if (o.length) {
            for (var n, i = Objs.selectHolder, l = t.getAttribute("v"), c = a || "", d = 0, p = o.length; d < p; ++d) c += "<div" + (isMobile ? "" : ' onmouseenter="Utils.Sound.play(0);"') + ' class="selectHolderBoxItem' + (e ? " selectHolderBoxItemIcon" : "") + '">' + (e ? o[d][2] : "") + o[d][1] + '<div class="fullBox ' + (l == o[d][0] ? (n = d, "bgColorActive") : "whoisTouch3") + '"></div></div>';
            var m = i.selectHolderBox.empty().html(c).children(".selectHolderBoxItem");
            m.each(function(a, e) {
              e.onclick = function() {
                var e = o[a][0];
                e != l && (m[n] && (m[n].lastChild.className = "fullBox whoisTouch3"), this.lastChild.className = "fullBox bgColorActive", t.setAttribute("v", e), (s || t).innerHTML = o[a][1], r) && r(t, String(e)), i.This.stop().fadeOut(speed250, function() {
                  i.selectHolderBox.empty()
                }), i.selectHolderBox.css("transform", "scale(0.8)")
              }
            }), i.This.stop().fadeIn(speed250), i.selectHolderBox.css("transform", "").scrollTop(m[n] ? m[n].offsetTop - 100 : 0)
          }
        },
        buildSelect2: function(t, o, r, e, a, s) {
          if (o.length) {
            for (var n = Objs.selectHolder, i = (e && (n.emptyNotAllow = e), s || ""), l = 0, c = o.length; l < c; ++l) i += "<div" + (isMobile ? "" : ' onmouseenter="Utils.Sound.play(0);"') + ' class="selectHolderBoxItem' + (a ? " selectHolderBoxItemIcon" : "") + '">' + (a ? o[l][2] : "") + o[l][1] + '<div class="fullBox whoisTouch3"></div></div>';
            n.selectHolderBox.empty().html(i).children(".selectHolderBoxItem").each(function(e, a) {
              a.onclick = function() {
                n.emptyNotAllow && (n.emptyNotAllow = 0), this.lastChild.className = "fullBox bgColorActive", r && r(t, String(o[e][0])), n.This.stop().fadeOut(speed250, function() {
                  n.selectHolderBox.empty()
                }), n.selectHolderBox.css("transform", "scale(0.8)")
              }
            }), n.This.stop().fadeIn(speed250), n.selectHolderBox.css("transform", ""), n.selectHolderBox.scrollTop(0)
          }
        },
        setSelectVal: function(e, a, t, o) {
          if (o = o || e, "" === t) e.attr("v", ""), o.empty();
          else {
            for (var r, s = a[e.attr("n")], n = 0, i = s.length; n < i; ++n)
              if (s[n][0] == t) {
                e.attr("v", t), o.html(s[n][1]), r = 1;
                break
              } r || (e.attr("v", t), o.empty())
          }
        },
        backward: function() {
          if (!Probe.backwardFreez && !Probe.loading) {
            var e, a, t, o = Assets.backward;
            for (e in o)
              for (a in t = o[e])
                if (t[a][0]()) return t[a][1](), Probe.backwardFreez = 1, void setTimeout(function() {
                  Probe.backwardFreez = 0
                }, speed500);
            5 == device && Main.backgroundApp()
          }
        },
        getFinalStyle: function(e, a) {
          return document.defaultView.getComputedStyle(e, null)[a]
        },
        boxScalePanel: function(e) {
          Graphics.boxScale.add(Objs[e].paperParent, [
            [0, 1],
            [1, panelSize(-80, e)]
          ], [1, function() {
            return browserWidth < 656 ? browserWidth / 656 : 1
          }])
        },
        settings: function(e, a) {
          if (void 0 === a) return Assets.settings[e];
          Assets.settings[e] = a
        },
        database: function(e, a) {
          if (void 0 === a) return Assets.database[e];
          Assets.database[e] = a
        },
        getAbsolutePos: function(e, a) {
          for (var t = {
              top: -1 * a.clientTop
            }; a != e && a != document;) t.top = t.top + a.offsetTop + a.clientTop, a = a.parentNode;
          return t
        },
        Sound: {
          onmousedown: function(e) {
            !e.button && clicksoundprobe && (e = e.target || e.srcElement) != document && -1 < Utils.getFinalStyle(e, "cursor").indexOf("pointer") && Utils.Sound.play(1)
          },
          play: function(e, a) {
            window[(0 == e ? "selectsound" : 9 == e ? "effectsound" : 0 < e && e < 4 ? "clicksound" : "animationsound") + "probe"] && (Probe.skipSound && 3 == e && (Probe.skipSound = 0, e = 2), this.gameAudioPlayer(e, a))
          }
        },
        img: function(e, t, o) {
          var a;
          if (e instanceof jQuery) {
            if (1 != e.length) return e.each(function(e, a) {
              Utils.img(a, t, o)
            }), e;
            e = (a = e)[0]
          }
          e = e.firstChild, e.style.backgroundColor = o || "", e = e.firstChild;
          if (t ? (e.style.display = "", supportLazyLoad ? e.src = t : (e.removeAttribute("src"), e.setAttribute("data-src", t))) : (e.style.display = "none", e.removeAttribute("src"), supportLazyLoad || e.removeAttribute("data-src")), supportLazyLoad || (e.className = "bgImg lazyload"), a) return a
        },
        blobToDataURL: function(e, a) {
          Variable.blobToDataURLReaderArr || (Variable.blobToDataURLReader = new FileReader, Variable.blobToDataURLReader.taskArr = [], Variable.blobToDataURLReader.onloadend = function() {
            var e;
            this.taskArr.length && (e = this.taskArr.shift(), this.onload = function() {
              e[1](this.result)
            }, this.readAsDataURL(e[0]))
          });
          var t = Variable.blobToDataURLReader;
          1 == t.readyState ? t.taskArr.push([e, a]) : (t.onload = function() {
            a(this.result)
          }, t.readAsDataURL(e))
        },
        copyData: function(e) {
          if (5 == device && Main.putClipboardData) return Main.putClipboardData(e), !0;
          Objs.repertory.contentCopyHolder.innerHTML = htmlspecialchars(e);
          try {
            var a = getSelection(),
              t = document.createRange(),
              o = (t.selectNodeContents(Objs.repertory.contentCopyHolder), a.removeAllRanges(), a.addRange(t), document.execCommand("copy", !1, null));
            return a.removeAllRanges(), o
          } catch (e) {
            return !1
          }
        },
        sync: function(e, a, t) {
          var o;
          switch (e) {
            case 0:
              o = "syncAlertHolder";
              break;
            case 1:
              o = "syncConfirmHolder";
              break;
            case 2:
              o = "syncPromptHolder";
              break;
            case 3:
              o = "syncTextareaHolder"
          }
          Probe.init[o] || (Probe.init[o] = 1, Init.minPanel(0, e)), "none" != Objs.syncHolder.This.css("display") ? Objs.syncHolder.taskArr.push([e, a, t]) : (t && (Objs.syncHolder.task = t), 1 < e ? (Objs.syncHolder[o + "Hint"].html(a[0]), Objs.syncHolder[o + "Input"].attr(2 == e ? {
            type: a[1],
            maxlength: a[2]
          } : {
            maxlength: a[1]
          }).val(a[5 - e])) : Objs.syncHolder[o + "Content"].html(a), panelAnimate(24, 1, null, o), 1 < e && Objs.syncHolder[o + "Input"].focus())
        },
        filter: {
          all: [],
          run: function(e, a) {
            for (var t = this.all, o = 0, r = t.length; o < r; ++o)
              for (; - 1 < e.indexOf(t[o]);) e = e.replace(t[o], "*".repeat(t[o].length));
            return e
          }
        }
      },
      Mod = {
        template: function(e, a, t, o, r, s, n, i) {
          switch (e) {
            case 1:
              return '<input class="gamePaperItemContent" spellcheck="false" autocomplete="off" style="text-align:left;margin-left:8px;border:0;border-bottom:1px solid #f0f0f0;height:41px;box-sizing:border-box;font-weight:bold;font-size:16px !important;background:transparent;line-height:24px;color:inherit;padding:8px;position:relative;top:-8px;" placeholder="' + a + '" type="' + t + '" maxlength="' + o + '">';
            case 2:
              return '<div class="fullBox" style="background:#fff;"><img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + static + 'images/page/i/paperFlower/topLeft.png" style="position:absolute;height:287px;left:24px;top:24px;"><img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + static + 'images/page/i/paperFlower/topRight.png" style="position:absolute;height:287px;right:24px;top:24px;"><img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + static + 'images/page/i/paperFlower/bottomRight.png" style="position:absolute;height:287px;right:24px;bottom:24px;"><img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + static + 'images/page/i/paperFlower/bottomLeft.png" style="position:absolute;height:287px;left:24px;bottom:24px;"><div class="textOverflowEllipsis" style="font-size:32px;font-weight:bold;width:100%;text-align:center;height:47px;line-height:47px;opacity:.7;padding:0 48px;box-sizing:border-box;position:relative;top:90.5px;">' + a + '</div><div class="fullBox"></div></div>';
            case 3:
              return '<img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + a + '" style="height:100%;position:absolute;top:0;' + (t ? "left:0;transform:translateX(-100px)" : "right:0;transform:translateX(100px)") + ";transition:transform " + speed500s + ",opacity " + speed500s + ';opacity:0;">';
            case 5:
              return '<button class="' + (o ? "mainBg_color commonColor" : "mainColor") + '"' + (r ? ' onclick="' + r + '"' : "") + (s ? ' style="' + s + ';"' : "") + (n || "") + '><span class="buttonIcon mdi-' + a + '"></span><span class="buttonText">' + t + "</span></button>";
            case 12:
              return '<div class="contentItemBgicon mdi-' + a + ' mainBg_color commonColor textOverflowEllipsis"><span class="contentItemBgiconText">' + t + '</span></div><div class="contentItemContent">' + o + '</div><div class="contentItemBtn">' + r + "</div>";
            case 13:
              return '<div id="' + a + '" class="panelHolderItem" style="display:none;z-index:1;background:#fff;"><style type="text/css">#' + a + " .mainColor{color:#" + t + ";}#" + a + " .mainBg_color{background:#" + t + ";}" + (o || "") + "</style>";
            case 23:
              return '<div class="mdi-' + a + '" style="font-family:md;font-size:28px;text-align:center;line-height:100px;height:100px;width:100px;position:absolute;top:0;left:0;opacity:.7;"></div>';
            case 46:
              return '<div style="white-space:pre-wrap;width:100%;padding:32px 48px;box-sizing:border-box;position:relative;box-shadow:0 0 1px rgba(0,0,0,0.12),0 1px 1px rgba(0,0,0,0.24);background-color:#f0f0f0;" onclick="event.stopPropagation();"><div class="mdi-tag-text-outline" style="opacity:.1;position:absolute;top:0;right:48px;height:100%;font-size:56px;font-family:md;display:flex;justify-content:center;flex-direction:column;"></div><div style="font-size:18px;font-weight:bold;position:relative;">' + a + "</div></div>"
          }
        },
        img: function(e, a, t, o, r, s, n, i) {
          return (2 == t ? "" : '<div class="bgImgBox"' + (a ? ' style="background-color:' + a + ';"' : "") + ">") + '<img class="bgImg' + (supportLazyLoad ? '" loading="lazy"' : ' lazyload"') + ' decoding="async"' + (e ? " " + (supportLazyLoad ? "" : "data-") + 'src="' + e + '"' : "") + (o ? ' onload="' + o + '"' : "") + ((r = "this.style.display='none';" + (r || "")) ? ' onerror="' + r + '"' : "") + (!e || s || n || i ? ' style="' + (e ? "" : "display:none;") + (s ? "object-fit:" + s + ";" : "") + (n ? "object-position:" + n + ";" : "") + (i ? i + ";" : "") + '"' : "") + ">" + (2 == t ? "" : (t ? "" : '<div class="fullBox"></div>') + "</div>")
        }
      },
      Constant = {
        Others: {
          apk: ["https://iirose.com/work/lab/android/iiroseW/app.php", "https://iirose.com/work/lab/android/iiroseL/app.php"]
        }
      },
      Probe = {
        init: {}
      },
      Info = {
        guest: {},
        member: {},
        socialAcc: {}
      },
      Api = {},
      Assets = {
        Resource: {},
        settings: JSON.parse(localStorage.getItem("settings") || "{}"),
        database: JSON.parse(localStorage.getItem("database") || "{}"),
        select: {
          "0_0": [
            [3, "简体中文"],
            [2, "繁體中文"],
            [1, "English"],
            [0, "日本語"],
            [4, "한국어"],
            [5, "Français"]
          ],
          "1_0": []
        },
        backward: {
          system: {
            isSocialAccLoading: [function() {
              return Probe.loadingSocialAcc
            }, function() {
              Objs.socialAccLogin.Variable.socialAccAjax.aborted = 1, Objs.socialAccLogin.Variable.socialAccAjax.abort()
            }],
            selectHolder: [function() {
              return "none" != Objs.selectHolder.This.css("display")
            }, function() {
              Objs.selectHolder.This[0].firstChild.click()
            }]
          },
          full: {
            gameNewSexHolder: [function() {
              return Objs.gameNewSexHolder && "none" != Objs.gameNewSexHolder.This.css("display")
            }, function() {
              Objs.gameNewSexHolder.This[0].lastChild.firstChild.click()
            }],
            gameNewIconHolder: [function() {
              return Objs.gameNewIconHolder && "none" != Objs.gameNewIconHolder.This.css("display")
            }, function() {
              Objs.gameNewIconHolder.This[0].lastChild.firstChild.click()
            }],
            gameNewNameHolder: [function() {
              return Objs.gameNewNameHolder && "none" != Objs.gameNewNameHolder.This.css("display")
            }, function() {
              Objs.gameNewNameHolder.This[0].lastChild.firstChild.click()
            }],
            gameLoadHolder: [function() {
              return Objs.gameLoadHolder && "none" != Objs.gameLoadHolder.This.css("display")
            }, function() {
              Objs.gameLoadHolder.This[0].lastChild.firstChild.click()
            }],
            gameForgotNameHolder: [function() {
              return Objs.gameForgotNameHolder && "none" != Objs.gameForgotNameHolder.This.css("display")
            }, function() {
              Objs.gameForgotNameHolder.This[0].lastChild.firstChild.click()
            }],
            gameForgotPasswordHolder: [function() {
              return Objs.gameForgotPasswordHolder && "none" != Objs.gameForgotPasswordHolder.This.css("display")
            }, function() {
              Objs.gameForgotPasswordHolder.This[0].lastChild.firstChild.click()
            }],
            gameSetHolder: [function() {
              return Objs.gameSetHolder && "none" != Objs.gameSetHolder.This.css("display")
            }, function() {
              Objs.gameSetHolder.This[0].lastChild.firstChild.click()
            }]
          },
          other: {}
        }
      },
      Graphics = (isMobile || (Assets.enterKey = $.extend(!0, {}, Assets.backward), Assets.enterKey.system.selectHolder[1] = function() {}, Assets.enterKey.full.gameNewSexHolder[1] = function() {}, Assets.enterKey.full.gameNewIconHolder[1] = function() {
        Objs.gameNewIconHolder.This[0].lastChild.lastChild.click()
      }, Assets.enterKey.full.gameNewNameHolder[1] = function() {
        Objs.gameNewNameHolder.This[0].lastChild.lastChild.click()
      }, Assets.enterKey.full.gameLoadHolder[1] = function() {
        Objs.gameLoadHolder.This[0].lastChild.lastChild.click()
      }, Assets.enterKey.full.gameForgotNameHolder[1] = function() {
        Objs.gameForgotNameHolder.This[0].lastChild.lastChild.click()
      }, Assets.enterKey.full.gameForgotPasswordHolder[1] = function() {
        Objs.gameForgotPasswordHolder.This[0].lastChild.lastChild.click()
      }, Assets.enterKey.full.gameSetHolder[1] = function() {}, Assets.enterKey.other.gameHolder = [function() {
        return Objs.gameHolder && Objs.gameHolder.gameMenu[0].onclick
      }, function() {
        Objs.gameHolder.gameMenu[0].click()
      }], Utils.enterKey = function(e) {
        if (!Probe.enterKeyFreez && !Probe.loading) {
          var a, t, o, r = Assets.enterKey;
          for (a in r)
            for (t in o = r[a])
              if (o[t][0]()) return o[t][1](), Probe.enterKeyFreez = 1, setTimeout(function() {
                Probe.enterKeyFreez = 0
              }, speed500), void e.preventDefault()
        }
      }, onkeydown = function(e) {
        if (8 != e.keyCode && 13 != e.keyCode || !(8 == e.keyCode && e.ctrlKey || Utils.service.isNoInputFocus()))
          if (e.ctrlKey) switch (e.keyCode) {
              case 66:
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
              case 81:
              case 83:
              case 86:
              case 87:
              case 90:
                e.preventDefault()
            } else e.keyCode;
            else 13 == e.keyCode ? Utils.enterKey(e) : (e.preventDefault(), Utils.backward())
      }), 5 == device || isIos && (8 == device || 9 == device) || window.history && history.pushState && (onpopstate = function() {
        history.pushState("forward", null, "./i.html"), Utils.backward()
      }, history.pushState("forward", null, "./i.html")), {
        boxSuitScreen: {
          boxArr: [],
          add: function(e, a, t, o, r, s) {
            this.boxArr.push([e.css("transformOrigin", "top left"), t, 2 * a, o, 2 * r, s || ""]), this.run(this.boxArr.length - 1)
          },
          run: function(e) {
            e = void 0 !== e ? [this.boxArr[e]] : this.boxArr;
            e.forEach(function(e) {
              var a = 1 == e[1][0][0] ? browserWidth + e[1][0][1] : 2 == e[1][0][0] ? e[1][0][1]() : browserWidth * e[1][0][1],
                t = 1 == e[1][1][0] ? browserHeight + e[1][1][1] : 2 == e[1][1][0] ? e[1][1][1]() : browserHeight * e[1][1][1],
                o = e[3] + e[4],
                r = 1e8 * (a - e[2]) % (1e8 * o) / 1e8;
              r ? e[0].css({
                width: o = r < o / 10 ? a - r : a + (o - r),
                height: t / (a / o),
                transform: (e[5] ? e[5] + " " : "") + "scale(" + a / o + ")"
              }) : e[0].css({
                width: a,
                height: t,
                transform: e[5]
              })
            })
          }
        },
        boxScale: {
          boxArr: [],
          add: function(e, a, t, o) {
            this.boxArr.push([e.css("transformOrigin", "top left"), a, t, o || ""]), this.run(this.boxArr.length - 1)
          },
          run: function(e) {
            e = void 0 !== e ? [this.boxArr[e]] : this.boxArr;
            e.forEach(function(e) {
              var a = 1 == e[1][0][0] ? browserWidth + e[1][0][1] : 2 == e[1][0][0] ? e[1][0][1]() : browserWidth * e[1][0][1],
                t = 1 == e[1][1][0] ? browserHeight + e[1][1][1] : 2 == e[1][1][0] ? e[1][1][1]() : browserHeight * e[1][1][1],
                o = e[2][0] ? e[2][1]() : e[2][1];
              e[0].css({
                width: a / o,
                height: t / o,
                transform: (e[3] ? e[3] + " " : "") + "scale(" + o + ")"
              })
            })
          }
        }
      }),
      Init = {
        media: function() {
          for (var e = "", a = 0; a < 10; ++a) e += "<audio></audio>";
          var t, o = resourceHolder.append("<div>" + e + "</div>").children("div:last"),
            r = Variable.controlSoundArr = o[0].getElementsByTagName("audio");
          strTmp2 = (Cookie("msgvolume") || "").split('"'), clicksoundprobe = strTmp2[15] || 5, selectsoundprobe = strTmp2[16] || 7, animationsoundprobe = strTmp2[17] || 5, effectsoundprobe = strTmp2[18] || 10;
          for (a = 0; a < 10; ++a) t = window[(0 == a ? "selectsound" : 9 == a ? "effectsound" : 0 < a && a < 4 ? "clicksound" : "animationsound") + "probe"], r[a].volume = t / 10;
          var s = ["select", "click", "check", "cancel", "animationEnter", "animationBack", "animationShow", "animationHide", "animationSwitch", "effect"];
          Utils.Sound.gameAudioPlayer = function(e, a) {
            var t = r[e];
            !t.isInited || 9 == e && t.effectBak != a ? (t.isInited = 1, Utils.service.loadBlob(static + "lib/system/sound/" + (9 == e ? "effect/" + (t.effectBak = a) : s[e]) + ".mp3", function(e) {
              Utils.blobToDataURL(e, function(e) {
                t.src = e, t.readyState && (t.currentTime = 0), t.play()
              })
            })) : (t.readyState && (t.currentTime = 0), t.play())
          }, document.onmousedown = function() {
            for (var e = 0; e < 10; ++e) r[e].play();
            document.onmousedown = null
          }, 5 == device && Main.clickWebview && Main.clickWebview(0, 0), document.addEventListener("mousedown", Utils.Sound.onmousedown)
        },
        minPanel: function(e, a) {
          var t, o, r, s;
          if (0 === e) {
            switch (a) {
              case 0:
                o = theme ? "6a7b8a" : "8fa5b9", r = "alert-circle", s = "警告", t = "syncAlertHolder";
                break;
              case 1:
                o = theme ? "3d76b1" : "478bd2", r = "shield-check", s = "确认", t = "syncConfirmHolder";
                break;
              case 2:
                o = theme ? "707abf" : "7985d8", r = "form-textbox", s = "", t = "syncPromptHolder";
                break;
              case 3:
                o = theme ? "5d7db9" : "6589cc", r = "card-text-outline", s = "", t = "syncTextareaHolder"
            }
            Probe.init.syncHolder || (Probe.init.syncHolder = 1, Objs.syncHolder = {
              This: Objs.selectHolder.This.after('<div id="syncHolder" class="fullBoxFixed flexCenter" style="background:rgba(0,0,0,0.8);display:none;padding:12px;box-sizing:border-box;overflow-x:auto;overflow-y:auto;"></div>').next(),
              taskArr: []
            }, Graphics.boxScale.add(Objs.syncHolder.This, [
              [0, 1],
              [0, 1]
            ], [1, function() {
              return browserWidth < 616.888888888889 ? browserWidth / 616.888888888889 : 1
            }])), Objs.syncHolder[t] = Objs.syncHolder.This.append('<div id="' + t + '" class="panelHolderItem panelHolderItemSmall" style="display:none;transform:scale(0.8);"><style type="text/css">#' + t + " .mainColor{color:#" + o + " !important;}#" + t + " .mainBg_color{background-color:#" + o + ";}</style>" + Mod.template(12, r, s, '<div class="fullBox textColor" style="' + (1 < a ? "overflow:hidden;" : "overflow-x:auto;overflow-y:auto;") + "background:rgba(" + (theme ? "240,240,240" : "16,16,16") + "," + (panelOpacity ? "0.8" : "1") + ");" + (1 < a ? "" : "padding:24px;box-sizing:border-box;font-weight:bold;line-height:26px;font-size:16px !important;white-space:pre-wrap;user-select:text;-webkit-user-select:text;") + '">' + (1 < a ? 2 == a ? '<input placeholder="请输入内容 . . ." style="width:100%;height:240px;padding:24px;padding-bottom:190px;box-sizing:border-box;font-weight:bold;font-size:16px !important;line-height:26px;color:inherit !important;" class="textColor" spellcheck="false" autocomplete="off" onkeydown="if(event.keyCode==13){' + (isMobile ? "this.blur();" : "") + 'Objs.syncHolder.syncPromptHolderConfirm.click();}">' : '<textarea placeholder="请输入内容 . . ." type="text" style="width:100%;height:240px;padding:24px;box-sizing:border-box;font-weight:bold;font-size:16px !important;line-height:26px;overflow-x:auto;overflow-y:auto;" class="textColor" spellcheck="false" autocomplete="off" onkeydown="if(event.keyCode==13 && event.ctrlKey){Objs.syncHolder.syncTextareaHolderConfirm.click();}"></textarea>' : "") + "</div>", (a ? Mod.template(5, "cancel", "取消", 0, "panelAnimate(24,0,null,'" + t + "');if(Objs.syncHolder.task){Objs.syncHolder.task(" + (1 == a ? "false" : "null") + ");delete Objs.syncHolder.task;}" + (1 < a ? "Objs.syncHolder." + t + "Input.val('');" : "")) : "") + Mod.template(5, "check", "确定", 1, "panelAnimate(24,0,null,'" + t + "');if(Objs.syncHolder.task){Objs.syncHolder.task(" + (a ? 1 == a ? "true" : "Objs.syncHolder." + t + "Input.val()" : "") + ");delete Objs.syncHolder.task;}" + (1 < a ? "Objs.syncHolder." + t + "Input.val('');" : ""))) + "</div>").children("div:last-child"), Objs.syncHolder[t + "Content"] = Objs.syncHolder[t].children("div:eq(1)").children("div"), 1 < a && (Objs.syncHolder[t + "Hint"] = Objs.syncHolder[t].children("div:eq(0)").children("span"), Objs.syncHolder[t + "Input"] = Objs.syncHolder[t + "Content"].children(2 == a ? "input" : "textarea"), Objs.syncHolder[t + "Confirm"] = Objs.syncHolder[t].children("div:eq(2)").children("button:last-child"))
          }
        },
        fullPanel: function(e) {
          var a;
          switch (e) {
            case 0:
              Init.media(0), Objs[t = "gameHolder"] = {
                This: $("#gameHolder")
              }, Objs[t].gameMenu = Objs[t].This.children("div:eq(0)"), Objs[t].gameShow = Objs[t].This.children("div:eq(1)").prepend(Mod.img(0, 0, 0, 0, 0, "contain")), Objs[t].gamePanelHolder = $("#gamePanelHolder"), Objs[t].gameMenuBox = Objs[t].gameMenu.children("div:last"), Objs[t].gameMenuBoxBg = Objs[t].gameMenuBox.prev(), Objs[t].gameLogo = Objs[t].gameMenuBox.children("div:eq(0)"), Objs[t].gameMenuSelection = Objs[t].gameMenuBox.children("div:eq(1)"), Objs[t].gameStartClick = Objs[t].gameMenuBox.children("div:eq(2)"), Objs[t].gameCopyright = Objs[t].gameMenuBox.children("div:eq(3)").html(copyRightStr), Objs[t].gameMenuSelectionItemArr = Objs[t].gameMenuSelection.children("div"), Objs[t].gameMenuSelectionItemArr.mouseenter(function() {
                this.lastChild.style.backgroundColor = "#1e110d", this.lastChild.style.width = "500px", Utils.Sound.play(0)
              }).mouseleave(function() {
                this.lastChild.style.backgroundColor = "", this.lastChild.style.width = ""
              }), Objs[t].gameMenuSelectionItemArr.each(function(e, a) {
                a.onclick = function() {
                  Objs.gameHolder.function.btnProcesser(e)
                }
              }), Objs[t].gameShowHint = Objs[t].gameShow.children("div:last"), Objs[t].function = {
                event: function(e) {
                  e
                },
                guestMenu: function(e, a) {
                  switch ("2" != a && Variable.socialAccToken && (Variable.socialAccTokenBak = Variable.socialAccToken, Variable.socialAccToken = 0), a) {
                    case "0":
                      panelAnimate(50), Probe.init.gameNewSexHolder || Init.fullPanel(1), panelAnimate(2, 1);
                      break;
                    case "1":
                      Objs.socialAccLogin || (Objs.socialAccLogin = {
                        Variable: {},
                        function: {
                          error: function(e) {
                            e && Utils.sync(0, e)
                          }
                        }
                      }), Probe.socialAccDirectLogin ? Utils.service.socialAcc(Objs.socialAccLogin) : setTimeout(function() {
                        Utils.service.socialAcc(Objs.socialAccLogin)
                      }, Probe.socialAccRestore ? 0 : speed250);
                      break;
                    case "2":
                      Variable.socialAccToken || (Variable.socialAccToken = Variable.socialAccTokenBak), Utils.service.socialAccLogin()
                  }
                },
                btnProcesser: function(e) {
                  switch (0 != e && 3 != e && panelAnimate(50), e) {
                    case 0:
                      Probe.loginError || Probe.socialAccRestore ? Variable.socialAccToken ? Utils.service.socialAccLogin() : (panelAnimate(50), Probe.init.gameNewSexHolder || Init.fullPanel(1), panelAnimate(2, 1)) : Utils.buildSelect2(null, Assets.select[5], this.guestMenu, 0, 1);
                      break;
                    case 1:
                      Probe.init.gameLoadHolder || Init.fullPanel(2), panelAnimate(3, 1);
                      break;
                    case 2:
                      Probe.init.gameSetHolder || Init.fullPanel(3), panelAnimate(4, 1);
                      break;
                    case 3:
                      sessionStorage.setItem("breakautologin", 1), location.reload()
                  }
                },
                resize: function() {
                  var e, a = Objs.gameHolder,
                    t = portrait ? (a.gameMenu.css("width", "100%"), a.gameShow.css({
                      width: "100%"
                    }), a.gameShowHint.css("display", "none"), window.browserWidth) : (a.gameMenu.css("width", "50%"), a.gameShow.css({
                      width: "50%",
                      height: "100%"
                    }), a.gameShowHint.css("display", ""), window.browserWidth / 2);
                  browserHeight < 896.39 || t < 698 ? (e = browserHeight < 896.39 && t < 698 ? t < browserHeight / 896.39 * 698 ? t / 698 : browserHeight / 896.39 : browserHeight < 896.39 ? browserHeight / 896.39 : t / 698, a.gameMenuBox.css({
                    transformOrigin: "center bottom",
                    transform: "scale(" + e + ")"
                  }), portrait ? (a.gameMenuBoxBg.css("height", 896.39 * e), a.gameShow.css({
                    height: browserHeight - 696.39 * e
                  })) : a.gameShowHint.css({
                    transformOrigin: "right bottom",
                    transform: "scale(" + e + ")"
                  })) : (a.gameMenuBox.css({
                    transformOrigin: "",
                    transform: ""
                  }), portrait ? (a.gameMenuBoxBg.css("height", 896.39), a.gameShow.css({
                    height: browserHeight - 696.39
                  })) : a.gameShowHint.css({
                    transformOrigin: "",
                    transform: ""
                  })), a.gameMenuBox.css("left", (t - 698) / 2)
                },
                init: function() {
                  this.resize()
                }
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 1:
              t = "gameNewSexHolder", o = "404040", r = "gender-male-female", s = languageArr[1][1][0], n = "", a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][1][1]) + '<div class="gamePaperItem commonColor" style="position:relative;width:560px;height:248px;justify-content:space-between;"><div style="height:200px;width:200px;background:#4EBBF9;font-family:md;font-size:48px !important;text-align:center;line-height:200px;margin-right:12px;" class="mdi-gender-male whoisTouch2" onclick="Objs.gameNewSexHolder.function.event(0,0);"></div><div style="height:200px;width:200px;background:#FF0070;font-family:md;font-size:48px !important;text-align:center;line-height:200px;margin-left:12px;border-radius:100%;" class="mdi-gender-female whoisTouch2" onclick="Objs.gameNewSexHolder.function.event(0,1);"></div></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/genderSelectionMale.png", 1) + Mod.template(3, static + "images/page/i/role/genderSelectionFemale.png") + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "keyboard-return", languageArr[0][4], 0, "panelAnimate(2);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Objs[t].sex = Objs[t].paper.children(".gamePaperBox").children(".gamePaperItem:first"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].role = Objs[t].content.children("img:eq(0)"), Objs[t].role2 = Objs[t].content.children("img:eq(1)"), Objs[t].function = {
                event: function(e, a) {
                  0 === e && (Variable.socialAccToken ? (Info.guest.sex = a, panelAnimate(1e3), Utils.service.goNewNameHolder(Info.socialAcc.icon, Info.socialAcc.sex = a, Info.socialAcc.username)) : (Probe.init.gameNewIconHolder || (Init.fullPanel(4), Assets.select[3] = [
                    ["male", languageArr[1][2][3][0], Mod.template(23, "gender-male")],
                    ["female", languageArr[1][2][3][1], Mod.template(23, "gender-female")],
                    ["couple", languageArr[1][2][3][2], Mod.template(23, "heart-outline")],
                    ["popular", languageArr[1][2][3][3], Mod.template(23, "star-four-points-outline")],
                    ["scenery", languageArr[1][2][3][4], Mod.template(23, "pine-tree")],
                    ["cartoon", languageArr[1][2][3][5], Mod.template(23, "emoticon-wink-outline")],
                    ["anime", languageArr[1][2][3][6], Mod.template(23, "star-crescent")]
                  ]), Objs.gameNewIconHolder.function.init ? (Probe.guestLoginError, Info.guest.sex = a, panelAnimate(1e3), Objs.gameNewIconHolder.function.init("cartoon")) : (Info.guest.sex = a, panelAnimate(1e3)), panelAnimate(5, 1)))
                },
                init: function() {}
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 2:
              t = "gameLoadHolder", o = "404040", r = "content-save", s = languageArr[1][4][0], n = "", a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][4][1]) + '<div class="gamePaperItem" style="height:248px;justify-content:center;margin-bottom:24px;"><div style="border-radius:100%;height:200px;width:200px;float:left;box-shadow:0 0 1px rgba(0,0,0,0.12),0 1px 1px rgba(0,0,0,0.24);position:relative;overflow:hidden;">' + Mod.img() + '</div></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][4][2] + "</span>" + Mod.template(1, languageArr[0][10], "text", 100) + '<span class="gamePaperItemType gamePaperItemType2 pointer" onclick="if(!Objs.gameLoadHolder.Variable.requested){Objs.gameLoadHolder.function.event(0,0);}" style="white-space:nowrap;flex-shrink:0;">' + languageArr[1][4][4] + '</span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][4][3] + "</span>" + Mod.template(1, languageArr[0][10], "password", 32) + '<span class="gamePaperItemType gamePaperItemType2 pointer" onclick="if(!Objs.gameLoadHolder.Variable.requested){Objs.gameLoadHolder.function.event(0,1);}" style="white-space:nowrap;flex-shrink:0;display:none;">' + languageArr[1][4][4] + '</span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[0][9] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameLoadHolder.function.event.call(this,2);" v="" n="1_0"></span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][4][5][0] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameLoadHolder.function.event.call(this,3);">' + languageArr[1][4][5][1] + '</span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][4][5][14] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameLoadHolder.function.event.call(this,4);">' + languageArr[1][4][5][15] + '</span></div><div class="gamePaperItem" style="display:none;transform:translateY(8px);transition:transform ' + speed500s + ';"><span class="gamePaperItemType">' + languageArr[0][11] + '</span><span class="gamePaperItemContent errorColor"></span></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/loadGame.png") + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "keyboard-return", languageArr[0][4], 0, "if(!Objs.gameLoadHolder.Variable.requested){panelAnimate(3);}") + Mod.template(5, "login", languageArr[0][7], 1, "Objs.gameLoadHolder.function.event(1);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].paperBox = Objs[t].paper.children(".gamePaperBox"), Objs[t].role = Objs[t].content.children("img"), Objs[t].icon = Objs[t].paperBox.children(".gamePaperItem:eq(0)").children("div"), Objs[t].nameInput = Objs[t].paperBox.children(".gamePaperItem:eq(1)").children("input"), Objs[t].passwordInput = Objs[t].paperBox.children(".gamePaperItem:eq(2)").children("input"), Objs[t].roomSelect = Objs[t].paperBox.children(".gamePaperItem:eq(3)").children("span:last"), Objs[t].error = Objs[t].paperBox.children(".gamePaperItem:last").children(".gamePaperItemContent"), Objs[t].Variable = {
                errorShowing: 0
              }, Objs[t].function = {
                event: function(e, a) {
                  switch (e) {
                    case 0:
                      switch (Objs.gameLoadHolder.paper.css({
                          opacity: 0,
                          transform: "translateY(100px)"
                        }), Objs.gameLoadHolder.role.css({
                          opacity: 0,
                          transform: "translateX(100px)"
                        }), Objs.gameLoadHolder.This.stop().fadeOut(speed500), a) {
                        case 0:
                          Probe.init.gameForgotNameHolder || Init.fullPanel(6), panelAnimate(7, 1);
                          break;
                        case 1:
                          Probe.init.gameForgotPasswordHolder || Init.fullPanel(7), panelAnimate(8, 1)
                      }
                      break;
                    case 1:
                      if (!(r = Objs.gameLoadHolder).Variable.requested) {
                        r.Variable.requested = 1;
                        var t = r.nameInput.val(),
                          o = r.passwordInput.val();
                        if (!t || !o) return r.function.error(languageArr[1][4][6][t ? 1 : 0]), void(r.Variable.requested = 0);
                        32 != o.length && (Probe.init.md5 || (Probe.init.md5 = 1, Utils.getScript("lib/js/app/server/md5.js")), o = md5(o)), this.query(t, o)
                      }
                      break;
                    case 2:
                      Utils.buildSelect(this, Assets.select["1_0"], function(e, a) {});
                      break;
                    case 3:
                      Utils.service.socialAcc(Objs.gameLoadHolder, 1);
                      break;
                    case 4:
                      var r;
                      (r = Objs.gameLoadHolder).dataManageUploadInput || (r.dataManageUploadInput = resourceHolder.append('<input type="file" accept="' + (9 == device || 8 == device ? "*/*" : (isIos ? "" : ".bak") + ".iirose") + '" style="display:none;" onchange="Objs.gameLoadHolder.function.dataManage();">')[0].lastChild), r.dataManageUploadInput.click()
                  }
                },
                dataManage: function() {
                  var o = Objs.gameLoadHolder,
                    e = new FileReader;
                  e.onload = function() {
                    var t, e = new Uint8Array(this.result);
                    33 != e[1] || 77 != e[e.length - 1] ? _alert(languageArr[1][4][5][16][0]) : 2 < e[0] ? _alert(languageArr[1][4][5][16][1]) : (e = e.subarray(2, e.length - 1), Probe.init.pako || (Probe.init.pako = 1, Utils.getScript("lib/js/app/server/pako.js")), e = pako.inflate(e, {
                      to: "string"
                    }), (t = JSON.parse(e)).cookie ? Utils.sync(1, languageArr[1][4][5][16][2] + "\n\n" + languageArr[1][4][5][17].replace("*", languageArr[1][4][5][18]), function(e) {
                      if (e) {
                        for (var a in isFirefox ? (e = sessionStorage.getItem("androidInitData"), sessionStorage.clear(), sessionStorage.setItem("androidInitData", e)) : sessionStorage.clear(), localStorage.clear(), t) localStorage.setItem(a, t[a]);
                        localStorage.setItem("device", device), parent.location._reload()
                      } else o.dataManageUploadInput.value = ""
                    }) : _alert(languageArr[1][4][5][16][0]))
                  }, e.readAsArrayBuffer(o.dataManageUploadInput.files[0])
                },
                login: function(e, a, t) {
                  var o = Objs.gameLoadHolder,
                    a = (Utils.service.cursorSH(0, 1), Cookie("username", e), Cookie("password", a), Cookie("uid", t), 5 == device && Main.setSettings("uid", t), o.roomSelect.attr("v")),
                    t = (Cookie("roomsave", a), Assets.roomJson[a]);
                  t && (Cookie("roomname", t[0]), Cookie("roomcolor", t[1]), Cookie("roomattr", t[2]), Cookie("roominfo", t[3]), Cookie("roomowner", t[4])), localStorage.setItem("closeTime", Math.floor(Date.now() / 1e3)), sessionStorage.setItem("autologin", 2), Cookie("help") || Cookie("help", 1), e != Info.member.username && (Cookie("changeN", ""), Cookie("mood", ""), Cookie("status", ""), localStorage.setItem("myEmojiVer", ""), localStorage.setItem("myEmoji", ""), localStorage.setItem("activeDisconnectionRestoreEmoji", ""), localStorage.setItem("inputVal", "")), localStorage.getItem("socialAccToken") && localStorage.removeItem("socialAccToken"), 5 != device && e != Info.member.username ? parent.location._reload() : (parent.startLoading(), location.href = "messages.html")
                },
                query: function(a, t) {
                  var o = Objs.gameLoadHolder;
                  $.ajax({
                    type: "POST",
                    url: Urls.api + "lib/php/system/login_member_ajax.php" + (betaWorld ? "?beta" : ""),
                    data: {
                      n: a,
                      p: t
                    },
                    success: function(e) {
                      1 == e.length ? (o.function.error(languageArr[2]["!" == e ? 4 : e]), o.Variable.requested = 0) : o.function.login(a, t, e)
                    },
                    error: function() {
                      o.function.error(languageArr[2][3]), o.Variable.requested = 0
                    }
                  })
                },
                error: function(e) {
                  Objs.gameLoadHolder.Variable.errorShowing = e ? 1 : 0, e ? (isMobile && document.activeElement.blur(), Objs.gameLoadHolder.error.html(e).parent().stop().fadeIn(speed500).css("transform", ""), Objs.gameLoadHolder.paperParent.scrollTop(9999999)) : Objs.gameLoadHolder.error.parent().stop().fadeOut(speed500, function() {
                    Objs.gameLoadHolder.error.empty()
                  }).css("transform", "translateY(8px)")
                },
                init: function() {
                  var a = Objs.gameLoadHolder;
                  a.nameInput.keydown(function(e) {
                    13 == e.keyCode && (isMobile ? this.blur() : a.passwordInput.val() ? (this.value && (this.value = this.value.trim()), a.function.event(1)) : a.passwordInput[0].focus())
                  }).blur(function() {
                    this.value && (this.value = this.value.trim())
                  }), a.passwordInput.keydown(function(e) {
                    13 == e.keyCode && (isMobile && this.blur(), a.function.event(1))
                  }), [a.nameInput, a.passwordInput].forEach(function(e) {
                    e[0].oninput = function() {
                      a.Variable.errorShowing && a.function.error()
                    }
                  }), Info.member.username && Info.member.password && (a.nameInput.val(Info.member.username), a.passwordInput.attr({
                    readonly: "readonly",
                    autocomplete: "new-password"
                  })[0].onfocus = function() {
                    var e;
                    this.hasAttribute("readonly") && (this.removeAttribute("readonly"), isIe) && !isEdge && (this.blur(), e = this, setTimeout(function() {
                      e.focus()
                    }, 0)), this.onfocus = null
                  }, 1 == loginError || 2 == loginError ? Info.member.password = "" : a.passwordInput.focus(function() {
                    this.value == Info.member.password && (this.value = "")
                  }).blur(function() {
                    this.value || (this.value = Info.member.password)
                  }).val(Info.member.password), setTimeout(function() {
                    a.passwordInput.removeAttr("readonly")
                  }, 3e3), Info.member.avatar = Cookie("avatar")) ? Utils.img(a.icon, avatarconv(Info.member.avatar)) : a.icon.css("boxShadow", "").html('<div style="font-family:md;font-size:200px;height:200px;width:200px;line-height:200px;text-align:center;color:#c0c0c0;" class="mdi-account-circle"></div>'), Utils.setSelectVal(a.roomSelect, Assets.select, Info.roomsave), isMobile && (Utils.inputFocusScroll(a.nameInput, 4, a.paperParent), Utils.inputFocusScroll(a.passwordInput, 4, a.paperParent))
                }
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 3:
              t = "gameSetHolder", o = "404040", r = "cog", s = languageArr[1][7][0], n = "", a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][7][1]) + '<div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][7][2] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameSetHolder.function.event.call(this,0);" v="" n="0_0"></span></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/config.png") + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "keyboard-return", languageArr[0][4], 0, "panelAnimate(4);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].paperBox = Objs[t].paper.children(".gamePaperBox"), Objs[t].role = Objs[t].content.children("img"), Objs[t].langSelect = Objs[t].paperBox.children(".gamePaperItem:eq(0)").children("span:last"), Objs[t].function = {
                event: function(e) {
                  0 === e && Utils.buildSelect(this, Assets.select["0_0"], function(e, a) {
                    Cookie("language", parent.languageType = Number(a)), sessionStorage.setItem("breakautologin", 1), 5 == device && Main.initLanguageArr(parent.languageType), parent.loginChangeLang = 1, location.reload()
                  })
                },
                init: function() {
                  Utils.setSelectVal(Objs.gameSetHolder.langSelect, Assets.select, languageType)
                }
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 4:
              t = "gameNewIconHolder", o = "404040", r = "account-circle", s = languageArr[1][2][0], n = "", a = '<div class="fullBox" style="transform:translateY(100px);opacity:0;transition:transform ' + speed500s + ",opacity " + speed500s + ';"><div class="fullBox" style="overflow-x:hidden;overflow-y:auto;padding:12px;box-sizing:border-box;"></div><div class="fullBox" style="display:none;overflow-x:hidden;overflow-y:auto;padding:12px;box-sizing:border-box;"></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="background:#e0e0e0;">' + a + "</div>", Mod.template(5, "chevron-left", languageArr[0][5], 0, "Objs.gameNewIconHolder.Variable.systemIconRequested=0;panelAnimate(5);") + Mod.template(5, "menu", languageArr[1][2][1] + '  /  <span class="textInherit"></span>', 0, "Objs.gameNewIconHolder.function.event.call(this,1);", null, ' n="3"') + Mod.template(5, "reload", languageArr[1][2][2], 1, "Objs.gameNewIconHolder.function.changePage();")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paper = Objs[t].content.children("div"), Objs[t].paperBox = Objs[t].paper.children("div"), Objs[t].typeBtn = Objs[t].This.children(".contentItemBtn").children("button:eq(1)"), Objs[t].typeBtnText = Objs[t].typeBtn.children("span:eq(1)").children("span"), scrollBar && (scrollfunc(Objs[t].paperBox.eq(0)), scrollfunc(Objs[t].paperBox.eq(1))), Graphics.boxSuitScreen.add(Objs[t].content, 12, [
                [0, 1],
                [1, panelSize(-80, t)]
              ], 213, 12), panelMod(t), Objs[t].Variable = {
                iconNum: isMobile && "s" != parent.setSizeN ? 15 : 32
              }, Objs[t].function = {
                event: function(e, a) {
                  var t = Objs.gameNewIconHolder;
                  switch (e) {
                    case 0:
                      Info.guest.icon = a, t.paper.css({
                        opacity: 0,
                        transform: "translateY(100px)"
                      }), t.This.stop().fadeOut(speed500), Utils.service.goNewNameHolder(a, Info.guest.sex, Info.guest.username2);
                      break;
                    case 1:
                      t.Variable.systemIconRequested = 0, Utils.buildSelect(this, Assets.select[3], function(e, a) {
                        t.Variable.type = a, Probe.switchPanelNoAnimate = 1, t.function.changePage(), Probe.switchPanelNoAnimate = 0
                      }, t.typeBtnText[0], 1)
                  }
                },
                showSystemIcon: function(e, a) {
                  var t, o = Objs.gameNewIconHolder;
                  if (!e.hasAttribute("init")) {
                    e.setAttribute("init", 1);
                    for (var r = "", s = 0; s < o.Variable.iconNum; ++s) r += '<div style="background-color:#fff;box-shadow:0 0 1px rgba(0,0,0,0.12),0 1px 1px rgba(0,0,0,0.24);height:213px;width:213px;float:left;margin:12px;" class="whoisTouch2" onclick="var id=this.firstChild.getAttribute(\'data-id\');if(id){Objs.gameNewIconHolder.function.event.call(this,0,id);}"><div style="margin-top:2px;margin-left:2px;height:209px;width:209px;position:relative;">' + Mod.img() + "</div></div>";
                    e.innerHTML = r, e.childArr = e.children
                  }
                  for (s = 0; s < o.Variable.iconNum; ++s) Utils.img(t = e.childArr[s].firstChild, a ? avatarconv(a[s]) : ""), a ? t.setAttribute("data-id", a[s]) : t.removeAttribute("data-id")
                },
                changePage: function() {
                  var e, a, t, o = Objs.gameNewIconHolder;
                  o.Variable.systemIconRequested || (e = o.paperBox.eq(o.Variable.currentBox), a = o.paperBox.eq(o.Variable.currentBox = 1 - o.Variable.currentBox), panelAnimate(18, 1, function() {
                    o.function.showSystemIcon(e[0])
                  }, e, a), a.scrollTop(0), o.Variable.systemIconRequested = 1, t = function(e) {
                    o.function.showSystemIcon(a[0], e.split(",")), o.Variable.systemIconRequested = 0
                  }, $.ajax({
                    type: "GET",
                    url: Urls.api + "lib/php/function/icon.php",
                    data: {
                      t: ["anime", "male", "female", "couple", "popular", "scenery", "cartoon"].indexOf(o.Variable.type),
                      num: o.Variable.iconNum
                    },
                    success: t,
                    error: function() {
                      t("anime/324,anime/348,anime/228,anime/307,anime/303,anime/255,anime/162,anime/280,anime/109,anime/266,anime/282,anime/176,anime/283,anime/63,anime/392,anime/313,anime/155,anime/217,anime/95,anime/45,anime/211,anime/283,anime/368,anime/170,anime/182,anime/197,anime/98,anime/121,anime/153,anime/136,anime/144,anime/389")
                    }
                  }))
                },
                init: function(e) {
                  var a = Objs.gameNewIconHolder;
                  a.Variable.currentBox = 0, a.Variable.type = e, this.changePage(), Utils.setSelectVal(a.This.children(".contentItemBtn").children("button:eq(1)"), Assets.select, a.Variable.type, a.typeBtnText), delete this.init
                }
              };
              break;
            case 5:
              for (var t = "gameNewNameHolder", o = "404040", r = "card-account-details-outline", s = languageArr[1][3][0], n = "", i = "", l = 0; l < 9; ++l) i += '<div style="width:33.33%;height:33.33%;float:left;display:flex;justify-content:center;align-items:center;padding:4px;box-sizing:border-box;" class="whoisTouch2" onclick="var color=this.firstChild.style.backgroundColor;Objs.gameNewNameHolder.function.event(3,color.slice(4,-1).replace(Variable.regexp.char.space,\'\'),1);"><div style="height:50.66px;width:50.66px;border-radius:2px;"></div></div>';
              a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][3][1]) + '<div class="gamePaperItem" style="position:relative;width:560px;height:248px;justify-content:space-between;"><div style="height:200px;width:200px;margin-right:12px;padding-top:8px;padding-left:8px;box-sizing:border-box;border:1px dashed #e0e0e0;"><div style="height:182px;width:182px;position:relative;">' + Mod.img() + '</div></div><div style="height:200px;width:200px;margin-left:12px;display:none;">' + i + '</div><div style="height:200px;width:200px;margin-left:12px;text-align:center;line-height:200px;font-family:md;font-size:64px;" class="mdi-palette"></div></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][3][2] + '</span><span style="font-family:md;" class="gamePaperItemContent mdi-gender-male"></span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][3][3] + "</span>" + Mod.template(1, languageArr[0][10], "text", 100) + '<div class="mdi-palette whoisTouch2" style="height:24px;width:24px;border-radius:100%;margin-left:12px;font-size:16px;font-family:md;text-align:center;line-height:24px;flex-shrink:0;" onclick="Objs.gameNewNameHolder.function.event.call(this,2);"></div></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[0][9] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameNewNameHolder.function.event.call(this,4);" v="" n="1_0"></span></div><div class="gamePaperItem" style="display:none;transform:translateY(8px);transition:transform ' + speed500s + ';"><span class="gamePaperItemType">' + languageArr[0][11] + '</span><span class="gamePaperItemContent errorColor"></span></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/startGame.png") + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "chevron-left", languageArr[0][5], 0, "if(!Objs.gameNewNameHolder.Variable.requested){if(!Variable.socialAccToken){Info.guest.username2=Objs.gameNewNameHolder.nameInput.val();}panelAnimate(6);}") + Mod.template(5, "door-open", languageArr[0][6], 1, "Objs.gameNewNameHolder.function.event(0);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].paperBox = Objs[t].paper.children(".gamePaperBox"), Objs[t].role = Objs[t].content.children("img"), Objs[t].icon_selectBox = Objs[t].paperBox.children(".gamePaperItem:eq(0)"), Objs[t].icon_select = Objs[t].icon_selectBox.children("div:first").children("div"), Objs[t].icon_selectColor = Objs[t].icon_selectBox.children("div:eq(1)"), Objs[t].icon_selectColorArr = Objs[t].icon_selectColor.children("div"), Objs[t].icon_selectColorIcon = Objs[t].icon_selectColor.next(), Objs[t].sex = Objs[t].paperBox.children(".gamePaperItem:eq(1)").children("span:last"), Utils.getScript("lib/js/app/server/wordFilter.js"), Objs[t].nameInput = Objs[t].paperBox.children(".gamePaperItem:eq(2)").children("input").blur(function() {
                this.value = Utils.filter.run(this.value)
              }), Objs[t].roomSelect = Objs[t].paperBox.children(".gamePaperItem:eq(3)").children("span:last"), Objs[t].palette = Objs[t].nameInput.next(), Objs[t].error = Objs[t].paperBox.children(".gamePaperItem:last").children(".gamePaperItemContent"), Objs[t].Variable = {
                errorShowing: 0
              }, Objs[t].function = {
                event: function(e, t, a) {
                  switch (e) {
                    case 0:
                      var o = Objs.gameNewNameHolder;
                      if (!o.Variable.requested) {
                        o.Variable.requested = 1;
                        var r = Utils.filter.run(o.nameInput.val().trim());
                        if (!r) return this.error(languageArr[1][3][4][0]), void(o.Variable.requested = 0);
                        this.query(r)
                      }
                      break;
                    case 1:
                      Objs.gameNewNameHolder.icon_selectColorArr.each(function(e, a) {
                        a.firstChild.style.backgroundColor = "rgb(" + t[e] + ")"
                      });
                      break;
                    case 2:
                      this.hasAttribute("build") || (this.setAttribute("build", 1), s = Objs.gameNewNameHolder.paletteHolder = Objs.gameNewNameHolder.content.append('<div style="display:none;transform:translateX(-10%);position:absolute;bottom:116px;transition:transform ' + speed500s + ';height:218px;width:374px;box-shadow:0 0 1px rgba(0,0,0,0.12),0 1px 1px rgba(0,0,0,0.24);background:#ececec;"><link href="lib/css/app/server/spectrum/spectrum.css" rel="stylesheet"><style type="text/css">.sp-alpha-handle,/*.sp-slider*/.sp-hue,.sp-palette .sp-thumb-el,.sp-palette-row-initial .sp-thumb-el:nth-child(1),.sp-replacer,.sp-container button,.sp-cancel{cursor:url(images/cursor/theme/2.cur),pointer;}.sp-val{cursor:url(images/cursor/theme/4.cur),crosshair;}.sp-input{transition:transition:border-color ' + speed200s + ";}.sp-container button{transition:background-color " + speed200s + ",border-color " + speed200s + ",text-shadow " + speed200s + ",box-shadow " + speed200s + ";}</style></div>").children("div:last"), Variable.resizeTask.paletteHolder = function() {
                        s.css("left", (browserWidth - 374) / 2)
                      }, Variable.resizeTask.paletteHolder(), Utils.getScript("lib/js/app/server/spectrum.js"), s.spectrum({
                        color: Objs.gameNewNameHolder.palette.css("backgroundColor"),
                        showInput: !0,
                        showInitial: !0,
                        showPalette: !0,
                        flat: !0,
                        chooseText: languageArr[0][2],
                        cancelText: languageArr[0][3],
                        theme: "sp-light",
                        move: function(e) {
                          Objs.gameNewNameHolder.function.event(3, e.toRgbString().slice(4, -1).replace(Variable.regexp.char.space, ""))
                        }
                      }), s.find(".sp-choose").click(function() {
                        s.spectrum("set", Objs.gameNewNameHolder.palette.css("backgroundColor")), s[0].updateColor(), panelAnimate(9)
                      }).prev().click(function() {
                        Objs.gameNewNameHolder.function.event(3, s.spectrum("get").toRgbString().slice(4, -1).replace(Variable.regexp.char.space, "")), panelAnimate(9)
                      }), isMobile && Utils.inputFocusScroll(s.find(".sp-input"), 4)), panelAnimate(9, "none" == Objs.gameNewNameHolder.paletteHolder.css("display"));
                      break;
                    case 3:
                      Objs.gameNewNameHolder.palette.css({
                        backgroundColor: "rgb(" + t + ")",
                        color: Utils.darkOrLight(t) ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.75)"
                      }), a && Objs.gameNewNameHolder.paletteHolder && (Objs.gameNewNameHolder.paletteHolder.spectrum("set", "rgb(" + t + ")"), Objs.gameNewNameHolder.paletteHolder[0].updateColor());
                      break;
                    case 4:
                      Utils.buildSelect(this, Assets.select["1_0"], function(e, a) {})
                  }
                  var s
                },
                lib: function(e, a) {
                  1 === e && (this.event(1, a), e = Cookie("namecolor"), e = (Probe.guestLoginError || Probe.socialAccUseNameColor) && e && !Probe.nameColorInited ? (Probe.nameColorInited = 1, hex2rgb(e)) : a[0], this.event(3, e, 1), Objs.gameNewNameHolder.icon_selectColor.css("display", ""), Objs.gameNewNameHolder.icon_selectColorIcon.css("display", "none"))
                },
                login: function(e) {
                  var a, t = Objs.gameNewNameHolder,
                    o = (Utils.service.cursorSH(0, 1), a = t.Variable.help ? Assets.roomJson[o = t.roomSelect.attr("v")] : (a = "CN" == (a = (-1 < (a = navigator.language).indexOf("-") ? navigator.language.split("-")[1] : a).toUpperCase()) ? void 0 : "JA" == a.substr(0, 2) ? "JP" : a, Assets.roomJson[o = "5ce6a4b520a90"]), Cookie("roomsave", o), Cookie("roomname", a[0]), Cookie("roomcolor", a[1]), Cookie("roomattr", a[2]), Cookie("roominfo", a[3]), Cookie("roomowner", a[4]), localStorage.setItem("closeTime", Math.floor(Date.now() / 1e3)), Cookie("username", e), Cookie("password", ""), Cookie("avatar", Info[Variable.socialAccToken ? "socialAcc" : "guest"].icon), Utils.rgb2hex(t.palette.css("backgroundColor").slice(4, -1).replace(Variable.regexp.char.space, "")));
                  Cookie("namecolor") == o && e == Info.guest.username || (Cookie("namecolor", o), Cookie("colorpicker", "#" + o)), Cookie("sex", Info[Variable.socialAccToken ? "socialAcc" : "guest"].sex ? "2" : "1"), sessionStorage.removeItem("autologin"), e != Info.guest.username && (a = "X" + String(Date.now()).substr(-5) + String(Math.random()).substr(-7), Cookie("uid", a), 5 == device && Main.setSettings("uid", a), Cookie("mood", ""), Cookie("status", ""), localStorage.getItem("myEmojiVer") && (localStorage.setItem("myEmojiVer", ""), localStorage.setItem("myEmoji", ""), localStorage.setItem("activeDisconnectionRestoreEmoji", "")), localStorage.setItem("inputVal", "")), Variable.socialAccToken ? localStorage.setItem("socialAccToken", Variable.socialAccToken) : localStorage.getItem("socialAccToken") && localStorage.removeItem("socialAccToken"), parent.checkUser && parent.countIp("*GuestLogin"), parent.startLoading(), location.href = "messages.html"
                },
                query: function(a) {
                  var t = Objs.gameNewNameHolder;
                  $.ajax({
                    type: "POST",
                    url: Urls.api + "lib/php/system/login_guest_ajax.php" + (betaWorld ? "?beta" : ""),
                    data: {
                      n: a
                    },
                    success: function(e) {
                      e ? (t.function.error(languageArr[2]["!" == e ? 4 : 0]), t.Variable.requested = 0) : t.function.login(a)
                    },
                    error: function() {
                      t.function.error(languageArr[2][3]), t.Variable.requested = 0
                    }
                  })
                },
                error: function(e) {
                  Objs.gameNewNameHolder.Variable.errorShowing = e ? 1 : 0, e ? (isMobile && document.activeElement.blur(), Objs.gameNewNameHolder.error.html(e).parent().stop().fadeIn(speed500).css("transform", ""), Objs.gameNewNameHolder.paperParent.scrollTop(9999999)) : Objs.gameNewNameHolder.error.parent().stop().fadeOut(speed500, function() {
                    Objs.gameNewNameHolder.error.empty()
                  }).css("transform", "translateY(8px)")
                },
                init: function() {
                  var a = Objs.gameNewNameHolder;
                  a.nameInput.keydown(function(e) {
                    13 == e.keyCode && (isMobile && this.blur(), a.function.event(0))
                  }).blur(function() {
                    this.value && (this.value = this.value.trim())
                  })[0].oninput = function() {
                    a.Variable.errorShowing && a.function.error()
                  }, (a.Variable.help = Cookie("help")) ? Utils.setSelectVal(a.roomSelect, Assets.select, Info.roomsave) : a.roomSelect.parent().css("display", "none"), isMobile && Utils.inputFocusScroll(a.nameInput, 4, a.paperParent)
                }
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 6:
              t = "gameForgotNameHolder", o = "404040", r = "account", s = languageArr[1][5][0], n = "", a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][5][1]) + '<div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][5][2] + "</span>" + Mod.template(1, languageArr[0][10], "text", 300) + '</div><div class="gamePaperItem" style="display:none;transform:translateY(8px);transition:transform ' + speed500s + ';"><span class="gamePaperItemType">' + languageArr[0][11] + '</span><span class="gamePaperItemContent errorColor"></span></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/forgotUserName.png", 1) + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "keyboard-return", languageArr[0][4], 0, "panelAnimate(7);") + Mod.template(5, "account-search", languageArr[0][8], 1, "Objs.gameForgotNameHolder.function.event(0);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].paperBox = Objs[t].paper.children(".gamePaperBox"), Objs[t].role = Objs[t].content.children("img"), Objs[t].emailInput = Objs[t].paperBox.children(".gamePaperItem:eq(0)").children("input"), Objs[t].error = Objs[t].paperBox.children(".gamePaperItem:last").children(".gamePaperItemContent"), Objs[t].Variable = {
                errorShowing: 0
              }, Objs[t].function = {
                event: function(e) {
                  0 === e && Objs.gameForgotNameHolder.function.submit()
                },
                error: function(e) {
                  Objs.gameForgotNameHolder.Variable.errorShowing = e ? 1 : 0, e ? (isMobile && document.activeElement.blur(), Objs.gameForgotNameHolder.error.html(e).parent().stop().fadeIn(speed500).css("transform", ""), Objs.gameForgotNameHolder.paperParent.scrollTop(9999999)) : Objs.gameForgotNameHolder.error.parent().stop().fadeOut(speed500, function() {
                    Objs.gameForgotNameHolder.error.empty()
                  }).css("transform", "translateY(8px)")
                },
                init: function() {
                  $.ajaxSetup({
                    cache: !1,
                    timeout: 6e4
                  });
                  var a, t = Objs.gameForgotNameHolder;
                  t.emailInput.keydown(function(e) {
                    13 == e.keyCode && t.function.event(0)
                  }).blur(function() {
                    this.value && (this.value = this.value.trim())
                  })[0].oninput = function() {
                    Objs.gameForgotNameHolder.Variable.errorShowing && Objs.gameForgotNameHolder.function.error()
                  }, this.submit = function() {
                    var e;
                    a || (a = 1, (e = t.emailInput.val().trim()) ? (Variable.regexp.assets.email || (Variable.regexp.assets.email = new RegExp("^[^\\s]+?@[^\\s]+?\\.[^\\s]{1,5}$")), Variable.regexp.assets.email.test(e) ? $.ajax({
                      type: "POST",
                      url: Urls.api + "lib/php/system/username_reset_ajax.php" + (betaWorld ? "?beta" : ""),
                      data: {
                        e: e
                      },
                      success: function(e) {
                        "1" == e || "!" == e ? t.function.error("!" == e ? languageArr[2][4] : languageArr[1][5][3][2]) : (t.emailInput.val(""), e = unhtmlspecialchars(e.substr(1)), Objs.gameLoadHolder.nameInput.val(e), Objs.gameLoadHolder.passwordInput.val(""), panelAnimate(7)), a = 0
                      },
                      error: function() {
                        t.function.error(languageArr[2][3])
                      }
                    }) : (t.function.error(languageArr[1][5][3][1]), a = 0)) : (t.function.error(languageArr[1][5][3][0]), a = 0))
                  }, isMobile && Utils.inputFocusScroll(t.emailInput, 4, t.paperParent)
                }
              }, Objs[t].function.init(), delete Objs[t].function.init;
              break;
            case 7:
              t = "gameForgotPasswordHolder", o = "404040", r = "key", s = languageArr[1][6][0], n = "", a = '<div class="gamePaper" style="transform:translateY(100px);opacity:0;"><div class="gamePaperBox">' + Mod.template(2, languageArr[1][6][1]) + '<div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][4][2] + "</span>" + Mod.template(1, languageArr[0][10], "text", 100) + '</div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][6][2] + '</span><span class="gamePaperItemContent gamePaperItemContentBiger whoisTouch2 textOverflowEllipsis" onclick="Objs.gameForgotPasswordHolder.function.event.call(this,0);" v="0">' + languageArr[1][6][5][0] + '</span></div><div class="gamePaperItem"><span class="gamePaperItemType">' + languageArr[1][6][3] + "</span>" + Mod.template(1, languageArr[0][10], "text", 50) + '</div><div class="gamePaperItem" style="display:none;transform:translateY(8px);transition:transform ' + speed500s + ';"><span class="gamePaperItemType">' + languageArr[0][11] + '</span><span class="gamePaperItemContent errorColor"></span></div></div></div>', Objs[t] = {
                This: Objs.gameHolder.gamePanelHolder.append(Mod.template(13, t, o, n) + Mod.template(12, r, s, '<div class="fullBox textColor" style="overflow:hidden;background:#e0e0e0;">' + Mod.template(3, static + "images/page/i/role/forgotPassword.png") + '<div class="fullBox paperBox">' + a + "</div></div>", Mod.template(5, "keyboard-return", languageArr[0][4], 0, "panelAnimate(8);") + Mod.template(5, "key-variant", languageArr[0][8], 1, "Objs.gameForgotPasswordHolder.function.event(1);")) + "</div>").children("div:last")
              }, Objs[t].content = Objs[t].This.children("div:eq(1)").children("div"), Objs[t].paperParent = Objs[t].content.children("div:first"), Objs[t].paper = Objs[t].paperParent.children(".gamePaper"), Utils.boxScalePanel(t), scrollBar && scrollfunc(Objs[t].paperParent), panelMod(t), setTimeout(function() {
                Objs[t].paperParent.stop().animate({
                  scrollTop: 1e4
                }, speed1000)
              }, 1.5 * speed1000), Objs[t].paperBox = Objs[t].paper.children(".gamePaperBox"), Objs[t].role = Objs[t].content.children("img"), Objs[t].nameInput = Objs[t].paperBox.children(".gamePaperItem:eq(0)").children("input"), Objs[t].questionSelect = Objs[t].paperBox.children(".gamePaperItem:eq(1)").children("span:last"), Objs[t].answerInput = Objs[t].paperBox.children(".gamePaperItem:eq(2)").children("input"), Objs[t].error = Objs[t].paperBox.children(".gamePaperItem:last").children(".gamePaperItemContent"), Objs[t].Variable = {
                errorShowing: 0
              }, Objs[t].function = {
                event: function(e) {
                  switch (e) {
                    case 0:
                      Utils.buildSelect(this, Assets.select["2_0"], function(e, a) {
                        0 == a ? Objs.gameForgotPasswordHolder.answerInput.val("").attr("disabled", "disabled") : (Objs.gameForgotPasswordHolder.answerInput.val("").removeAttr("disabled"), isMobile || Objs.gameForgotPasswordHolder.answerInput[0].focus()), Objs.gameForgotPasswordHolder.Variable.errorShowing && Objs.gameForgotPasswordHolder.function.error()
                      });
                      break;
                    case 1:
                      Objs.gameForgotPasswordHolder.function.submit()
                  }
                },
                error: function(e) {
                  Objs.gameForgotPasswordHolder.Variable.errorShowing = e ? 1 : 0, e ? (isMobile && document.activeElement.blur(), Objs.gameForgotPasswordHolder.error.html(e).parent().stop().fadeIn(speed500).css("transform", ""), Objs.gameForgotPasswordHolder.paperParent.scrollTop(9999999)) : Objs.gameForgotPasswordHolder.error.parent().stop().fadeOut(speed500, function() {
                    Objs.gameForgotPasswordHolder.error.empty()
                  }).css("transform", "translateY(8px)")
                },
                init: function() {
                  $.ajaxSetup({
                    cache: !1,
                    timeout: 6e4
                  });
                  var t, o = Objs.gameForgotPasswordHolder;
                  o.nameInput.blur(function() {
                    this.value && (this.value = this.value.trim())
                  }), o.answerInput.attr("disabled", "disabled").keydown(function(e) {
                    13 == e.keyCode && (isMobile && this.blur(), o.function.event(1))
                  }), isMobile && o.nameInput.keydown(function(e) {
                    13 == e.keyCode && this.blur()
                  }), [o.nameInput, o.answerInput].forEach(function(e) {
                    e[0].oninput = function() {
                      o.Variable.errorShowing && o.function.error()
                    }
                  }), Assets.select["2_0"] = [
                    [0, languageArr[1][6][5][0]],
                    [1, languageArr[1][6][5][1]],
                    [2, languageArr[1][6][5][2]],
                    [3, languageArr[1][6][5][3]],
                    [4, languageArr[1][6][5][4]]
                  ], this.submit = function() {
                    var e, a;
                    t || (t = 1, (e = o.nameInput.val()) ? 0 == o.questionSelect.attr("v") ? (o.function.error(languageArr[1][6][4][1]), t = 0) : o.answerInput.val() ? (a = e, $.ajax({
                      type: "POST",
                      url: Urls.api + "lib/php/system/password_reset_ajax.php" + (betaWorld ? "?beta" : ""),
                      data: {
                        n: a,
                        q: o.questionSelect.attr("v"),
                        a: o.answerInput.val()
                      },
                      success: function(e) {
                        1 == e.length ? (o.function.error("!" == e ? languageArr[2][4] : languageArr[1][6][4]["1" == e ? 3 : 4]), t = 0) : (e = e.split(" "), Objs.gameLoadHolder.function.login(a, e[0], e[1]))
                      },
                      error: function() {
                        o.function.error(languageArr[2][3])
                      }
                    })) : (o.function.error(languageArr[1][6][4][2]), t = 0) : (o.function.error(languageArr[1][6][4][0]), t = 0))
                  }, isMobile && (Utils.inputFocusScroll(o.nameInput, 4, o.paperParent), Utils.inputFocusScroll(o.answerInput, 4, o.paperParent))
                }
              }, Objs[t].function.init(), delete Objs[t].function.init
          }
          Probe.init[t] = 1
        },
        translate: function() {
          languageArr = [
            [
              ["IIROSE", "選択", "確定", "キャンセル", "戻る", "前のステップへ", "始める", "ログイン", "取り戻す", "部屋", "内容を入力してください . . .", "エラー"],
              [
                ["任意の位置をクリックして開始する", "薔薇の園", "新たな始まり", "旅を続ける", "設定", "旅を終える"],
                ["新たな始まり", "性別を選択する"],
                ["アバター", "カテゴリー", "別のセットに切り替える", ["男性", "女性", "カップル", "流行", "風景", "カートゥーン", "アニメ"]],
                ["旅を始める", "私のキャラクター", "性別", "名前", ["名前を入力してください"]],
                ["旅を続ける", "ログイン", "ユーザー名", "パスワード", "忘れた", ["サードパーティログイン", "サードパーティプラットフォームを選択する", "ここをクリックして確認してください", "現時点では、この機能はアプリとパソコンでのみご利用いただけます。アプリまたはパソコンでご操作ください", "この操作で問題が発生した場合は、アプリまたはパソコンで操作を行ってください", "この機能をサポートするには、アプリを最新バージョンにアップデートしてください", "* がインストールされていません", "最新バージョン * がインストールされていません。最新バージョンをインストールまたはアップグレードしてください", "現在、使用しているのは   :   *", ["スマートフォン", "タブレット"],
                    ["ログイン済みのアカウントでログインする", "サードパーティアカウントで簡単にログインする", "新しいアカウントをすばやく作成する"], "ミニアプリではWeChat認証のみ許可されます。その他の認証はアプリまたはウェブページで行ってください", ["アプリをダウンロード  :  Android端末のみ", "QRコードをスキャン  :  他のデバイスからスキャン", "WeChatから開く"], "ダウンロードリンクがクリップボードに保存されました。万が一ダウンロードできない場合、ブラウザを開いて直接リンクを貼り付けてダウンロードしてください", "セーブファイルを読み込む", "ファイルを選択する", ["セーブファイルが破損しています！", "ページを最新バージョンに更新してから、このセーブファイルを解析してください！", "この操作により、現在のすべてのデータが上書きされます！！！"], "* することを確認しますか？", "インポート"
                  ],
                  ["ユーザー名を入力してください", "パスワードを入力してください"],
                  ["QQ", "WeChat", "グーグル"]
                ],
                ["ユーザー名を忘れた", "ユーザー名を取り戻す", "メールボックス", ["メールアドレスを入力してください", "メールアドレスの形式が間違っています！", "申し訳ありませんが、このメールアドレスは登録されていません"]],
                ["パスワードを忘れた", "パスワードを再発行する", "セキュリティの質問", "セキュリティの質問の答え", ["ユーザー名を入力してください", "セキュリティの質問を1つ選択してください", "セキュリティの質問の答えを入力してください", "このユーザー名は存在しません", "セキュリティ問題またはセキュリティ問題の答えが誤っています！"],
                  ["セキュリティの質問を1つ選択してください", "一番好きな人は誰ですか？", "一番好きな食べ物は何ですか？", "一番好きな映画は何ですか？", "一番好きな曲は何ですか？"]
                ],
                ["設定", "好み", "言語"],
                ["クライアントをダウンロードする", "海南省警察庁ネットセキュリティ備案番号*", "海南ICP備*号", "WeChatミニプログラムは外部サイトリンクの開く機能をサポートしていません。アプリまたはウェブページでご覧ください", "ダウンロードリンクがクリップボードにコピーされました。ブラウザを開いてリンクをコピーし、ダウンロードしてください", "デフォルトでこれを選択してください", "直接ダウンロードする", "詳細設定"]
              ],
              ["この名前は既に使用されています！", "パスワードが間違っています！", "このユーザー名は存在しません！", "リクエストが失敗しました。しばらくしてから再度お試しください", "当日のリクエスト回数が上限に達しました。24時間後に再試行してください", "サードパーティログインに失敗しました！", "このサードパーティアカウントはまだ紐付けされていません", "アバターカテゴリを選択してください"], {
                "5b792977089e7": "コミュニティ",
                "5b792c73178f2": "住宅",
                "5b792cac2b37f": "ホテル",
                "5b792cb650749": "サンドボックス",
                "5b7ab80a2017d": "ブラックルーム",
                "5b7ab80a201d0": "世界",
                "5b7ab80a201da": "アジア",
                "5b7ab80a201e5": "アフリカ",
                "5b7ab80a201f1": "北アメリカ",
                "5b7ab80a201fc": "南アメリカ",
                "5b7ab80a20208": "南極大陸",
                "5b7ab80a20213": "ヨーロッパ",
                "5b7ab80a2021f": "オセアニア",
                "5b7ab80a20276": "ロールプレイ",
                "5b7ab80a202f4": "薔薇外界",
                "5b7ab80a202fd": "初級迷宮",
                "5b7cda6765b16": "ゲームセンター",
                "5ce6a4b520a90": "宇宙ステーション"
              }
            ],
            [
              ["IIROSE", "Select", "Confirm", "Cancel", "Return", "Return To Previous Step", "Start", "Login", "Get Back", "Room", "Enter something . . .", "Error"],
              [
                ["CLICK ANYWHERE TO START", "ROSE GARDEN", "New Trip", "Continue Trip", "Settings", "Exit Garden"],
                ["New Start", "Gender Selection"],
                ["Profile Picture", "Category", "Another Group", ["Male", "Female", "Couple", "Popular", "Scenery", "Cartoon", "Anime"]],
                ["Start Trip", "My People Set", "Gender", "Name", ["Please enter the name"]],
                ["Load Memory", "Login", "Username", "Password", "Forgot", ["Third Party Login", "Choose Third Party Platform", "Please click here to Confirm", "This function is temporarily only available for APP and Computer , please use the APP or Computer", "If you encounter any issues in the operation , please use the APP or Computer", "Please upgrade the APP to the latest version to access this function", "You have not yet installed *", "You have not installed the latest version * , please install or upgrade", "Currently using   :   *", ["Mobile", "Tablet"],
                    ["Logging In From A Logged On Account", "Logging In From A Third Party Account", "Create A New Account Quickly"], "Only wechat authorization is allowed in the mini program , please operate in APP or Web Page for other authorization", ["Download APP  :  Android devices only", "Scan the QR code  :  Scanning from other devices", "Open from WeChat"], "Download address has been saved in your clipboard , just in case you are unable to download , please directly open the browser and paste the download address", "Load Archive", "Select A File", ["Archive file is corrupted !", "Please update the page to the latest , to resolve this archive file !", "This operation will overwrite all current data !!!"], "Are you sure to * ?", "Import"
                  ],
                  ["Please enter the username", "Please enter the password"],
                  ["QQ", "WeChat", "Google"]
                ],
                ["Forgot Username", "Get Back Username", "E-mail", ["Please enter the e-mail address", "E-mail address format error", "Sorry , we cannot find this email address"]],
                ["Forgot Password", "Get Back Password", "Security Question", "Security Answer", ["Please enter the username", "Please select a security question", "Please enter the security answer", "This username does not exist", "The security question or the answer does not match !"],
                  ["Select a security question", "Who is your favorite person ?", "What's your favourite food ?", "What's your favourite movie ?", "What's your favourite music ?"]
                ],
                ["Config", "Preference", "Language"],
                ["Download Client", "Public Network Security - *", "ICP - *", "WeChat mini program does not support opening off-site links , please use APP or web version to open", "The download link has been placed in the clipboard , please open your browser to copy the link to download", "Select this by default", "Download", "Advanced Options"]
              ],
              ["This name has already being used !", "Password does not match !", "This username does not exist !", "Request failed , please try again later", "Maximum no. of requests today has been reached , please try 24 hours later", "Third party login failed !", "This Account is not connected", "Please select a Profile Picture category"], {
                "5b792977089e7": "Community",
                "5b792c73178f2": "Residence",
                "5b792cac2b37f": "Hotel",
                "5b792cb650749": "Sandbox",
                "5b7ab80a2017d": "Dark Room",
                "5b7ab80a201d0": "World",
                "5b7ab80a201da": "Asia",
                "5b7ab80a201e5": "Africa",
                "5b7ab80a201f1": "North America",
                "5b7ab80a201fc": "South America",
                "5b7ab80a20208": "Antarctica",
                "5b7ab80a20213": "Europe",
                "5b7ab80a2021f": "Oceania",
                "5b7ab80a20276": "Role Play",
                "5b7ab80a202f4": "Out Side Of Garden",
                "5b7ab80a202fd": "Primary Labyrinth",
                "5b7cda6765b16": "Game Room",
                "5ce6a4b520a90": "Space Station"
              }
            ],
            [
              ["薔薇花園", "選擇", "確定", "取消", "返回", "上一步", "開始", "登錄", "找回", "房間", "請輸入內容 . . .", "錯誤"],
              [
                ["點擊任意位置開始", "薔薇花園", "新的開始", "載入記憶", "設定", "結束旅途"],
                ["新的開始", "性別選擇"],
                ["頭像", "類目", "換一組", ["男性", "女性", "情侶", "流行", "風景", "卡通", "動漫"]],
                ["開始旅途", "我的人設", "性別", "名字", ["請輸入名字"]],
                ["載入記憶", "登錄", "用戶名", "密碼", "忘了", ["第三方登錄", "選擇第三方平台", "請點擊這裡 確認", "暫時僅支持 APP 和 電腦 使用此功能 , 請使用 APP 或 電腦 操作", "如果您在此操作中遇到任何問題 , 請使用 APP 或 電腦 進行此操作", "請將您的 APP 升級至最新版本 , 以支持此功能", "您沒有安裝 *", "您未安裝最新版本 * , 請安裝或升級至最新版本", "當前正在使用   :   *", ["手機", "平板電腦"],
                    ["使用已登錄的賬號登入", "使用三方賬號快捷登入", "快速創建新的賬戶"], "小程序中僅允許 微信 授權 , 其他授權請在 APP 或 網頁 中操作", ["下載 APP  :  僅安卓設備", "掃描二維碼  :  從其他設備掃描", "從微信中打開"], "下載地址已存入您的剪貼板 , 以防您遇到無法下載情況 , 請直接打開浏覽器粘貼下載地址下載", "載入存檔", "選擇文件", ["存檔文件已損壞 !", "請將頁面升級至最新 , 解析本存檔文件 !", "此操作將會覆蓋當前所有數據 !!!"], "您確定要 * 嗎 ?", "導入"
                  ],
                  ["請輸入用戶名", "請輸入密碼"],
                  ["QQ", "微信", "谷歌"]
                ],
                ["忘記用戶名", "找回用戶名", "郵箱", ["請輸入郵箱地址", "郵箱格式錯誤 !", "抱歉 , 沒有找到這個郵箱地址"]],
                ["忘記密碼", "找回密碼", "安全問題", "安全答案", ["請輸入用戶名", "請選擇一個安全問題", "請輸入安全答案", "這個用戶名不存在", "安全問題或安全答案錯誤 !"],
                  ["請選擇一個安全問題", "最喜歡的人是誰 ?", "最喜歡的食物是什麽 ?", "最喜歡的電影是什麽 ?", "最喜歡的歌曲是什麽 ?"]
                ],
                ["設定", "偏好", "語言"],
                ["客戶端下載", "瓊公網安備*號", "瓊ICP備*號", "微信小程序不支持打開站外鏈接 , 請使用APP或網頁版打開", "下載鏈接已放入剪切板 , 請打開浏覽器複制鏈接進行下載", "默認選這個", "直接下載", "高級選項"]
              ],
              ["此名字已被占用 !", "密碼錯誤 !", "此用戶名不存在 !", "請求失敗 , 請稍候再試", "當日請求次數已達上限 , 請于24小時後重試", "第三方登錄失敗 !", "此三方賬號尚未關聯", "請選擇頭像類目"], {
                "5b792977089e7": "社區",
                "5b792c73178f2": "住宅",
                "5b792cac2b37f": "旅館",
                "5b792cb650749": "沙盒",
                "5b7ab80a2017d": "小黑屋",
                "5b7ab80a201d0": "世界",
                "5b7ab80a201da": "亞洲",
                "5b7ab80a201e5": "非洲",
                "5b7ab80a201f1": "北美洲",
                "5b7ab80a201fc": "南美洲",
                "5b7ab80a20208": "南極洲",
                "5b7ab80a20213": "歐洲",
                "5b7ab80a2021f": "大洋洲",
                "5b7ab80a20276": "角色扮演",
                "5b7ab80a202f4": "薔薇外界",
                "5b7ab80a202fd": "初級迷宮",
                "5b7cda6765b16": "遊戲廳",
                "5ce6a4b520a90": "空間站"
              }
            ],
            [
              ["蔷薇花园", "选择", "确定", "取消", "返回", "上一步", "开始", "登录", "找回", "房间", "请输入内容 . . .", "错误"],
              [
                ["点击任意位置开始", "蔷薇花园", "新的开始", "载入记忆", "设定", "结束旅途"],
                ["新的开始", "性别选择"],
                ["头像", "类目", "换一组", ["男性", "女性", "情侣", "流行", "风景", "卡通", "动漫"]],
                ["开始旅途", "我的人设", "性别", "名字", ["请输入名字"]],
                ["载入记忆", "登录", "用户名", "密码", "忘了", ["第三方登录", "选择第三方平台", "请点击这里 确认", "暂时仅支持 APP 和 电脑 使用此功能 , 请使用 APP 或 电脑 操作", "如果您在此操作中遇到任何问题 , 请使用 APP 或 电脑 进行此操作", "请将您的 APP 升级至最新版本 , 以支持此功能", "您没有安装 *", "您未安装最新版本 * , 请安装或升级至最新版本", "当前正在使用   :   *", ["手机", "平板电脑"],
                    ["使用已登录的账号登入", "使用三方账号快捷登入", "快速创建新的账户"], "小程序中仅允许 微信 授权 , 其他授权请在 APP 或 网页 中操作", ["下载 APP  :  仅安卓设备", "扫描二维码  :  从其他设备扫描", "从微信中打开"], "下载地址已存入您的剪贴板 , 以防您遇到无法下载情况 , 请直接打开浏览器粘贴下载地址下载", "载入存档", "选择文件", ["存档文件已损坏 !", "请将页面升级至最新 , 解析本存档文件 !", "此操作将会覆盖当前所有数据 !!!"], "您确定要 * 吗 ?", "导入"
                  ],
                  ["请输入用户名", "请输入密码"],
                  ["QQ", "微信", "谷歌"]
                ],
                ["忘记用户名", "找回用户名", "邮箱", ["请输入邮箱地址", "邮箱格式错误 !", "抱歉 , 没有找到这个邮箱地址"]],
                ["忘记密码", "找回密码", "安全问题", "安全答案", ["请输入用户名", "请选择一个安全问题", "请输入安全答案", "这个用户名不存在", "安全问题或安全答案错误 !"],
                  ["请选择一个安全问题", "最喜欢的人是谁 ?", "最喜欢的食物是什么 ?", "最喜欢的电影是什么 ?", "最喜欢的歌曲是什么 ?"]
                ],
                ["设定", "偏好", "语言"],
                ["客户端下载", "琼公网安备*号", "琼ICP备*号", "微信小程序不支持打开站外链接 , 请使用APP或网页版打开", "下载链接已放入剪切板 , 请打开浏览器复制链接进行下载", "默认选这个", "直接下载", "高级选项"]
              ],
              ["此名字已被占用 !", "密码错误 !", "此用户名不存在 !", "请求失败 , 请稍候再试", "当日请求次数已达上限 , 请于24小时后重试", "第三方登录失败 !", "此三方账号尚未关联", "请选择头像类目"], {
                "5b792977089e7": "社区",
                "5b792c73178f2": "住宅",
                "5b792cac2b37f": "旅馆",
                "5b792cb650749": "沙盒",
                "5b7ab80a2017d": "小黑屋",
                "5b7ab80a201d0": "世界",
                "5b7ab80a201da": "亚洲",
                "5b7ab80a201e5": "非洲",
                "5b7ab80a201f1": "北美洲",
                "5b7ab80a201fc": "南美洲",
                "5b7ab80a20208": "南极洲",
                "5b7ab80a20213": "欧洲",
                "5b7ab80a2021f": "大洋洲",
                "5b7ab80a20276": "角色扮演",
                "5b7ab80a202f4": "蔷薇外界",
                "5b7ab80a202fd": "初級迷宮",
                "5b7cda6765b16": "游戏厅",
                "5ce6a4b520a90": "空间站"
              }
            ],
            [
              ["IIROSE", "선택", "확인", "취소", "이전", "이전 단계로 돌아가기", "시작", "로그인", "뒤로", "방", "이름을 입력하세요 . . .", "오류"],
              [
                ["시작하려면 아무데나 클릭하세요", "장미정원", "새 게임", "게임 불러오기", "설정", "게임 종료"],
                ["새 게임", "성별 선택"],
                ["아이콘", "분류", "다른 그룹", ["남자", "여자", "배우자", "인기 있는", "풍경", "만화", "애니메이션"]],
                ["게임 시작", "새로운 시작", "성별", "이름", ["이름을 입력하세요"]],
                ["게임 불러오기", "로그인", "유저 이름", "패스워드", "잊어버렸어요", ["Third Party Login", "Choose Third Party Platform", "Please click here to Confirm", "This function is temporarily only available for APP and Computer , please use the APP or Computer", "If you encounter any issues in the operation , please use the APP or Computer", "Please upgrade the APP to the latest version to access this function", "You have not yet installed *", "You have not installed the latest version * , please install or upgrade", "Currently using   :   *", ["Mobile", "Tablet"],
                    ["Logging In From A Logged On Account", "Logging In From A Third Party Account", "Create A New Account Quickly"], "Only wechat authorization is allowed in the mini program , please operate in APP or Web Page for other authorization", ["Download APP  :  Android devices only", "Scan the QR code  :  Scanning from other devices", "Open from WeChat"], "Download address has been saved in your clipboard , just in case you are unable to download , please directly open the browser and paste the download address", "Load Archive", "Select A File", ["Archive file is corrupted !", "Please update the page to the latest , to resolve this archive file !", "This operation will overwrite all current data !!!"], "Are you sure to * ?", "Import"
                  ],
                  ["유저 이름을 입력해주세요", "패스워드를 입력해주세요"],
                  ["QQ", "WeChat", "Google"]
                ],
                ["유저 이름 찾기", "유저 이름 재생성", "이메일", ["이메일 주소를 입력해주세요", "이메일 주소 형식 오류", "죄송합니다 이 메일주소를 찾을 수 없습니다"]],
                ["패스워드 찾기", "패스워드 재생성", "보안 질문", "보안 답변", ["아이디 입력해주세요", "질문을 선택해주세요", "답변을 입력해주세요", "이 유저이름은 존재하지 않습니다", "질문 또는 답변이 일치하지 않습니다 !"],
                  ["질문을 선택하세요", "내가 가장 좋아하는 사람은 ?", "내가 가장 좋아하는 음식은 ?", "내가 가장 좋아하는 영화는 ?", "내가 가장 좋아하는 음악은 ?"]
                ],
                ["설정", "선호", "언어"],
                ["Download Client", "Public Network Security - *", "ICP - *", "WeChat mini program does not support opening off-site links , please use APP or web version to open", "The download link has been placed in the clipboard , please open your browser to copy the link to download", "Select this by default", "Download", "Advanced Options"]
              ],
              ["이 이름은 이미 존재합니다 !", "비밀번호가 맞지 않습니다 !", "이 유저이름은 존재하지 않습니다 !", "요청 실패", "잠시후 다시 시도해주세요", "Maximum no. of requests today has been reached , please try 24 hours later", "Third party login failed !", "This Account is not connected", "Please select a Profile Picture category"], {
                "5b792977089e7": "커뮤니티",
                "5b792c73178f2": "주택",
                "5b792cac2b37f": "호텔",
                "5b792cb650749": "모래상자",
                "5b7ab80a2017d": "어두운 방",
                "5b7ab80a201d0": "세계",
                "5b7ab80a201da": "아시아",
                "5b7ab80a201e5": "아프리카",
                "5b7ab80a201f1": "북아메리카",
                "5b7ab80a201fc": "남아메리카",
                "5b7ab80a20208": "남극",
                "5b7ab80a20213": "유럽",
                "5b7ab80a2021f": "오세아니아",
                "5b7ab80a20276": "역할극",
                "5b7ab80a202f4": "밖으로 가든",
                "5b7ab80a202fd": "초급 길",
                "5b7cda6765b16": "게임방",
                "5ce6a4b520a90": "우주 정거장"
              }
            ],
            [
              ["IIROSE", "Choisir", "Confirmer", "Annuler", "Retour", "Précédent", "Commencer", "Connexion", "Retourner", "Room", "Entrer quelque chose . . .", "Erreur"],
              [
                ["CLIQUER N'IMPORTE OÙ POUR COMMENCER", "ROSE GARDEN", "Nouvelle Partie", "Charger", "Config", "Quitter"],
                ["Nouvelle Partie", "Choisir le genre"],
                ["Icône", "Catégorie", "Un autre groupe", ["Hommes", "Femmes", "Couple", "Populaire", "Décors", "Cartoon", "Animation"]],
                ["Commencer Partie", "Un nouveau début", "Genre", "Nom", ["SVP entrer le nom"]],
                ["Charger Partie", "Connexion", "Nom d'utilisateur", "Mot de passe", "Oubli", ["Third Party Login", "Choose Third Party Platform", "Please click here to Confirm", "This function is temporarily only available for APP and Computer , please use the APP or Computer", "If you encounter any issues in the operation , please use the APP or Computer", "Please upgrade the APP to the latest version to access this function", "You have not yet installed *", "You have not installed the latest version * , please install or upgrade", "Currently using   :   *", ["Mobile", "Tablet"],
                    ["Logging In From A Logged On Account", "Logging In From A Third Party Account", "Create A New Account Quickly"], "Only wechat authorization is allowed in the mini program , please operate in APP or Web Page for other authorization", ["Download APP  :  Android devices only", "Scan the QR code  :  Scanning from other devices", "Open from WeChat"], "Download address has been saved in your clipboard , just in case you are unable to download , please directly open the browser and paste the download address", "Load Archive", "Select A File", ["Archive file is corrupted !", "Please update the page to the latest , to resolve this archive file !", "This operation will overwrite all current data !!!"], "Are you sure to * ?", "Import"
                  ],
                  ["SVP entrer le nom d'utilisateur", "SVP entrer le mot de passe"],
                  ["QQ", "WeChat", "Google"]
                ],
                ["Ouli nom d'utilisateur", "Récupérer nom d'utilisateur", "Courriel", ["SVP entrer le courriel", "Erreur format adresse courriel", "Désolé courriel introuvable"]],
                ["Oubli Mot de passe Password", "Récupérer mot de passe", "Question de sécurité", "Réponse à la question", ["SVP entrer le nom d'utilisateur", "SVP choisir une question de sécurité", "Entrer la réponse de sécurité", "Ce nom d'utilisateur n'existe pas", "La question ou la réponse de sécurité ne concordent pas !"],
                  ["Choisir une question de sécurité", "Quelle est votre personne préférée ?", "Quel est votre plat préféré ?", "Quel est votre film préférée ?", "Quelle est votre chanson préférée ?"]
                ],
                ["Config", "Preférence", "Langue"],
                ["Download Client", "Public Network Security - *", "ICP - *", "WeChat mini program does not support opening off-site links , please use APP or web version to open", "The download link has been placed in the clipboard , please open your browser to copy the link to download", "Select this by default", "Download", "Advanced Options"]
              ],
              ["Ce nom est déjà utilisé !", "Mot de passe incorrect !", "Le nom d'utilisateur n'existe pas !", "Request failed , please try again later", "Maximum no. of requests today has been reached , please try 24 hours later", "Third party login failed !", "This Account is not connected", "Please select a Profile Picture category"], {
                "5b792977089e7": "Communauté",
                "5b792c73178f2": "Résidence",
                "5b792cac2b37f": "Hôtel",
                "5b792cb650749": "Bac À Sable",
                "5b7ab80a2017d": "Cachot",
                "5b7ab80a201d0": "Monde",
                "5b7ab80a201da": "Asie",
                "5b7ab80a201e5": "Afrique",
                "5b7ab80a201f1": "Amérique du nord",
                "5b7ab80a201fc": "Amérique du sud",
                "5b7ab80a20208": "Antarctique",
                "5b7ab80a20213": "Europe",
                "5b7ab80a2021f": "Océanie",
                "5b7ab80a20276": "Role play",
                "5b7ab80a202f4": "Sortie Côté Jardin",
                "5b7ab80a202fd": "Labyrinthe De Primaire",
                "5b7cda6765b16": "Salle de jeu",
                "5ce6a4b520a90": "Station Spatiale"
              }
            ]
          ][languageType];
          var e, a = Assets.roomJson = {
            "5b792977089e7": ["32,32,32", "000", "s://i.loli.net/2018/08/20/5b7ac47c95aa3.jpg 为您提供各类系统服务"],
            "5b792c73178f2": ["32,32,32", "000", "s://i.loli.net/2018/08/20/5b7ac19bb8471.jpg 用户的住宅"],
            "5b792cac2b37f": ["32,32,32", "000", "s://i.loli.net/2018/04/14/5ad11a3611c79.jpg 每个在你房间里的人，每小时为你带来1钞的收入"],
            "5b792cb650749": ["32,32,32", "000", "s://i.loli.net/2018/10/11/5bbefcbc55d40.jpg 每个在你房间里的人，每小时为你带来0.5钞的收入"],
            "5b7ab80a2017d": ["37,45,62", "200", "s://i.loli.net/2018/09/12/5b989c5539d14.jpg "],
            "5b7ab80a201d0": ["48,48,48", "000", "://hdwallpapersrocks.com/wp-content/uploads/2013/12/World-wonders-beautiful-new-photographs.jpg "],
            "5b7ab80a201da": ["239,193,146", "000", "://f.thuongtruong.com.vn/2018/01/thuong_truong_du_bao_thoi_tiet_ha_noi_123-09_40_44_167.jpg "],
            "5b7ab80a201e5": ["64,64,64", "000", "://bozhuwallpaper.com/img/africa-sunset-image-As-Wallpaper-HD.jpg "],
            "5b7ab80a201f1": ["253,117,117", "000", "s://images.wallpapersden.com/image/download/toronto-scenic-art_61793_2048x1152.jpg "],
            "5b7ab80a201fc": ["239,116,167", "000", "://d30i07b9wlivv4.cloudfront.net/uploads/2017/07/24004434/pablo-garcia-saldana-33114-e1500857126100.jpg "],
            "5b7ab80a20208": ["239,239,239", "000", " "],
            "5b7ab80a20213": ["125,186,239", "000", "://awallpapersimages.com/wp-content/uploads/2016/09/Germany-photos.jpg "],
            "5b7ab80a2021f": ["69,90,162", "000", "s://www.pixelstalk.net/wp-content/uploads/2016/06/Ocean-Underwater-Wallpaper-HD-Free-Download.jpg "],
            "5b7ab80a20276": ["48,48,48", "101", "s://i.pinimg.com/originals/97/cb/2b/97cb2b1a0ac3fa2f03881a6ea74e1d56.jpg "],
            "5b7ab80a202f4": ["48,48,48", "110", "s://i.loli.net/2017/10/05/59d5f25554eb6.jpg 花园的出口,即将进入满是怪物的世界.准备好装备和道具探险了吗 !"],
            "5b7ab80a202fd": ["196,247,120", "100", "s://i.loli.net/2017/09/27/59ca9ad4e453a.jpg 1-10级怪物限定"],
            "5b7cda6765b16": ["146,172,255", "100", "s://i.loli.net/2018/09/09/5b95437f5cf16.jpg "],
            "5ce6a4b520a90": ["48,48,48", "000", "://r.iirose.com/i/22/5/12/8/5051-G5.jpg 空降中心"],
            "5b7ab80a2022b": ["한국", "255,209,162", "000", "s://78.media.tumblr.com/0f48729cd827c06a886a7f97ce6c15d1/tumblr_p6wh25arLV1uvyt26o3_1280.jpg "],
            "5b7ab80a20237": ["日本", "255,209,162", "000", "s://wallpapercave.com/wp/4nGlGOr.jpg "],
            "5b7ab80a202ac": ["花园之门", "255,209,162", "000", "s://i.loli.net/2018/04/11/5accff450a59f.jpg 欢迎来到蔷薇花园 !"],
            "5b7ab80a20251": ["U.S.A", "247,142,142", "000", "://static.hdw.eweb4.com/media/wallpapers_1920x1200/world/1/1/manhattan-bridge-world-hd-wallpaper-1920x1200-3563.jpg Welcome to IIROSE !"],
            "5b7ab80a2026a": ["Brasil", "255,132,183", "000", "://www2.ppdesk.com/file/20100120/desk/2009/10/28/Windows7_feng_21_1920x1200.jpg "],
            "5b7ab80a20244": ["Россия", "141,202,255", "000", "://www.prontotour.com/Content/images/Tour/Orj/rusya_turlari_moskova_stpetersburg_23_407_0013.jpg "],
            "5b7ab80a2025d": ["Britain", "141,202,255", "000", "://7wallpapers.net/wp-content/uploads/18_London.jpg "],
            "5b7ab80a202b9": ["France", "141,202,255", "000", "://getwallpapers.com/wallpaper/full/9/3/f/994023-paris-france-wallpaper-2539x1733-for-iphone-7.jpg "]
          };
          for (e in a) a[e].push("IIROSE");
          for (e in languageArr[3]) a[e].unshift(languageArr[3][e]);
          parent.document.title = languageArr[0][0], 3 != languageType ? (Objs.gameHolder.gameStartClick.html(languageArr[1][0][0]), Objs.gameHolder.gameLogo.children("div:last").html(languageArr[1][0][1] + (betaWorld ? " BETA" : "")), Objs.gameHolder.gameMenuSelectionItemArr.each(function(e, a) {
            a.firstChild.innerHTML = languageArr[1][0][e + 2]
          }), Objs.gameHolder.gameShowHint.children("div").each(function(e, a) {
            a.lastChild.innerHTML = languageArr[0][e + 1]
          }), 1 != languageType && 5 != languageType || Objs.gameHolder.gameLogo.children("div:last").css("letterSpacing", "12px")) : betaWorld && Objs.gameHolder.gameLogo.children("div:last").html(languageArr[1][0][1] + " BETA");
          var t, o = sessionStorage.getItem("partner");
          if (o) {
            switch (o) {
              case "1txy":
                var r = sessionStorage.getItem("partnerData");
                r && (t = r.split(">")[3]);
                break;
              case "mxz":
                t = "萌小助";
                break;
              case "sumall":
                t = "苏MALL 登录授权";
                break;
              case "sumallPay":
                t = "苏MALL 支付授权"
            }
            t && Objs.gameHolder.gameLogo.children("div:last").html(languageArr[1][0][1] + " / " + t).css("letterSpacing", "8px")
          }
          Objs.gameHolder.gameCopyright.append('<div style="margin-top:4.5px;">' + (2 == languageType || 3 == languageType ? '<a class="pointer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=46010502000285" target="_blank" style="opacity:.7;font-size:13px;color:inherit;vertical-align:top;"' + (9 == device ? ' onclick="_alert(languageArr[1][8][3]);event.preventDefault();"' : isPcApp ? ' onclick="event.preventDefault();Main.openUrl(this.href);"' : "") + '><img decoding="async" ' + (supportLazyLoad ? 'loading="lazy" ' : 'class="lazyload" data-') + 'src="' + static + 'images/page/i/beian.png" style="vertical-align:top;height:18px;margin-right:6px;">' + languageArr[1][8][1].replace("*", "46010502000285") + '</a><span style="opacity:.7;font-size:13px;color:inherit;margin:0 12px;vertical-align:top;">|</span><a class="pointer" href="https://beian.miit.gov.cn/" target="_blank" style="opacity:.7;font-size:13px;color:inherit;vertical-align:top;"' + (9 == device ? ' onclick="_alert(languageArr[1][8][3]);event.preventDefault();"' : isPcApp ? ' onclick="event.preventDefault();Main.openUrl(this.href);"' : "") + ">" + languageArr[1][8][2].replace("*", "19001147") + '-1</a><span style="opacity:.7;font-size:13px;color:inherit;margin:0 12px;vertical-align:top;">|</span>' : "") + '<a class="pointer" href="app.html" target="_blank" style="opacity:.7;font-size:13px;color:inherit;vertical-align:top;"' + (9 == device ? ' onclick="_alert(languageArr[1][8][3]);event.preventDefault();"' : isPcApp ? ' onclick="event.preventDefault();Main.openUrl(this.href);"' : "") + ">" + languageArr[1][8][0] + "</a></div>")
        },
        initialize: function() {
          isMobile && (Utils.inputFocusScroll = function(e, a, t) {
            e.click(function(e) {
              parent.mainFrame.softKeyboard || (this.scaleN = t && -1 < (t[0].style.transform || "").indexOf("scale(") ? (t[0].style.transform || "").split("scale(")[1].split(")")[0] : 1, this.eventClientY = e.clientY - e.offsetY * this.scaleN, parent.onresize())
            })[0].offsetN = a
          }), (Info.roomsave = Cookie("roomsave")) ? Assets.roomJson.hasOwnProperty(Info.roomsave) || ((e = Assets.roomJson[Info.roomsave] = [])[0] = Cookie("roomname"), e[1] = Cookie("roomcolor"), e[2] = Cookie("roomattr"), e[3] = Cookie("roominfo"), e[4] = Cookie("roomowner")) : Info.roomsave = "5ce6a4b520a90";
          var e, a, t = Assets.select["1_0"];
          for (a in Assets.roomJson) t.push([a, Assets.roomJson[a][0]]);
          (Info.member.password = Cookie("password")) ? Info.member.username = Cookie("username"): Info.guest.username2 = Info.guest.username = Cookie("username"), Assets.select[4] = [
            ["0", languageArr[1][4][7][0], Mod.template(23, "qqchat")],
            ["1", languageArr[1][4][7][1], Mod.template(23, "wechat")],
            ["2", languageArr[1][4][7][2], Mod.template(23, "google")]
          ], Assets.select[5] = [
            ["0", languageArr[1][4][5][10][2], Mod.template(23, "account-plus")],
            ["1", languageArr[1][4][5][10][1], Mod.template(23, "account-supervisor-circle")]
          ], !Info.member.password && (Variable.socialAccToken = localStorage.getItem("socialAccToken")) && (Info.socialAcc.icon = Info.guest.icon = Cookie("avatar"), Info.socialAcc.sex = Info.guest.sex = 2 == Cookie("sex") ? 1 : 0, Utils.service.socialAccPut(Info.socialAcc.username = Info.guest.username), Probe.socialAccUseNameColor = 1, Info.guest.username2 = "")
        },
        cursorFirstShow: function(e) {
          if (isMobile) {
            styleSheetsobj[0].style.cursor = "url(images/cursor/" + theme + "1.cur),auto";
            for (var a = 0; a < 3; ++a) styleSheetsobj[1 + a].style.cursor = "url(images/cursor/" + theme + "3.cur),text"
          } else Utils.service.cursorSH(1, 1), document.addEventListener("mousemove", objTmp = function() {
            Probe.cursorSHLock || Probe.isCursorMoved || (Probe.isCursorMoved = 1, Probe.isCursorShowed) || Utils.service.cursorSH(1)
          }), document.addEventListener("mousedown", objTmp)
        },
        picMainColor: function() {
          Utils.getScript("lib/js/app/server/picMainColor.js")
        }
      };

    function panelAnimate(e, a, t, o, r, s, n, i) {
      switch (e) {
        case 0:
          var l = "gameHolder";
          Objs[l].This.stop().fadeIn(speed500, function() {
            Objs[l].gameLogo.css({
              opacity: "",
              transform: ""
            }), setTimeout(function() {
              Utils.img(Objs[l].gameShow, static + "images/page/i/bg.jpg").css("opacity", "")
            }, o ? 0 : .8 * speed1000), setTimeout(function() {
              Objs[l].gameCopyright.css("opacity", "")
            }, o ? 0 : 1.6 * speed1000), setTimeout(function() {
              var e = setInterval(function() {
                Objs[l].gameStartClick.css("opacity", 0 != Objs[l].gameStartClick.css("opacity") ? 0 : 1)
              }, speed1000 || 100);
              setTimeout(function() {
                Init.cursorFirstShow(), Objs[l].gameMenu[0].className = "pointer", Objs[l].gameMenu[0].onclick = function() {
                  isMobile && !mobileFullScreen || parent.inFullScreen || (isMobile ? document.onclick() : document.ondblclick({
                    target: document.body
                  })), clearInterval(e), Objs[l].gameStartClick.css({
                    transform: "scale(0)",
                    transition: "transform " + speed500s
                  }).stop().fadeOut(speed500), Objs[l].gameMenuSelection.css({
                    visibility: "",
                    opacity: 1,
                    transform: ""
                  }), setTimeout(function() {
                    Objs[l].gameShowHint.css("opacity", "")
                  }, o ? 0 : speed500), Objs[l].gameLogo.css("transition", "transform " + speed500s + ",opacity " + speed500s), loginError || Utils.Sound.play(2), Objs[l].gameMenu[0].className = "", Objs[l].gameMenu[0].onclick = null, 9 != device && 8 != device || void 0 !== Info.guest.username || void 0 !== Info.member.username || o || (Probe.socialAccDirectLogin = "1", Objs[l].function.guestMenu(null, "1"), Probe.socialAccDirectLogin = 0)
                }, o && (Objs[l].gameMenu[0].click(), panelAnimate(50))
              }, o ? 0 : speed1000)
            }, o ? 0 : 1.1 * speed1000)
          });
          break;
        case 2:
          c = a ? function() {
            Objs.gameNewSexHolder.This.stop().fadeIn(speed500, t), Objs.gameNewSexHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameNewSexHolder.role.css({
              opacity: 1,
              transform: ""
            }), Objs.gameNewSexHolder.role2.css({
              opacity: 1,
              transform: ""
            })
          } : (Objs.gameNewSexHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameNewSexHolder.role.css({
            opacity: 0,
            transform: "translateX(-100px)"
          }), Objs.gameNewSexHolder.role2.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameNewSexHolder.This.stop().fadeOut(speed500, t), function() {
            panelAnimate(50, 1)
          }), Probe.loginError ? c() : setTimeout(c, speed500), Utils.Sound.play(a ? 4 : 5);
          break;
        case 3:
          a ? (c = function() {
            Objs.gameLoadHolder.This.stop().fadeIn(speed500, t), Objs.gameLoadHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameLoadHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, Probe.loginError || Probe.socialAccRestore ? (Probe.loginError = 0, c()) : setTimeout(c, speed500)) : (Objs.gameLoadHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameLoadHolder.role.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameLoadHolder.This.stop().fadeOut(speed500, t), setTimeout(function() {
            panelAnimate(50, 1)
          }, speed500)), Utils.Sound.play(a ? 4 : 5);
          break;
        case 4:
          a ? setTimeout(function() {
            Objs.gameSetHolder.This.stop().fadeIn(speed500, t), Objs.gameSetHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameSetHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, speed500) : (Objs.gameSetHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameSetHolder.role.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameSetHolder.This.stop().fadeOut(speed500, t), setTimeout(function() {
            panelAnimate(50, 1)
          }, speed500)), Utils.Sound.play(a ? 4 : 5);
          break;
        case 5:
          c = a ? function() {
            Objs.gameNewIconHolder.This.stop().fadeIn(speed500, t), Objs.gameNewIconHolder.paper.css({
              opacity: 1,
              transform: ""
            })
          } : (Objs.gameNewIconHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameNewIconHolder.This.stop().fadeOut(speed500, t), function() {
            panelAnimate(1e3, 1)
          }), Probe.loginError ? c() : setTimeout(c, speed500), Utils.Sound.play(a ? 4 : 5);
          break;
        case 6:
          var c;
          c = a ? function() {
            Objs.gameNewNameHolder.This.stop().fadeIn(speed500, t), Objs.gameNewNameHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameNewNameHolder.role.css({
              opacity: 1,
              transform: ""
            })
          } : (Objs.gameNewNameHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameNewNameHolder.role.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameNewNameHolder.This.stop().fadeOut(speed500, t), Objs.gameNewNameHolder.paletteHolder && "none" != Objs.gameNewNameHolder.paletteHolder.css("display") && panelAnimate(9), function() {
            Variable.socialAccToken ? Probe.socialAccGuestSexSelect ? panelAnimate(1e3, 1) : panelAnimate(50, 1) : (Objs.gameNewIconHolder.This.stop().fadeIn(speed500), Objs.gameNewIconHolder.paper.css({
              opacity: 1,
              transform: ""
            }))
          }), Probe.loginError ? (Probe.loginError = 0, c()) : setTimeout(c, speed500), Utils.Sound.play(a ? 4 : 5);
          break;
        case 7:
          a ? setTimeout(function() {
            Objs.gameForgotNameHolder.This.stop().fadeIn(speed500, t), Objs.gameForgotNameHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameForgotNameHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, speed500) : (Objs.gameForgotNameHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameForgotNameHolder.role.css({
            opacity: 0,
            transform: "translateX(-100px)"
          }), Objs.gameForgotNameHolder.This.stop().fadeOut(speed500, t), setTimeout(function() {
            Objs.gameLoadHolder.This.stop().fadeIn(speed500), Objs.gameLoadHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameLoadHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, speed500)), Utils.Sound.play(a ? 4 : 5);
          break;
        case 8:
          a ? (Objs.gameForgotPasswordHolder.nameInput.val(Objs.gameLoadHolder.nameInput.val()), setTimeout(function() {
            Objs.gameForgotPasswordHolder.This.stop().fadeIn(speed500, t), Objs.gameForgotPasswordHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameForgotPasswordHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, speed500)) : (Objs.gameForgotPasswordHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameForgotPasswordHolder.role.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameForgotPasswordHolder.This.stop().fadeOut(speed500, t), setTimeout(function() {
            Objs.gameLoadHolder.This.stop().fadeIn(speed500), Objs.gameLoadHolder.paper.css({
              opacity: 1,
              transform: ""
            }), Objs.gameLoadHolder.role.css({
              opacity: 1,
              transform: ""
            })
          }, speed500)), Utils.Sound.play(a ? 4 : 5);
          break;
        case 9:
          panelAnimate(55, a, t, Objs.gameNewNameHolder.paletteHolder);
          break;
        case 18:
          n = o.outerWidth() * (void 0 === a ? Number(o.attr("index")) > Number(r.attr("index")) ? -1 : 1 : a ? 1 : -1), Probe.switchPanelNoAnimate ? (o.stop().css({
            left: -1 * n,
            display: "none"
          }), r.stop().css({
            left: 0,
            display: ""
          }), t && t()) : (o.stop().animate({
            left: -1 * n
          }, speed500, function() {
            o.css("display", "none")
          }), r.css({
            left: n,
            display: ""
          }).stop().animate({
            left: 0
          }, speed500, t), Utils.Sound.play(8));
          break;
        case 24:
          a ? (Objs.syncHolder[o].css("display", ""), Objs.syncHolder.This.stop().fadeIn(speed250), Objs.syncHolder[o].css("transform", "")) : (Objs.syncHolder[o].css("transform", "scale(0.8)"), Objs.syncHolder.This.stop().fadeOut(speed250, function() {
            Objs.syncHolder[o].css("display", "none"), Objs.syncHolder.taskArr.length && Utils.sync.apply(Utils, Objs.syncHolder.taskArr.shift())
          }));
          break;
        case 50:
          a ? (Objs.gameHolder.This.stop().fadeIn(speed500), Objs.gameHolder.gameLogo.css({
            opacity: 1,
            transform: ""
          }), Objs.gameHolder.gameMenuSelection.css({
            opacity: 1,
            transform: ""
          })) : (Objs.gameHolder.gameMenuSelection.css({
            opacity: 0,
            transform: "translateY(12px)"
          }), Objs.gameHolder.gameLogo.css({
            opacity: 0,
            transform: "translateY(-12px)"
          }), Objs.gameHolder.This.stop().fadeOut(speed500));
          break;
        case 55:
          a ? o.css("transform", "translateX(-10%)").stop().fadeIn(speed500, t).css("transform", "") : o.stop().fadeOut(speed500, t).css("transform", "translateX(10%)"), Utils.Sound.play(a ? 6 : 7);
          break;
        case 1e3:
          a ? (Objs.gameNewSexHolder.This.stop().fadeIn(speed500), Objs.gameNewSexHolder.paper.css({
            opacity: 1,
            transform: ""
          }), Objs.gameNewSexHolder.role.css({
            opacity: 1,
            transform: ""
          }), Objs.gameNewSexHolder.role2.css({
            opacity: 1,
            transform: ""
          })) : (Objs.gameNewSexHolder.paper.css({
            opacity: 0,
            transform: "translateY(100px)"
          }), Objs.gameNewSexHolder.role.css({
            opacity: 0,
            transform: "translateX(-100px)"
          }), Objs.gameNewSexHolder.role2.css({
            opacity: 0,
            transform: "translateX(100px)"
          }), Objs.gameNewSexHolder.This.stop().fadeOut(speed500)), Utils.Sound.play(a ? 4 : 5)
      }
    }

    function _alert(e) {
      Objs.alertHolder || (Objs.selectHolder.This.after('<div id="alertHolder" style="position:absolute;z-index:9999999;bottom:76px;left:0;height:0;width:100%;user-select:text;-webkit-user-select:text;justify-content:flex-end;align-items:center;flex-direction:column;padding:0 24px;box-sizing:border-box;display:none;"></div>'), Objs.alertHolder = {
        This: $("#alertHolder")
      });
      var a = Objs.alertHolder,
        t = ("none" == a.This.css("display") && a.This.css("display", "flex"), "background:#" + (theme ? "fff" : "202020") + ";color:rgba(" + (theme ? "0,0,0" : "255,255,255") + ",0.54);box-shadow:0 0 1px rgba(0,0,0,0.12),0 1px 1px rgba(0,0,0,0.24);white-space:pre-wrap;text-align:left;line-height:23px;transition:transform " + speed250s + ";transform:scale(0.8);width:max-content;box-sizing:border-box;overflow:hidden;font-size:17px !important;position:relative;flex-shrink:0;margin-top:12px;opacity:0;"),
        o = a.This.append('<div style="' + t + "font-weight:bold;padding:24px;max-width:" + (browserWidth - 48) + 'px;">' + htmlspecialchars(e) + "</div>").children("div:last");
      o.animate({
        opacity: 1
      }, speed250, function() {
        setTimeout(function() {
          o.fadeOut(speed250, function() {
            o.remove(), a.This[0].firstChild || a.This.css("display", "none")
          }).css("transform", "scale(0.8)")
        }, 4e3 + speed500)
      }).css("transform", "")
    }
  }
}