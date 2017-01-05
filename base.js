
var $=function(_this){
	return new Base(_this);
}
function Base(_this){
	// 创建一个数组，来保存获取的节点和节点数组
	this.elements=[];
	if(_this!=undefined){ //_this是一个对象，undefind也是一个对象，区别typeof返回的带单引号的undefined
		this.elements[0]=_this;
	}
	//获取id节点
	this.getId=function(id){
		this.elements.push(document.getElementById(id)); 
		return this;
	};
	// 获取元素节点
	this.getTagName=function(tag){
		var tags=document.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i]);
		};
		return this;
	}
	//获取class节点数组
	this.getClass=function(className,idName){
		var node=null;
		if(arguments.length==2){
			node=document.getElementById(idName);
		}else{
			node=document;
		}
		var all=node.getElementsByTagName('*');
		for (var i = 0; i < all.length; i++) {
			if(all[i].className==className){
				this.elements.push(all[i]);
			}
		};
		return this;
	}
	//获取某一个节点
	this.getElement=function(num){
		var element=this.elements[num];
		this.elements=[];
		this.elements[0]=element;
		return this;
	}


}


//设置css
Base.prototype.css=function(attr,value){
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length==1){
			if(typeof window.getComputedStyle!='undefined'){//w3c
				return window.getComputedStyle(this.elements[i],null)[attr];	
			}else if(typeof this.elements[i].currentStyle !='undefined'){//ie
				return this.elements[i].currentStyle[attr];
			}	
		}else{
			this.elements[i].style[attr]=value;
		}
		
	};
	
	return this;
}
//添加class
Base.prototype.addClass=function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className +=' '+ className;
		}
	};
	return this;
}
//移除class
Base.prototype.removeClass=function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|^)'),'')
		}
	};
	return this;
}
// 添加link或style的css规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule !='undefined'){
		sheet.insertRule(selectorText+'{'+cssText+'}',position); //w3c
	}else if(typeof sheet.addRule!='undefined'){
		sheet.addRule(selectorText,cssText,position);//ie
	}
	return this;
}
//移除linke或style的css规则
Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule!='undefined'){
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule !='undefined'){
		sheet.removeRule(index);
	}
	return this;
}
// 设置innerHtml
Base.prototype.html=function(str){
	for (var i = 0; i < this.elements.length; i++) {
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}else{
			this.elements[i].innerHTML=str;
		}
	};
	return this;
}
//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	};
}
//设置显示
Base.prototype.show=function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='block';
	}
	return this;
}
//设置影藏
Base.prototype.hide=function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='none';
	}
	return this;
}

//设置物体居中
Base.prototype.center=function(width,height){
	var top=(document.documentElement.clientHeight-height)/2;
	var left=(document.documentElement.clientWidth-width)/2;
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	};
	return this;
}
//锁屏功能
Base.prototype.lock=function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.width=getInner().width+'px';
		this.elements[i].style.height=getInner().height+'px';
		this.elements[i].style.display='block';
	};
	return this;
}

Base.prototype.unlock=function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='none';
	};
	return this;
}

// 设置点击事件
Base.prototype.click=function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick=fn;
	};
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
	window.onresize=fn;
	return this;
}

//拖拽功能
Base.prototype.drag=function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmousedown=function(e){
			preDef(e);
			var e=getEvent(e);
			var _this=this;
			var diffX=e.clientX-_this.offsetLeft;
			var diffY=e.clientY-_this.offsetTop;

			if(typeof _this.setCapture !='undefined'){
				_this.setCapture();
			}
			document.onmousemove=function(){
				var e=getEvent(e);
				var left=e.clientX-diffX;
				var top=e.clientY-diffY;
				if(left<0){
					left=0;
				}else if(left>getInner().width-_this.offsetWidth){
					left=getInner().width-_this.offsetWidth;
				}
				if(top<0){
					top=0
				}else if(top>getInner().height-_this.offsetHeight){
					top=getInner().height-_this.offsetHeight;
				}
				_this.style.left=left+'px';
				_this.style.top=top+'px';
			};
			document.onmouseup=function(){
				this.onmousemove=null;
				this.onmouseup=null;

				if(typeof _this.releaseCapture !='undefined'){
					_this.releaseCapture();
				}
			}
		};
	};
	return this;
}