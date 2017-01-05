window.onload=function(){
	//个人中心的下拉菜单
	$().getClass('member').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$().getClass('memberul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$().getClass('memberul').hide();
	})

	//登录框
	var login=$().getId('login');
	login.center(350,250);
	$().resize(function(){
		login.center(350,250)
		if(login.css('display')=='block'){
			$().getId('screen').lock();
		}
		
	});
	$().getClass('login').click(function(){
		login.show();
		$().getId('screen').lock();
	})

	$().getClass('close').click(function(){
		login.hide();
		$().getId('screen').unlock();
	});


	//拖拽
	login.drag();

}
addEvent(window,'load',function(){
		alert(1);
	})

	addEvent(window,'load',function(){
		alert(2);
	})
	addEvent(window,'load',function(){
		alert(3);
	})