function htmlUnescape(e) {
    return String(e).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
}

function ajaxCall(e, n, t) {
    var o = !1,
        i = !1;
    return window.XMLHttpRequest && (o = new XMLHttpRequest, "withCredentials" in o && (i = !0)), o ? (o.onreadystatechange = function() {
        t && 4 == this.readyState && 200 == this.status && t(this.responseText)
    }, n ? (o.open("POST", e, !0), o.setRequestHeader && o.setRequestHeader("Content-type", "text/plain")) : o.open("GET", e, !0), i && (o.withCredentials = !0), void(n ? o.send(JSON.stringify(n)) : o.send(null))) : !1
}

function insertContent(e, n, t) {
    _TConnecto.messageContentInserted[t.id] || (e.contentWindow.document.open("text/html", "replace"), e.contentWindow.document.write(n), e.contentWindow.document.close(), _TConnecto.messageContentInserted[t.id] = !0)
}

function _getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
}

function _getWindowYscroll() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
}

function _getDocHeight() {
    return Math.max(document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0, document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0, document.documentElement.clientHeight || 0)
}

function getScrollPercentage() {
    return (_getWindowYscroll() + _getWindowHeight()) / _getDocHeight() * 100
}

function isScrollable() {
    return _getDocHeight() > _getWindowHeight()
}

function toggleOnEnterExit(e) {
    e.notification.exitIntent.toggleOnEnterExitVar && (document.getElementsByTagName("html")[0].addEventListener("mouseenter", function() {
        document.getElementById("connecto-modal-overlay-" + e.id).style.display = "none", document.getElementById("connecto_" + e.id + "_bg_element").style.display = "none"
    }), document.getElementsByTagName("html")[0].addEventListener("mouseleave", function() {
        document.getElementById("connecto-modal-overlay-" + e.id).style.display = "block", document.getElementById("connecto_" + e.id + "_bg_element").style.display = "block"
    }))
}

function showContent(e, n, t, o, i) {
    if (o > 0 && isScrollable()) window.addEventListener("scroll", function() {
        getScrollPercentage() > o ? _TConnecto.messageContentInserted[i.id] && i.notification.hideOnScrollUp ? 0 == _getWindowYscroll() ? document.getElementById("container-notification-frame-" + i.id).contentWindow.hideIfShown() : document.getElementById("container-notification-frame-" + i.id).contentWindow.showIfHidden() : insertContent(e, n, i) : _TConnecto.messageContentInserted[i.id] && i.notification.hideOnScrollUp && document.getElementById("container-notification-frame-" + i.id).contentWindow.hideIfShown()
    }, !1);
    else if (i.notification.exitIntent && i.notification.exitIntent.showExitIntent) i.notification.dontShowAfter && i.notification.dontShowAfter > 0 && _TConnecto.timeouts.push(setTimeout(function() {
        _TConnecto.idToExitIntentObjMap[i.id] && _TConnecto.idToExitIntentObjMap[i.id].disable && _TConnecto.idToExitIntentObjMap[i.id].disable()
    }, 1e3 * i.notification.dontShowAfter)), _TConnecto.timeouts.push(setTimeout(function() {
        var t = exitIntentLib(document.getElementById("container-notification-frame-" + i.id), {
            agressive: i.notification.exitIntent.useAgressiveMode || !1,
            sensitivity: i.notification.exitIntent.sensitivity || 65,
            cookieExpire: i.notification.exitIntent.cookieExpire || 0,
            timer: i.notification.exitIntent.timer || 0,
            cookieDomain: i.notification.exitIntent.cookieDomain || "",
            id: i.id,
            callback: function() {
                insertContent(e, n, i), toggleOnEnterExit(i)
            }
        });
        _TConnecto.idToExitIntentObjMap[i.id] = t
    }, t));
    else if (i.notification.notificationOriginSelector) {
        var c = i.notification.notificationOriginSelector.split(",");
        for (var s in c)
            for (var a = document.querySelectorAll(c[s].trim()) || [], r = 0; r < a.length; r++) a[r].addEventListener(i.notification.notificationOriginEvent, function() {
                insertContent(e, n, i)
            })
    } else _TConnecto.timeouts.push(setTimeout(function() {
        insertContent(e, n, i)
    }, t))
}

function _loadScript(e, n) {
    var t = document.createElement("script");
    t.type = "text/javascript", t.readyState ? t.onreadystatechange = function() {
        ("loaded" == t.readyState || "complete" == t.readyState) && (t.onreadystatechange = null, n && n())
    } : t.onload = function() {
        n && n()
    }, t.src = e, document.getElementsByTagName("head")[0].appendChild(t)
}

function _processConnectoMessages() {
    if (_TConnecto.messages)
        for (var e = 0; e < _TConnecto.messages.length; e++) {
            var n = _TConnecto.messages[e];
            if (!_TConnecto.messageProcessed[n.id] && !_TConnecto.messageContentInserted[n.id] && (!n.notification.hasDynamicContent || _TConnecto.Mustache) && (_TConnecto.pageLoaded || 12 !== n.notification.notification_type) && (_TConnecto.pageLoaded && _TConnecto.Sizzle || !n.notification.clientSideVariableMatches || !(n.notification.clientSideVariableMatches.length > 0))) {
                var t = htmlUnescape(n.snippet);
                if (_TConnecto.messageMap[n.id] = n, _TConnecto.messageProcessed[n.id] = !0, !(n.notification.clientSideVariableMatches && n.notification.clientSideVariableMatches.length > 0) || _TConnecto.matchClientSideVariables(n.notification.clientSideVariableMatches)) {
                    var o;
                    if (12 === n.notification.notification_type) _TConnecto.embedElements[n.notification.embeddedSlot] ? (o = _TConnecto.embedElements[n.notification.embeddedSlot], o.innerHTML = t) : _TConnecto.messageContentInserted[n.id] = !0;
                    else if (o = document.createElement("div"), o.setAttribute("id", "connecto_" + n.id), o.innerHTML = t, document.body) document.body.insertBefore(o, null);
                    else {
                        var i = document.getElementsByTagName("script")[0];
                        i.parentNode.insertBefore(o, i)
                    }
                    if (5 !== n.notification.closeBehaviour) {
                        var c = document.getElementById("container-notification-frame-" + n.id),
                            s = htmlUnescape(n.innerHTML);
                        n.notification.hasDynamicContent && (s = _TConnecto.Mustache.render(s, _TConnecto.getVariables())), showContent(c, s, n.delay, n.scroll, n)
                    }
                }
            }
        }
}

function __co_loadMustache() {
    var e;
    "undefined" != typeof Mustache && (e = Mustache), "undefined" != typeof require && "undefined" != typeof requirejs && require && requirejs ? (require.config({
        paths: {
            _co_mustache: "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min"
        }
    }), require(["_co_mustache"], function(e) {
        _TConnecto.Mustache = e
    })) : _loadScript("https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js", function() {
        Mustache && (_TConnecto.Mustache = Mustache, Mustache = e, _processConnectoMessages())
    })
}

function exitIntentLib(e, n) {
    function t(e, n) {
        return "undefined" == typeof e ? n : e
    }

    function o(e) {
        var n = 24 * e * 60 * 60 * 1e3,
            t = new Date;
        return t.setTime(t.getTime() + n), "; expires=" + t.toGMTString()
    }

    function i() {
        S.addEventListener("mouseleave", c), S.addEventListener("mouseenter", s), S.addEventListener("keydown", a)
    }

    function c(e) {
        e.clientY > m || r("viewedOnExit" + v, "true") && !u || (y = setTimeout(l, C))
    }

    function s(e) {
        y && (clearTimeout(y), y = null)
    }

    function a(e) {
        b || r("viewedOnExit" + v, "true") && !u || e.metaKey && 76 == e.keyCode && (b = !0, y = setTimeout(l, C))
    }

    function r(e, n) {
        var t = document.cookie.split("; ").reduce(function(e, n) {
            var t = n.split("=");
            return e[t[0]] = t[1], e
        }, {});
        return t[e] === n
    }

    function l() {
        d(), _()
    }

    function d() {
        e && (e.style.display = "block"), g()
    }

    function g(e) {
        var e = e || {};
        "undefined" != typeof e.cookieExpire && (T = o(e.cookieExpire)), e.sitewide === !0 && (h = ";path=/"), "undefined" != typeof e.cookieDomain && (p = ";domain=" + e.cookieDomain), document.cookie = "viewedOnExit" + v + "=true" + T + p + h, S.removeEventListener("mouseleave", c), S.removeEventListener("mouseenter", s), S.removeEventListener("keydown", a)
    }
    var n = n || {},
        u = n.aggressive || !1,
        m = t(n.sensitivity, 65),
        f = t(n.timer, 1e3),
        C = t(n.delayExit, 200),
        _ = n.callback || function() {},
        T = o(n.cookieExpire) || "",
        p = n.cookieDomain ? ";domain=" + n.cookieDomain : "",
        h = n.sitewide === !0 ? ";path=/" : "",
        v = n.id || "",
        y = null,
        S = document.getElementsByTagName("html")[0];
    setTimeout(i, f);
    var b = !1;
    return {
        fire: d,
        disable: g
    }
}
var _TConnecto = _TConnecto || {};

_TConnecto.initPage = function() {
        if (_TConnecto.initialized = !1, _TConnecto.pageLoaded = _TConnecto.pageLoaded || !1, _TConnecto.variables = _TConnecto.variables || {}, _TConnecto.messages = null, _TConnecto.messageContentInserted = {}, _TConnecto.messageProcessed = {}, _TConnecto.embedElements = {}, _TConnecto.messageMap = {}, _TConnecto.usesNewVariables = !1, _TConnecto.idToExitIntentObjMap)
            for (var e in _TConnecto.idToExitIntentObjMap) _TConnecto.idToExitIntentObjMap[e] && _TConnecto.idToExitIntentObjMap[e].disable && _TConnecto.idToExitIntentObjMap[e].disable();
        if (_TConnecto.idToExitIntentObjMap = {}, _TConnecto.timeouts && _TConnecto.timeouts.length > 0)
            for (var n = 0; n < _TConnecto.timeouts.length; n++) clearTimeout(_TConnecto.timeouts[n]);
        _TConnecto.timeouts = []
    }, 
    _TConnecto.initPage(), 
    _TConnecto.addVariable = function(e, n) {
        _TConnecto.usesNewVariables = !0, e && n && (_TConnecto.variables[e] = n)
    }, 
    _TConnecto.getVariables = function() {
        if (!_TConnecto.usesNewVariables && (_TConnecto.customVariables && (_TConnecto.variables = _TConnecto.customVariables), _TConnecto.dynamicVariables))
            for (var e in _TConnecto.dynamicVariables) _TConnecto.variables[e] = _TConnecto.dynamicVariables[e];
        return _TConnecto.variables
    }, 
    _TConnecto.matchClientSideVariables = function(e) {
        for (var n = !0, t = 0; t < e.length; t++) {
            for (var o = !1, i = e[t].orClauses, c = 0; c < i.length; c++) {
                var s = i[c].selector,
                    a = i[c].matchType,
                    r = i[c].value,
                    l = !1;
                if (s && a && r) {
                    var d = _TConnecto.Sizzle(s);
                    if (d && d.length > 0) {
                        var g = d[0].textContent;
                        g = g.toUpperCase(), r = r.toUpperCase(), 1 == a ? g.indexOf(r) >= 0 && (l = !0) : 2 == a && -1 === g.indexOf(r) && (l = !0)
                    }
                }
                o = o || l
            }
            n = n && o
        }
        return n
    }, 
    _TConnecto._loadSizzleJS = function() {
        var e;
        "undefined" != typeof Sizzle && (e = Sizzle), "undefined" != typeof require && "undefined" != typeof requirejs && require && requirejs ? (require.config({
            paths: {
                _co_sizzle: "https://cdnjs.cloudflare.com/ajax/libs/sizzle/2.2.0/sizzle.min"
            }
        }), require(["_co_sizzle"], function(e) {
            _TConnecto.Sizzle = e
        })) : _loadScript("https://cdnjs.cloudflare.com/ajax/libs/sizzle/2.2.0/sizzle.min.js", function() {
            Sizzle && (_TConnecto.Sizzle = Sizzle, Sizzle = e, _processConnectoMessages())
        })
    }, 
    _TConnecto.getMessage = function(e) {
        return _TConnecto.messageMap[e] ? _TConnecto.messageMap[e].notification : null
    }, 
    _TConnecto.showMessage = function(e) {
        if (_TConnecto.messageMap[e])
            if (_TConnecto.messageContentInserted[e]) document.getElementById("container-notification-frame-" + e).contentWindow.toggleWidget();
            else {
                var n = _TConnecto.messageMap[e],
                    t = document.getElementById("container-notification-frame-" + n.id),
                    o = htmlUnescape(n.innerHTML);
                showContent(t, o, n.delay, n.scroll, n)
            }
    }, 
    _TConnecto.stopMessage = function(e) {
        _TConnecto.messageContentInserted[e] = !0
    }, 
    _TConnecto.getConnectoStorage = function(e) {
        var n = localStorage.getItem(e);
        if (n) try {
            return JSON.parse(n)
        } catch (t) {
            return {}
        }
        return null
    }, _TConnecto.initConnectoStorage = function() {
        if (localStorage.getItem("_connecto")) return _TConnecto.getConnectoStorage("_connecto");
        var e = {
            source: document.referrer,
            landingPage: document.URL,
            firstVisitOn: new Date
        };
        return localStorage.setItem("_connecto", JSON.stringify(e)), e
    }, _TConnecto.saveToConnectoStorage = function(e, n) {
        var t = _TConnecto.getConnectoStorage("_connecto");
        t || (t = _TConnecto.initConnectoStorage()), t[e] = n, localStorage.setItem("_connecto", JSON.stringify(t))
    }, _TConnecto.connectoLogsUpdated = !1, _TConnecto.updateConnectoLogs = function() {
        if (!_TConnecto.connectoLogsUpdated) {
            var e = _TConnecto.getConnectoLogs(),
                n = new Date;
            if (e.pages.push({
                    url: window.location.href,
                    time: n
                }), e.sessions.length > 0 && _TConnecto._readCookie("_co_session_active")) {
                var t = e.sessions[e.sessions.length - 1];
                t.pagesViewed = t.pagesViewed ? t.pagesViewed + 1 : 1, t.lastPageLoadTime = n
            } else e.sessions.push({
                startTime: n.getTime(),
                pagesViewed: 1
            });
            var o = new Date;
            o.setTime(n.getTime() + 144e5), document.cookie = "_co_session_active=1;expires=" + o.toGMTString() + "; path=/", e.pages.length > 100 && e.pages.shift(), e.sessions.length > 50 && e.sessions.shift(), localStorage.setItem("_connecto_logs", JSON.stringify(e)), _TConnecto.connectoLogsUpdated = !0
        }
    }, _TConnecto.getConnectoLogs = function() {
        var e = {
                pages: [],
                sessions: []
            },
            n = e,
            t = localStorage.getItem("_connecto_logs");
        if (t) try {
            n = JSON.parse(t)
        } catch (o) {
            console.log("Error1 : err" + o), console.log("Error1 : stack" + o.stack)
        }
        return n || (n = e), n.pages && "[object Array]" === Object.prototype.toString.call(n.pages) || (n.pages = []), n.sessions && "[object Array]" === Object.prototype.toString.call(n.sessions) || (n.sessions = []), n
    }, _TConnecto.getEventsSummary = function() {
        var e = localStorage.getItem("_co_events");
        if (e) try {
            return connectoEvents = JSON.parse(e), connectoEvents.summary
        } catch (n) {
            console.log("Error1 : err" + n), console.log("Error1 : stack" + n.stack)
        }
        return null
    }, _TConnecto._readCookie = function(e) {
        for (var n = e + "=", t = document.cookie.split(";"), o = 0; o < t.length; o++) {
            for (var i = t[o];
                " " == i.charAt(0);) i = i.substring(1, i.length);
            if (0 === i.indexOf(n)) return i.substring(n.length, i.length)
        }
        return null
    }, _TConnecto.getIdentity = function() {
        var e = _TConnecto.getFromConnectoEventStorage("userId");
        return e || (e = _TConnecto.getAnonymousId()), e
    }, _TConnecto.getAnonymousId = function() {
        var e = _TConnecto.getFromConnectoEventStorage("anonymousId");
        return e
    }, _TConnecto.getFromConnectoEventStorage = function(e) {
        var n = _TConnecto.getConnectoStorage("_Connecto");
        return n && n[e] ? n[e] : null
    }, _TConnecto.getFromConnectoStorage = function(e) {
        var n = _TConnecto.getConnectoStorage("_connecto");
        return n && n[e] ? n[e] : null
    }, _TConnecto.updateState = function(id, state, data) {
        if ("string" == typeof id) var msg = _TConnecto.getMessage(id);
        else msg = id;
        if (msg && msg.triggerNotifications && msg.triggerNotifications.callbackClick && 1 == state && eval("(" + msg.triggerNotifications.callbackClick + ")(" + JSON.stringify(data) + ")"), msg && msg.triggerNotifications && msg.triggerNotifications.callbackClose && 0 == state && eval("(" + msg.triggerNotifications.callbackClose + ")()"), _TConnecto.groups)
            for (var i = 0; i < _TConnecto.groups.length; i++) {
                var group = _TConnecto.groups[i];
                if (group.dontShowAfterFill && 1 == state || group.dontShowAfterClose && 0 == state)
                    for (var j = 0; j < _TConnecto.messages.length; j++) {
                        var message = _TConnecto.messages[j];
                        _TConnecto.messageContentInserted[message.id] = !0
                    }
            }
    }, _TConnecto._processOnPageLoad = function() {
        _TConnecto.pageLoaded = !0;
        for (var e = document.getElementsByTagName("ins"), n = "", t = 0; t < e.length; t++) {
            var o = e[t].getAttribute("class");
            o && o.indexOf("connecto-notification") > -1 && (n = e[t].getAttribute("data-connecto-slot"), n && (_TConnecto.embedElements[n] = e[t]))
        }
        _processConnectoMessages()
    },
    function() {
        if (!_TConnecto.initialized) {
            _TConnecto.initialized = !0, "function" == typeof _TConnecto.initConnecto && _TConnecto.initConnecto(), __co_loadMustache(), _TConnecto._loadSizzleJS();
            var e = _TConnecto.getFromConnectoStorage("firstVisitOn"),
                n = _TConnecto.getFromConnectoStorage("landingPage"),
                t = document.location.protocol + "//server.connecto.io/?v=1.2&url=" + encodeURIComponent(window.location),
                o = {};
            try {
                _TConnecto.updateConnectoLogs();
                var i = _TConnecto.initConnectoStorage(),
                    c = i.source,
                    s = _TConnecto.getConnectoLogs(),
                    a = _TConnecto.getEventsSummary(),
                    r = 1,
                    l = 1,
                    d = null;
                s && s.sessions && (r = s.sessions.length, r > 0 && (l = s.sessions[r - 1].pagesViewed, d = s.sessions[r - 1].startTime)), e && (o.firstVisitTime = e), a && (o.eventsSummary = a), n && (o.landingPage = n), c && (o.referer = c), r && (o.sessionNum = r), l && (o.sessionLen = l), d && (o.sessionStart = d), _TConnecto.engageId && (o.engageId = _TConnecto.engageId), _TConnecto.getVariables() && (o.customVariables = JSON.stringify(_TConnecto.getVariables())), _TConnecto.licenseKey && (o.licenseKey = _TConnecto.licenseKey);
                var g = _TConnecto.getAnonymousId(),
                    u = _TConnecto.getIdentity(),
                    m = {};
                u && (m.userId = u), g && (m.anonymousId = g), m && (o.segmentData = JSON.stringify(m)), _TConnecto.saveToConnectoStorage("lastVisitTime", new Date)
            } catch (f) {
                console.log("Error : err" + f), console.log("Error : stack" + f.stack)
            }
            ajaxCall(t, o, function(e) {
                if (res = JSON.parse(e), "1" == res.response || "2" == res.response) {
                    for (var n = 0; n < res.messages.length; n++) {
                        var t = res.messages[n];
                        if (t.imagesToPreload)
                            for (var o = 0; o < t.imagesToPreload.length; o++)
                                if (document.images && t.imagesToPreload[o]) {
                                    var i = new Image;
                                    i.src = t.imagesToPreload[o]
                                }
                    }
                    _TConnecto.messages = res.messages, res.groups && (_TConnecto.groups = res.groups), "interactive" == document.readyState || "complete" == document.readyState ? _TConnecto._processOnPageLoad() : window.addEventListener("DOMContentLoaded", _TConnecto._processOnPageLoad)
                }
            })
        }
    }();