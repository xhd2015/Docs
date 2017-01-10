
(function(){function addLoadEvent(fn){fn&&fn();}
var domReadyTime='',pageTime=new Date().getTime();function domReady(){if(document.addEventListener){document.addEventListener('DOMContentLoaded',function(){domReadyTime=new Date().getTime();document.removeEventListener('DOMContentLoaded',arguments.callee,false);},false);}else{if(document.getElementById){document.write("<script id=\"ie-domReady\" defer='defer'src=\"//:\"><\/script>");document.getElementById('ie-domReady').onreadystatechange=function(){if(this.readyState==='complete'){domReadyTime=new Date().getTime();this.onreadystatechange=null;this.parentNode.removeChild(this);}};}}};domReady();var prtl='https:'==window.location.protocol?'https://':'http://'
function sudaLogInit(in_uid){var win=window,doc=document,nav=navigator,ua=nav.userAgent,scr=win.screen,loc=win.location.href;var domain='https:'==window.location.protocol?'sbeacon.sina.com.cn':'beacon.sina.com.cn';var a_gif=prtl+domain+'/a.gif?',e_gif=prtl+domain+'/e.gif?';var uid='',webUrl=''
startTime='',readyTime='',ext1='',ext2='',currTime=parseInt(new Date().getTime());var wm='',urlParameter=loc.split('?')[1];if(!!urlParameter&&loc.indexOf('wm=')>0){var pArr=urlParameter.split('&'),len=pArr.length;for(var i=0;i<len;i++){var arg=pArr[i].split('=');if(arg[0]=='wm'&&arg[1]!='#column'){wm=arg[1];break;}}}
if(wm){var cookie_wm=getCookie('wm');if(wm!=cookie_wm){setCookie('wm',wm,'','sina.cn');}}
wm=getCookie('wm');if(typeof sudaLogConfig!=="undefined"){uid=sudaLogConfig.uId!==undefined?sudaLogConfig.uId:'';webUrl=sudaLogConfig.url!==undefined?sudaLogConfig.url:'';if(typeof globalConfig!=="undefined"){startTime=globalConfig.startTime!==undefined?globalConfig.startTime:pageTime;}
ext1=sudaLogConfig.ext1!==undefined?sudaLogConfig.ext1:'';ext2=sudaLogConfig.ext2!==undefined?sudaLogConfig.ext2:'';}
uid=uid||in_uid||'';onloadTime=currTime-startTime;readyTime=domReadyTime-startTime;var customExtend='MT=';customExtend+='wm:'+wm;if(typeof sudaLogConfig!=="undefined"&&typeof sudaLogConfig.prevPageClickTime!=="undefined"&&sudaLogConfig.prevPageClickTime!==''){var prevPageClickTime=sudaLogConfig.prevPageClickTime!==undefined?sudaLogConfig.prevPageClickTime:0,requestTime=startTime-prevPageClickTime;customExtend+='|mperform:1'+'|'+'starttime:'+prevPageClickTime+'|'+'endtime:'+startTime+'|'+'clicktime:'+requestTime;}
var sudaRef=doc.referrer.toLowerCase();var cookie_SINAGLOBAL="SINAGLOBAL",cookie_Apache="Apache",cookie_ULV="ULV",cookie_SUP="SUP",cookie_ustat='ustat';var loginUserInfo="";var sudaExt1="",sudaExt2="";var sudaInfo=[],uaTrackInfo=[];var sudaGlobalCount=0,fsudaGlobalCount=0;function getMeta(metaName,pidx){var pMeta=doc.getElementsByName(metaName);var idx=(pidx>0)?pidx:0;return(pMeta.length>idx)?pMeta[idx].content:"";}
function getSudaMeta(){var pMeta=doc.getElementsByName('sudameta');var meta=[];for(var idx=0;idx<pMeta.length;idx++){var content=pMeta[idx].content;if(content){if(content.indexOf(';')!=-1){var temps=content.split(';');for(var i=0;i<temps.length;i++){var temp=trim(temps[i]);if(!temp)continue;meta.push(temp);}}else{meta.push(content);}}}
return meta;}
function stringSplice(src,k,e,sp){if(src==""){return"";}
sp=(sp=="")?"=":sp;k+=sp;var ps=src.indexOf(k);if(ps<0){return"";}
ps+=k.length;var pe=src.indexOf(e,ps);if(pe<ps){pe=src.length;}
return src.substring(ps,pe);}
function getCookie(ckName){if(undefined==ckName||""==ckName){return"";}
return stringSplice(doc.cookie,ckName,";","");}
function setCookie(ckName,ckValue,ckDays,ckDomain){if(ckValue!=null){if((undefined==ckDomain)||(null==ckDomain)){ckDomain='sina.cn';}
if((undefined==ckDays)||(null==ckDays)||(''==ckDays)){doc.cookie=ckName+"="+ckValue+";domain="+ckDomain+";path=/";}else{var now=new Date();var time=now.getTime();time=time+86400000*ckDays;now.setTime(time);time=now.getTime();doc.cookie=ckName+"="+ckValue+";domain="+ckDomain+";expires="+now.toUTCString()+";path=/";}}}
function addEvent(sNode,sEventType,oFunc){var oElement=sNode;if(oElement==null){return false;}
sEventType=sEventType||'click';if((typeof oFunc).toLowerCase()!="function"){return;}
if(oElement.attachEvent){oElement.attachEvent('on'+sEventType,oFunc);}
else if(oElement.addEventListener){oElement.addEventListener(sEventType,oFunc,false);}
else{oElement['on'+sEventType]=oFunc;}
return true;}
function getEvent(){if(window.event!=null){return window.event;}else{if(window.event){return window.event;}
var o=arguments.callee.caller;var e;var n=0;while(o!=null&&n<40){e=o.arguments[0];if(e&&(e.constructor==Event||e.constructor==MouseEvent||e.constructor==KeyboardEvent)){return e;}
n++;o=o.caller;}
return e;}}
function fixEvent(e){e=e||getEvent();if(!e.target){e.target=e.srcElement;e.pageX=e.x;e.pageY=e.y;}
if(typeof e.layerX=='undefined')
e.layerX=e.offsetX;if(typeof e.layerY=='undefined')
e.layerY=e.offsetY;return e;}
function trim(str){if(typeof str!=='string'){throw'trim need a string as parameter';}
var len=str.length;var s=0;var reg=/(\u3000|\s|\t|\u00A0)/;while(s<len){if(!reg.test(str.charAt(s))){break;}
s+=1;}
while(len>s){if(!reg.test(str.charAt(len-1))){break;}
len-=1;}
return str.slice(s,len);}
function isArray(o){return Object.prototype.toString.call(o)==='[object Array]';}
function queryToJson(QS,isDecode){var _Qlist=trim(QS).split("&");var _json={};var _fData=function(data){if(isDecode){return decodeURIComponent(data);}else{return data;}};for(var i=0,len=_Qlist.length;i<len;i++){if(_Qlist[i]){var _hsh=_Qlist[i].split("=");var _key=_hsh[0];var _value=_hsh[1];if(_hsh.length<2){_value=_key;_key='$nullName';}
if(!_json[_key]){_json[_key]=_fData(_value);}
else{if(isArray(_json[_key])!=true){_json[_key]=[_json[_key]];}
_json[_key].push(_fData(_value));}}}
return _json;}
function getHost(sUrl){var r=new RegExp('^http(?:s)?\://([^/]+)','im');if(sUrl.match(r)){return sUrl.match(r)[1].toString();}else{return"";}}
var CI={screenSize:function(){return scr.width+"x"+scr.height;},colorDepth:function(){return scr.colorDepth||'';},appCode:function(){return nav.appCodeName||'';},appName:function(){return(nav.appName.indexOf('Microsoft Internet Explorer')>-1)?'MSIE':nav.appName;},cpu:function(){return nav.cpuClass||nav.oscpu||"";},platform:function(){return nav.platform||'';},jsVer:function(){var p,appsign,appver,jsver=1.0,isN6=0,navigatorAppName=(nav.appName.indexOf('Microsoft Internet Explorer')>-1)?'MSIE':nav.appName,navigatorAppVersion=nav.appVersion;if('MSIE'==navigatorAppName){appsign='MSIE';p=navigatorAppVersion.indexOf(appsign);if(p>=0){appver=window.parseInt(navigatorAppVersion.substring(p+5));if(3<=appver){jsver=1.1;if(4<=appver){jsver=1.3;}}}}else if(("Netscape"==navigatorAppName)||("Opera"==navigatorAppName)||("Mozilla"==navigatorAppName)){jsver=1.3;appsign='Netscape6';p=navigatorAppVersion.indexOf(appsign);if(p>=0){jsver=1.5;}}
return jsver;},network:function(){var ct="";ct=(nav.connection&&nav.connection.type)?nav.connection.type:ct;try{doc.body.addBehavior("#default#clientCaps");ct=doc.body.connectionType;}catch(e){ct="unkown";}
return ct;},language:function(){return nav.systemLanguage||nav.language||'';},timezone:function(){return new Date().getTimezoneOffset()/60||"";},flashVer:function(){return'';},javaEnabled:function(){var pl=nav.plugins,java=nav.javaEnabled(),item,desc;if(java==true){return 1;}
if(pl&&pl.length){for(var key in pl){item=pl[key];if(item.description==null){continue;}
if(java!=null){break;}
desc=item.description.toLowerCase();if(desc.indexOf("java plug-in")!=-1){java=parseInt(item.version);continue;}}}else if(window.ActiveXObject){java=(new ActiveXObject("JavaWebStart.IsInstalled")!=null);}
return java?1:0;}};var PI={pageId:function(){return'';},sessionCount:function(){return'';},excuteCount:function(){return SUDA.sudaCount;},referrer:function(){var re=/^[^\?&#]*.swf([\?#])?/;if((sudaRef=="")||(sudaRef.match(re))){var ref=stringSplice(loc,"ref","&","");if(ref!=""){return escape(ref);}}
return escape(sudaRef);},isHomepage:function(){var isHome="";try{doc.body.addBehavior("#default#homePage");isHome=doc.body.isHomePage(loc)?"Y":"N";}catch(e){isHome="unkown";}
return isHome;},PGLS:function(){return getMeta("stencil")||"";},ZT:function(){var zt=getMeta('subjectid');zt.replace(",",".");zt.replace(";",",");return escape(zt);},mediaType:function(){return getSudaMeta()||"";},domCount:function(){return doc.getElementsByTagName("*").length||"";},iframeCount:function(){return doc.getElementsByTagName("iframe").length;},onloadTime:onloadTime,readyTime:readyTime,webUrl:webUrl,ch:function(){if(window.__docConfig){return __docConfig.__domain;}
else{return'';}},PE:function(){var oM=document.getElementsByName('sudameta')[0];if(oM){return oM.content;}
else{return'';}}};var UI={visitorId:function(){if(""!=cookie_SINAGLOBAL){var gid=getCookie(cookie_SINAGLOBAL);if(""==gid){gid=getCookie(cookie_Apache);var time=3650;setCookie(cookie_SINAGLOBAL,gid,time);}
return gid;}else{return"";}},sessionId:function(){var sid=getCookie(cookie_Apache);if(sid==""){var now=new Date();sid=Math.random()*10000000000000+"."+now.getTime();setCookie(cookie_Apache,sid);}
return sid;},flashCookie:function(gid){return'';},lastVisit:function(){var sid=getCookie(cookie_Apache);var lvi=getCookie(cookie_ULV);var lva=lvi.split(":");var lvr="",lvn;if(lva.length>=6){if(sid!=lva[4]){lvn=new Date();var lvd=new Date(window.parseInt(lva[0]));lva[1]=window.parseInt(lva[1])+1;if(lvn.getMonth()!=lvd.getMonth()){lva[2]=1;}else{lva[2]=window.parseInt(lva[2])+1;}
if(((lvn.getTime()-lvd.getTime())/86400000)>=7){lva[3]=1;}else{if(lvn.getDay()<lvd.getDay()){lva[3]=1;}else{lva[3]=window.parseInt(lva[3])+1;}}
lvr=lva[0]+":"+lva[1]+":"+lva[2]+":"+lva[3];lva[5]=lva[0];lva[0]=lvn.getTime();setCookie(cookie_ULV,lva[0]+":"+lva[1]+":"+lva[2]+":"+lva[3]+":"+sid+":"+lva[5],360);}else{lvr=lva[5]+":"+lva[1]+":"+lva[2]+":"+lva[3];}}else{lvn=new Date();lvr=":1:1:1";setCookie(cookie_ULV,lvn.getTime()+lvr+":"+sid+":",360);}
return lvr;},userNick:function(){if(loginUserInfo!=""){return loginUserInfo;}
var sup=unescape(getCookie(cookie_SUP)),ag='',user='',uid2=uid,sex='',bday='';if(sup!=""){ag=stringSplice(sup,"ag","&","");user=stringSplice(sup,"user","&","");uid=stringSplice(sup,"uid","&","");sex=stringSplice(sup,"sex","&","");bday=stringSplice(sup,"dob","&","");}
loginUserInfo=ag+":"+user+":"+uid2+":"+sex+":"+bday;return loginUserInfo;},userOrigin:function(){return"";},advCount:function(){return"";},subp:function(){return getCookie('SUBP');}};var D={'CI':function(){var data=['sz:'+CI.screenSize(),'dp:'+CI.colorDepth(),'ac:'+CI.appCode(),'an:'+CI.appName(),'cpu:'+CI.cpu(),'pf:'+CI.platform(),'jv:'+CI.jsVer(),'ct:'+CI.network(),'lg:'+CI.language(),'tz:'+CI.timezone(),'fv:'+CI.flashVer(),'ja:'+CI.javaEnabled()];return'CI='+data.join("|");},'PI':function(realUrl,refer){var newUrl=PI.webUrl;if(!!realUrl){newUrl=escape(realUrl);}
var data=['pid:'+PI.pageId(),'st:'+PI.sessionCount(),'et:'+PI.excuteCount(),'ref:'+(refer||PI.referrer()),'hp:'+PI.isHomepage(),'PGLS:'+PI.PGLS(),'ZT:'+PI.ZT(),'MT:'+PI.mediaType(),'keys:','dom:'+PI.domCount(),'ifr:'+PI.iframeCount(),'nld:'+PI.onloadTime,'drd:'+PI.readyTime,'url:'+newUrl,'ch:'+PI.ch()];return'PI='+data.join("|");},'UI':function(){var data=['vid:'+UI.visitorId(),'sid:'+UI.sessionId(),'lv:'+UI.lastVisit(),'un:'+UI.userNick(),'uo:'+UI.userOrigin(),'ae:'+UI.advCount(),'su:'+UI.subp(),'lu:'+'','si:'+'','rs:'+0,'dm:'+0];return'UI='+data.join("|");},'EX':function(extInfo1,extInfo2){extInfo1=(null!=extInfo1)?extInfo1||"":sudaExt1;extInfo2=(null!=extInfo2)?extInfo2||"":sudaExt2;return"EX=ex1:"+extInfo1+"|ex2:"+extInfo2;},'MT':function(){return customExtend;},'V':function(){return'V=2.3.1';},'R':function(){return'gUid_'+new Date().getTime();}};function sendFinalRequest(url){createRequest(url);}
function createRequest(url){var img=new Image();SUDA.img=img;img.src=url;}
function gatherCommon(ext1,ext2,realUrl,refer){SUDA.sudaCount++;var url=a_gif+[D.V(),D.CI(),D.PI(realUrl,refer),D.UI(),D.MT(),D.EX(ext1,ext2),D.R()].join("&");createRequest(url);}
function gatherCommon2(ext1,ext2,realUrl){if(SUDA.sudaCount!=0)
{return;}
gatherCommon(ext1,ext2,realUrl);}
function uaTrack(acode,aext,href){if(!href){href='';}else{href=escape(href);};var s="UATrack||"+getCookie(cookie_SINAGLOBAL)+"||"+getCookie(cookie_Apache)+"||"+UI.userNick()+"||"+acode+"||"+aext+"||"+PI.referrer()+"||"+href+"||";var url=e_gif+s+"&gUid_"+new Date().getTime();sendFinalRequest(url);}
function uaTrackLike(acode,aext,href){if(!href){href='';}else{href=escape(href);};var s="UATrack||"+getCookie(cookie_ustat)+"||"+getCookie(cookie_Apache)+"||"+UI.userNick()+"||"+acode+"||"+aext+"||"+PI.referrer()+"||"+href+"||";var url=e_gif+s+"&gUid_"+new Date().getTime();sendFinalRequest(url);}
function trackAgent(e){var evt=fixEvent(e);var el=evt.target;var sudaUaTrack="",href="";var trackData;if(el!=null&&el.getAttribute&&(!el.getAttribute('suda-uatrack')&&!el.getAttribute('suda-data'))){while(el!=null&&el.getAttribute&&(!!el.getAttribute('suda-uatrack')||!!el.getAttribute('suda-data'))==false){if(el==doc.body){return;}
el=el.parentNode;}}
if(el==null||el.getAttribute==null){return;}
sudaUaTrack=el.getAttribute('suda-uatrack')||el.getAttribute('suda-data')||'';if(sudaUaTrack){trackData=queryToJson(sudaUaTrack);if(el.tagName.toLowerCase()=="a"){href=el.href;}
trackData['key']&&SUDA.uaTrack&&SUDA.uaTrack(trackData['key'],trackData['value']||trackData['key'],href);}}
window.SUDA=window.SUDA||[];SUDA.sudaCount=SUDA.sudaCount||0;SUDA.log=function(){gatherCommon.apply(null,arguments);};SUDA.uaTrack=function(){uaTrack.apply(null,arguments);};SUDA.uaTrackLike=function(){uaTrackLike.apply(null,arguments);};addEvent(doc.body,'click',trackAgent);gatherCommon2(ext1,ext2);}
window.checkLogin=function(){if(getCookie('SUBP')){var obj=getSUBPCookie.decode(getCookie('SUBP'));if(typeof obj=='object'){if(obj.status==="0"){var bloon=true;}
else{var bloon=false;}}
else{var bloon=false;}}
else{var bloon=false;}
return bloon;}
window.getUserInfo=function(fn,getUid){if(window.userInfo){fn&&fn(window.userInfo);return;}
getUid=getUid||false;if(!window.checkLogin()){delCookie('sina_ucode');window.userInfo=false;fn&&fn({});return;}
if(fn&&getUid){var localUid=getCookie('sina_ucode');if(localUid){return fn({uid:convNum(localUid,'decode')});}}
if(!window.getUserInfo.aFn){window.getUserInfo.aFn=[];}
window.getUserInfo.aFn.push(fn);if(window.getUserInfo.aFn.length>1){return;}
var url=prtl+'passport.sina.cn/sso/islogin?';if(url.indexOf('?')==-1){url=url+'?';}
var oDate=new Date();var data={random:Math.random(),time:oDate.getTime()}
jsonp({success:function(rs){rs.data=rs.data||{};rs.data.uname=rs.data.nick;rs.data.userface=rs.data.portrait_url;if(rs.data.islogin&&rs.data.uid){setCookie('sina_ucode',convNum(rs.data.uid),240,'/','.sina.cn');}
window.userInfo=rs.data;if(window.getUserInfo.aFn.length>0){window.getUserInfo.aFn.forEach(function(fn){if(typeof(fn)=='function'){fn(rs.data);}})}},error:function(){fn({});},url:url,data:data,timeout:3000})}
function convNum(input,method){method=method||'encode';var Keys=['a','B','X','M','Z','Y','Q','c','I','p'],ret='';for(var i=0,len=input.length;i<len;i++){ret+=method=='encode'?Keys[parseInt(input[i])]:Keys.indexOf(input[i]);}
return ret;}
function urlEncode(data){if(typeof(data)=='string'){return data;}
var ret=[];for(var i in data){if(data.hasOwnProperty(i)){ret.push(i+'='+data[i]);}}
return ret.join('&');}
function jsonp(json){json.data=json.data||{};json.timeout=json.timeout||0;json.callback=json.callback||'callback';var fnName='jsonp_'+Math.random();fnName=fnName.replace('.','');window[fnName]=function(result){clearTimeout(jsonp_timer);json.success&&json.success(result);json.complete&&json.complete();oHead.removeChild(oS);window[fnName]=null;};json.data[json.callback]=fnName;var arr=[];for(var i in json.data){arr.push(i+'='+encodeURIComponent(json.data[i]));}
var sData='&'+arr.join('&');var oS=document.createElement('script');oS.src=json.url+sData;var oHead=document.getElementsByTagName('head')[0];oHead.appendChild(oS);if(json.timeout){var jsonp_timer=setTimeout(function(){json.error&&json.error();json.complete&&json.complete();oHead.removeChild(oS);window[fnName]=null;},json.timeout);}}
function delCookie(m){document.cookie=m+"=;expires=Fri, 31 Dec 1999 23:59:59 GMT;path=/;domain=.sina.cn";}
window.getCookie=function(ckName){if(undefined==ckName||""==ckName){return false;}
return stringSplice(document.cookie,ckName,";","");}
var setCookie=function(key,value,expires,path,domain,m){var s=[];s.push(key+"="+escape(value));if(expires){var t=new Date();var p=t.getTime()+expires*3600000;t.setTime(p);s.push("expires="+t.toGMTString())}
if(path){s.push("path="+path)}
if(domain){s.push("domain="+domain)}
if(m){s.push(m)}
document.cookie=s.join(";")}
function stringSplice(src,k,e,sp){if(src==""){return"";}
sp=(sp=="")?"=":sp;k+=sp;var ps=src.indexOf(k);if(ps<0){return"";}
ps+=k.length;var pe=src.indexOf(e,ps);if(pe<ps){pe=src.length;}
return src.substring(ps,pe);}
var getSUBPCookie={__parse:function(arr_code){var s,kl,k,vl,v,i=0,j,res_obj={},tempK='',tempV='';if(!arr_code){return res_obj;}
do{kl=arr_code[i];s=++i;for(j=i;j<kl+s;j++,i++){tempK+=String.fromCharCode(arr_code[j]);}
vl=arr_code[i];s=++i;if(tempK=='status'||tempK=='flag'){for(j=i;j<vl+s;j++,i++){tempV+=arr_code[j];}}else{tempV=arr_code.slice(j,vl+s);try{tempV=arr2utf8(tempV);}catch(e){tempV='';}
i+=vl;}
res_obj[tempK]=tempV;tempK='';tempV='';}while(i<arr_code.length);return res_obj;},decode:function(input){var arr_code=[],keyVersion,version=input.substr(0,3),body=decodeURIComponent(input.substr(3));switch(version){case'002':arr_code=base64.decode(body,'subp_v2','array');return getSUBPCookie.__parse(arr_code);case'003':keyVersion=body.substr(0,1);body=body.substr(1);arr_code=base64.decode(body,'subp_v3_'+keyVersion,'array');return getSUBPCookie.__parse(arr_code);default:return decodeURIComponent(input);}}};var base64={encode:function(input){input=""+input;if(input=="")return"";var output='';var chr1,chr2,chr3='';var enc1,enc2,enc3,enc4='';var i=0;do{chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+this._keys.charAt(enc1)+this._keys.charAt(enc2)+this._keys.charAt(enc3)+this._keys.charAt(enc4);chr1=chr2=chr3='';enc1=enc2=enc3=enc4='';}while(i<input.length);return output;},decode:function(input,keys_type,returntype){var indexOf=function(arr,obj){for(var i=0;i<arr.length;i++){if(arr[i]===obj){return i;}}
return-1;}
if(typeof(input)=='string'){input=input.split('');}
var arr_code=[];var chr1,chr2,chr3='';var enc1,enc2,enc3,enc4='';if(input.length%4!=0){}
var base64test=/[^A-Za-z0-9+\/=]/;var keys=this._keys.split('');if(keys_type=="urlsafe"){base64test=/[^A-Za-z0-9-_=]/;keys=this._keys_urlsafe.split('');}
if(keys_type=="subp_v2"){base64test=/[^A-Za-z0-9_=-]/;keys=this._subp_v2_keys.split('');}
if(keys_type=="subp_v3_3"){base64test=/[^A-Za-z0-9-_.-]/;keys=this._subp_v3_keys_3.split('');}
var i=0;if(keys_type=="binnary"){keys=[];for(i=0;i<=64;i++){keys[i]=i+128;}}
if(keys_type!="binnary"&&base64test.test(input.join(''))){return returntype=="array"?[]:'';}
i=0;do{enc1=indexOf(keys,input[i++]);enc2=indexOf(keys,input[i++]);enc3=indexOf(keys,input[i++]);enc4=indexOf(keys,input[i++]);chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;arr_code.push(chr1);if(enc3!=64&&enc3!=-1){arr_code.push(chr2);}
if(enc4!=64&&enc4!=-1){arr_code.push(chr3);}
chr1=chr2=chr3='';enc1=enc2=enc3=enc4='';}while(i<input.length);if(returntype=="array"){return arr_code;}
var str='',j=0;for(;j<arr_code.lenth;j++){str+=String.fromCharCode(arr_code[j]);}
return str;},_keys:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',_keys_urlsafe:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',_subp_v2_keys:'uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=',_subp_v3_keys_3:'5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t'};var arr2utf8=function(arr){var out="",i=0;for(;i<arr.length;i++){out+="%"+byte2Hex(arr[i]);}
return decodeURIComponent(out);};var byte2Hex=function(b){var str="0"+b.toString(16);return str.length<=2?str:str.substr(1);};addLoadEvent(function(){getUserInfo(function(re){if(re.uid){sudaLogInit(re.uid);}else{sudaLogInit();}},true)});})();(function(){var storage={set:function(key,value,expires,path,domain){var s=[];s.push(key+"="+value);if(expires){var t=new Date();var p=t.getTime()+expires*3600000;t.setTime(p);s.push("expires="+t.toGMTString())}
if(path){s.push("path="+path)}
if(domain){s.push("domain="+domain)}
document.cookie=s.join(";")},getRecord:function(){var historyRecord=window.getCookie('historyRecord')||'';window.historyRecord=historyRecord=historyRecord?JSON.parse(historyRecord):historyRecord;return historyRecord;},setRecord:function(){var data={href:window.location.href,refer:document.referrer}
storage.set('historyRecord',JSON.stringify(data),24,'/','.sina.cn');}}
storage.setRecord();if(window.location.href.indexOf('//sina.cn')==-1){return;}
function heartbeat(fn){var heartbeat;var lastInterval;function clearTimers(){clearTimeout(heartbeat);}
function getTime(){return(new Date()).getTime();}
function intervalHeartbeat(){var now=getTime();var diff=now-lastInterval-200;lastInterval=now;if(diff>3000){clearTimers();fn&&fn();}}
lastInterval=getTime();heartbeat=setInterval(intervalHeartbeat,800);}
heartbeat(function(){var Record=storage.getRecord();if(Record&&Record.href.indexOf('//sina.cn')==-1){var refer=Record.href;}
else{var refer='';}
SUDA.log('','twice','',refer);heartbeat(function(){SUDA.log('','twice','',refer);})})})();(function(d,s,id){var prtl='https:'==window.location.protocol?'https://r.dmp.sina.cn':'http://cm.dmp.sina.cn'
setTimeout(function(){var n=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;s=d.createElement(s);s.id=id;s.setAttribute('charset','utf-8');s.src=prtl+'/cm/sinaads_ck_wap.js';n.parentNode.insertBefore(s,n);},1000)})(document,'script','sinaads-ck-script');(function(){if(window.location.href.indexOf('wm')==-1){return;}
var wm=getUrl(window.location.href,'wm');document.addEventListener('DOMNodeInserted',function(e){switch(e.target.tagName){case undefined:return;case"A":var arr=[e.target];break;default:var arr=e.target.querySelectorAll('a');}
fixHrefArgs(arr);},false);function fixHrefArgs(arr){function searchObject(searchStr){var obj={};if(!searchStr){return obj;}else{var items=searchStr.split('&');for(var i=0;i<items.length;i++){var o=items[i].split('=');if(o){obj[o[0]]=o[1];}}
return obj;}}
for(var i=0;i<arr.length;i++){var a=arr[i],href=a.getAttribute('href');if(href.indexOf('http')==-1){continue;}
var hasSearchIndex=href.lastIndexOf('?');var hasSearch=hasSearchIndex>-1;var searchStr=hasSearch?href.slice(hasSearchIndex+1):'';var obj=searchObject(searchStr);if(!obj.wm){href=hasSearch?href:href+'?';href=href+'&wm='+wm;href=href.replace("?&","?");a.setAttribute('href',href);}}}
function getUrl(str,name){var reg=new RegExp(name+"\=(.*?)(\&|$)");var r=str.match(reg);if(r!=null)
{return r[1];}
return'';}})();