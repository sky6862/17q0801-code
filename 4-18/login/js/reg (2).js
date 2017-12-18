$( window ).ready( function () {

    var lis = $( '.middle .left .top li' );

    var liDowns = $( '.middle .left .down li' );

    lis.click( function () {

        lis.removeClass( 'on' );

        $(this).addClass( 'on' );

        liDowns.removeClass( 'on' );

        liDowns.eq( $(this).index() ).addClass( 'on' );

    } );    

   //注册
   $("#reg").on("click",function(event){
   		event.preventDefault();
   		var name = $("#name").val();
   		var pwd = $("#pwd").val();
   		var mobile = $("#mobile").val();

   	    if(name==""||pwd==""||mobile==""){
   	    	alert("用户名，密码，手机号为必须写的内容!");
   	    	return false;
   	    }

   	     //3.发送请求，验证
        $.ajax({
            url:"http://api.yyw66.cn/dodiapi/reg.php",
            type:"post",
            dataType:"json",

            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            
            data:{"account":name,"password":pwd,"phone":mobile},
            success:function(result){
                console.log("SUCCEESS",result)
            },
            error:function(result){
                console.log("ERROR",result)
            }
        });
   });

} );