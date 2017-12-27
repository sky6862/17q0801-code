<?php
header("Content-type: text/html; charset=utf-8"); 
session_start();
$code = $_REQUEST["code"];

if($code==$_SESSION['code_img']){
	$info = array("status"=>1,"msg"=>"验证码正确!");
	echo json_encode($info,JSON_UNESCAPED_UNICODE);
	exit();
}else{
	$info = array("status"=>0,"msg"=>"验证码错误!");
	echo json_encode($info,JSON_UNESCAPED_UNICODE);
	exit();
}
//检查验证码：
/*　
	eg:http://127.0.0.1/q3-api/check_code.php?code=gnmf
	
	说明：
　　url:http://127.0.0.1/q3-api/check_code.php
    方式：get/post
    参数：code 传递过来的验证码
    返回值类型：json
    返回数据：
    {
	    "status":1,　　1成功，0失败
	    "msg":"验证码正确!"
    }
*/