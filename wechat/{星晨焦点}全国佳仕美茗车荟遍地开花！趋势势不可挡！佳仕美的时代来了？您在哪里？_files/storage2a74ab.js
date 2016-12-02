define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),i=function(e,i){
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=top.window.user_uin||0,n=0!==t&&Math.floor(t/100)%1e3<o;
return n?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>Topic</span>\n            <span class="topic_info_primary">{msg_num} Related Article(s)</span>\n        </span>\n    </span>\n</span>\n';
});define("pages/voice_tpl.html.js",[],function(){
return'<span id="voice_main_<#=voiceid#>_<#=posIndex#>" class="db audio_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="audio_wrp db">\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" class="audio_play_area">\n            <i class="icon_audio_default"></i>\n            <i class="icon_audio_playing"></i>\n            <img src="<#=window.icon_audio_unread#>" alt="" class="pic_audio_default">\n        </span>\n        <span class="audio_length tips_global"><#=duration_str#></span>\n        <span class="db audio_info_area">\n            <strong class="db audio_title"><#=title#></strong>\n            <span class="audio_source tips_global"><#if(window.nickname){#>来自<#=window.nickname#><#}#></span>\n        </span>\n        <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" class="progress_bar" style="width:0px;"></span>\n    </span>\n</span>\n';
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/loadscript.js","pages/music_player.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js"],function(t,e,o,r){
"use strict";
function i(t){
this._o={
type:0,
comment_id:"",
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
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
playingCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0
},this._init(t);
}
function n(t,e,o,r){
I.num++,e.musicSupport=I.musicSupport,e.show_not_support=!1,I.musicSupport||1!=I.num||(e.show_not_support=!0);
var i=document.createElement("div"),n="";
n=r?y.render(t,e):y.tmpl(t,e),i.innerHTML=n;
var s=o.parentNode;
s&&(s.lastChild===o?s.appendChild(i.children[0]):s.insertBefore(i.children[0],o.nextSibling));
}
function s(){
"undefined"==typeof window.reportVoiceid&&(window.reportVoiceid=[]),"undefined"==typeof window.reportMid&&(window.reportMid=[]);
}
function p(){
m.on(window,"unload",a);
}
function a(){
for(var t in I.reportData)g.musicreport({
data:I.reportData[t]
});
}
function c(t){
f.setSum(I.reportId,18,1),f.send();
var e=+new Date,o="//open.music.qq.com/fcgi-bin/fcg_music_get_song_info_weixin.fcg?song_id=#songid#&mid=#mid#&format=json&app_id=100311669&app_key=55d6cdaee6fb3a41275a48067f8d7638&device_id=weixin&file_type=mp3&qqmusic_fromtag=50&callback=get_song_info_back";
o=o.replace("#mid#",t.mid).replace("#songid#",t.id),_({
url:o,
timeout:3e4,
callbackName:"get_song_info_back",
callback:function(o){
var r=+new Date-e;
if(!o||"undefined"==typeof o.ret){
var i=1;
return d({
type:"error",
time:r,
code:i
}),void("function"==typeof t.onError&&t.onError({
errcode:i
}));
}
var n;
n=0==o.ret?1:1001==o.ret?0:1002==o.ret?2:1003==o.ret?3:1004==o.ret?4:5,d({
type:"success",
time:r,
code:n
}),t.onSuc({
status:n
});
},
onerror:function(o){
var r=+new Date-e,i=4;
switch(1*o){
case 400:
i=2;
break;

case 500:
i=3;
break;

default:
i=4;
}
d({
type:"error",
time:r,
code:i
}),"function"==typeof t.onError&&t.onError({
errcode:i
});
}
});
}
function d(t){
var e=Math.max(t.time,0);
if(e=Math.min(e,6e4),t.time>=0&&t.time<200?f.setSum(I.reportId,24,1):t.time>=200&&t.time<500?f.setSum(I.reportId,25,1):t.time>=500&&t.time<1e3?f.setSum(I.reportId,26,1):t.time>=1e3&&t.time<2e3?f.setSum(I.reportId,27,1):t.time>=2e3&&t.time<1e4?f.setSum(I.reportId,28,1):t.time>=1e4&&f.setSum(I.reportId,29,1),
f.setAvg(I.reportId,23,e),"error"==t.type){
switch(1*t.code){
case 1:
f.setSum(I.reportId,9,1);
break;

case 2:
f.setSum(I.reportId,10,1);
break;

case 3:
f.setSum(I.reportId,11,1);
break;

case 4:
f.setSum(I.reportId,12,1);
}
f.setSum(I.reportId,19,1);
}else if("success"==t.type){
switch(1*t.code){
case 0:
f.setSum(I.reportId,8,1);
break;

case 1:
f.setSum(I.reportId,17,1);
break;

case 2:
f.setSum(I.reportId,13,1);
break;

case 3:
f.setSum(I.reportId,14,1);
break;

case 4:
f.setSum(I.reportId,15,1);
break;

case 5:
f.setSum(I.reportId,16,1),f.setSum(I.reportId,17,1);
}
f.setSum(I.reportId,20,1);
}
f.send();
}
function u(t){
return new i(t);
}
var m=t("biz_common/dom/event.js"),y=t("biz_common/tmpl.js"),_=t("pages/loadscript.js"),l=t("pages/music_player.js"),h=t("biz_common/dom/class.js"),g=t("pages/report.js"),f=t("biz_common/utils/monitor.js"),I={
reportId:"28306",
musicSupport:l.getSurportType(),
reportData:{},
posIndex:{},
qqMusiceSongId:"http://thirdparty.gtimg.com/#songId#.m4a?fromtag=38&songid=#songId#",
qqMusiceMid:"http://thirdparty.gtimg.com/C100#mid#.m4a?fromtag=38&songid=#songId#",
num:0
};
return s(),p(),i.prototype._init=function(t){
this._extend(t),this._g={
copyright:-1,
check_copyright:!1
},this._initSrc(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer(),
this._playEvent();
},i.prototype._initSrc=function(){
var t=this._o;
t.src||(0==t.type||1==t.type)&&(t.mid?t.src=I.qqMusiceMid.replace("#mid#",t.mid).replace(/#songId#/g,t.songId||""):t.songId&&(t.src=I.qqMusiceSongId.replace(/#songId#/g,t.songId||"")));
},i.prototype._initQQmusicLyric=function(){
var t=this._o;
t.webUrl=0==t.type||1==t.type?t.webUrl.replace("#songId#",t.songId||"").replace("#referFrom#","music.qq.com"):t.webUrl.replace("#songId#","").replace("#referFrom#","");
},i.prototype._initReportData=function(){
var t=this._o;
2==t.type||3==t.type?window.reportVoiceid.push(t.songId):(0==t.type||1==t.type)&&window.reportMid.push(t.songId),
"undefined"==typeof I.reportData[t.type]&&(I.reportData[t.type]=g.getMusicReportData(t),
I.posIndex[t.type]=0),this._g.posIndex=I.posIndex[t.type]++;
var e=I.reportData[t.type];
e.musicid.push(t.songId),e.commentid.push(t.comment_id),e.hasended.push(0),e.mtitle.push(t.title),
e.detail_click.push(0),e.duration.push(parseInt(1e3*t.duration)),e.errorcode.push(0),
e.play_duration.push(0);
},i.prototype._initPlayer=function(){
I.musicSupport&&(this._o.onStatusChange=this._statusChangeCallBack(),this._o.onTimeupdate=this._timeupdateCallBack(),
this._o.onError=this._errorCallBack(),this.player=new l.init(this._o));
},i.prototype._playEvent=function(){
var t=this,e=this._o,o=this._g;
if(I.musicSupport){
var r=0;
2==e.type||3==e.type?r=3:(0==e.type||1==e.type)&&(r=1),m.tap(e.playArea,function(){
return h.hasClass(e.playCssDom,e.playingCss)?(t.player.stop(),g.report({
type:r,
comment_id:e.comment_id,
voiceid:e.songId,
action:5
})):3==r?t._playMusic(3):1==r&&t._checkCopyright(function(){
t._playMusic(1);
}),!1;
});
}
e.detailUrl&&e.detailArea&&m.tap(e.detailArea,function(){
t._checkCopyright(function(){
I.reportData[e.type].detail_click[o.posIndex]=1,window.location.href=e.detailUrl;
});
});
},i.prototype._checkCopyright=function(t){
var e=this,o=this._o,r=this._g;
return this._musicCopyrightWarnning()===!1?void("function"==typeof t&&t()):void(r.check_copyright||(r.check_copyright=!0,
c({
id:o.songId,
mid:o.mid,
onSuc:function(o){
r.check_copyright=!1,r.copyright=1*o.status,e._musicCopyrightWarnning()===!1&&"function"==typeof t&&t();
},
onError:function(){
r.check_copyright=!1;
}
})));
},i.prototype._musicCopyrightWarnning=function(){
var t=this._g;
return 1*t.copyright===-1?!0:1*t.copyright===0?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===2?(r("抱歉，应版权方要求，当前国家或地区暂不提供此歌曲服务"),
!0):1*t.copyright===3?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===4?(r("抱歉，歌曲信息不正确"),
!0):!1;
},i.prototype._playMusic=function(t){
var e=this._o,o=this._g;
this.player.play(0),I.reportData[e.type].hasended[o.posIndex]=1,g.report({
type:t,
comment_id:e.comment_id,
voiceid:e.songId,
action:4
});
},i.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},i.prototype._statusChangeCallBack=function(){
var t=this;
return function(e,o){
t._updatePlayerCss(this,o);
};
},i.prototype._timeupdateCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
t._updateProgress(this,i),0!=i&&(I.reportData[e.type].play_duration[o.posIndex]=parseInt(1e3*i));
};
},i.prototype._errorCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
I.reportData[e.type].errorcode[o.posIndex]=i,t._updatePlayerCss(this,3);
};
},i.prototype._updatePlayerCss=function(t,e){
var o=this._o,r=o.playCssDom,i=o.progress;
2==e||3==e?(h.removeClass(r,o.playingCss),!!i&&(i.style.width=0)):1==e&&h.addClass(r,o.playingCss);
},i.prototype._updateProgress=function(t,e){
var o=this._o,r=o.progress,i=t.getDuration();
i&&r&&(r.style.width=this._countProgress(i,e));
},i.prototype._countProgress=function(t,e){
return e/t*100+"%";
},{
init:u,
renderPlayer:n
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=comment_id#>_<#=posIndex#>" class="db qqmusic_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db qqmusic_wrp">\n        <span class="db qqmusic_bd">\n            <span id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="play_area">\n                <i class="icon_qqmusic_switch"></i>\n                <img src="<#=window.icon_qqmusic_default#>" alt="" class="pic_qqmusic_default">\n                <img src="<#=music_img#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="qqmusic_thumb" alt="">\n            </span>\n            <!--\n            <%@if($show_comment.DATA$=1)%>\n            <span id="qqmusic_love_icon_<#=musicid#>_<#=posIndex#>" class="qqmusic_love">\n                <i class="icon_love"></i>\n                <span id="love_text_<#=comment_id#>_<#=posIndex#>" class="love_num">Like</span>\n            </span>\n            <%@endif%>\n            -->\n            <a id="qqmusic_home_<#=musicid#>_<#=posIndex#>" href="javascript:void(0);" class="access_area">\n                <span class="qqmusic_songname"><#=music_name#></span>\n                <span class="qqmusic_singername"><#=singer#></span>\n                <span class="qqmusic_source"><img src="<#=window.icon_qqmusic_source#>" alt=""></span>\n            </a>\n        </span>\n    </span>       \n</span>\n';
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(i){
"use strict";
var e=top.window.user_uin,t=Math.floor(top.window.user_uin/100)%20;
e||(t=-1);
var o=function(){
return t>=0;
};
top.window.__webviewid||(top.window.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var i=top.window.mid,t=top.window.idx,o="";
o=i&&t?i+"_"+t:"";
var d=top.window.__webviewid,r=[e,o,d].join("_");
return r;
},r=function(e){
if(20>t)try{
var r=e.vid||"",w={};
w.__biz=top.window.biz||"",w.vid=r,w.clienttime=+new Date;
var n=top.window.mid,a=top.window.idx,p="";
n&&a?(w.type=1,p=n+"_"+a):(w.type=2,p=r),w.id=p,w.webviewid=d(),w.step=e.step||0,
w.orderid=e.orderid||0,w.ad_source=e.ad_source||0,w.traceid=e.traceid||0,w.ext1=e.ext1||"",
w.ext2=e.ext2||"",w.r=Math.random(),w.devicetype=top.window.devicetype,w.version=top.window.clientversion,
w.is_gray=o()?1:0;
var _=i("biz_wap/utils/ajax.js");
_({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:w
});
}catch(v){}
};
return{
report:r,
getWebviewid:d,
showAd:o
};
});define("a/testdata.js",[],function(){
"use strict";
var i=[{
ad_desc:"",
aid:"1000001689",
app_info:{
category:[],
url_scheme:""
},
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=%7B%22count%22%3A+%221%22%2C+%22wxuin%22%3A+%222876363900%22%2C+%22datafmt%22%3A+%22json%22%2C+%22posid%22%3A+%2272058780271891663%22%2C+%22pass_ticket%22%3A+%22fxR2QWuVME%25252BTCsnivJIiNzKFMYhGJWYLNwKb2fbeJAgy0%25252Fnyqv3pQbRBjWOVHVHW%22%2C+%22charset%22%3A+%22utf8%22%2C+%22uin%22%3A+%22378539367%22%2C+%22ext%22%3A+%7B%22req%22%3A+%7B%22c_ua%22%3A+%22Mozilla%2F5.0+%28Linux%3B+Android+5.1%3B+M571C+Build%2FLMY47D%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Version%2F4.0+Chrome%2F37.0.0.0+Mobile+MQQBrowser%2F6.8+TBS%2F036869+Safari%2F537.36+MicroMessenger%2F6.3.27.880+NetType%2FWIFI+Language%2Fzh_CN%22%2C+%22c_loc%22%3A+994840%2C+%22wuid%22%3A+%22oDdoCt82SHyIYvOr5ECuiurwwiMc%22%2C+%22hosttype%22%3A+%22wechat%22%2C+%22c_os%22%3A+%22android%22%2C+%22c_ip%22%3A+%2221.1.0.0%22%2C+%22appid%22%3A+%22wx7df770943ba53b7a%22%2C+%22conn%22%3A+1%7D%2C+%22pos%22%3A+%7B%22index_0%22%3A+%7B%22msg_daily_idx%22%3A+1%2C+%22msgid%22%3A+2658996622%2C+%22itemidx%22%3A+2%2C+%22msg_time%22%3A+1477545714%2C+%22wx_share%22%3A+1%7D%7D%7D%2C+%22adposcount%22%3A+%221%22%7D",
biz_appid:"wx9b7312becfa82023",
biz_info:{
biz_uin:3084043417,
head_img:"http://wx.qlogo.cn/mmhead/Q3auHgzwzM4j71nP7VK3RCF9M2Tz3FqAZ2aOHCiceD79K4zJr43pX4g/0",
is_subscribed:1,
nick_name:"xxxxxxxxxxxxxxxxxxxxxxxxx",
user_name:"gh_9113df30b5f3"
},
group_id:"",
hint_txt:"是大家开发商，的空间家第三方科技加快",
image_url:"http://mmbiz.qpic.cn/mmbiz_jpg/H4ZJ3Ovyd4G2r4rbiaGatpnruicSHoyhrqoG1vHzRkWRH2q895j1MtooTyM0DM8BkMAGGXqWEeOqTLUTMDFDaUsA/0?wx_fmt=jpeg",
is_cpm:0,
logo:"",
pos_type:0,
pt:115,
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=viewid=%7B%22count%22%3A+%221%22%2C+%22wxuin%22%3A+%222876363900%22%2C+%22datafmt%22%3A+%22json%22%2C+%22posid%22%3A+%2272058780271891663%22%2C+%22pass_ticket%22%3A+%22fxR2QWuVME%25252BTCsnivJIiNzKFMYhGJWYLNwKb2fbeJAgy0%25252Fnyqv3pQbRBjWOVHVHW%22%2C+%22charset%22%3A+%22utf8%22%2C+%22uin%22%3A+%22378539367%22%2C+%22ext%22%3A+%7B%22req%22%3A+%7B%22c_ua%22%3A+%22Mozilla%2F5.0+%28Linux%3B+Android+5.1%3B+M571C+Build%2FLMY47D%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Version%2F4.0+Chrome%2F37.0.0.0+Mobile+MQQBrowser%2F6.8+TBS%2F036869+Safari%2F537.36+MicroMessenger%2F6.3.27.880+NetType%2FWIFI+Language%2Fzh_CN%22%2C+%22c_loc%22%3A+994840%2C+%22wuid%22%3A+%22oDdoCt82SHyIYvOr5ECuiurwwiMc%22%2C+%22hosttype%22%3A+%22wechat%22%2C+%22c_os%22%3A+%22android%22%2C+%22c_ip%22%3A+%2221.1.0.0%22%2C+%22appid%22%3A+%22wx7df770943ba53b7a%22%2C+%22conn%22%3A+1%7D%2C+%22pos%22%3A+%7B%22index_0%22%3A+%7B%22msg_daily_idx%22%3A+1%2C+%22msgid%22%3A+2658996622%2C+%22itemidx%22%3A+2%2C+%22msg_time%22%3A+1477545714%2C+%22wx_share%22%3A+1%7D%7D%7D%2C+%22adposcount%22%3A+%221%22%7D",
ticket:"23unxvwxxkxu6",
traceid:"0c0a9d0a000070c6551010290004378e",
type:"0",
url:"http://mp.weixin.qq.com/mp/ad_biz_info?__biz=MzA4NDA0MzQxNw==&amp;weixinadkey=733e9a0e140dcab67bdb9287f6acac7a2fa5da72494cdd1cb082bfa6fdedade25379ae9242bed2a8e369a302bfba466c&amp;ticket=23unxvwxxkxu6&amp;gdt_vid=0c0a9d0a000070c6551010290004378e&amp;weixinadinfo=1000001689.0c0a9d0a000070c6551010290004378e.0.1#wechat_redirect",
watermark_type:0
}];
return{
data:i
};
});define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js"],function(e,t,n,r){
"use strict";
function a(e){
e&&(e.style.display="block");
}
function o(e){
e&&(e.style.display="none");
}
function i(){
p({
url:"/mp/getappmsgext?&f=json"+(window.send_time?"&send_time="+send_time:""),
data:{
__biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:encodeURIComponent(msg_title.htmlDecode()),
ct:ct,
devicetype:devicetype.htmlDecode(),
version:version.htmlDecode(),
is_need_reward:is_need_reward,
reward_uin_count:is_need_reward?3*w:0,
r:Math.random()
},
type:"post",
dataType:"json",
async:!0,
rtId:27613,
rtKey:50,
rtDesc:f,
success:function(e){
e&&(document.getElementById("js_reward_link")&&u.off(document.getElementById("js_reward_link"),"click",x),
s({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp
}));
}
});
}
function d(e){
return function(t){
return"0"==window.wx_user_can_reward?void r("你已成为该公众号的黑名单用户，暂时无法赞赏。"):(t.preventDefault(),
void g.invoke("openUrlWithExtraWebview",{
url:e
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
}));
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,n=(Math.ceil((h-188)/42)+1)*Math.floor((t-15)/42);
_="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+n+"&source=1#wechat_redirect";
var r="#wechat_redirect",s="https://mp.weixin.qq.com/bizmall/reward?__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1"+r,l=document.getElementById("js_reward_link");
l&&(g.on("activity:state_change",function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=j)return;
localStorage.setItem("lastOnresumeTime",t),g.invoke("setNavigationBarColor",{
actionCode:"1"
}),i();
}
}),x=d(s),u.on(l,"click",x)),y=e.reward_head_imgs;
var w=c();
v.reward&&1==e.can_reward?(a(v.reward),u.on(window,"load",function(){
m&&(u.off(window,"scroll",m),u.on(window,"scroll",m));
})):o(v.reward);
var p=document.getElementById("js_reward_inner");
p&&w>0&&a(p);
var f=document.getElementById("js_reward_total");
f&&(f.innerText=e.reward_total,f.setAttribute("href",_));
}
function l(e,t){
var n=document.createElement("span");
n.className="reward_user_avatar";
var r=new Image;
return r.onload=function(){
window.logs&&window.logs.reward_heads_total++,r.onload=r.onerror=null;
},r.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
r.onload=r.onerror=null;
},r.src=t,n.appendChild(r),e.appendChild(n),n;
}
function c(){
if(y.length){
var e=document.getElementById("js_reward_list"),t=0,n=document.createDocumentFragment();
if(e){
for(var r=0,a=y.length;a>r&&(t++,l(n,y[r]),t!=3*w);++r);
t>w&&(e.className+=" tl"),e.innerHTML="",e.appendChild(n);
}
return t;
}
}
function m(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+h>v.reward.offsetTop&&(p({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),u.off(window,"scroll",m),m=null);
}
var w,_,u=e("biz_common/dom/event.js"),p=e("biz_wap/utils/ajax.js"),g=e("biz_wap/jsapi/core.js"),f=e("rt/appmsg/getappmsgext.rt.js"),h=window.innerHeight||document.documentElement.clientHeight,v={
reward:document.getElementById("js_reward_area")
},y=[],j=500;
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var x=function(){};
return{
handle:function(e,t){
w=t,s(e);
},
render:function(e){
w=e,c();
}
};
});define("appmsg/comment.js",["appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/hashrouter.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,o){
"use strict";
function m(e,t){
e&&(e.style.display=t?t:"block");
}
function i(e){
e&&(e.style.display="none");
}
function s(){
setTimeout(function(){
m(Y.toast);
},750),setTimeout(function(){
i(Y.toast);
},1500);
}
function c(e){
return e.replace(/^\s+|\s+$/g,"");
}
function a(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,o=9;
"https:"==n&&(o=18),T.saveSpeeds({
uin:uin,
pid:o,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),T.send();
}
}
function l(){
if(!S&&-1!=U){
var e=window.innerHeight||document.documentElement.clientHeight,t=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight;
if(!(U>0&&n-t-e>500)){
var o=+new Date;
S=!0,i(Y.tips),m(Y.loading);
var s="/mp/appmsg_comment?action=getcomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id+"&offset="+U+"&limit="+L+(window.send_time?"&send_time="+send_time:"");
try{
Z++,Z>1&&((new Image).src="http://mp.weixin.qq.com/mp/jsreport?key=27&content="+encodeURIComponent(s)),
X.indexOf(s)>-1&&((new Image).src="http://mp.weixin.qq.com/mp/jsreport?key=25&content="+encodeURIComponent(s)),
X.push(s);
}catch(c){}
M({
url:s,
type:"get",
success:function(e){
var t=+new Date,n=t-o,m={};
try{
m=window.eval.call(window,"("+e+")");
}catch(i){}
var c=m.base_resp&&m.base_resp.ret;
if(0==c){
r(m);
var l=+new Date-t;
a(n,l);
}else O.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(s)+";ret="+c+"&r="+Math.random();
},
error:function(){
O.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(s)+"&r="+Math.random();
},
complete:function(){
S=!1,i(Y.loading),q.off(window,"scroll",E);
}
});
}
}
}
function r(e){
var t,n=document.createDocumentFragment();
$++,$>1&&(Q.src="http://mp.weixin.qq.com/mp/jsreport?key=26&content="+encodeURIComponent(JSON.stringify({
comment_id:comment_id,
offset:U,
url:location.href
}))),0==U?(A=e.logo_url,F=e.nick_name,t=e.elected_comment,t&&t.length?(u(t,n,"elected"),
Y.list.appendChild(n),m(Y.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn1")):m(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa")))):(i(Y.main),1==copyright_stat&&z.addClass(document.body,"rich_media_empty_extra"),
0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn2")):m(document.getElementById("js_cmt_nofans2"),"block")),
function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(t=e.elected_comment,t&&t.length&&(u(t,n,"elected"),Y.list.appendChild(n))),
0==e.elected_comment_total_cnt?(U=-1,q.off(window,"scroll",l),i(document.getElementById("js_cmt_loading")),
i(document.getElementById("js_cmt_statement")),i(document.getElementById("js_cmt_qa"))):U+L>=e.elected_comment_total_cnt?(U=-1,
q.off(window,"scroll",l),i(document.getElementById("js_cmt_loading")),m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa"))):U+=e.elected_comment.length;
}
function d(){
N.log("tag1");
var e=c(Y.input.value);
if(N.log("tag2"),!z.hasClass(Y.submit,"btn_disabled")){
if(N.log("tag3"),e.length<1)return y("留言不能为空");
if(N.log("tag4"),e.length>600)return y("字数不能多于600个");
N.log("tag5"),z.addClass(Y.submit,"btn_disabled"),N.log("tag6");
var t=document.getElementById("activity-name");
N.log("tag7");
var n="/mp/appmsg_comment?action=addcomment&comment_id="+comment_id+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
M({
url:n,
data:{
content:e,
title:t&&c(t.innerText),
head_img:A,
nickname:F
},
type:"POST",
success:function(t){
N.log("tag8"),R.hidePannel();
var o={},i=document.createDocumentFragment();
try{
o=window.eval.call(window,"("+t+")");
}catch(c){}
switch(+o.ret){
case 0:
s(),u([{
content:e,
nick_name:F,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:A,
like_status:0,
content_id:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:o.my_id
}],i,"mine"),Y.mylist.insertBefore(i,Y.mylist.firstChild),m(Y.mylist.parentNode),
Y.input.value="";
break;

case-6:
y("你留言的太频繁了，休息一下吧");
break;

case-7:
y("你还未关注该公众号，不能参与留言");
break;

case-10:
y("字数不能多于600个");
break;

case-15:
y("留言已关闭");
break;

default:
y("系统错误，请重试");
}
0!=o.ret&&(O.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:resperr;url:"+encodeURIComponent(n)+";ret="+o.ret+"&r="+Math.random());
},
error:function(e){
N.log("shit;"+e.status+";"+e.statusText),O.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:ajaxerr;url:"+encodeURIComponent(n)+"&r="+Math.random();
},
complete:function(){
""!=Y.input.value&&z.removeClass(Y.submit,"btn_disabled");
}
});
}
}
function p(){
if(0==P){
var e="/mp/appmsg_comment?action=getmycomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id,t=document.getElementById("js_mycmt_loading");
P=1,m(t),M({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(o){}
var i=n.base_resp&&n.base_resp.ret;
if(0==i){
var s=n.my_comment,c=document.createDocumentFragment();
s&&s.length&&(u(s,c,"mine"),Y.mylist.appendChild(c),m(Y.mylist.parentNode)),P=2;
}else P=0,O.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(e)+";ret="+i+"&r="+Math.random();
},
error:function(){
P=0,O.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(e)+"&r="+Math.random();
},
complete:function(){
i(t);
}
});
}
}
function _(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e,i=new Date(n).getFullYear(),s=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>m?Math.floor(o/60/60)+"小时前":172800>m?"昨天":604800>m?Math.floor(m/24/60/60)+"天前":s.getFullYear()==i?s.getMonth()+1+"月"+s.getDate()+"日":s.getFullYear()+"年"+(s.getMonth()+1)+"月"+s.getDate()+"日";
}
function u(e,t,n){
var o,m="",i=document.createElement("div"),s="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0";
G={};
for(var c,a=0;c=e[a];++a){
c.time=_(c.create_time),c.status="",c.logo_url=c.logo_url||s,c.logo_url=-1!=c.logo_url.indexOf("wx.qlogo.cn")?c.logo_url.replace(/\/132$/,"/96"):c.logo_url,
c.content=c.content.htmlDecode().htmlEncode(),c.nick_name=c.nick_name.htmlDecode().htmlEncode(),
c.like_num_format=parseInt(c.like_num)>=1e4?(c.like_num/1e4).toFixed(1)+"万":c.like_num,
c.is_from_friend=c.is_from_friend||0,c.is_from_me="mine"==n?1:c.is_from_me||0,c.reply=c.reply||{
reply_list:[]
},c.is_mine=n?!1:!0,c.is_elected="elected"==n?1:c.is_elected,c.reply.reply_list.length>0&&(c.reply.reply_list[0].time=_(c.reply.reply_list[0].create_time),
c.reply.reply_list[0].content=(c.reply.reply_list[0].content||"").htmlEncode(),c.reply.reply_list[0].reply_like_status=c.reply.reply_list[0].reply_like_status||0,
c.reply.reply_list[0].reply_like_num=c.reply.reply_list[0].reply_like_num||0),m+=D.tmpl(B,c);
try{
var l=c.nick_name+c.content,r=!1,d=23;
G[l]&&(r=!0,d=24),J.indexOf(c.content_id)>-1&&(r=!0,d=23),J.push(c.content_id),G[l]=!0,
r&&(Q.src="http://mp.weixin.qq.com/mp/jsreport?key="+d+"&content="+encodeURIComponent(JSON.stringify({
comment_id:comment_id,
content_id:c.content_id,
offset:U,
length:e.length,
url:location.href
})));
}catch(p){}
}
for(i.innerHTML=m,g(i);o=i.children.item(0);)t.appendChild(o);
}
function g(e){
N.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=R.encode(e.innerHTML);
});
}
function y(e){
return setTimeout(function(){
o(e);
});
}
function f(){
var e="1"===C.getParam("js_my_comment");
e&&h(!0);
}
function h(e){
i(Y.article),m(Y.mine),window.scrollTo(0,0),p(),e||N.later(function(){
Y.input.focus();
});
}
function w(){
i(Y.mine),m(Y.article),window.scrollTo(0,document.documentElement.scrollHeight),
Y.input.blur();
}
function j(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(z.hasClass(t,"js_comment_praise")&&(n=t),n){
var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,s="/mp/appmsg_comment?action=likecomment&&like="+m+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+comment_id+"&content_id="+i;
v(n),M({
url:s,
type:"GET"
});
}
}
function b(e){
var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,m=t.dataset.contentId,i=t.dataset.replyId;
v(t),M({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
comment_id:comment_id,
content_id:m,
reply_id:i,
like:o
}
});
}
function v(e){
var t=z.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,m=o.indexOf("万"),i=parseInt(o)?parseInt(o):0;
t?(-1==m&&(n.innerHTML=i-1>0?i-1:""),z.removeClass(e,"praised"),e.dataset.status=0):(-1==m&&(n.innerHTML=i+1),
z.addClass(e,"praised"),e.dataset.status=1);
}
function I(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),s="/mp/appmsg_comment?action=delete&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+comment_id+"&my_id="+n;
confirm("确定删除吗？")&&M({
url:s,
success:function(e){
var s,c=t;
try{
e=JSON.parse(e);
}catch(a){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
c&&(c.parentNode.removeChild(c),s=document.getElementById("cid"+n),s&&s.parentNode.removeChild(s),
0==Y.list.children.length&&(i(Y.main),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")),m(document.getElementById("js_cmt_addbtn2"))),
0==Y.mylist.children.length&&i(Y.mylist.parentNode));
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
});
}
function E(){
try{
var e=Y.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<window.innerHeight&&S&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
q.off(window,"scroll",E));
}catch(n){}
}
function k(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var B=e("appmsg/cmt_tpl.html.js"),x=document.getElementById("js_cmt_area"),C=new k(window.location.href),T=e("biz_common/utils/wxgspeedsdk.js");
if(0!=comment_id&&uin&&key){
if(-1==navigator.userAgent.indexOf("MicroMessenger"))return void(x&&(x.style.display="none"));
x&&(x.style.display="block");
var q=e("biz_common/dom/event.js"),z=e("biz_common/dom/class.js"),M=e("biz_wap/utils/ajax.js"),D=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),H=e("biz_wap/utils/hashrouter.js");
!function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=D.tmpl(t,{}),document.body.appendChild(n);
}();
var R=e("appmsg/emotion/emotion.js"),N=e("appmsg/emotion/dom.js"),O=new Image,U=0,L=100,S=!1,A="",F="我",P=0,Y={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading")
},J=[],G={},Q=new Image,X=[],Z=0;
q.on(document.getElementById("sort1"),"tap",function(){
sort=sortByUser,Y.list.innerHTML="",U=0,r(commentResp);
}),q.on(document.getElementById("sort2"),"tap",function(){
sort=sortByBoth,Y.list.innerHTML="",U=0,r(commentResp);
});
var $=0;
!function(){
l(),f(),R.init();
}(),H.get("comment",function(){
h();
}),H.get("default",function(e){
"comment"==e&&w();
}),q.on(Y.input,"input",function(){
var e=c(Y.input.value);
e.length<1?z.addClass(Y.submit,"btn_disabled"):z.removeClass(Y.submit,"btn_disabled");
}),q.on(Y.list,"tap",".js_comment_praise",j),q.on(Y.mylist,"tap",".js_comment_praise",j),
q.on(Y.list,"tap",".js_reply_praise",b),q.on(Y.list,"tap",".js_del",I),q.on(Y.mylist,"tap",".js_del",I),
q.on(Y.submit,"tap",d),q.on(window,"scroll",E);
}
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js"],function(require,exports,module,alert){
"use strict";
function like_report(e){
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0;
ajax({
url:"/mp/appmsg_like?__biz="+biz+"&mid="+mid+"&idx="+idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:window.is_temp_url||0
},
type:"POST",
success:function(res){
var data=eval("("+res+")");
0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,"praised"),el_like.setAttribute("like",0),
likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"Like":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,"praised"),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),el_toolbar=document.getElementById("js_toobar3");
if(el_toolbar&&el_toolbar.querySelector){
var el_like=el_toolbar.querySelector("#like3"),el_likeNum=el_toolbar.querySelector("#likeNum3"),el_readNum=el_toolbar.querySelector("#readNum3");
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
}
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+top.window.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function o(){
return document.domain="qq.com",-1!=top.location.href.indexOf("&_newvideoplayer=0")?!1:-1!=top.location.href.indexOf("&_newvideoplayer=1")?!0:top.window.use_tx_video_player?!1:a.canSupportVideo&&_.inWechat?_.is_ios||_.is_android&&_.is_x5?!0:!1:(top.window._hasReportCanSupportVideo||a.canSupportVideo||!_.inWechat||(top.window._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function n(){
{
var e=top.location.href,i=window.location.href;
top.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=top.sn&&"f62e1cb98630008303667f77c17c43d7"!=top.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=top.sn?-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==top.window.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:top.window.__appmsgCgiData&&top.window.__appmsgCgiData.can_use_page&&(_.is_ios||_.is_android)?!0:p.showAd()?!0:!1:!1;
}
function t(){
var e=top.location.href;
if(!top.window.user_uin)return!1;
if(-1!=e.indexOf("&_proxy=1"))return!0;
if(-1!=e.indexOf("&_proxy=0"))return!1;
if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show"))return!1;
var i=(new Date).getHours();
return i>=9&&14>=i?!1:_.inWechat&&_.is_android&&_.is_x5&&_.wechatVer>="6.2.2"?!0:_.inWechat&&_.is_ios&&(-1!=w.indexOf("MicroMessenger/6.2.4")||_.wechatVer>="6.2.4")?!0:!1;
}
function r(){
return c.networkType;
}
var d=e("biz_common/dom/event.js"),s=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/device.js"),p=e("new_video/ctl.js"),w=top.window.navigator.userAgent,c={
networkType:""
},_={};
return function(e){
var i=a.os;
_.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),_.is_android=!!i.android,_.is_wp=!!i.phone,
_.is_pc=!(i.phone||!i.Mac&&!i.windows),_.inWechat=/MicroMessenger/.test(e),_.is_android_phone=_.is_android&&/Mobile/i.test(e),
_.is_android_tablet=_.is_android&&!/Mobile/i.test(e),_.ipad=/iPad/i.test(e),_.iphone=!_.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
_.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var o=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
_.wechatVer=o&&o[1]||0,d.on(window,"load",function(){
if(""==c.networkType&&_.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
s.invoke("getNetworkType",{},function(i){
c.networkType=e[i.err_msg]||"fail";
});
}
},!1);
}(top.window.navigator.userAgent),"undefined"==typeof top.window._hasReportCanSupportVideo&&(top.window._hasReportCanSupportVideo=!1),
{
device:_,
isShowMpVideo:o,
isUseProxy:t,
isUseAd:n,
getNetworkType:r
};
});define("a/a.js",["biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","a/profile.js","a/android.js","a/ios.js","a/app_card.js","a/sponsor.js"],function(require,exports,module,alert){
"use strict";
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0,both_ad=0,inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_top_ad_area.style.display="none",js_bottom_ad_area.style.display="none";else{
var adLS=new LS("ad");
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
return screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),
both_ad=screen_num>=2?1:0,{
is_need_ad:is_need_ad,
both_ad:both_ad,
_adInfo:_adInfo
};
}
function afterGetAdData(e,a){
var t={},i=e.is_need_ad,o=e._adInfo;
if(0==i)t=o,t||(t={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var p=a.advertisement_info;
t.advertisement_info=saveCopy(p);
}
t.advertisement_num=a.advertisement_num;
}
if(1==i&&(window._adRenderData=t),t=t||{
advertisement_num:0
},!t.flag&&t.advertisement_num>0){
var n=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=n;
for(var _=0;n>_;++_){
var d=null,s=r[_];
if(s.exp_info=s.exp_info||{},s.is_cpm=s.is_cpm||0,s.biz_info=s.biz_info||{},s.app_info=s.app_info||{},
s.pos_type=s.pos_type||0,s.logo=s.logo||"",100==s.pt||115==s.pt){
for(var l=s.exp_info.exp_value||[],c=!1,m=0,u=0;u<l.length;++u){
var f=l[u]||{};
if(1==f.exp_type&&(m=f.comm_attention_num,c=m>0),2==f.exp_type){
c=!1,m=0;
break;
}
}
s.biz_info.show_comm_attention_num=c,s.biz_info.comm_attention_num=m,d={
usename:s.biz_info.user_name,
pt:s.pt,
url:s.url,
traceid:s.traceid,
adid:s.aid,
ticket:s.ticket,
is_appmsg:!0
};
}else if(102==s.pt)d={
appname:s.app_info.app_name,
versioncode:s.app_info.version_code,
pkgname:s.app_info.apk_name,
androiddownurl:s.app_info.apk_url,
md5sum:s.app_info.app_md5,
signature:s.app_info.version_code,
rl:s.rl,
traceid:s.traceid,
pt:s.pt,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};else if(101==s.pt)d={
appname:s.app_info.app_name,
app_id:s.app_info.app_id,
icon_url:s.app_info.icon_url,
appinfo_url:s.app_info.appinfo_url,
rl:s.rl,
traceid:s.traceid,
pt:s.pt,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};else if(103==s.pt||104==s.pt||2==s.pt&&s.app_info){
var g=s.app_info.down_count||0,y=s.app_info.app_size||0,v=s.app_info.app_name||"",j=s.app_info.category,h=["万","百万","亿"];
if(g>=1e4){
g/=1e4;
for(var w=0;g>=10&&2>w;)g/=100,w++;
g=g.toFixed(1)+h[w]+"次";
}else g=g.toFixed(1)+"次";
y=formSize(y),j=j?j[0]||"其他":"其他",v=formName(v),s.app_info._down_count=g,s.app_info._app_size=y,
s.app_info._category=j,s.app_info.app_name=v,d={
appname:s.app_info.app_name,
app_rating:s.app_info.app_rating||0,
app_id:s.app_info.app_id,
channel_id:s.app_info.channel_id,
md5sum:s.app_info.app_md5,
rl:s.rl,
pkgname:s.app_info.apk_name,
url_scheme:s.app_info.url_scheme,
androiddownurl:s.app_info.apk_url,
versioncode:s.app_info.version_code,
appinfo_url:s.app_info.appinfo_url,
traceid:s.traceid,
pt:s.pt,
url:s.url,
ticket:s.ticket,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(105==s.pt){
var b=s.card_info.card_id||"",k=s.card_info.card_ext||"";
k=k.htmlDecode();
try{
k=JSON.parse(k),k.outer_str=s.card_info.card_outer_id||"",k=JSON.stringify(k);
}catch(x){
k="{}";
}
d={
card_id:b,
card_ext:k,
pt:s.pt,
ticket:s.ticket||"",
url:s.url,
rl:s.rl,
tid:s.traceid,
traceid:s.traceid,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(106==s.pt){
var z=s.mp_shop_info.pid||"",I=s.mp_shop_info.outer_id||"";
d={
pid:z,
outer_id:I,
pt:s.pt,
url:s.url,
rl:s.rl,
tid:s.traceid,
traceid:s.traceid,
type:s.type,
adid:s.aid,
is_appmsg:!0
};
}else if(108==s.pt||109==s.pt||110==s.pt)d={
pt:s.pt,
ticket:s.ticket||"",
url:s.url,
traceid:s.traceid,
adid:s.aid,
is_appmsg:!0
};else if(111==s.pt||113==s.pt||114==s.pt||112==s.pt){
var y=s.app_info.app_size||0,v=s.app_info.app_name||"";
y=formSize(y),v=formName(v),s.app_info.app_size=y,s.app_info.app_name=v,d={
appname:s.app_info.app_name,
app_rating:s.app_info.app_rating||0,
app_id:s.app_info.app_id,
channel_id:s.app_info.channel_id,
md5sum:s.app_info.app_md5,
rl:s.rl,
pkgname:s.app_info.apk_name,
url_scheme:s.app_info.url_scheme,
androiddownurl:s.app_info.apk_url,
versioncode:s.app_info.version_code,
appinfo_url:s.app_info.appinfo_url,
traceid:s.traceid,
pt:s.pt,
url:s.url,
ticket:s.ticket,
type:s.type,
adid:s.aid,
source:source||"",
is_appmsg:!0
};
}
var E=s.image_url;
require("appmsg/cdn_img_lib.js");
var D=require("biz_common/utils/url/parse.js");
E&&E.isCDN()&&(E=E.replace(/\/0$/,"/640"),E=E.replace(/\/0\?/,"/640?"),s.image_url=D.addParam(E,"wxfrom","50",!0)),
adDatas.ads["pos_"+s.pos_type]={
a_info:s,
adData:d
};
}
var T=function(e){
var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(a=e);
10>=a&&(B.style.display="block",DomEvent.off(window,"scroll",T));
},q=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
O.offsetTop<e+a&&(Class.addClass(document.getElementById("js_ad_area"),"show"),DomEvent.off(window,"scroll",q));
},C=document.getElementById("js_bottom_ad_area"),B=document.getElementById("js_top_ad_area"),O=document.getElementById("js_sponsor_ad_area"),A=adDatas.ads;
for(var S in A)if(0==S.indexOf("pos_")){
var d=A[S],s=!!d&&d.a_info;
if(d&&s)if(0==s.pos_type){
if(C.innerHTML=TMPL.tmpl(a_tpl,s),111==s.pt||112==s.pt||113==s.pt||114==s.pt){
var N=document.getElementsByClassName("js_download_app_card")[0],H=N.offsetWidth,M=Math.floor(H/2.875);
M>0&&(N.style.height=M+"px");
}
}else if(1==s.pos_type){
B.style.display="none",B.innerHTML=TMPL.tmpl(a_tpl,s),DomEvent.on(window,"scroll",T);
var R=0;
window.localStorage&&(R=1*localStorage.getItem(S)||0),window.scrollTo(0,R),T(R);
}else if(3==s.pos_type){
var N=document.createElement("div");
N.appendChild(document.createTextNode(s.image_url)),s.image_url=N.innerHTML,O.innerHTML=TMPL.tmpl(sponsor_a_tpl,s),
O.style.display="block";
var P=O.clientWidth;
document.getElementById("js_main_img").style.height=P/1.77+"px",DomEvent.on(window,"scroll",q),
q(0);
}
}
bindAdOperation();
}
}
function saveCopyArr(e){
for(var a=[],t=0;t<e.length;++t){
var i=e[t],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],o=typeof i;
i="string"==o?i.htmlDecode():i,"object"==o&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[t]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,i=0,o=a.length;o>i;++i){
var p=a[i],n=e.indexOf(p);
-1!=n&&(-1==t||t>n)&&(t=n);
}
return-1!=t&&(e=e.substring(0,t)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=function(){
for(var scrollTop=window.pageYOffset||document.documentElement.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop;
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),function(){
try{
var e=window.__report,a=ping_test_apurl[pos_key],t=new Date,i=t.getHours(),o=ping_test_apurl_random&&i>=12&&18>=i&&0==pos_type;
!a[0]&&o&&scrollTop+innerHeight>offsetTop&&(a[0]=!0,e(81)),!a[1]&&o&&scrollTop+innerHeight>offsetTop+40&&(a[1]=!0,
e(82));
}catch(p){}
}(),!ping_apurl[pos_key]&&(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop)||3==pos_type&&scrollTop+innerHeight>offsetTop)){
ping_apurl[pos_key]=!0;
try{
var mmversion=require("biz_wap/utils/mmversion.js"),report_arg="trace_id="+tid+"&product_type="+adDatas.ads[pos_key].a_info.pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){});
}catch(e){}
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random(),
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
}
}(i);
};
DomEvent.on(window,"scroll",onScroll),onScroll();
}
}
function ad_click(e,a,t,i,o,p,n,r,_,d,s,l,c,m,u,f,g){
if(!has_click[o]){
has_click[o]=!0;
var y=document.getElementById("loading_"+o);
y&&(y.style.display="inline");
var v=g.exp_info||{},j=v.exp_id||"",h=v.exp_value||[];
try{
h=JSON.stringify(h);
}catch(w){
h="[]";
}
AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:j,
exp_value:h,
url:encodeURIComponent(a),
tid:o,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:_,
pos_x:c,
pos_y:m,
ad_w:u,
ad_h:f
},function(){
if(has_click[o]=!1,y&&(y.style.display="none"),"5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+p+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o;else{
if("105"==_&&l)return void Card.openCardDetail(l.card_id,l.card_ext,l);
if("106"==_&&l)return void(location.href=ParseJs.join(a,{
outer_id:l.outer_id
}));
if(0==a.indexOf("https://itunes.apple.com/")||0==a.indexOf("http://itunes.apple.com/"))return JSAPI.invoke("downloadAppInternal",{
appUrl:a
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+p+"&uin="+uin);
}),!1;
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:_,
aid:r,
ad_engine:s,
pos_type:d
},i=window.__report;
if(("104"==_||"113"==_||"114"==_)&&l||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var n="",c="";
l&&(n=l.pkgname&&l.pkgname.replace(/\./g,"_"),c=l.channel_id||""),t={
source:4,
tid:o,
traceid:o,
mid:mid,
idx:idx,
appuin:biz,
pt:_,
channel_id:c,
aid:r,
engine:s,
pos_type:d,
pkgname:n
};
}
a=URL.join(a,t),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:o,
aid:r,
engine:s
})),!r&&i&&i(80,a);
}
location.href=a;
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t)return!1;
if(!t.getElementsByClassName)return t.style.display="none",!1;
var i=t.getElementsByClassName("js_ad_link")||[],o=adDatas.ads[a];
if(o){
for(var p=o.adData,n=o.a_info,r=n.pos_type,_=o.ad_engine,d=0,s=i.length;s>d;++d)!function(e,a){
var t=i[e],o=t.dataset;
if(o&&3!=n.pos_type){
var p=o.type,d=o.url,s=o.rl,l=o.apurl,c=o.tid,m=o.ticket,u=o.group_id,f=o.aid,g=o.pt;
DomEvent.on(t,"click",function(e){
var t=!!e&&e.target;
if(!t||!t.className||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("btn_processor_value")){
if(a){
a.adid=window.adid||a.adid;
var i="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+_+"&pos_type="+r+"&r="+Math.random();
"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,i):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,i);
}
var o,y,v,j;
return o=position.getX(t,"js_ad_link")+e.offsetX,y=position.getY(t,"js_ad_link")+e.offsetY,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
j=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(p,d,s,l,c,m,u,f,g,r,_,a,o,y,v,j,n),!1;
}
},!0);
}
}(d,p);
if(p){
p.adid=window.adid||p.adid;
var l=n.exp_info||{},c=l.exp_id||"",m=l.exp_value||[];
try{
m=JSON.stringify(m);
}catch(u){
m="[]";
}
var f="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+_+"&pos_type="+r+"&exp_id="+c+"&exp_value="+m+"&r="+Math.random();
if(p.report_param=f,"100"==p.pt||"115"==p.pt){
var g=require("a/profile.js");
return void new g({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:p,
pos_type:r,
report_param:f,
aid:p.adid,
ad_engine:_
});
}
if("102"==p.pt){
var y=require("a/android.js"),v=15,j=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_app_action_"+r),
adData:p,
report_param:f,
task_ext_info:[p.adid,p.traceid,j,source,v,_].join("."),
via:[p.traceid,p.adid,j,source,v,_].join(".")
});
}
if("101"==p.pt){
var h=require("a/ios.js");
return void new h({
btn:document.getElementById("js_app_action_"+r),
adData:p,
ticket:p.ticket,
report_param:f
});
}
if("105"==p.pt)return void new Card({
btn:document.getElementById("js_card_action_"+r),
adData:p,
report_param:f,
pos_type:r
});
if("106"==p.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+r),
adData:p,
report_param:f,
pos_type:r
});
if("103"==p.pt||"104"==p.pt||"111"==p.pt||"112"==p.pt||"113"==p.pt||"114"==p.pt){
var w=require("a/app_card.js"),v=15,j=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new w({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:p,
report_param:f,
pos_type:r,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,j,source,v,_].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+j,"source="+source,"type="+v,"engine="+_,"appuin="+biz,"pos_type="+r,"ticket="+p.ticket,"scene="+scene].join("&"),
engine:_
});
}
if("108"==p.pt||"109"==p.pt||"110"==p.pt){
var b=require("a/sponsor.js");
new b({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adData:p,
a_info:n,
pos_type:r,
report_param:f
});
}
}
}
}(e);
}
var js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),pos_type=window.pos_type||0,__report=window.__report,total_pos_type=4,el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_1:js_top_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_1:js_top_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
};
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[]
},ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0,keyOffset="https:"==top.location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});