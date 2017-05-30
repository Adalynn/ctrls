console.dir("Called");

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

function _processAniMessages() {

	var n = _TAni.messages[0];
	var t = htmlUnescape(n.snippet);

    /*if (_TAni.messages)
        for (var e = 0; e < _TAni.messages.length; e++) {
            var n = _TAni.messages[e];
            if (!_TAni.messageProcessed[n.id] && !_TAni.messageContentInserted[n.id] && (!n.notification.hasDynamicContent || _TAni.Mustache) && (_TAni.pageLoaded || 12 !== n.notification.notification_type) && (_TAni.pageLoaded && _TAni.Sizzle || !n.notification.clientSideVariableMatches || !(n.notification.clientSideVariableMatches.length > 0))) {
                var t = htmlUnescape(n.snippet);
                if (_TAni.messageMap[n.id] = n, _TAni.messageProcessed[n.id] = !0, !(n.notification.clientSideVariableMatches && n.notification.clientSideVariableMatches.length > 0) || _TAni.matchClientSideVariables(n.notification.clientSideVariableMatches)) {
                    var o;
                    if (12 === n.notification.notification_type) _TAni.embedElements[n.notification.embeddedSlot] ? (o = _TAni.embedElements[n.notification.embeddedSlot], o.innerHTML = t) : _TAni.messageContentInserted[n.id] = !0;
                    else if (o = document.createElement("div"), o.setAttribute("id", "connecto_" + n.id), o.innerHTML = t, document.body) document.body.insertBefore(o, null);
                    else {
                        var i = document.getElementsByTagName("script")[0];
                        i.parentNode.insertBefore(o, i)
                    }
                    if (5 !== n.notification.closeBehaviour) {
                        var c = document.getElementById("container-notification-frame-" + n.id),
                            s = htmlUnescape(n.innerHTML);
                        n.notification.hasDynamicContent && (s = _TAni.Mustache.render(s, _TAni.getVariables())), showContent(c, s, n.delay, n.scroll, n)
                    }
                }
            }
        }*/

	o = document.createElement("div");
	o.setAttribute("id", "ani_" + n.id);
	console.dir("Content added on page");
	o.innerHTML = t;
	document.body.insertBefore(o, null);


    var n = _TAni.messages[1];
    var t = htmlUnescape(n.snippet);
    o = document.createElement("div");
    o.setAttribute("id", "ani_" + n.id);
    console.dir("Exit intent content added on page");
    o.innerHTML = t;
    document.body.insertBefore(o, null);
}

function _loadScript(e, n) {
    var t = document.createElement("script");
    t.type = "text/javascript", t.readyState ? t.onreadystatechange = function() {
        ("loaded" == t.readyState || "complete" == t.readyState) && (t.onreadystatechange = null, n && n())
    } : t.onload = function() {
        n && n()
    }, t.src = e, document.getElementsByTagName("head")[0].appendChild(t)
}




var _TAni = _TAni || {};
_TAni.request_url = '//localhost/ctrls/request.php';
_TAni.js_files = 'http://localhost/ctrls/javascripts/';

_TAni.initPage = function() {
	_TAni.messages = null,
	_TAni.messageProcessed = {},
	_TAni._loadModernizrScript(),
    _TAni._loadCookieScript()
},

_TAni._loadCookieScript = function() {
    _loadScript(_TAni.js_files+"jquery.cookie.min.js", function() {
        console.dir("Script Loaded");
    });
},

_TAni._loadModernizrScript = function() {
	_loadScript(_TAni.js_files+"/modernizr.custom.js", function() {
        console.dir("Script Loaded");
    });
}, 

_TAni.getAniStorage = function(e) {
    var n = localStorage.getItem(e);
    if (n) try {
        return JSON.parse(n)
    } catch (t) {
        return {}
    }
    return null
},

_TAni.initAniStorage = function() {
    if (localStorage.getItem("_ani")) return _TAni.getAniStorage("_ani");
    var e = {
        source: document.referrer,
        landingPage: document.URL,
        firstVisitOn: new Date
    };
    return localStorage.setItem("_ani", JSON.stringify(e)), e
},

_TAni.saveToAniStorage = function(e, n) {
    var t = _TAni.getAniStorage("_ani");
    t || (t = _TAni.initAniStorage()), t[e] = n, localStorage.setItem("_ani", JSON.stringify(t))
},

_TAni._processOnPageLoad = function(e, n) {
	_processAniMessages();
},

_TAni.initPage(),


function() {

    if (!_TAni.initialized) {
    	_TAni.initialized = !0;

        var t = document.location.protocol + _TAni.request_url +"?v=1.2&url=" + encodeURIComponent(window.location),
            o = {};
        var i = _TAni.initAniStorage();


        _TAni.saveToAniStorage("lastVisitTime", new Date);

        ajaxCall(t, o, function(e) {
        	res = JSON.parse(e);
        	console.dir(res);
        	_TAni.messages = res.messages
        	
        	"complete" == document.readyState ? _TAni._processOnPageLoad() : window.addEventListener("DOMContentLoaded", _TAni._processOnPageLoad);
        })
    }

	var triggered_times = 0;
	$(window).scroll(function() {
		if ($('body').height() <= ($(window).height() + $(window).scrollTop()) && triggered_times == 0) {
			$('#bounceModal').addClass("ffb-show");
			triggered_times = 1;
			$(".scroll").css('display', 'none');
		}
	});

	// Closing the Popup Box
	$(".ffb-close").click(function() {
		$("#bounceModal").removeClass("ffb-show");
	});

	// If an event gets to the body
	$("body").click(function() {
		$("#bounceModal").removeClass("ffb-show");
	});

	// Prevent events from getting pass .popup
	$("#bounceModal").click(function(e) {
		e.stopPropagation();
	});



    // Exit intent 
      function addEvent(obj, evt, fn) {
        if (obj.addEventListener) {
          obj.addEventListener(evt, fn, false);
        } else if (obj.attachEvent) {
          obj.attachEvent("on" + evt, fn);
        }
      }
      addEvent(document, "mouseout", function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        var visited = $.cookie("bounce_convert_cookie");
        if (visited === '1') {
          return false;
        } else if ((!from || from.nodeName == "HTML") && e.pageY < $(window).scrollTop()) {
          $("#exitIntentBounceModal").addClass("ffb-show");
          //setting cookie expiry time by (s * ms)
          var date = new Date();
          //10 secounds time for cookie
          date.setTime(date.getTime() + (10 * 1000));
          $.cookie("bounce_convert_cookie", '1', {
            expires: date
          });
        }
      });

      // Closing the Popup Box
      $(".ffb-close").click(function() {
        $("#exitIntentBounceModal").removeClass("ffb-show");
      });

      // If clicked anywhere on body
      $("body").click(function() {
        $("#exitIntentBounceModal").removeClass("ffb-show");
      });

      // Prevent event if clicked on #exitIntentBounceModal
      $("#exitIntentBounceModal").click(function(e) {
        e.stopPropagation();
      });

}();


