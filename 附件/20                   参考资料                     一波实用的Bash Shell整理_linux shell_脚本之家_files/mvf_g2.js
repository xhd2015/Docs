var mediav=window.mediav||{};mediav.browser=mediav.browser||{};mediav.version="1.2.2";(function(){var a=navigator.userAgent;if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a)&&!/chrome/i.test(a)){mediav.browser.safari=+(RegExp["\x241"]||RegExp["\x242"])}})();if(navigator.appName=="Microsoft Internet Explorer"){var ua=navigator.userAgent,rv;var re=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(re.exec(ua)!=null){rv=parseFloat(RegExp.$1)}mediav.browser.ie=rv}if(/opera\/(\d+\.\d)/i.test(navigator.userAgent)){mediav.browser.opera=+RegExp["\x241"]}mediav.url=mediav.url||{};mediav.lang=mediav.lang||{};mediav.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)};mediav.url.queryToJson=function(a){var f=a.substr(a.lastIndexOf("?")+1),c=f.split("&"),e=c.length,k={},d=0,h,g,j,b;for(;d<e;d++){if(!c[d]){continue}b=c[d].split("=");h=b[0];g=decodeURIComponent(b[1]);j=k[h];if("undefined"==typeof j){k[h]=g}else{if(mediav.lang.isArray(j)){j.push(g)}else{k[h]=[j,g]}}}return k};mediav.url.escapeSymbol=function(a){return String(a).replace(/\%/g,"%25").replace(/&/g,"%26").replace(/\+/g,"%2B").replace(/\ /g,"%20").replace(/\//g,"%2F").replace(/\#/g,"%23").replace(/\=/g,"%3D").replace(/\?/g,"%3F")};mediav.url.jsonToQuery=function(h,j,g){var k=[],d,b=j||function(l){return mediav.url.escapeSymbol(l)};for(var c=0,a=g.length;c<a;c++){var e=g[c];var f=h[e];if(f!=null){k.push(e+"="+b(f,e))}}return k.join("&")};mediav.string={};mediav.string.format=function(c,a){c=String(c);var b=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;if(b.length){b=b.length==1?(a!==null&&(/\[object Array\]|\[object Object\]/.test(d.call(a)))?a:b):b;return c.replace(/#\{(.+?)\}/g,function(e,g){var f=b[g];if("[object Function]"==d.call(f)){f=f(g)}return("undefined"==typeof f?"":f)})}return c};mediav.string.parseDom=function(b){var a=document.createElement("div");a.innerHTML=b;return a.childNodes[0]};mediav.G=function(a){return document.getElementById(a)};mediav.getFixed=function(a,b){b=b||2;return(a+Math.pow(10,b)+"").substr(1,b)};var mv_impid;(function(){function b(j){var h=1,g=0,e;if(j){h=0;for(e=j.length-1;e>=0;e--){g=j.charCodeAt(e);h=(h<<6&268435455)+g+(g<<14);g=h&266338304;h=g!=0?h^g>>21:h}}return h}mediav.getUID=function(){var e=mediav._uid;if(e){return e}mediav._fuid=1;var j=(new Date()-0);var g=window.location.href;var h=b(g);e=""+j+h+Math.random()+Math.random()+Math.random()+Math.random();e=e.replace(/\./g,"").substring(0,32);mediav._uid=e;return e};try{if(window.parent!=window){if(window.parent.mediav&&window.parent.mediav._uid){mediav._uid=window.parent.mediav._uid}else{if(window.parent.mediav){window.parent.mediav._uid=mediav.getUID()}else{window.parent.mediav={_uid:mediav.getUID()}}}}}catch(f){}try{if(window.parent!=window){if(document.domain.indexOf("msn.com.cn")>=0){var c=b(document.referrer);if(document.cookie.indexOf(c)>=0){var d=new RegExp("(^| )"+c+"=([^;]*)(;|\x24)"),a=d.exec(document.cookie);mediav._uid=a[2]}else{document.cookie=c+"="+mediav.getUID()}setTimeout(function(){document.cookie=c+"=;expires="+(new Date()).toGMTString()},10000)}}}catch(f){}})();mediav.getImpid=function(){if(mv_impid){return mv_impid}var a=[];var b=new Date();a.push(Math.floor(Math.random()*991)+1);a.push(mediav.getFixed(b.getMilliseconds(),3));a.push(999);a.push(mediav.getFixed(b.getSeconds()));a.push(mediav.getFixed(b.getMinutes()));a.push(mediav.getFixed(b.getHours()));a.push(mediav.getFixed(b.getDate()));a.push(mediav.getFixed(b.getMonth()+1));mv_impid=a.join("");return mv_impid};mediav.ad||(mediav.ad={});mediav.otherBannerIds||(mediav.otherBannerIds=[]);mediav.otherCreativeIds||(mediav.otherCreativeIds=[]);mediav.ad.wraps=mediav.ad.wraps||{};mediav.ad.status=mediav.ad.status||{};mediav.ad.pubs=mediav.ad.pubs||{};mediav.initInnerConfig=function(){mediav.configs={ad:{logo:true,repeat:false,db:"mediav",asyn:false,unique:true},"default":{overtime:7},other:{keyword:"",adtest:false,ref:true}}};(function(){var e=["mediav_ad_ref","mediav_ad_wrap","mediav_ad_pub","mediav_ad_width","mediav_ad_height","mediav_ad_logo","mediav_ad_repeat","mediav_ad_async","mediav_ad_host","mediav_ad_db","mediav_ad_mainurl","mediav_default_material","mediav_default_clickurl","mediav_default_turl","mediav_default_overtime","mediav_keyword","mediav_adtest","mediav_ad_listenurl","mediav_ad_unique","mediav_addition","mediav_ad_adviva","mediav_ad_resBackup"];function b(g,j){var f=g.split("_"),h=f[1],k=f[2];if(k){mediav.configs[h][k]=j}else{mediav.configs.other[h]=j}}function d(){c(window);mediav.ad.clearGlobalVar()}function a(f){c(f)}function c(j){for(var g=e.length;g;g--){var f=e[g-1],h=j[f];if(h!=null){b(f,h)}}}mediav.ad.clearGlobalVar=function(){for(var g=e.length;g;g--){var f=e[g-1];if(window[f]!=undefined&&window[f]!=null){window[f]=null}}};mediav.ad.initConfig=function(j){if(j){a(j)}else{if(window.mediav_ad_pub){d()}}if(!mediav.configs.ad.pub){return true}var f=mediav.configs.ad.pub.split("_");mediav.configs.ad.pub=f[1]||f[0];mediav.configs.ad.showid=f[0];mediav.ad.pubs[f[1]]=1;if(mediav.configs.ad.wrap){mediav.ad.wraps[mediav.configs.ad.pub]=mediav.configs.ad.wrap;mediav.configs.ad.async=true}var g=mediav.configs["default"].clickurl;var h=mediav.configs["default"].turl;if(g){mediav.configs["default"].clickurl=g.replace(/\?type=\d/,function(k){return k+"&impid="+mediav.getImpid()})}if(h){mediav.configs["default"].turl=h.replace(/\?type=\d/,function(k){return k+"&impid="+mediav.getImpid()})}}})();mediav.ad.listen=function(c,b){var a=new Image();a.onload=a.onerror=window[c+"_mv_"+(new Date()-0)]=function(){};a.src=b};mediav.ad.startAdStateCheck=function(g,k,b){var j="<a href='#{0}' target='_blank'><img width='#{1}' height='#{2}' border='' alt='' src='#{3}'></img></a>";var h=mediav.configs.ad.pub;function e(){if(window["mediav_fini"+h]){return true}return false}function c(){return mediav.string.format(j,k.clickurl||"javascript:void(0)",b.width,b.height,k.material)}function f(){if(!e()){var l=b.pub;mediav.G(g).innerHTML=c();k.turl&&a(k.turl);var m=mediav.G("mvlogo_"+l);m&&(m.style.display="block");d()}}function a(m){var l=new Image();l.src=m;l.onerror=(l.onload=(l.onabort=function(){l=null}))}function d(){mediav.ad.status[h]="stop";var n="mvscr"+h;var m=document.getElementById(n);if(!m){return}if(m.clearAttributes){m.clearAttributes()}else{for(var l in m){if(m.hasOwnProperty(l)){delete m[l]}}}if(m&&m.parentNode){m.parentNode.removeChild(m)}m=null}mediav.ad.fillHoleTimer=setTimeout(f,k.overtime*1000)};mediav.ad.getPubName=function(a){return"showid"};mediav.ad.getScriptUrl=function(b,a,c){var d=["ver","enifr","showid","type","of","adtest","keyword","bids","ref","refer","uid","isifr"];var f={type:1,of:1};mediav.configs.ad.forceIfrRender&&(f.of=2);b.unique&&(f.uid=mediav.getUID());mediav._fuid=0;f[mediav.ad.getPubName(b.pub)]=b.showid;if(window.parent!=window&&document.referrer){try{domain=document.referrer.split("?")["0"];local=window.location.href.split("?")["0"];if(domain!=local){f.refer=encodeURIComponent(domain)}}catch(g){}}if(window.parent!=window){f.isifr=1}else{f.isifr=0}if(document.domain.indexOf("163disk.com")>=0){f.refer=window.location.href}c.adtest&&(f.adtest=c.adtest);c.keyword&&(f.keyword=c.keyword);b.ref&&(f.ref=b.ref);f.enifr=1;f.ver=mediav.version;mediav.otherBannerIds.push(b.pub);return mediav.url.jsonToQuery(f,null,d)};mediav.ad.getScriptHTML=function(g,d){var a=mediav.configs.ad;var e;if(a.host){e="http://"+a.host}else{e=(a.adviva?"https://show-a.mediav.com/s":"https://show-g.mediav.com/s")}var f=e+"?"+mediav.ad.getScriptUrl(mediav.configs.ad,mediav.configs["default"],mediav.configs.other);mediav.configs.other.addition&&(f=f+"&"+mediav.configs.other.addition);if(d){var c=document.createElement("script");g&&(c.id=g);c.type="text/javascript";c.async=true;c.charset="utf-8";c.src=f;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(c,b);return""}else{return'<SCRIPT id="'+g+'" LANGUAGE="JavaScript" src="'+f+'" charset="utf-8"></SCRIPT>'}};mediav.ad.getIframeNode=function(a,c){var b=document.createElement("iframe");var d="http://show.g.mediav.com/s?"+mediav.ad.getScriptUrl(mediav.configs.ad,mediav.configs["default"],mediav.configs.other);b.style.width=a+"px";b.style.height=c+"px";b.scrolling="no";b.name="ifr"+mediav.configs.ad.pub;b.setAttribute("frameborder",0,0);b.src=d;mediav.ad.iframeLoadFlag(b);return b};mediav.ad.iframeLoadFlag=function(a){window.navigator.mediav_fini_handler=function(b){window[b]=1};if(window.attachEvent){window.attachEvent("onmessage",function(b){window[b.data]=1})}else{window.addEventListener("message",function(b){window[b.data]=1})}};mediav.logo||(mediav.logo={});mediav.logo.getHtml=function(f){var h="mvlogo_"+mediav.configs.ad.pub;var k='<a id="#{3}" target="_blank" style="display:none;position:absolute;z-index:4;right:0;top:#{2}px" href="http://juxiao.mediav.com/" onmouseover="mediav.logo.over(this)" onmouseout="mediav.logo.out(this)"><img style="border:0;width:22px;height:18px" src="#{0}"/><img src="#{1}" style="display:none;border:0;width:90px;height:18px"/></a>';if(!window.XMLHttpRequest){var j="http://material.mediav.com/bjjs/juxiao/v1.gif";var g="http://material.mediav.com/bjjs/juxiao/mediav1.gif"}else{var j="http://material.mediav.com/bjjs/juxiao/v1.png";var g="http://material.mediav.com/bjjs/juxiao/mediav1.png"}return mediav.string.format(k,j,g,mediav.configs.ad.height-18,f?h:"")};mediav.logo.getIcon=function(f){var h="mvicon_"+mediav.configs.ad.pub;var k='<a id="i_#{3}" target="_blank" style="position:absolute;z-index:5;right:0;top:0px" href="http://juxiao.mediav.com/privacy.html" onmouseover="mediav.logo.over(this)" onmouseout="mediav.logo.out(this)"><img style="border:0;width:18px;height:18px" src="#{0}"/><img src="#{1}" style="display:none;border:0;width:132px;height:18px"/></a>';var j="http://material.mediav.com/bjjs/dsp/icon/mv_i.png";var g="http://material.mediav.com/bjjs/dsp/icon/mv_i_e.png";return mediav.string.format(k,j,g,f?h:"")};mediav.logo.over=function(a){a.firstChild.style.display="none";a.lastChild.style.display="block"};mediav.logo.out=function(a){a.lastChild.style.display="none";a.firstChild.style.display="block"};mediav.ad.lisenClick=function(n,b,c,a,o){try{var d=function(s,e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i");var u=s.substr(1).match(t);if(u!=null){return unescape(u[2])}return null};var k=function(u,t){var z,s,w,v=document.documentElement,r=document.body;s=u.pageX||u.clientX+(v&&v.scrollLeft||r&&r.scrollLeft||0);w=u.pageY||u.clientY+(v&&v.scrollTop||r&&r.scrollTop||0);z=q(t);return{top:Math.round(w-z.top),left:s-z.left}};var q=function(s){var r=document.documentElement,e=document.body,t={top:0,left:0};if(typeof s.getBoundingClientRect!==undefined){t=s.getBoundingClientRect()}return{top:t.top+(window.pageYOffset||r.scrollTop||e.scrollTop),left:t.left+(window.pageXOffset||r.scrollLeft||e.scrollLeft)}};var j=window["mvcu_"+c];var l=k(n,b);var g="https://view.mediav.com/v?type=12&db=mediav",p=d(j,"impid")||d(j,"oimpid"),f=d(j,"pub"),m=d(j,"cus"),g=g+"&impid="+p+"&pub="+f+"&cus="+m+"&wh="+a+"x"+o+"&x="+l.left+"&y="+l.top;mediav.ad.listen(f,g)}catch(h){}};mediav.ad.iframe=function(d){if(mediav.ad.initConfig(d)){return}var a=mediav.configs.ad;var c;if(a.host){c="http://"+a.host}else{c=adCfg.adviva?"https://show-a.mediav.com/s":"https://show-g.mediav.com/s"}var e=c+"?type=1&of=2&showid="+a.showid+"&refer="+encodeURIComponent(window.location.href);var b=mediav.configs.ad.pub;window["mediav_fini"+b]=1;b=b+(new Date()-0);document.write(mediav.string.format("<iframe id='_mv_ifr_#{0}' src='#{3}' width='#{1}px' height='#{2}px' frameborder='0' scrolling='no' allowtransparency='true' hspace='0' vspace='0' marginheight='0' marginwidth='0'></iframe>",b,a.width,a.height,e))};mediav.ad.setDefaultMaterial=function(b){if(b.adviva){return}var a={"100x160":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/100x160.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"100x300":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/100x300.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"120x240":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/120x240.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"120x600":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/120x600.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"160x600":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/160x600.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"200x200":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/200x200.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"250x250":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/250x250.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"300x50":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/300x50.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"300x100":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/300x100.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"320x250":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/320x250.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"300x250":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/300x250.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"320x50":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/320x50.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"336x280":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/336x280.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"468x60":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/468x60.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"580x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/580x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"600x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/600x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"610x100":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/610x100.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"640x60":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/640x60.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"640x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/640x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"660x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/660x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"728x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/728x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"950x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/950x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"},"960x90":{material:"https://material-ssl.mediav.com/clickurl/tianchuang/new/960x90.jpg",curl:"http://gouwu.360.cn/#floor_jiaju"}};var c=a[b.width+"x"+b.height];if(c){mediav.configs["default"].clickurl=encodeURI(c.curl);mediav.configs["default"].material=c.material}};mediav.ad.forceToIframe=function(){mediav.configs.ad.forceIfrRender=true};mediav.ad.write=function(d){if(mediav.ad.initConfig(d)){return}mediav.ad.forceToIframe();var c=mediav.configs.ad.pub;var e=mediav.configs.ad.listenurl;mediav["lisen"+c]=function(){if(!e){return}mediav.ad.listen(c,e)};var a="mvdiv_"+mediav.configs.ad.pub;var l="mvscr"+mediav.configs.ad.pub;var b=mediav.configs.ad.width;var k=mediav.configs.ad.height;var j=[];j.push("<div id='"+a+"_holder' style='display:block;overflow:hidden;float:none;width:"+mediav.configs.ad.width+"px;height:"+mediav.configs.ad.height+"px'>");j.push("<div style='display:block;float:none;position:relative;z-index:4;width:"+mediav.configs.ad.width+"px;overflow:visible'>");j.push("<div id='"+a+"' style='display:block;float:none'>");j.push("</div>");j.push(mediav.logo.getHtml(mediav.configs.ad.logo));if("1017955,1016834,1019038,1019351,1019350".indexOf(mediav.configs.ad.pub)>=0){j.push(mediav.logo.getIcon(mediav.configs.ad.logo))}j.push("</div></div>");document.write(j.join(""));var h=document.getElementById(a+"_holder");if(mediav.configs.ad.forceIfrRender){h.appendChild(mediav.ad.getIframeNode(b,k))}else{var f=(mediav.ad.getScriptHTML(l,mediav.configs.ad.async));document.write(f)}if(!mediav.configs["default"].material){mediav.ad.setDefaultMaterial(mediav.configs.ad)}if(mediav.configs["default"].material){mediav.ad.startAdStateCheck(a,mediav.configs["default"],mediav.configs.ad)}var g="lisen"+mediav.configs.ad.pub;(function(){var o=c;var n=b;var m=k;mediav["cb_"+c]=function(){setTimeout(function(){try{var p=document.getElementById("mv_wrap_"+c);p.onclick=function(r){try{var s=this,r=r||event;mediav[g]();mediav.ad.lisenClick(r,s,o,n,m)}catch(t){}}}catch(q){}},100)}})();setTimeout(function(){try{h.onclick=function(n){var o=this,n=n||event;mediav[g]();mediav.ad.lisenClick(n,o,c,b,k)}}catch(m){}},100);if(window.mediav_ad_pub&&window.mediav_ad_pub.indexOf(mediav.configs.ad.pub)>=0){window.mediav_ad_pub==null}};mediav.ad.init=function(a){mediav.initInnerConfig();mediav.ad.write(a)};mediav.exchange=function(){var d=mediav.configs.ad;var c=mediav.G("mvdiv_"+d.pub+"_holder");if(c){c.style.height=0;var b=c.parentNode}var g=d.ifr=[];var f=mediav.configs.ad.pub;window["mediav_fini"+f]=1;f=f+(new Date()-0);window._mv_ifrid="_mv_ifr_"+f;var a=document.createElement("iframe");a.id="_mv_ifr_"+f;a.width=d.width+"px";a.height=d.height+"px";a.setAttribute("frameborder",0);a.scrolling="no";a.setAttribute("allowtransparency","true");a.hspace="0";a.vspace="0";a.setAttribute("marginheight","0");a.setAttribute("marginwidth","0");b.appendChild(a);var e=function(){var k=document.getElementById("_mv_ifr_"+f);if(!k){setTimeout(e,200);return}var j;try{j=k.contentWindow.document}catch(h){k.src="javascript:(function () {try{document.open();document.domain="+document.domain+";document.close();}catch(e){}})();"}setTimeout(function(){try{j=k.contentWindow.document}catch(l){k.src="javascript:(function () {try{document.open();document.domain='"+document.domain+"';document.close();}catch(e){}})();"}setTimeout(function(){j=k.contentWindow.document;var m=d.ifr.join("");htmls=m.split("<\/script>");for(i=0;i<htmls.length;i++){j.write(htmls[i]+"<\/script>")}setTimeout(function(){j.close()},7000)},0)},0)};setTimeout(e,200)};var base64=(function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var c=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);return function b(l){var k,j,g,e;var h,d,f;d=l.length;h=0;f="";while(h<d){do{k=c[l.charCodeAt(h++)&255]}while(h<d&&k==-1);if(k==-1){break}do{j=c[l.charCodeAt(h++)&255]}while(h<d&&j==-1);if(j==-1){break}f+=String.fromCharCode((k<<2)|((j&48)>>4));do{g=l.charCodeAt(h++)&255;if(g==61){return f}g=c[g]}while(h<d&&g==-1);if(g==-1){break}f+=String.fromCharCode(((j&15)<<4)|((g&60)>>2));do{e=l.charCodeAt(h++)&255;if(e==61){return f}e=c[e]}while(h<d&&e==-1);if(e==-1){break}f+=String.fromCharCode(((g&3)<<6)|e)}return f}})();mediav.utf8to16=function(g){var b,e,a,h;var f,d;b="";a=g.length;e=0;while(e<a){h=g.charCodeAt(e++);switch(h>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:b+=g.charAt(e-1);break;case 12:case 13:f=g.charCodeAt(e++);b+=String.fromCharCode(((h&31)<<6)|(f&63));break;case 14:f=g.charCodeAt(e++);d=g.charCodeAt(e++);b+=String.fromCharCode(((h&15)<<12)|((f&63)<<6)|((d&63)<<0));break}}return b};mediav.write=function(a){a=mediav.utf8to16(base64(a));if(!mediav.configs.ad.ifr){mediav.exchange()}mediav.configs.ad.ifr.push(a)};mediav.track=function(a){mediav.configs.ad.ifr.push("<img src='"+a+"' style='display:none'></img>")};mediav.noshow=function(){var b,a=new Image();a.src="http://material.mediav.com/1x1.gif";if(mediav.configs.ad.resBackup){if(mediav.ad.fillHoleTimer){clearTimeout(mediav.ad.fillHoleTimer)}scriptNode=document.createElement("script");scriptNode.src=mediav.configs.ad.resBackup;document.body.appendChild(scriptNode)}};mediav.ad.init();(function(){function a(c,m,g,o,l,h,e,k){var b=h?window["mvas_"+h]:"";if(mediav.ad.pubs[b]!=1){return}var r="";if(mediav.ad.status[b]=="stop"){return}if(mediav.ad.wraps[b]){var r=mediav.G("mvdiv_"+b)}var p=mediav.G("mvdiv_"+b+"_holder");var f=mediav.G("mvlogo_"+b);f&&(f.style.display="block");var q=mediav.G("mvdiv_"+b);q&&(q.style.display="none");var d="mv_swf_"+b||(new Date()-0);var e=e||"Opaque";var n="<OBJECT id="+d+' codeBase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7" classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width='+c+" height="+m+' type=application/x-shockwave-flash><PARAM NAME="Movie" VALUE="'+g+'"><PARAM NAME="FlashVars" VALUE="mv_clickurl='+escape(l)+(k?"&"+k:"")+'"><PARAM NAME="WMode" VALUE="'+e+'"><PARAM NAME="Quality" VALUE="High"><PARAM NAME="AllowScriptAccess" VALUE="always"><PARAM NAME="Scale" VALUE="ShowAll"><PARAM NAME="AllowNetworking" VALUE="all"><PARAM NAME="AllowFullScreen" VALUE="false"><embed id="'+d+'" width="'+c+'px" height="'+m+'px" src="'+g+'" quality="High" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="'+e+'" allowscriptaccess="always" FlashVars="mv_clickurl='+escape(l)+(k?"&"+k:"")+'" ></embed></OBJECT>';if(o==1){var j='<div style="width:'+c+"px;height:"+m+'px;overflow:hidden">'+n+"</div>"}else{var j='<div id="mv_wrap_'+b+'" style="width:'+c+"px;height:"+m+'px;overflow:hidden"><div style="position: relative; z-index: 1; width:'+ +c+"px; height:"+m+'px;"><div style=";overflow:hidden;position: absolute; left: 0pt; top: 0pt; z-index: 2; width:'+c+"px; height:"+m+'px;">';j+=n;j+='</div><a id="mvclicka" target="_blank" style="display:block" href="'+l+'"><img border="0" style="position: absolute; left: 0px; top: 0px; z-index: 3; width:'+c+"px;height:"+m+'px;" src="http://static.mediav.com/1x1.gif"/></a></div></div>'}if(r==""){p.appendChild(mediav.string.parseDom(j))}else{r.innerHTML=j;r.style.display="block"}mediav["cb_"+b]()}mediav.makeImage=function(g,d,c,m,j){var e=j?window["mvas_"+j]:"";var b="";if(mediav.ad.status[e]=="stop"){return}var k=mediav.G("mvdiv_"+e+"_holder");var f=mediav.G("mvlogo_"+e);f&&(f.style.display="block");var l=mediav.G("mvdiv_"+e);l&&(l.style.display="none");if(mediav.ad.wraps[e]){var b=mediav.G("mvdiv_"+e)}var h=mediav.string.format('<a id="mv_wrap_'+e+'"  href="#{0}" target="_blank"><img src="#{1}" alt="" border="" width="#{2}" height="#{3}"></img></a>',d,g,c,m);if(b){b.innerHTML=h;b.style.display="block"}else{k.appendChild(mediav.string.parseDom(h))}mediav["cb_"+e]()};mediav.makeFlash=a;mediav.makeNone=function(){};mediav.makeHTML5=function(c,j,d,m,h){var e=h?window["mvas_"+h]:"";if(mediav.ad.status[e]=="stop"){return}var k=mediav.G("mvdiv_"+e+"_holder");var f=mediav.G("mvlogo_"+e);f&&(f.style.display="block");var l=mediav.G("mvdiv_"+e);l&&(l.style.display="none");var b='<a id="mv_wrap_'+e+'"  href="'+j+'" target="_blank" style="position:absolute;background:transparent;opacity:0;width:'+d+"px;height:"+m+'px;display:inline-block;"></a>';var g='<iframe width="'+d+'" height="'+m+'" frameborder="no" src="'+c+'"></iframe>';k.appendChild(mediav.string.parseDom(b));k.appendChild(mediav.string.parseDom(g));mediav["cb_"+e]()}})();