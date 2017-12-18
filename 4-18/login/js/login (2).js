$( window ).ready( function () {



    function AutoLoginManager() {

        var loginKey = 'autoLogin';

        var storage = window.localStorage;

        this.loginKey = function () {

            return loginKey;

        };

        this.storage = ( function () {

            return storage;

        } () );

    }



    AutoLoginManager.prototype.autoLogin = function () {

        if ( this.storage.getItem( this.loginKey ) ) {

            return true;

        } else {

            return false;

        }

    };



    AutoLoginManager.prototype.toAutoLogin = function ( userName, password, checkBox ){

        var info = JSON.parse( this.storage.getItem( this.loginKey ) );

        userName.val( info.userName );

        password.val( info.password );

        checkBox.prop( 'checked', true ); 

    };



    AutoLoginManager.prototype.saveUserInformation = function ( userName, password ) {

        var info = {

            "userName": userName.val(),

            "password": password.val()

        };

        this.storage.setItem( this.loginKey, JSON.stringify( info ) );

    };



    function checkedAutoLogin() {

        return checkBox.attr( 'checked' );

    }









    var userName = $( '#userName' );

    var password = $( '#password' );

    var checkBox = $( '#remember' );



    var manager = new AutoLoginManager();



    if ( manager.autoLogin() ) {

        manager.toAutoLogin( userName, password, checkBox );

    }



    var loginButton = $( '.btn' );

    loginButton.click( function () { 

        if ( checkedAutoLogin() ) {

            manager.saveUserInformation( userName, password );

        }

    } ); 

    //登录
    $(".btn a").on("click",function(event){
        event.preventDefault();//阻止默认事件
        //1.取值
        var name = $("#userName").val();
        var pwd = $("#password").val();

        //2.验证
        if(name==""){
            alert("用户名不能为空！")
            return false;
        }

        if(pwd==""){
            alert("密码不能为空！")
            return false;
        }
      
        //3.发送请求，验证
        $.ajax({
            // url:"http://api.yyw66.cn/dodiapi/login.php?account="+name+"&password="+pwd,
            url:"http://api.yyw66.cn/dodiapi/login.php",
            type:"post",
            dataType:"json",

            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            
            data:{"account":name,"password":pwd},
            success:function(result){
                console.log("SUCCEESS",result)
            },
            error:function(result){
                console.log("ERROR",result)
            }
        });

    })

} );