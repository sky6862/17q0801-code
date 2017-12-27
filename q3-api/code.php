<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>验证码使用实例</title>
</head>
<body>
	<img  title="点击刷新" src="./create_code.php"
	 onclick="this.src='create_code.php?time='+Math.random();"></img>

	 <!-- 
		//获取验证码：
　
		eg:http://127.0.0.1/q3-api/create_code.php?time=12345678
		
		说明：

	　　url:http://127.0.0.1/q3-api/create_code.php
	    方式：get/post
	    参数：time　一个随机数
	    返回值类型：是一个图片

	    使用：
	    <img src="http://127.0.0.1/q3-api/create_code.php?time=12345678" alt="">
        
        其中　time　参数要每次变一下，相当于刷新页面
	  -->
</body>
</html>