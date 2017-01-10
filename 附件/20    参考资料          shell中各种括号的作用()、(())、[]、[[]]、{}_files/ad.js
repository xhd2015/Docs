(function (global) {
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(fun/*, thisArg*/) {
            "use strict";

            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError();
            }

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {

            var k;

            // 1. Let O be the result of calling ToObject passing
            //    the this value as the argument.
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get
            //    internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
              return -1;
            }

            // 5. If argument fromIndex was passed let n be
            //    ToInteger(fromIndex); else let n be 0.
            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
              n = 0;
            }

            // 6. If n >= len, return -1.
            if (n >= len) {
              return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            //    If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                var kValue;
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    var polling_ad_units = ['dale_group_topic_new_top_right',
                            'dale_group_topic_new_bottom_right',
                            'dale_group_topic_bottom_super_banner',
                            'dale_movie_subject_bottom_super_banner',
                            'dale_online_discussion_top_right',
                            'dale_personal_note_middle_right',
                            'dale_personal_note_bottom_super_banner',
                            'dale_anonymous_home_page_bottom',
                            'dale_anonymous_home_page_middle_2',
                            'dale_music_programme_bottom',
                            'dale_newgroup_home_bottom_right_201211',
                            'dale_event_page_bottom_right',
                            'dale_people_photo_right_image',
                            'dale_group_search_top_right',
                            'dale_group_explore_bottom_right',
                            'dale_book_subject_bottom_super_banner',
                            'dale_newgroup_home_bottom_banner_haoye',
                            'dale_movie_subject_photo_middle_right_haoye',
                            'dale_event_subject_bottom_super_banner',
                            'dale_movie_subject_trailer_playing_bottom_right',
                            'dale_newgroup_home_bottom_banner_201211',
                            'dale_online_photo_top_right_haoye',
                            'dale_people_photo_bottom_super_banner',
                            'dale_online_subject_bottom_super_banner',
                            'dale_movie_tag_bottom_super_banner',
                            'dale_newgroup_explore_bottom_banner'];

    var jsonp,
        logError,
        newWindow,
        inDocument,
        loadFrame;

    jsonp = (function() {
        var self,
            addEvent,
            garbageCollectGet,
            queryToString,
            generateRandomName,
            callError,
            callSuccessGet,
            callComplete;

        addEvent = function (element, event, fn) {
            if (element.addEventListener) {
                element.addEventListener(event, fn, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + event, fn);
            } else {
                element['on' + event] = fn;
            }
        };

        garbageCollectGet = function (callbackName, script) {
            script.parentNode.removeChild(script);
            global[callbackName] = undefined;
            try {
                delete global[callbackName];
            } catch (e) { }
        };

        queryToString = function (query, encodeURI) {
            var str = "",
                key,
                value;

            for (key in query) {
                if (query.hasOwnProperty(key)) {
                    key = encodeURI ? encodeURIComponent(key) : key;
                    value = encodeURI ? encodeURIComponent(query[key]) : query[key];
                    str += key + "=" + value + "&";
                }
            }
            return str.replace(/&$/, "");
        };

        generateRandomName = function () {
            var uuid = '',
                s = [],
                hexDigits = "0123456789ABCDEF",
                i = 0;

            for (i = 0; i < 32; i += 1) {
                s[i] = hexDigits.charAt(Math.floor(Math.random() * 0x10));
            }

            s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[16] = hexDigits.charAt((s[16] & 0x3) | 0x8);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

            uuid = "erebor_" + s.join("");
            return uuid;
        };

        callError = function (callback, errorMsg) {
            if (typeof callback !== 'undefined') {
                callback(errorMsg);
            }
        };

        callSuccessGet = function (callback, query, data) {
            if (typeof callback !== 'undefined') {
                callback(query, data);
            }
        };

        callComplete = function (callback) {
            if (typeof callback !== 'undefined') {
                callback();
            }
        };

        self = {};

        self.get = function (options) {
            options = options || {};
            var url = options.url,
                query = options.query || {},
                callbackParameter = options.callbackParameter || 'callback',
                callbackName = generateRandomName(),
                script = global.document.createElement('script'),
                insertReference = global.document.getElementsByTagName('script')[0],
                prefix = "?";

            if (typeof url === 'undefined') {
                throw new Error('URL must be specified!');
            }

            query[callbackParameter] = callbackName;
            if (url.indexOf("?") >= 0) {
                prefix = "&";
            }
            url += prefix + queryToString(query, true);

            global[callbackName] = function (data) {
                if (typeof data === 'undefined') {
                    callError(options.error, 'Invalid JSON data returned');
                } else {
                    callSuccessGet(options.success, query, data);
                }
                garbageCollectGet(callbackName, script);
                callComplete(options.complete);
            };

            script.setAttribute('src', url);
            insertReference.parentNode.insertBefore(script, insertReference);

            addEvent(script, 'error', function () {
                garbageCollectGet(callbackName, script);
                callComplete(options.complete);
                callError(options.error, 'Error while trying to access the URL');
            });
        };

        return self;
    })();

    var logError = function (errorMsg) {
        if (global.console) {
            global.console.log(errorMsg);
        }
    };

    var inDocument = function(element) {
        while (element) {
            if (element === global.document) {
                return true;
            }
            element = element.parentNode;
        }
        return false;
    };

    var newWindow = function(url, title) {
        var features = (
                'toolbar=0,status=1,resizable=1,' +
                'menubar=no,location=yes,scrollbars=yes'),
            win = global.window.open(url, title, features);
        if (win) {
            win.focus();
        }
        return win;
    };

    var activeType = "";

    var checkPageVisibility = (function() {
        var hidden = "hidden";
        // Standards
        if (hidden in document) {
            document.addEventListener("visibilitychange", onchange);
        }
        else if ((hidden = "mozHidden") in document){
            document.addEventListener("mozvisibilitychange", onchange);
        }
        else if ((hidden = "webkitHidden") in document){
            document.addEventListener("webkitvisibilitychange", onchange);
        }
        else if ((hidden = "msHidden") in document){
            document.addEventListener("msvisibilitychange", onchange);
        }
        // IE 9 and lower:
        else if ("onfocusin" in document) {
            document.onfocusin = document.onfocusout = onchange;
        }
          // All others:
        else {
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
        }

        function onchange (evt) {
            var v = "visible", h = "hidden",
                evtMap = {
                  focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
                };

            evt = evt || window.event;
            if (evt.type in evtMap) {
              activeType = evtMap[evt.type];
            }
            else {
              activeType = this[hidden] ? "hidden" : "visible";
            }
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if( document[hidden] !== undefined ) {
            onchange({type: document[hidden] ? "blur" : "focus"});
        }
    })();

    var isElementVisible = function(element) {
        var top = $(element).offset().top;
        var elementOffsetHeight = top + parseInt(element.height);
        var screenHeight = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight;
        return ((elementOffsetHeight>screenHeight) && (top<(screenHeight+windowHeight)));
    };

    var isActive = function() {
        if (activeType === 'hidden' || activeType === 'blur') {
            return false;
        } else {
            return true;
        }
    };

    var createTimer = function(slot) {
        var count = 20;
        var timer = setInterval(function() {
            e = document.getElementById(slot+'_frame');
            if (e === null) {
                clearInterval(timer);
                return;
            }
            var ad_type = e.name;
            if (count > 0 && ad_type === 'CPC') {
                if (isActive() && isElementVisible(e)) {
                    DoubanAdGet(slot);
                    count--;
                }
            } else {
                clearInterval(timer);
                timer = 0;
            }
        }, 10000);
    };

    var adUnits = global.DoubanAdSlots.sort().filter(function(n){
        return polling_ad_units.indexOf(n) !== -1;
    });

    setTimeout(function() {
        for (var i = 0; i < adUnits.length; i++) {
            createTimer(adUnits[i]);
        }
    }, 0);

    var loadFrame = function(query, parameters) {
        query = query || {};
        parameters = parameters || {};
        var unit = query.unit || '',
            debugMode = query.debug || false;
            err = parameters.msg,
            html = parameters.html || '',
            sellType = parameters.sell_type || '',
            width = parameters.width || 0,
            height = parameters.height || 0,
            margin = parameters.margin || '',
            debugHash = parameters.debug || '',
            adSlot = global.document.getElementById(unit),
            adFrame = global.document.getElementById(unit+'_frame');

        if (debugMode && (debugHash !== '')) {
            newWindow('http://dale.dapps.douban.com/debug/view/?er=' + encodeURIComponent(debugHash));
        }

        if (typeof err !== 'undefined') {
            return;
        }

        if (!inDocument(adSlot)) {
            logError('Cannot find slot ' + unit);
            return;
        }

        if (!inDocument(adFrame)) {
            adFrame = global.document.createElement('iframe');
            adFrame.id = unit+'_frame';
            adFrame.frameBorder = 0;
            adFrame.scrolling = 'no';
            adFrame.style.overflow = 'hidden';
            adFrame.style.margin = margin;
            adFrame.width = width;
            adFrame.height = height;
            adFrame.src = "javascript:document.write('<head><script>window.domain=\"douban.com\";</script></head><body></body>');";
            adSlot.appendChild(adFrame);
        }
        adFrame.name = sellType;

        adFrame.contentWindow.document.open();
        adFrame.contentWindow.document.write(html);
        adFrame.contentWindow.document.close();
    };

    global.DoubanAdGet = function(slots, loaders) {
        var request = global.DoubanAdRequest || {},
            slots = slots || [],
            loaders = loaders || {},
            src = request.src || '',
            uid = request.uid || '',
            bid = request.bid || '',
            crtr = request.crtr || '',
            prv = request.prv || '',
            debug = request.debug || false,
            ts = new Date().getTime(),
            slot, query;

        if (typeof slots === 'string') {
            slots = [slots];
        }

        if (typeof loaders === 'function') {
            var loader = loaders;
            loaders = {};
            for (var i = 0; i<slots.length; i++) {
                loaders[slots[i]] = loader;
            }
        }

        if (src === '') {
            throw new Error('Ad service url must be specified!');
        }

        if (bid === '') {
            throw new Error('Browser id must be specified!');
        }

        if (prv !== '') {
            src = src + 'preview/';
        }

        for(var i = 0; i<slots.length; i++) {
            slot = global.document.getElementById(slots[i]);
            if (inDocument(slot)) {
                query = {
                    unit: slots[i],
                    uid: uid,
                    bid: bid,
                    crtr: crtr,
                    ts: ts,
                    prv: prv,
                    debug: debug
                };
                jsonp.get({
                    url: src,
                    query: query,
                    success: loaders[slots[i]] || loadFrame,
                    error: logError
                });
            } else {
                logError('Nonexistent slot ' + slots[i]);
            }
        }
    };

    global.DoubanAdGet(global.DoubanAdSlots, global.DoubanAdLoaders);
})(this);

