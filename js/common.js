//复制
copyStr(str) {
    let inputDom = document.createElement('input')
    inputDom.value = str
    inputDom.style.position = 'fixed';
    inputDom.style.top = '-100%';
    document.body.appendChild(inputDom)
    inputDom.select()
    if(document.execCommand("copy")){
	this.$message({
	    showClose: true,
	    message: "复制成功",
	    type: "success"
	});
	document.body.removeChild(inputDom)
    }
},
//计算视频长度
validateFile(file, callback) {
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = ()=>{
	window.URL.revokeObjectURL(video.src);
	if (video.duration < 1) {
	    console.log("Invalid Video! video is less than 1 second");
	    if(callback) callback('视频少于1秒')
	    return;
	}
	if(callback) callback(this.mathTime(Math.floor(video.duration)))
    }
    video.src = URL.createObjectURL(file);
},
//秒数格式化天时分秒
mathTime(s){
    var t = Math.floor(s / (24 * 60 * 60));
    var h = Math.floor((s % (24 * 60 * 60)) / (60 * 60));
    var m = Math.floor(((s % (24 * 60 * 60)) % (60 * 60)) / 60);
    var s = Math.floor(((s % (24 * 60 * 60)) % (60 * 60)) % 60);
    return (t?t+'天':'') + (h?h+'时':'') + (m?m+'分':'') + (s?s+'秒':'')
},
//获取url参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
// 格式化时间
Date.prototype.format = function(fmt) { 
    var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt; 
}
//数字补零
Number.prototype.profixZero = function(n){
	if(n > this.toString().length){
		var str = new Array(n).join(0) + this;
		return str.slice(-n);
	}
	return this;
}
//模板引擎
function render(tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
	tpl
	.replace(/[\r\t\n]/g, ' ')
	.split('<%').join('\t')
	.replace(/((^|%>)[^\t]*)'/g, '$1\r')
	.replace(/\t=(.*?)%>/g, '\',$1,\'')
	.split('\t').join('\');')
	.split('%>').join('p.push(\'')
	.split('\r').join('\\\'') +
	'\');}return p.join(\'\');';
    return new Function(code).apply(data);
}
//Function.prototype.bind()
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== &quot;function&quot;) {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError(&quot;Function.prototype.bind - what is trying to be bound is not callable&quot;);
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP &amp;amp;&amp;amp; oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}



//返回指定区间的随机数
Math.rndNum = function(min,max){
	if(min > max) min = [max,max=min][0];
	return this.floor(this.random() * (max - min +1) + min);
}

//对象克隆
function cloneObj(obj){
	var newObj = (obj.constructor === Array) ? [] : {};
	for(var k in obj){
		if(obj[k] === null || (typeof obj[k] != "object")){
			newObj[k] = obj[k];
		}else{
			newObj[k] = cloneObj(obj[k]);
		}
	}
	return newObj;
}


//判断浏览器类型
function myBrowser(){
    var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串Edge
//  console.log("window.opr： "+window.opr);
//  console.log("userAgent： "+userAgent);
//  console.log("Opera： "+userAgent.indexOf("Opera"));
//  console.log("Firefox： "+userAgent.indexOf("Firefox"));
//  console.log("Edge： "+userAgent.indexOf("Edge"));
//  console.log("Chrome： "+userAgent.indexOf("Chrome"));
//  console.log("Safari： "+userAgent.indexOf("Safari"));
//  console.log("compatible： "+userAgent.indexOf("compatible"));
//  console.log("MSIE： "+userAgent.indexOf("MSIE"));
    //判断是否Opera浏览器
    var notOpera = window.opr == undefined;
    if (!notOpera) {return "Opera";}; 
    //判断是否Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1) {return "FF";} 
    //判断谷歌浏览器
    if (userAgent.indexOf("Chrome") > -1){return "Chrome";}
    //判断是否Safari浏览器
    if (userAgent.indexOf("Safari") > -1) {return "Safari";} 
    //判断是否IE浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && notOpera) {return "IE";}; 
}

			
// 获取浏览器窗口的可视区域的宽度
function getViewPortWidth() {return document.documentElement.clientWidth || document.body.clientWidth;}
// 获取浏览器窗口水平滚动条的位置
function getScrollLeft() {return document.documentElement.scrollLeft || document.body.scrollLeft;}

// 获取浏览器窗口的可视区域的高度
function getViewPortHeight() {return document.documentElement.clientHeight || document.body.clientHeight;}
// 获取浏览器窗口垂直滚动条的位置
function getScrollTop() {return document.documentElement.scrollTop || document.body.scrollTop;}


var lazyLoadImg = function(o){
	this.aImg = document.querySelector(o.el).getElementsByTagName('img');
	var that = this;
	window.onload = function(){that.loadImg()}
	window.onscroll = function(){that.loadImg()}
}
lazyLoadImg.prototype.loadImg = function(){
	for(var i = 0; i < this.aImg.length; i++){
		if(this.aImg[i].offsetTop <= this.getScroTop() + this.getViewHeight()){
			this.aImg[i].src = this.aImg[i].getAttribute('data-src');
		}
	}
}
lazyLoadImg.prototype.getScroTop = function(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}
lazyLoadImg.prototype.getViewHeight = function(){
	return document.documentElement.clientHeight || document.body.clientHeight;
}
window.lazyLoadImg = lazyLoadImg;


//懒加载
//var lazyImg = document.getElementsByTagName('img');
//function loadImage(){
//	for(var i = 0; i < lazyImg.length; i++){
//		if(lazyImg[i].offsetTop <= getScrollTop() + getViewPortHeight()){
//			lazyImg[i].src = lazyImg[i].getAttribute('data-src');
//		}
//	}
//}
//loadImage();
//window.onscroll = function(){
//	loadImage();
//}
