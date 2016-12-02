define("appmsg/emotion/caret.js",[],function(e,t){
"use strict";
var t={};
return t.get=function(e){
var t=0;
if(document.selection){
e.focus();
var a=document.selection.createRange();
a.moveStart("character",-e.value.length),t=Sel.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
},t.set=function(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var a=e.createTextRange();
a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select();
}
},t;
});define("biz_wap/jsapi/cardticket.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var c=e("biz_wap/jsapi/core.js"),r={
openCardDetail:function(e){
function r(){
c.invoke("openCardDetail",{
card_id:e.card_id,
card_ext:e.card_ext
},function(c){
"open_card_detail:fail"==c.err_msg||"open_card_detail:ok"==c.err_msg||"open_card_detail:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("openCardDetail"):e.error&&e.error(c);
});
}
function n(){
c.invoke("batchAddCard",{
card_list:[{
card_id:e.card_id,
card_ext:e.card_ext
}]
},function(c){
"batch_add_card:ok"==c.err_msg||"batch_add_card:fail"==c.err_msg||"batch_add_card:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?r():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("batchAddCard"):e.error&&e.error(c);
});
}
n();
},
supportCardDetail:function(e){
c.invoke("openCardDetail",{
card_id:"err_id"
},function(c){
e.callback(c.err_msg.indexOf("function_not_exist")>=0?!1:!0);
});
},
openCard:function(e){
c.invoke("batchViewCard",{
cardList:[{
cardId:e.cardId,
code:e.code
}]
},function(c){
c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():e.success&&e.success(c);
});
}
};
return r;
});define("appmsg/emotion/map.js",[],function(){
"use strict";
return["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"];
});define("appmsg/emotion/textarea.js",["appmsg/emotion/map.js","appmsg/emotion/dom.js","appmsg/emotion/caret.js","biz_common/dom/class.js"],function(e,n){
"use strict";
function t(){
var e="translate3d(0, 0, 0)";
l.css({
webkitTransform:e,
transform:e
});
}
function a(){
var e=8;
l.on("keydown",function(n){
n.keyCode===e&&s(!0)&&n.preventDefault();
});
}
function s(e){
function n(){
var e=a-1;
0>e&&(e=0);
var n=s.slice(0,e),o=s.slice(a),i=+new Date;
t.value=n+o,p.set(t,e),r(+new Date-i);
}
var t=l.el[0],a=p.get(t),s=t.value,i=4,c=a-i;
0>c&&(c=0,i=a-c);
var m=s.slice(c,a),v=m.match(/\/([\u4e00-\u9fa5\w]+)$/g);
if(v){
var d=v[0],g=i-d.length,b=d.replace("/","");
if(o(b)){
var j=m.replace(d,""),_=s.slice(0,c)+j+s.slice(a),w=+new Date;
t.value=_,p.set(t,c+g),r(+new Date-w);
}else{
if(e)return!1;
n();
}
}else{
if(e)return!1;
n();
}
return e?(t.focus(),f.later(function(){
t.focus();
})):(t.blur(),f.later(function(){
t.blur();
})),u(t.value),!0;
}
function o(e){
for(var n=0,t=m.length;t>n;n++)if(m[n]==e)return!0;
return!1;
}
function i(e){
var n=l.el[0],t=p.get(n),a=n.value,a=a.slice(0,t)+"/"+e+a.slice(t);
n.value=a,p.set(n,t+e.length+1),n.blur(),f.later(function(){
n.blur();
}),u(a);
}
function r(){}
function u(e){
var n=c.el[0];
e.length<1?v.addClass(n,"btn_disabled"):v.removeClass(n,"btn_disabled");
}
var l,c,n={},m=e("appmsg/emotion/map.js"),f=e("appmsg/emotion/dom.js"),p=e("appmsg/emotion/caret.js"),v=e("biz_common/dom/class.js");
return n.init=function(){
l=f("#js_cmt_input"),c=f("#js_cmt_submit"),t(),a();
},n.inputEmotion=function(e,n){
-1===e?s(n):i(m[e-1]);
},n;
});define("appmsg/emotion/nav.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js"],function(n,o){
"use strict";
var t=n("appmsg/emotion/common.js"),a=n("appmsg/emotion/dom.js"),m=a.each,o={};
return o.activeNav=function(n){
t.currentPage=n;
var o=t.navs;
m(o,function(t,a){
a===n?o[a].attr("class","emotion_nav current"):o[a].attr("class","emotion_nav");
});
},o;
});define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:105,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:24
};
});define("appmsg/emotion/slide.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js","appmsg/emotion/nav.js"],function(n,t){
"use strict";
function o(){
function n(n){
n.preventDefault(),n.stopPropagation(),l||(g=!0,i=a(n),m.isMoved=!1,u=+new Date);
}
function t(n){
n.preventDefault(),n.stopPropagation(),!l&&g&&(r=a(n),h=r-i,e(),Math.abs(h)>6&&(m.isMoved=!0));
}
function o(){
l||(g=!1,s());
}
function a(n){
return n.touches&&n.touches.length>0?n.touches[0].clientX:n.clientX;
}
var i,r,u;
c.on("touchstart",n),c.on("mousedown",n),c.on("touchmove",t),c.on("mousemove",t),
c.on("touchend",o),c.on("mouseup",o);
}
function e(){
var n=m.WIDTH,t=-d*n+h,o=n/4;
t>o?t=o:u-o>t&&(t=u-o);
var e="translate3d("+t+"px, 0, 0)";
c.css({
webkitTransform:e,
transform:e
});
}
function s(){
var n=m.WIDTH,t=55,o=parseInt(h/n),e=h%n;
d-=o,Math.abs(e)>t&&(d-=Math.abs(e)/e*1),d>m.pageCount-1?d=m.pageCount-1:0>d&&(d=0),
h=0,a(d);
}
function a(n){
l=!0,f=-n*m.WIDTH,i(),e(),setTimeout(function(){
l=!1,r();
},T),v.activeNav(n);
}
function i(){
var n="all 0.3s ease";
c.css({
transition:n,
webkitTransition:n
});
}
function r(){
var n=c.el[0].style;
n.transition="",n.webkitTransition="";
}
var u,m=n("appmsg/emotion/common.js"),p=n("appmsg/emotion/dom.js"),t={},c=p("#js_slide_wrapper"),f=0,v=n("appmsg/emotion/nav.js"),l=!1,d=0,g=!1,h=0;
t.init=function(){
u=-m.wrapperWidth+m.WIDTH,o();
var n="translate3d(0, 0, 0)";
c.css({
webkitTransform:n,
transform:n
});
};
var T=300;
return t;
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",top.window.biz||"","&mid=",top.window.mid||"","&idx=",top.window.idx||"","&uin=",top.window.uin||"","&key=",top.window.key||"","&pass_ticket=",top.window.pass_ticket||"","&t=",Math.random(),"#wechat_redirect"].join(""),t=new Image;
t.src=i;
}
function t(e){
_({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:e.data
});
}
function o(e){
var i=e.data;
i.musicid=i.musicid.join(";"),i.hasended=i.hasended.join(";"),i.commentid=i.commentid.join(";"),
i.mtitle=i.mtitle.join(";#"),i.detail_click=i.detail_click.join(";"),i.duration=i.duration.join(";"),
i.errorcode=i.errorcode.join(";"),i.play_duration=i.play_duration.join(";"),_({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:i
});
}
function n(e){
document.domain="qq.com";
var i=window.cgiData&&window.cgiData.openid?window.cgiData.openid:"",t=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",a(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function d(e){
if(3==e.step||6==e.step||1999==e.step){
document.domain="qq.com";
var i=window.cgiData&&window.cgiData.openid?window.cgiData.openid:"",t=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",a(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function a(){
var e=l.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=l.device;
return e.ipad?"v4010":e.is_android_phone&&l.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&l.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||"",
__biz:window.biz||"",
idx:window.idx||"",
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
duration:[],
play_duration:[],
errorcode:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:"",
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:0,
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.openid?window.cgiData.openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown"
};
return e;
}
var _=e("biz_wap/utils/ajax.js"),l=e("pages/version4video.js");
return{
report:i,
videoreport:t,
getPlatformType:a,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:d,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_common/utils/monitor.js"],function(t){
"use strict";
function o(t){
this._o={
type:0,
src:"",
mid:"",
songId:"",
autoPlay:!1,
duration:0,
debug:!1,
needVioceMutex:!0,
appPlay:!0,
title:"",
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){}
},this._extend(t),this._status=-1,this._g={
_playtype:m._playtype
},this._fixAndroidSizeLimit(),0!==m.surportType&&(this._o.needVioceMutex&&m.mutexPlayers.push(this),
this._o.autoPlay&&this.play());
}
function i(t){
y.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:m.ev,
lowbandUrl:m.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(o){
!!m.emptyVoiceTimeoutId&&clearTimeout(m.emptyVoiceTimeoutId),"function"==typeof t&&t(o);
}),"function"==typeof t&&(m.emptyVoiceTimeoutId=setTimeout(function(){
t({});
},1e3));
}
function e(t){
for(var o=0,i=m.mutexPlayers.length;i>o;o++){
var e=m.mutexPlayers[o];
e&&"function"==typeof e._onPause&&e!=t&&(e._h5Audio&&"function"==typeof e._h5Audio.pause?e._h5Audio.pause():1==e.getSurportType()&&e._pauseJsapiPlay(1==t.getSurportType()?!1:!0));
}
}
function n(){
return m.surportType;
}
function s(t){
return new o(t);
}
function u(){
m.surportType>0&&m.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function a(){
for(var t=0,o=0,i=m.keyConf.length;i>o;o++){
var e=m.keyConf[o]||"";
e?/^offset_/.test(e)?t+=1*e.replace(/^offset_/,""):(m.reportData[e]={
key:t,
count:0
},t++):t++;
}
c.on(window,"unload",r);
}
function r(){
for(var t=0,o=m.mutexPlayers.length;o>t;t++){
var i=m.mutexPlayers[t];
if(i&&1==i._status&&1==i._surportType){
d(i._o.type,"unload_wx_pv",1);
break;
}
}
p();
}
function p(){
var t=m.reportId;
for(var o in m.reportData){
var i=m.reportData[o];
i.count>0&&f.setSum(t,i.key,i.count);
}
f.send();
}
function d(t,o,i){
0==t||1==t?o="m_"+o:(2==t||3==t)&&(o="v_"+o),m.reportData[o]&&(i=i||1,m.reportData[o].count+=i,
m.debug&&console.log("addpv:"+o+" count:"+m.reportData[o].count));
}
function h(t){
var o=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=o.substr(o.indexOf("?")+1).match(i);
return null!=e?e[2]:"";
}
var _=t("biz_wap/utils/mmversion.js"),c=t("biz_common/dom/event.js"),y=t("biz_wap/jsapi/core.js"),l=t("pages/version4video.js"),f=t("biz_common/utils/monitor.js"),m={
mutexCount:0,
ev:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0?!0:!1,
_playtype:1*h("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:_.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:[],
reportId:"28306",
keyConf:["m_pv","m_wx_pv","m_h5_pv","m_unload_wx_pv","v_pv","v_wx_pv","v_h5_pv","v_unload_wx_pv","offset_22","force_h5"],
reportData:{}
};
return a(),u(),o.prototype._fixAndroidSizeLimit=function(){
if(!(1*m._playtype>0)&&m.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||_.gtVersion("6.3.28",!0)||(d(-1,"force_h5",1),this._g._playtype=2);
}
},o.prototype._createAutoAndPlay=function(){
function t(){
if(this._h5Audio=document.createElement("audio"),this._H5bindEvent(),this._h5Audio.setAttribute("style","height:0;width:0;display:none"),
this._h5Audio.setAttribute("autoplay",""),this._status=0,m.isAndroidLow)this._h5Audio.src=this._o.src,
document.body.appendChild(this._h5Audio),this._h5Audio.load();else{
document.body.appendChild(this._h5Audio);
var t=this;
setTimeout(function(){
t._h5Audio.src=t._o.src,t._h5Audio.play();
},0);
}
this._surportType=2;
}
l.device.inWechat?this._stopJsapiPlay(!0,t):t.call(this);
},o.prototype._destoryH5Audio=function(){
this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),document.body.removeChild(this._h5Audio),
this._h5Audio=null,this._status=-1,this._surportType=0);
},o.prototype._createApp=function(t){
this.debug("createApp"),this._h5Audio&&this._destoryH5Audio();
var o=this,i=this._o;
y.invoke("musicPlay",{
app_id:"a",
title:i.title,
singer:i.singer,
epname:i.epname,
coverImgUrl:i.coverImgUrl,
dataUrl:i.src,
lowbandUrl:i.src,
webUrl:i.webUrl
},function(e){
o.debug("musicPlay res:"+JSON.stringify(e)),o._g.checkJsapiTimeoutId&&clearTimeout(o._g.checkJsapiTimeoutId),
e.err_msg.indexOf("ok")>=0?(d(o._o.type,"wx_pv",1),o._surportType=1,m.surportType=1,
o.jsApiData&&o.jsApiData.updateTimeoutId&&clearTimeout(o.jsApiData.updateTimeoutId),
o.jsApiData={
starTime:+new Date,
curTime:0,
updateTimeoutId:null,
duration:i.duration||void 0
},o._onPlay(),"undefined"!=typeof i.duration&&1*i.duration>0&&o._analogUpdateTime()):2===m.surportType?o._h5Play(t):o._onError({},15);
});
},o.prototype._analogUpdateTime=function(){
function t(){
return i.curTime=1*((+new Date-i.starTime)/1e3).toFixed(2),i.curTime>=i.duration?void o._stopJsapiPlay(!1):(o._onTimeupdate(null,i.curTime),
void(i.updateTimeoutId=setTimeout(function(){
t();
},1e3)));
}
var o=this,i=o.jsApiData;
t();
},o.prototype._onPlay=function(t){
this._status=1;
try{
e(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},o.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},o.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},o.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},o.prototype._onTimeupdate=function(t,o){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},o);
},o.prototype._onError=function(t,o){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},o);
},o.prototype._H5bindEvent=function(){
var t=this;
this._h5Audio.addEventListener("play",function(o){
t._onPlay(o);
},!1),this._h5Audio.addEventListener("ended",function(o){
t._onEnd(o);
},!1),this._h5Audio.addEventListener("pause",function(o){
t._onPause(o);
},!1),this._h5Audio.addEventListener("error",function(o){
var i=o.target.error.code;
(1>i||i>5)&&(i=5),t._onError(o,i);
},!1),"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",function(o){
t._onTimeupdate(o,t._h5Audio.currentTime);
},!1),"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",function(o){
t._onLoadedmetadata(o);
},!1);
},o.prototype._extend=function(t){
for(var o in t)this._o[o]=t[o];
},o.prototype._pauseJsapiPlay=function(t,o){
this._stopJsapiPlay(t,o);
},o.prototype._stopJsapiPlay=function(t,o){
function e(){
s&&(s.updateTimeoutId&&clearTimeout(s.updateTimeoutId),s.updateTimeoutId=null,s.curTime=0),
n._onTimeupdate(null,0),n._onEnd(),"function"==typeof o&&o.call(n);
}
var n=this,s=n.jsApiData;
t?i(function(){
e(o);
}):e(o);
},o.prototype._h5Play=function(t){
1*m.surportType>0&&(d(this._o.type,"h5_pv",1),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._h5Audio.ended&&(this._h5Audio.currentTime=0),
"undefined"!=typeof t?(this._h5Audio.currentTime=t,this._h5Audio.play()):this._h5Audio.play()):this._createAutoAndPlay());
},o.prototype.getSurportType=function(){
return this._surportType||0;
},o.prototype.getPlayStatus=function(){
return this._status;
},o.prototype.getCurTime=function(){
return 1==this._surportType&&this.jsApiData?this.jsApiData.curTime||0:this._h5Audio?this._h5Audio.currentTime:0;
},o.prototype.getDuration=function(){
return 1==this._surportType&&this.jsApiData?this.jsApiData.duration||void 0:this._h5Audio?this._h5Audio.duration||this._o.duration:void 0;
},o.prototype.pause=function(){
1==this._surportType?this._pauseJsapiPlay(!0):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause();
},o.prototype.stop=function(){
2==this._surportType&&this._h5Audio?(this._h5Audio.pause(),this._h5Audio.currentTime=0,
this._onEnd()):1==this._surportType&&this._stopJsapiPlay(!0);
},o.prototype.play=function(t){
var o=this,i=this._g;
d(this._o.type,"pv",1),i.checkJsapiTimeoutId&&clearTimeout(i.checkJsapiTimeoutId),
l.device.inWechat&&this._o.appPlay&&2!=i._playtype?1!=this._status&&(this._createApp(t),
i.checkJsapiTimeoutId=setTimeout(function(){
o.debug("jsapi timeout,change to h5 play"),o._h5Play(t);
},1e3)):this._h5Play(t);
},o.prototype.debug=function(t){
m.debug&&console.log(t);
},o.prototype.monitor=function(t,o){
d(-1,t,o);
},{
init:s,
getSurportType:n
};
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=document.createElement("script"),r=document.head||document.getElementsByTagName("head")[0]||document.documentElement,a=t.url+"&t="+Math.random(),d=t.callbackName,i="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,c="undefined"==typeof t.timeoutCode?500:t.timeoutCode,l="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,s=!1,f=null,m=function(e){
o&&!s&&(s=!0,f&&(clearTimeout(f),f=null),o.onload=o.onreadystatechange=o.onerror=null,
r&&o.parentNode&&r.removeChild(o),o=null,d&&-1==d.indexOf(".")&&(window[d]=null),
e!=u&&"loaded"!=i&&"function"==typeof t.onerror&&t.onerror(e));
};
if(d&&"function"==typeof t.callback){
var p=d;
-1==d.indexOf(".")&&(d=window[d]?d+e.counter++:d,window[d]=function(){
i="loaded",t.callback.apply(null,arguments);
}),a=a.replace("="+p,"="+d);
}
o.onload=o.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&m("loaded"==i?u:l);
},o.onerror=function(){
return n>0?(t.retry=n-1,f&&(clearTimeout(f),f=null),void e(t)):void m(l);
},t.timeout&&(f=setTimeout(function(){
m(c);
},parseInt(t.timeout,10))),i="loading",o.charset="utf-8",setTimeout(function(){
o.src=a;
try{
r.insertBefore(o,r.lastChild);
}catch(e){}
},0);
}
return e;
});define("appmsg/emotion/dom.js",["biz_common/dom/event.js"],function(t){
"use strict";
function e(t){
if("string"==typeof t){
document.querySelectorAll||!function(){
var t=document.createStyleSheet(),e=function(e,n){
var i,o=document.all,r=o.length,u=[];
for(t.addRule(e,"foo:bar"),i=0;r>i&&!("bar"===o[i].currentStyle.foo&&(u.push(o[i]),
u.length>n));i+=1);
return t.removeRule(0),u;
};
document.querySelectorAll=function(t){
return e(t,1/0);
};
}();
var e=document.querySelectorAll(t);
}else e=[t];
return{
el:e,
on:function(t,e){
return this.each(function(n){
i.on(n,t,e);
}),this;
},
hide:function(){
return this.each(function(t){
t.style.display="none";
}),this;
},
show:function(){
return this.each(function(t){
t.style.display="block";
}),this;
},
each:function(t){
return n(this.el,t),this;
},
width:function(){
return this.el[0].clientWidth;
},
css:function(t){
return this.each(function(e){
for(var n in t)e.style[n]=t[n];
}),this;
},
attr:function(t,e){
var n=this.el[0];
return e?(n.setAttribute(t,e),this):n.getAttribute(t);
},
append:function(t){
return t.el&&(t=t.el[0]),this.el[0].appendChild(t),this;
},
html:function(t){
this.each(function(e){
e.innerHTML=t;
});
}
};
}
function n(t,e){
for(var n=0,i=t.length;i>n;n++)e(t[n],n);
}
var i=t("biz_common/dom/event.js");
return e.el=function(t){
return document.createElement(t);
},e.later=function(t){
setTimeout(t,3);
},e.log=function(){},e.each=n,e;
});define("biz_wap/utils/hashrouter.js",[],function(){
"use strict";
function e(e,s){
h.push([e,s]);
}
function s(){
var e,s,t,i,r=a.hash.substr(1),o=!1,u=[];
for(e=0;e<h.length;e++)if(s=h[e],t=s[0],i=s[1],"default"!==t){
if("string"==typeof t&&t==r||t instanceof RegExp&&t.test(r)){
i(n),o=!0;
break;
}
}else u.push(i);
o||u.forEach(function(e){
e(n);
}),n=r;
}
var t=top.window,a=t.location,n=a.hash.substr(1),h=t.__HashMap=t.__HashMap||[];
return t.__hasListenedHashChange||(t.addEventListener("hashchange",s),t.addEventListener("load",s),
t.__hasListenedHashChange=!0),{
get:e
};
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in p)r({
pid_uin_rid:e,
speeds:p[e]
},c);
p={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
p[n]||(p[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(p),p[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
p[e]=p[e]||[],p[e][n]=p[e][n]||[],0>t||(21>n?p[e][n][0]=t:p[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
for(var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2],i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():u.push(e);
}
function a(){
for(var e=0;e<u.length;e++)u[e]();
u=[];
}
var p={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",u=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js"],function(o){
"use strict";
function e(o,e){
t("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+o+e.report_param);
}
function i(o){
var i=o.adData,t=o.pos_type,p=i.traceid,c=o.a_info.type,l=i.adid,_=i.url,m=o.a_info.rl;
110==i.pt&&(_=_.replace("#","&AdType=80#"));
var d={};
o.report_param=o.report_param||"";
var u=o.adDetailBtn,f=o.adMoreBtn,h=(o.adMessage,o.adAbout),b=o.adImg,y={
type:c,
report_type:2,
url:encodeURIComponent(_),
tid:p,
rl:encodeURIComponent(m),
__biz:biz,
pos_type:t,
pt:i.pt,
click_pos:""
};
n.on(window,"touchend",function(o){
o.target!=h&&o.target!=u&&(h.style.display="none");
}),n.on(document.getElementById("js_ad_inner"),"click",function(i){
return"js_main_img"==i.target.id?d[p+"_1"]||(d[p+"_1"]=!0,y.click_pos=1,s(y,function(){
e(87,o),d[p+"_1"]=!1,a.isWp||a.isIOS?r.invoke("openUrlWithExtraWebview",{
url:_,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(location.href=_);
}):location.href=_;
})):d[p+"_2"]||(d[p+"_2"]=!0,y.click_pos=2,s(y,function(){
e(88,o),d[p+"_2"]=!1,a.isWp||a.isIOS?r.invoke("openUrlWithExtraWebview",{
url:_,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(location.href=_);
}):location.href=_;
})),!1;
}),n.on(f,"click",function(){
return d[p+"_3"]||(d[p+"_3"]=!0,y.click_pos=3,s(y,function(){
e(89,o),d[p+"_3"]=!1,a.isWp||a.isIOS?r.invoke("openUrlWithExtraWebview",{
url:_,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(location.href=_);
}):location.href=_;
})),!1;
}),n.on(u,"click",function(){
return e(90,o),h.style.display="none"==window.getComputedStyle(h).display?"initial":"none",
!1;
}),n.on(h,"click",function(){
e(91,o);
var i="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+l+"&tid="+p+"#wechat_redirect";
return a.isWp||a.isIOS||a.isAndroid?r.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(location.href=i);
}):location.href=i,!1;
}),n.on(window,"resize",function(){
setTimeout(function(){
var o=js_sponsor_ad_area.clientWidth;
b.style.height=o/1.77+"px";
},0);
});
}
var n=o("biz_common/dom/event.js"),t=o("biz_common/utils/report.js"),r=o("biz_wap/jsapi/core.js"),a=o("biz_wap/utils/mmversion.js"),p=o("a/a_report.js"),s=(o("biz_common/utils/url/parse.js"),
p.AdClickReport);
return i;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function d(a){
h("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+z.report_param);
}
function o(a,t){
z.app_status=a,"downloading"==a?(t=t||0,z.btn.innerHTML='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value">'+t+"%</span>",
f.addClass(z.btn,"with_processor")):(f.removeClass(z.btn,"with_processor"),z.btn.innerHTML=j[a]);
}
function i(a){
var t=a.js_app_rating,n=1*z.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var e=["","one","two","three","four","five"],d="",o=Math.floor(n);
if(d="star_"+e[o],n>o&&(n=o+.5,d+="_half"),t&&n>0){
var i=t.getElementsByClassName("js_stars"),l=t.getElementsByClassName("js_scores");
i&&l&&i[0]&&l[0]&&(i=i[0],l=l[0],i.style.display="inline-block",f.addClass(i,d));
}
}
function l(a){
"undefined"!=typeof b&&b.log&&b.log(a);
}
function s(){
b.on("wxdownload:progress_change",function(a){
a.download_id==z.download_id&&o("downloading",a.progress);
});
}
function r(){
z.download_id&&b.invoke("queryDownloadTask",{
download_id:z.download_id
},function(a){
if(l("queryDownloadTask : "+a.state+"; dowloadid = "+z.download_id),a&&a.state){
if("download_succ"==a.state&&(o("downloaded"),window.clearInterval(z.clock)),"downloading"==a.state)return;
("download_fail"==a.state||"default"==a.state)&&(window.clearInterval(z.clock),window.clearInterval(z.install_clock),
e("下载失败"),o("download"));
}
});
}
function p(){
b.invoke("getInstallState",{
packageName:z.data.pkgname,
download_id:z.download_id
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(l("getInstallState @app, version : "+t),
window.clearInterval(z.install_clock),o(z.url_scheme?"gotodetail":"installed"));
});
}
function c(){
b.invoke("pauseDownloadTask",{
packageName:z.data.pkgname,
download_id:z.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&o("paused");
});
}
function _(){
b.invoke("resumeDownloadTask",{
packageName:z.data.pkgname,
download_id:z.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&o("downloading");
});
}
function m(){
var t=z.data.url,n=a("biz_common/utils/url/parse.js");
(!t||0!=t.indexOf("http://mp.weixin.qq.com/tp/")&&0!=t.indexOf("https://mp.weixin.qq.com/tp/"))&&(t="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+z.data.app_id+(z.appdetail_params||"")+"&channel_id="+z.channelid+"&md5sum="+z.data.md5sum+"#wechat_redirect"),
z.url_scheme&&(t=n.join(t,{
is_installed:"1"
})),location.href=t;
}
function u(a){
if(z.btn=a.btn,!z.btn)return!1;
z.data=a.adData,z.url_scheme=a.url_scheme,z.appdetail_params=a.appdetail_params||"";
var t={};
z.channelid=z.data.channel_id||"",z.report_param=a.report_param;
var n=20;
if(("103"==z.data.pt||"104"==z.data.pt)&&i(a),"104"==z.data.pt||"113"==z.data.pt||"114"==z.data.pt){
var u=z.data.androiddownurl;
if(u&&u.match){
var f=/&channelid\=([^&]*)/,g=u.match(f);
g&&g[1]&&(z.channelid=g[1],z.data.androiddownurl=u.replace(f,""));
}
z.channelid&&(z.channelid="&channelid="+z.channelid),a.via&&(z.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
b.ready(function(){
("113"==z.data.pt||"114"==z.data.pt||"104"==z.data.pt)&&(b.invoke("getInstallState",{
packageName:I
},function(a){
var t=a.err_msg;
l("getInstallState @yingyongbao : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=x&&t.indexOf("get_install_state:yes")>-1&&(y=!0);
}),b.invoke("getInstallState",{
packageName:z.data.pkgname
},function(a){
var t=a.err_msg;
l("getInstallState @"+z.data.pkgname+" : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=z.data.versioncode&&t.indexOf("get_install_state:yes")>-1&&o(z.url_scheme?"gotodetail":"installed");
})),w.on(z.btn,"click",function(i){
if("installed"==z.app_status)return o("installed"),!1;
if("gotodetail"==z.app_status)return d(74),m(),!1;
if("downloading"==z.app_status)return d(71),c(),!1;
if("paused"==z.app_status)return d(72),_(),!1;
if("downloaded"==z.app_status)return d(73),b.invoke("installDownloadTask",{
download_id:z.download_id,
file_md5:z.data.md5sum
},function(a){
var t=a.err_msg;
l("installDownloadTask : "+t),t.indexOf("install_download_task:ok")>-1?z.install_clock=setInterval(p,1e3):e("安装失败！");
}),!1;
var u=function(){
if("103"==z.data.pt||"111"==z.data.pt||"112"==z.data.pt){
d(23);
var t="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(z.data.appinfo_url)+"&uin="+uin+"&ticket="+(z.data.ticket||window.ticket);
b.invoke("downloadAppInternal",{
appUrl:z.data.appinfo_url
},function(a){
a.err_msg&&-1!=a.err_msg.indexOf("ok")||(location.href=t);
});
}else{
if(y)return d(16),void(location.href="tmast://download?oplist=1,2&pname="+z.data.pkgname+z.channelid+z.via);
d(15);
var i=[z.data.adid,z.data.traceid,(z.data.pkgname||"").replace(/\./g,"_"),z.data.source,n,a.engine].join(".");
b.invoke("addDownloadTask",{
task_name:z.data.appname,
task_url:z.data.androiddownurl,
extInfo:i,
file_md5:z.data.md5sum
},function(a){
var t=a.err_msg;
l("addDownloadTask : "+t),t.indexOf("add_download_task:ok")>-1?(z.download_id=a.download_id,
l("download_id : "+z.download_id),o("downloading"),z.clock=setInterval(r,1e3),z.install_clock=setInterval(p,1e3),
s()):e("调用下载器失败！");
});
}
};
if("download"==z.app_status&&z.data.rl&&z.data.traceid){
if(!t[z.data.traceid]){
t[z.data.traceid]=!0;
var w,f,g,h,j=!!i&&i.target;
j&&(w=v.getX(j,"js_ad_link")+i.offsetX,f=v.getY(j,"js_ad_link")+i.offsetY,g=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
k({
type:z.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(z.data.androiddownurl),
tid:z.data.traceid,
rl:encodeURIComponent(z.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:z.data.pt,
pos_x:w,
pos_y:f,
ad_w:g||0,
ad_h:h||0
},function(){
t[z.data.traceid]=!1,u();
});
}
}else u();
return!1;
});
});
}
var w=a("biz_common/dom/event.js"),f=a("biz_common/dom/class.js"),g=a("a/a_report.js"),k=g.AdClickReport,v=a("biz_wap/utils/position.js"),h=a("biz_common/utils/report.js"),b=a("biz_wap/jsapi/core.js"),j={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},y=!1,I="com.tencent.android.qqdownloader",x=1060125,z={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:""
};
return u;
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function i(t){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(t);
}
function o(t,i){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+i.report_param);
}
function e(t){
var e=t.btn;
if(!e)return!1;
var n=t.adData,p=!1,c={};
t.report_param=t.report_param||"";
var d="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&uin"+uin+"&ticket="+(t.ticket||window.ticket);
r.on(e,"click",function(){
if(i("click @js_app_action"),p)return i("is_app_installed"),o(n.is_appmsg?17:13,t),
void(location.href=n.app_id+"://");
var e=function(){
i("download"),o(n.is_appmsg?15:11,t),i("go : "+d),location.href=d;
};
return i("download"),n.rl&&n.traceid?c[n.traceid]||(c[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+t.report_param,
type:"GET",
timeout:1e3,
complete:function(){
i("ready to download"),c[n.traceid]=!1,e();
},
async:!0
})):e(),!1;
});
}
{
var r=t("biz_common/dom/event.js"),n=t("biz_common/utils/report.js"),a=t("biz_wap/utils/ajax.js");
t("biz_wap/jsapi/core.js");
}
return e;
});