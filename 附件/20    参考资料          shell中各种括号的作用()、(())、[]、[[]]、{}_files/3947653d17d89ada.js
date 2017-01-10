
Do(function(){
  var cookieCfg={key:"ap",cookie:"1"},$doubanTip=$("#doubanapp-tip"),data={};function hideDoubanTip(){if(!$doubanTip.length){return}$doubanTip.hide();data[cookieCfg.key]=cookieCfg.cookie;set_cookie(data)}$doubanTip.delegate("a","click",hideDoubanTip);if(!get_cookie(cookieCfg.key)){$doubanTip.show()}var popup;var nav=$("#db-global-nav");var more=nav.find(".bn-more");function handleShowMoreActive(c){var a=$(c.currentTarget);var b=a.parent();hideDoubanTip();if(popup){popup.parent().removeClass("more-active");if($.contains(b[0],popup[0])){popup=null;return}}b.addClass("more-active");popup=b.find(".more-items");popup.trigger("moreitem:show")}nav.delegate(".bn-more, .top-nav-reminder .lnk-remind","click",function(a){a.preventDefault();handleShowMoreActive(a);return}).delegate(".lnk-doubanapp","mouseenter",function(b){var a=$(this);if(!a.parent().hasClass("more-active")){handleShowMoreActive(b)}}).delegate(".top-nav-doubanapp","mouseleave",function(){var b=$(this);var a=b.find(".lnk-doubanapp");if(popup){b.removeClass("more-active");if($.contains(b[0],popup[0])){popup=null}}});$(document).click(function(a){if($(a.target).closest(".more-items").length||$(a.target).closest(".more-active").length){return}if(popup){popup.parent().removeClass("more-active");popup=null}});
});

  Do(function(){
    var nav = $('#db-nav-sns');
    var inp=$("#inp-query"),label=inp.closest(".nav-search").find("label");if("placeholder" in inp[0]){label.hide();inp.attr("placeholder",label.text())}else{if(inp.val()!==""){label.hide()}inp.parent().click(function(){inp.focus();label.hide()}).end().focusin(function(){label.hide()}).focusout(function(){if($.trim(this.value)===""){label.show()}else{label.hide()}}).keydown(function(){label.hide()})}inp.parents("form").submit(function(){if(!$.trim(inp.val()).length){return false}});nav.find(".lnk-more, .lnk-account").click(function(b){b.preventDefault();var d,a=$(this),c=a.hasClass("lnk-more")?$("#db-productions"):$("#db-usr-setting");if(!c.data("init")){d=a.offset();c.css({"margin-left":(d.left-$(window).width()/2-c.width()+a.width()+parseInt(a.css("padding-right"),10))+"px",left:"50%",top:d.top+a.height()+"px"});c.data("init",1);c.hide();$("body").click(function(g){var f=$(g.target);if(f.hasClass("lnk-more")||f.hasClass("lnk-account")||f.closest("#db-usr-setting").length||f.closest("#db-productions").length){return}c.hide()})}if(c.css("display")==="none"){$(".dropdown").hide();c.show()}else{$(".dropdown").hide()}});
  });
  
  var tagsug_src = "https://img3.doubanio.com/f/shire/4605e734f440a79abdf4866eb4e6c785dfefbba1/js/lib/tagsug.js";
  Do(function(){
// a very simple asynchronous js loader
// @author: ktmud
window.Do = window.Do || function(fn) {
  typeof fn == 'function' && setTimeout(fn, 0);
};
Do.add_js = function add_js(src) {
  var x = document.createElement('script');
  x.src = src;
  document.getElementsByTagName('head')[0].appendChild(x);
};
Do.add_css = function add_css(src, cb) {
  var x = document.createElement('link');
  x.rel = 'stylesheet';
  x.href = src;
  document.getElementsByTagName('head')[0].appendChild(x);
};
Do.check_js = function check_js(indicator, callback) {
  var indicator_ret = indicator();
  if (indicator_ret) {
    callback(indicator_ret);
  } else {
    setTimeout(function() {
      check_js(indicator, callback);
    }, 33);
  }
};

  var t = $('#inp-query,#search_text'),
      tempQuery,
      tagsug_api_search,
      tagsug_api_at,
      defaultSug = {"q":"","items":[{"num":"","name":"日记","cat":1015},{"num":"","name":"成员","cat":1005},{"num":"","name":"图片","cat":1025},{"num":"","name":"小站","cat":2012},{"num":"","name":"电影","cat":1002},{"num":"","name":"书籍","cat":1001},{"num":"","name":"音乐","cat":1003},{"num":"","name":"移动应用","cat":3064}],"source":"suggest"};
  t.one('focus', function() {
    Do.add_js(tagsug_src);
    Do.check_js(function() {
      return $.fn.tagsug && window.Mustache;
    }, function() {
      tagsug_api_search = t.tagsug({
        wordLimit: 30,
        url: '/j/search_suggest?q=',
        arrName: 'items',
        max: null,
        haltLink: false,
        sugOffset: {
          left: -6,
          top: 26
        },
        listTmpl: '<ul class="sug-kind-search"><li class="title"><a href="javascript: void 0;">搜索 “<span>{{q}}</span>” 相关的：</a></li>{{#items}}<li><a href="/search?cat={{cat}}&q={{q}}&source={{source}}"><span>{{num}}</span>{{name}}</a></li>{{/items}}</ul>',
        leadChar: '',
        hideChar: ['@'],
        alignLeft: true,
        queryIncludingSpace: true,
        tips: null
      })._tagsug_api[0];
      tagsug_api_search.on('query', function(e, q) {
        if (q !== tempQuery) {
          defaultSug.q = tempQuery = q;
          tagsug_api_search._anterior_txt = '';
          tagsug_api_search.showSug(defaultSug);
        }
      });
      tagsug_api_at = t.tagsug({
        max: 8,
        useUid: true,
        tips: '@某人，直达其个人主页'
      })._tagsug_api[0];
      tagsug_api_at.on('choose', function(e, uid) {
        window.location = '/people/' + uid + '/';
      });
    });
  });
  $('body').click(function(e) {
    var sug = $('#db-tagsug-list');
    if (sug.length && !$.contains(sug[0], e.target)){
      sug.hide();
    }
    if ($(e.target).is('#db-tagsug-list .title a')) {
      $('.nav-search form').submit();
    }
  });
});


    Do(function(){
      //@require_css /css/sns/popup_accounts.scss
;(function () {
    var doc = $(document);
    var docRoot = $('html');
    var docBody = $('body');
    var defaultOptions = {
      display_close: true
    };

    var TEMPL_UI = [
        '<div class="ui-overlay-mask" style="display:none;">',
        '<div class="ui-overlay-x"></div>                   ',
        '<div class="ui-overlay-container">                 ',
        '  <a href="#" class="ui-overlay-close" style="display:none;">&times;</a> ',
        '  <div class="hd"></div>                   ',
        '  <div class="bd"></div>                   ',
        '</div>                                     ',
        '</div>                                     '].join('');

    var TEMPL_ANCHOR = '<div class="ui-overlay-anchor"></div>';

    function Overlay() {
        this.init();
    };

    Overlay.prototype = {
        init: function () {
            var o = this;
            this.config = defaultOptions;
            this.mask = $(TEMPL_UI).appendTo(docBody);
            this.anchor = $(TEMPL_ANCHOR).prependTo(docBody);
            this.container = this.mask.find('.ui-overlay-container');
            this.header = this.mask.find('.ui-overlay-container > .hd');
            this.body = this.mask.find('.ui-overlay-container > .bd');
            this.bnClose = this.mask.find('.ui-overlay-container > .ui-overlay-close');

            this.bnClose.click(function(e) {
              e.preventDefault();
              o.close();
            });
            
            doc.delegate('.ui-overlay-mask', 'click', function (e) {
                if (o.config.forbidden_mask_click) {
                  return;
                }
                if (e.target == o.container[0] || $.contains(o.container[0], e.target)) {
                    return;
                }
                o.close();
            });

            doc.bind('keyup', function (e) {
                if (o.config.forbidden_hotkey_cancel) {
                  return;
                }
                if (!(/input|textarea/i.test(e.target.tagName)) && e.keyCode === 27) {
                    o.close();
                }
            });
        },

        open: function (content, callback) {
            var top = this.docTop = doc.scrollTop();
            this.anchor.show().css({
                marginTop: -top
            });
            docRoot.addClass('ui-overlay-show');
            this.mask.show();
            if (this.config.display_close) {
              this.bnClose.show();
            }
            this.setContent(content || '');
            if (callback) {
              callback.call(this);
            }
            this.container.trigger('overlay:open');
        },

        close: function () {
            docRoot.removeClass('ui-overlay-show');
            this.anchor.hide();
            doc.scrollTop(this.docTop);
            this.mask.hide();
            this.container.trigger('overlay:close');
        },

        bind: function(eventType, callback) {
          this.container.bind(eventType, callback);
        },

        setConfig: function(options) {
            this.config = $.extend({}, defaultOptions, options || {});
        },

        setHeader: function(content) {
            this.header.html(content);
        },

        setContent: function(content) {
            this.body.html(content);
        }
    };

    if (!$.overlay) {
        $.overlay = new Overlay();
    }
})();

;(function() {
  var ifrm = '<iframe src="javascript:;" frameborder="0" scrolling="no" width="{{width}}" height="{{height}}" name="{{name}}"></iframe>';
  var DEFAULT_WIDTH = 478;
  var DEFAULT_HEIGHT = 480;
  function setCookie(name, val, expired) {
    var expiredTime = curTime = new Date();
    expiredTime.setTime(curTime.getTime() + expired);
    document.cookie = name + '=' + escape(val) + ((expired == null) ? '' : ';expires=' + expiredTime.toGMTString()) + ';domain=.douban.com;path=/';
  }

  function getCookie(name) {
    if (document.cookie.length > 0) {
      var e, s = document.cookie.indexOf(name + '=');
      if (s != -1) {
        s = s + name.length + 1;
        e = document.cookie.indexOf(';', s);
        if (e == -1) {
          e = document.cookie.length;
        }
        return unescape(document.cookie.substring(s, e));
      }
    }
    return '';
  }
  var initIframe = function(t, redir, source) {
    var url = {
      login: 'https://accounts.douban.com/popup/login?source=sns',
      reg: 'https://accounts.douban.com/popup/login?source=sns#popup_register',
      switch_user: 'https://accounts.douban.com/popup/login?source=sns',
    };
    var ifrm = $.overlay.body.find('iframe');
    ifrm.attr('src', url[t]);
  };

  var initHandle = function(fn) {
    return function(e) {
      e.preventDefault();
      var lnk = $(this);
      var cfg = lnk.data();
      var params = cfg.params ? (typeof window[cfg.params] == 'function' ? window[cfg.params].call(this) : cfg.params) : null;
      var url = self.location.href;
      if (params) {
        url = (url.indexOf('?') + 1) ? url + '&' + params : url + '?' + params;
      }
      if (cfg.width > $('body').width()) {
          cfg.width = $('body').width();
      }
      var content = ifrm.replace('{{width}}', cfg.width || DEFAULT_WIDTH)
            .replace('{{height}}', cfg.height || DEFAULT_HEIGHT)
            .replace('{{name}}', document.location.protocol + '//' + document.location.hostname);
      if (typeof cfg.key === 'undefined' || !getCookie(cfg.key)) {
        $.overlay.open(content, function() {
          fn(encodeURIComponent(url), cfg.source);
        });
        // set expired cookie not to show popup login, need data-key, data-cookie, data-expired
        // sns data-key is "regpop"
        if (cfg.key && cfg.cookie && cfg.expired) {
          $.overlay.bind('overlay:close', function() {
              setCookie(cfg.key, cfg.cookie, cfg.expired);
          });
        }
      }
    };
  };

  $(document).delegate('.lnk-show-login', 'click',
    initHandle(function(url, source) {
      initIframe('login', url, source);
    })
  ).
  delegate('.lnk-show-reg', 'click',
    initHandle(function(url, source) {
     initIframe('reg', url, source);
    })
  )
  .delegate('.lnk-switch-user', 'click',
   initHandle(function(url, source) {
     initIframe('switch_user', encodeURIComponent(url), source);
   })
  );
  $(window).bind('message', function(e) {
    if (e.originalEvent.origin === 'https://accounts.douban.com') {
      $.overlay.body.find('iframe').css('height', e.originalEvent.data)
    }
  })
})();

    });
    
        Do(function(){
            var DOULIST_ADDITEM="/j/doulist/{doulist_id}/additem";var DOULIST_EDITITEM="/j/doulist/{doulist_id}/edititem";var DOULIST_COMMENT="/j/doulist/{doulist_id}/poke";var DOULIST_CREATE="/j/doulist/add";var DOULIST_LIST="/j/doulist/cat";var DOULIST_SEARCH="/j/doulist/search";var DOULIST_SEARCH_SELF="/j/doulist/search_user_doulists";var DOULIST_GET_ITEM_INFO="/j/doulist/get_item_info";function deferred(){var a={done:[],fail:[]};var b={done:function(c){a.done.push(c);return b},fail:function(c){a.fail.push(c);return b}};return{resolve:function(){var d=0,c;for(;c=a.done[d++];){c.apply(this,arguments)}},reject:function(){var d=0,c;for(;c=a.fail[d++];){c.apply(this,arguments)}},promise:b}}function asyncRequest(a,e,f){var d=deferred();var c=null;var b=(f||"get").toLowerCase();c=$.ajax({url:a,type:b,dataType:"json",data:(b==="post")?$.extend(e,{ck:get_cookie("ck")}):e,error:function(g){d.reject(g)},success:function(g){d.resolve(g)}});d.promise.abort=function(){c&&c.abort()};return d.promise}var addTooltipToDoulistBtn=function(b){if(!get_cookie("ck")){return}var d=/^https?:\/\/\w+\.douban\.com\/link2\/\?url=(\S+)$/i;var i=function(k){var j=k.match(d);return j?decodeURIComponent(j[1]):k};$(document).delegate(".url-doulist-add","click",function(n){n.preventDefault();var j=$(this);var l=i(j.data("url"));var k;var m=dui.Dialog({title:"添加到豆列",width:640,cls:"dialog-doulist dialog-tooltip-loading",content:'<div class="tooltip-text">内容加载中<i class="tooltip-loading-icon"></i></div>'}).open();m.node.find(".dui-dialog-close").click(function(o){k&&k.abort()});k=asyncRequest(DOULIST_GET_ITEM_INFO,{url:l,},"post").done(function(o){if(o.r){m.node.find(".tooltip-text").text(o.error);return}o.cate=(o.kind||"")+"";o.picture=typeof o.images==="string"?o.images:(o.images&&o.images[0])||"";o.id=(o.id||"")+"";m.close();j.doulistDialog(o)}).fail(function(o){m.node.find(".tooltip-text").text("失败啦！再试一次吧")})});var e=85;var a=false;var c="doulist-tooltip-hide";var f=$('<div class="doulist-add-tooltip"><a class="url-doulist-add" ><i></i> 添加到豆列</a><div class="arrow"></div></div>');var h=f.find("a");f.addClass(c);f.appendTo($("body"));var g=function(j){a=setTimeout(function(){f.addClass(c)},e)};$(b).mouseenter(function(k){var j=$(this);f.css({top:j.offset().top-28,left:k.pageX-42});h.data("url",j.attr("href"));clearTimeout(a);f.removeClass(c)}).mouseleave(g);f.mouseenter(function(){clearTimeout(a)}).mouseleave(g)};
            var $regUp = $('#reg-up');
            if ($regUp.length) {
                $regUp.find('.lnk-show-reg').trigger('click');
            }
            addTooltipToDoulistBtn('.note a[rel=nofollow]');
        });
    