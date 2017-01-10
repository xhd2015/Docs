
        ;(function(e,d,b){var c={weibo:{appkey:""},douban:{},qq:{},qzone:{}};function a(f,g){this.config=b.extend(true,{},c,f);var h=a.serializeOpenGraph();this.pageInfo=b.extend({title:h.title||d.title,url:h.url||d.location.href,pic:(b.type(h.image)==="array"?h.image[0]:h.image)||"",desc:h.description||"",site:h.site_name||""},g)}a.serializeOpenGraph=function(){var g={};b('meta[property^="og:"]').each(function(j,k){k=b(k);var h=k.attr("property").replace(/^og\:/,"");g[h]=k.attr("content")});var f=b('meta[property="og:image"]');if(f.length>1){g.image=f.map(function(h,j){return b(j).attr("content")}).toArray()}return g};a.prototype={constructor:a,set:function(g,f){var h={};h[g]=f;b.extend(this.config,h)},get:function(f){var g=b.extend({},this.pageInfo,this.config[f]);return({douban:{url:"https://www.douban.com/share/service/?"+b.param({href:g.url,name:g.title,image:g.pic,text:g.desc})},weibo:{url:"http://v.t.sina.com.cn/share/share.php?"+b.param({appkey:g.appkey,url:g.url,title:g.title,pic:g.pic})},qq:{url:"http://connect.qq.com/widget/shareqq/index.html?"+b.param({url:g.url,desc:g.title,pics:g.pic,site:g.site})},qzone:{url:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+b.param({url:g.url,title:g.title,summary:g.desc,pics:g.pic})}})[f]},openInNewWindow:function(i,h){h=h||{};var j=h.width||500,f=h.height||360;var g=b.extend({},{width:j,height:f,toolbar:0,location:0,resizable:1,scrollbars:"yes",left:h.left||(screen.width-j)/2,top:h.top||(screen.height-f)/2},h);e.open(i,"SocialSharing",b.param(g).replace(/&/g,","))}};window.SocialSharing=a})(window,document,jQuery);
        $(function() {
    var doc = $(document)
    var logVendors = {
        'weibo': 'bshare_sina',
        'qq': 'bshare_qqim',
        'qzone': 'bshare_qzone'
    }
    var windowFeatures = {
        qq: { width: 800, height: 600 },
        qzone: { width: 800, height: 600 }
    }

    function gen_qrcode(layer, url) {
        layer.find('.sharing-wechat-qrcode').html('<img src="//img3.doubanio.com/dae/qrgen/v2/' + encodeURIComponent(url) + '.png" alt="扫描二维码" />')
    }
    doc.delegate('.sharing-indicator', 'click', function() {
        var parent = $(this).closest('.sharing')
        var layer = parent.find('.sharing-layer')
        if (layer.hasClass('is-hidden')) {
            var url = parent.data('target')['url']
            layer.removeClass('is-hidden')
            gen_qrcode(layer, url)
        } else {
            layer.addClass('is-hidden')
        }
    })
    $('body').bind('click', function(e) {
        if ($(e.target).hasClass('sharing-indicator')) {
            return
        }
        var layer = $('.sharing-layer')
        if (!layer.hasClass('is-hidden')) {
            if (!$(e.target).closest('.sharing-layer').length) {
                layer.addClass('is-hidden')
            }
        }
    })
    $('.sharing-layer').bind('click', function(e) {
        if ($(e.target).closest('.sharing-list').length) {
            $('.sharing-layer').addClass('is-hidden')
            return
        }
        e.stopPropagation()
    })
    doc.delegate('[data-share]', 'click', function() {
        var elem = $(this)
        var network = elem.data('share')
        var parent = $(this).closest('.sharing')
        var pageInfo = parent.data('target') || {}
        var socialSharing = new SocialSharing({
            weibo: {
                appkey: '3015934887'
            }
        }, pageInfo)
        var url = 'https://www.douban.com/link2?type=redir&vendor=' + logVendors[network] + '&url=' + encodeURIComponent(socialSharing.get(network).url)
        socialSharing.openInNewWindow(url, windowFeatures[network])
    });
});

    
              Do(function(){
                $("html").delegate(".thing-like-note-fav .btn-fav","click",function(d){var c=$(this);var a=c.attr("data-object_id");var b=c.hasClass("fav-cancel")?1:0;if(c.hasClass("stat-processing")){return}$.ajax({type:b?"delete":"post",url:"/j/note/like_thing_note",data:{note_id:a,ck:get_cookie("ck")},dataType:"json",success:function(e){}})});
              });
            
Do(function() {

var addSimpleTooltip = function(selector, link){
  // only display to logged user
  if (!get_cookie('ck')) return;

  var delayTime = 85;
  var delayTimer = false;

  var hideClassName = 'doulist-tooltip-hide';
  var $tooltip = $('<div class="doulist-add-tooltip">' + link + '<div class="arrow"></div></div>');
  var $btn = $tooltip.find('a');

  $tooltip.addClass(hideClassName);
  $tooltip.appendTo($('body'));

  var delayHideHandler = function(e){
    delayTimer = setTimeout(function(){
        $tooltip.addClass(hideClassName);
    }, delayTime)
  }

  $(selector).mouseenter(function(e){
    var $link = $(this);
    $tooltip.css({
      top: $link.position().top - 28,
      left: e.pageX - 42
    })
    $btn.data('url', $link.attr('href'));

    clearTimeout(delayTimer);
    $tooltip.removeClass(hideClassName);
  }).mouseleave(delayHideHandler);

  $tooltip
    .mouseenter(function(){
    clearTimeout(delayTimer);
    })
    .mouseleave(delayHideHandler)
}

function initPrestoStat(presto_selector, stat_selector, options) {
  var container = $(presto_selector);
  var presto_words = container.html();
  if (presto_words) {
    var stat_num = $(stat_selector).html();
    if (stat_num) {
      stat_num = parseInt(stat_num);
      var presto_stat_num = parseInt(container.data('count'));
      stat_num = stat_num + presto_stat_num;
      if (options) {
        // for sns-bar 2016 summer
        $(stat_selector).html(stat_num);
        addSimpleTooltip(options.button, presto_words);
      } else {
        // for sns-bar 2015 winter
        $(stat_selector).html(stat_num + "人");
        addSimpleTooltip(stat_selector, presto_words);
      }
    }
  }
}


if ($('.fav-num a').length) {
    // button in 2015 winter style
    initPrestoStat('.presto-like-words', '.fav-num a');
    initPrestoStat('.presto-rec-words', '.rec-sec .rec-num');
} else {
    initPrestoStat('.presto-like-words', '.fav-num', {
        button: '.sns-bar-fav'
    });
    initPrestoStat('.presto-rec-words', '.rec-num', {
        button: '.sns-bar .sharing'
    });
}

});

Do(function() {
    $(document).delegate('.mod-usercard .lnk-contact-add', 'click', function(e) {
        e.preventDefault();
        var el = $(this);
        if (el.hasClass('processing')) {
            return;
        }
        el.addClass('processing');
        $.post_withck('/j/contact/addcontact', {
        people: el.data('id'),
        from: el.data('source')
        }, function(r) {
            el.removeClass('processing');
            if (!r.result) {
                return;
            }
            el.replaceWith('<span class="usercard-followed">已关注</span>');
        }, 'json');
    });
});
