//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth !='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}


//过去event对象
function getEvent(event){
	return  event || window.event;
}
//阻止默认行为
function preDef(event){
	var e=getEvent(event);
	if(typeof e.prevenDefault !='undefined'){
		e.prevenDefault();
	}else{
		e.returnValue=false;
	}
}

//把ie常用的event对象配对到w3c中去
addEvent.fixEvent=function(event){
	event.prevenDefault=addEvent.fixEvent.preventDefault;
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){
	this.returnValue=false;
}
//ie取消冒泡
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
}
//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener !='undefined'){
		obj.addEventListener(type,fn,false);
	}else{
		//创建一个存放时间的哈希表
		if(!obj.events) obj.events={};
		//第一次执行
		if(!obj.events[type]){
			//创建一个存放事件处理的函数的数组
			obj.events[type]=[];
			//把第一次的事件处理函数储存到第一个位置上
			if(obj['on'+type]) obj.events[type][0]=fn;
		}else{
			//同一个注册函数进行屏蔽不添加到计数器中
			if(addEvent.equal(obj.events[type],fn)) return false;
		} 
		//第二次开始我们用事件计算器来存储
		obj.events[type][addEvent.ID++]=fn;
		//执行事件处理函数
		obj['on'+type]=addEvent.exec();
	}
}
//为每个事件分配一个计数器
addEvent.ID=1;
//执行时间处理函数
addEvent.exec=function(event){
	var e=event || addEvent.fixEvent(window.event);
	for (var i in this.events[e.type]) {
		this.events[e.type][i].call(this);
	};
}

//同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
	if(var i in es){
		if(es[i]==fn) return true;
	}
	return false;
}
//跨浏览删除事件绑定
function removeEvent(obj,type,fn){
	if (typeof obj.removeEventListener !='undefined') {
		obj.removeEventListener(type,fn,false);
	}else{
		for (var i in obj.events[type]) {
			if(obj.events[type][i]==fn){
				delete obj.events[type][i];
			}
		};
	}
}