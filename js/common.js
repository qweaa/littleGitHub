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
