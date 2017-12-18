// 页面加载完成后执行
$(document).ready(function(){
	check_login(); //检查用户是否登录

	//1.注册
	$("#btnReg").bind("click",function(event){
		// 2.获取表单中信息
		var name = $("#username1").val();
		var pwd = $("#password1").val();

		var tips_info = $("#reg_tips");
		//3.检查表单内容

        // 用户：4-8之间
        var name_len = name.length;
        //不在 4-8之间
        if(name_len>=9 || name_len<=3){
        	// alert("用户名长度在4-8位之间!");
        	tips_info.html("用户名长度在4-8位之间!").addClass('error');
        	return false;//终止程序向下执行
        }else{
            //检查有error class,就移走
        	if(tips_info.hasClass('error')){
        		tips_info.removeClass('error');
        	}
        	tips_info.html("输入正确!").addClass('suc');
        }

        //密码不在 4-8之间
        var pwd_len = pwd.length;
        if(pwd_len>=9 || pwd_len<=3){
        	// alert("用户名长度在4-8位之间!");
        	tips_info.html("密码长度在4-8位之间!").addClass('error');
        	return false;//终止程序向下执行
        }else{
            //检查有error class,就移走
        	if(tips_info.hasClass('error')){
        		tips_info.removeClass('error');
        	}
        	tips_info.html("密码输入正确!").addClass('suc');
        }

        //4.发送数据到服务端,进行注册
        // http://127.0.0.1/17q0801/4-16/message.php?do=reg&password=123456&username=17q0901
		 /*  
		 {
			    "status": 2,
			    "msg": "用户名:17q0901已经注册!"
		 }
		*/
		$.ajax({
			url:"./message.php",//后端处理的地址
			type:"get",//http 请求方式:get,post,jsonp
			dataType:"json",//服务端返回的数据类型：json格式 
			data:{"username":name,"password":pwd,"do":"reg"},//数据：这里的格式通常跟服务端返回的数据类型一致，所以这里也有json格式发送数据
			beforeSend:function(xhr){
				//发送前信息
				tips_info.html("正准备发送数据...");
			},
			success:function(result){
				//result 服务端返回的结果的一个参数，可以自己定义：
				/*result = {
					status:0  0 失败 1成功 2已经注册
					msg:””   提示信息
					username：”bluesky”  注册的用户名
				}
				*/
				//ajax 成功 时 自动 调用
				//页面上，显示注册的结果
				tips_info.html(result.msg);
				// 优化注册提示消息，3s后删除提示
				setTimeout(function(){tips_info.fadeOut();},3000);
				// console.log(result);
			},
			error:function(){
				//ajax 不成功 时 自动 调用：message.php出错，服务器/用户没网了，服务器出错了，js有问题、
				console.log("网络忙，稍后再试试~");
			}
		});
	});

	//2.login
	$("#btnLogin").on("click",function(){
		//1.取内容
		var name = $("#username2").val();
		var pwd = $("#password2").val();
        var login_info = $("#login_tips");

        //2.验证
		if(name==""){
			login_info.html("请输入用户名!").css("color","red");
			return false;
		}

		if(pwd==""){
			login_info.html("请输入密码!").css("color","red");
			return false;
		}
		//清空提示
		login_info.empty();

		//3.发送数据
	    $.ajax({
	    	url:"./message.php",
	    	type:"post",
	    	dataType:"json",
	    	data:{"username":name,"password":pwd,"do":"login"},
	    	success:function(result){
	    		/*服务端返回的结果：result
				result = {
					status:0,  0密码不正确 1登录成功 2已经登录 3用户没有注册 
					msg:””,   提示信息
					username：”bluesky”  登录的用户名   //登录成功时返回用户名,uid
					uid: 2  用户id
				}
	    		*/
	    		console.log(result);
	    		login_info.html(result.msg);//提示
	    		//如果登录成功了，或已经登录了
	    		if(result.status==1||result.status==2){
	    			// 隐藏login,reg 页面
	    			$("#login,#reg").slideUp();
	    			//显示 登录的用户名
	    			$("#user").slideDown();
	    			$("#userinfo").html(result.username+"欢迎回来!");
	    		}
	    	},
	    	error:function(result){
	    		console.log('error',"请秒后再试试!");
	    	}
	    });
	});

	//4.发表留言
	$("#btnPost").click(function(){
		//取内容
		var con_msg = $.trim($("#content").val());
		var msg = $("#con_msg");

		//判断
		if(con_msg==""){
			msg.text('请填写内容!');
			return false;
		}

		//发送请求
		// jQuery.post(url, [data], [callback], [type])
		$.post("./message.php",{"con":con_msg,"do":"post_msg"},function(result){
			//do
			console.log(result);
			//显示提示
			msg.html(result.msg);
			//创建一条留言信息
			if(result.status==1){
				var str='';
					str+='<dl>';
					str+='<dt>';
					str+='<strong>'+result.username+'</strong> 说 :';
					str+='<span style="float:right">'+result.dateline+'</span>';
					str+='</dt>';
					str+='<dd>'+result.content+'</dd>';
					str+='<dd class="t">';
					str+='<a href="javascript:;" id="support">顶(<span>'+result.support+'</span>)</a>';
					str+=' | ';
					str+='<a href="javascript:;" id="oppose">踩(<span>'+result.oppose+'</span>)</a>';
					str+='</dd>';
					str+='</dl>';
			}
			//内部的前面添加内容
			$("#list").prepend(str);
		},"json");

	});

	//5.检测用户登录
	function check_login(){
		//请求json数据
		$.getJSON("./message.php",{"do":"is_login"},function(result){
			if(result.status==1){
				// 隐藏login,reg 页面
    			$("#login,#reg").hide();
    			//显示 登录的用户名
    			$("#user").show();
    			$("#userinfo").html(result.data.username+"欢迎回来!");
			}
		});
	}

	//6.留言列表
	function getList(){
		//返回值:jQuery.get(url, [data], [callback], [type])
		$.get("message.php",{"do":"list"},function(result){
			console.log(result);
		},"json");
	}
	getList();

});