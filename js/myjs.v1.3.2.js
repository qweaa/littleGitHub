
//检查对象中是否有空值
hasNull(obj){
	for(let i in obj){
		if(typeof obj[i] === 'object') {if(this.hasNull(obj[i])) return true;}
		else if(obj[i] === '') return true;
	}
	return false;
}
//获取非行间样式
function getStyle(obj, name){
	//var obj=document.getElementById(obj);
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else {
		return getComputedStyle(obj, false)[name];	
	}
}
//判断浏览器是否开启cookie
if(document.cookie.indexOf("cookietest=") == -1) {     
    //没有启用cookie
    alert("没有启用cookie ");    
} else{    
    //已经启用cookie
    alert("已经启用cookie ");    
} 
//设置cookie
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function setCookie(name,value,time){
        var exp = new Date();
        exp.setTime(exp.getTime() + time*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
//运动框架
//function starMove(obj, json, fnEnd) {
//	var timer=null;
//	clearInterval(obj.timer);
//	var bStop=true;
//	
//	obj.timer=setInterval(function(){		
//		for(var attr in json){
//			var cur=0;
//			if(attr=='opacity'){
//				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
//			}else{
//				cur=parseInt(getStyle(obj, attr));
//			}
//			var speed=(json[attr]-cur)/6;
//			speed=speed>0?Math.ceil(speed):Math.floor(speed);
//			if(cur!=json[attr]) bStop=false;
//			if(attr=='opacity'){
//				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
//				obj.style.opacity=(cur+speed)/100;
//			}else {
//				obj.style[attr]=cur+speed+'px';
//			}
//		}
//		
//		if(bStop){
//			clearInterval(obj.timer);
//			if(fnEnd) fnEnd();
//		}
//	},30);
//}

//运动框架兼容%
function takeMove(obj,json,fnEnd){
	clearInterval(obj.timer);
	var timer = null,
		bStop = lock = false,		//lock判断是否有%，false：没有；true：有
		cur = speed = 0;
		
	obj.timer = setInterval(function(){
		for(var attr in json){
			if(json[attr].indexOf('%') > -1){
				speed = (parseInt(json[attr]) - cur)/6;
				lock = true;
			}else{
				speed=(json[attr]-cur)/6;
			}
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else if(lock){
				cur = cur+speed;
				obj.style[attr] = cur+'%';
			}else{
				cur=parseInt(getStyle(obj, attr));
				obj.style[attr]=cur+speed+'px';
			}
			
			if(cur == parseInt(json[attr])) bStop=true;
		}
		
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd) fnEnd();
		}
	},30);
}

//事件绑定
function funBind(obj, ev, fn){
	if(obj.attachEvent){
		obj.attachEvent('on' + ev, fn);
	}else{
		obj.addEventListener(ev, fn, false);
	}
}

//图片上传展示
function t_preview(file,oDiv){
	var prevDiv = document.getElementById(oDiv);
	if (file.files && file.files[0]){
		var reader = new FileReader();
		reader.onload = function(evt){
		prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
	}
		reader.readAsDataURL(file.files[0]);
	}else {
		prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
	}
}

//元素滚动到顶部后再固定
$.fn.extend({
	inTop:function(json){
		//初始化参数
		json = json || {};
		var that = this;
		var lock = true;
		var oJson = {
			'top'	:	json.top || 0,
			'fn'	:	json.backFn || false
		};
		
		//获得对象目前offsetTop
		var objH = $(this).offset().top;
		
		$(window).scroll(function(){
			//获取滚动条的滑动距离
			var scroH = $(this).scrollTop();
			//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
			if(scroH>=objH && lock){
				$(that).css({"position":"fixed","top":oJson.top});
				if(oJson.fn) oJson.fn();
				lock = false;
			}else if(scroH<objH && !lock){
				$(that).css({"position":"static"});
				lock = true;
			}
		});
		
	}
});

//function inTop(json){
//	json = json || {};
//	var obj = json.obj;
//	var top = json.top?json.top:0;
//	var fn = json.backFn?json.backFn:false;
//	var oJson = {'obj':obj, 'top':top, 'fn':fn};
//	
//	var objO = $(oJson.obj);
//	var objH = $(oJson.obj).offset().top;
//	var lock = true;
//	$(window).scroll(function(){
//		//获取滚动条的滑动距离
//		var scroH = $(this).scrollTop();
//		//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
//		if(scroH>=objH && lock){
//			objO.css({"position":"fixed","top":oJson.top});
//			if(oJson.fn) oJson.fn();
//			lock = false;
//		}else if(scroH<objH){
//			objO.css({"position":"static"});
//			lock = true;
//		}
//	});
//}

//回到顶部
function backTop() {
	var speed = scrollTop = 0;
	var scrolldelay = setInterval(function(){
		scrollTop  = $(window.onscroll).scrollTop();
		if(scrollTop == 0) clearInterval(scrolldelay);
		window.scrollBy(0, -speed);
		speed = Math.ceil((scrollTop - speed)/5);
	}, 30);
}

//弹窗
function tip(str, urls, ids){
	dialog({
		title: '确认提示',
		content: str,
		width: '25em',
		quickClose: true,// 点击空白处快速关闭
		button: [
			{
				value: '确定',
				callback: function(){
					$.ajax({
						type:"post",
						url:urls,
						data:{
							id	:	ids,
						},
						success: function(data){
							if(data){
								window.location.reload();
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
						 	alert(XMLHttpRequest.status);
						 	alert(XMLHttpRequest.readyState);
						 	alert(textStatus);
						}
					});
				}
			},
			{
				value: '取消',
				callback: function(){
					return true;
				}
			}
		]
	}).show();
}

//通过class选取元素
function byClass(oParent, className){
	var aElement = [];
	var aChildren = oParent.getElementsByTagName('*');
	for(var i=0; i<aChildren.length; i++){
		if(aChildren[i] == className){
			aElement.push(aElement[i]);
		}
	}
	return aElement; 
}

//流量统计
//if (localStorage.pagecount){
//  localStorage.pagecount=Number(localStorage.pagecount)+1;
//}
//else{
//  localStorage.pagecount=1;
//}
//document.getElementById("p").innerHTML=localStorage.pagecount;

//上下左右滑动
var LSwiperMaker = function(o){
	var that = this;
	this.config = o;
	this.control = false;
	this.sPos = {};
	this.mPos = {};
	this.dire;
	// this.config.bind.addEventListener('touchstart', function(){ return that.start(); } ,false);
	// 这样不对的，event对象只在事件发生的过程中才有效;
	this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
	this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
	this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
}
LSwiperMaker.prototype.start = function(e){
	var point = e.touches ? e.touches[0] : e;
	this.sPos.x = point.screenX;
	this.sPos.y = point.screenY;
}
LSwiperMaker.prototype.move = function(e){
	var point = e.touches ? e.touches[0] : e;
	this.control = true;
	this.mPos.x = point.screenX;
	this.mPos.y = point.screenY;
}
LSwiperMaker.prototype.end = function(e){
	this.config.dire_h  && (!this.control ? this.dire = null : this.mPos.x > this.sPos.x ? this.dire = 'R' : this.dire = 'L')
	this.config.dire_h  || (!this.control ? this.dire = null : this.mPos.y > this.sPos.y ? this.dire = 'D' : this.dire = 'U')
	this.control = false;
	this.config.backfn(this);
}
window.LSwiperMaker = LSwiperMaker;
//	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);// 禁止微信touchmove冲突



//var a = new LSwiperMaker({
//			bind:document.getElementById("rect"),  // 绑定的DOM对象
//			dire_h:true,     //true 判断左右， false 判断上下
//			backfn:function(o){    //回调事件
//				 document.getElementById("dire").innerHTML = "向"+ o.dire + "滑";  
//			}
//	})




//轮播框架
function myBanner(obj, boxType, boxWidth, imgWidth = 1, imgHeight = 1){
	var oBanner2 = document.getElementById(obj);
	var oUl2 = oBanner2.getElementsByTagName('ul')[0];
	obj = '#'+obj;
	var oBanner = $(obj);
	var oUl = $(obj+' ul');
	var aUli = $(obj+' ul li');
	var length = aUli.length;
	oBanner.append('<ol></ol> <span class="banner-prev"></span> <span class="banner-next"></span>');
	var oOl = $(obj+' ol');
	var prev = $('.banner-prev');
	var next = $('.banner-next');
	var rata = imgHeight / imgWidth * 100 + '%';
	
	var timer = null;	//定时器
	var index = 1;	//索引值
	var target = tmp = 0; //目标值 / 中间变量
	
	
	//自动生成轮播点
	oOl.css('width', 25*length);
	tmp = '<li class="active"></li>';
	for(var i=0; i<length-1; i++){
		tmp += '<li></li>';
	}
	oOl.append(tmp);
	var aOli = $(obj+' ol li');
	if(boxType == 'opacity'){				//动画一：隐藏显示
		aUli.eq(0).addClass('active'); /*使第一张图片显示*/		
		oUl.addClass('op');
		oUl.css({'padding-bottom':rata});	//解决子元素决定定位父元素无高度bug --2
		oBanner.css('width', boxWidth);
		var start = function(){
			if(index == length) index = 0;
			for(var j = 0; j < length; j++){aUli[j].className = ''; aOli[j].className = '';}
			aUli.eq(index).addClass('active');
			aOli.eq(index).addClass('active');
			index++;
		}
	}else if(boxType == 'huadong'){			//动画二：滑动轮播
		oUl.addClass('hd');
		oBanner.css('width', boxWidth);
		if(boxWidth == '100%'){
			var start = function(){
				if(index == length) index = 0;
				oUl.stop().animate({'left':index * -100 + '%'});
				for(var j = 0; j < length; j++){aOli[j].className = '';}
				aOli.eq(index).addClass('active');
				index++;
			}
		}else{
			oUl.css('width', length*boxWidth);
			aUli.css('width', boxWidth);
			var start = function(){
				if(index == length) index = 0;
//				oUl.stop().animate({'left':index * boxWidth * -1});
				starMove(oUl2, {'left':index * boxWidth * -1});
				for(var j = 0; j < length; j++){aOli[j].className = '';}
				aOli.eq(index).addClass('active');
				index++;
			}
		}
	}else if(boxType == 'wufeng'){
		oUl.addClass('hd');
		oUl.prepend(aUli[length-1].outerHTML);
		oUl.append(aUli[0].outerHTML);
		oOl.prepend('<li style="display: none"></li>');
		oOl.append('<li style="display: none"></li>');
		oBanner.css('width', boxWidth);
		length += 2;
		index = 2;
		
		if(boxWidth == '100%'){
			oUl.css('left', '-' + boxWidth);
			var start = function(){
				if(index == length - 1){
					oUl.stop().animate({'left':index * -100 + '%'}, function(){
						oUl.css('left', '-' + boxWidth);
					});
					index = 1;
				}else if(index == 0){
					oUl.stop().animate({'left':index * -100 + '%'}, function(){
						oUl.css('left', (length - 2) * -100 +'%');
					});
					index = length - 2;
				}else{
					oUl.stop().animate({'left':index * -100 + '%'});
				}
				for(var j = 0; j < length - 2; j++){aOli[j].className = '';}
				aOli.eq(index - 1).addClass('active');
				index++;
			}
		}else{
			oUl.css('left', '-' + boxWidth + 'px');
			oUl.css('width', length * boxWidth);
			oUl.children('li').css('width', boxWidth);
			var start = function(){
				if(index == length - 1){
					oUl.stop().animate({'left':index * boxWidth * -1}, function(){
						oUl.css('left', '-' + boxWidth + 'px');
					});
//					starMove(oUl2, {'left':index * boxWidth * -1}, function(){
//						oUl.css('left', '-' + boxWidth + 'px');
//					});
					index = 1;
				}else if(index == 0){
					oUl.stop().animate({'left':index * boxWidth * -1}, function(){
						oUl.css('left', (length - 2) * boxWidth * -1 + 'px');
					});
//					starMove(oUl2, {'left':index * boxWidth * -1}, function(){
//						oUl.css('left', (length - 2) * boxWidth * -1 + 'px');
//					});
					index = length - 2;
				}else{
					oUl.stop().animate({'left':index * boxWidth * -1});
//					starMove(oUl2, {'left':index * boxWidth * -1});
				}
				for(var j = 0; j < length - 2; j++){aOli[j].className = '';}
				aOli.eq(index - 1).addClass('active');
				index++;
			}
		}
	}	//可以不断添加else if（）来扩展动画   核心是编写不同的start（）方法
	
	//下面是通用事件
	timer = setInterval(start, 4000); //开启轮播定时器
	
	aOli.mouseover(function(){
		index = $(this).index();
		clearInterval(timer);
		start();
	});
	aOli.mouseout(function(){
		timer = setInterval(start, 4000);
	});
	prev.click(function(){
		clearInterval(timer);
		if(index == 1) index = length-1;
		else index = index-2;
		start();
		timer = setInterval(start, 4000);
	});
	next.click(function(){
		clearInterval(timer);
		if(index == 0) index = length-1;
		start();
		timer = setInterval(start, 4000);
	});
	oUl.mouseover(function(){
		clearInterval(timer);
	});
	oUl.mouseout(function(){
		timer = setInterval(start, 4000);
	});
	
}
