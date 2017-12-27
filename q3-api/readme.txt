q3验证码接口：

1.获取验证码：
eg:http://127.0.0.1/q3-api/create_code.php?time=12345678

说明：

url:http://127.0.0.1/q3-api/create_code.php
方式：get/post
参数：time　一个随机数
返回值类型：是一个图片

使用：
<img src="http://127.0.0.1/q3-api/create_code.php?time=12345678" alt="">
其中　time　参数要每次变一下，相当于刷新页面

2.检查验证码：
　
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

整理：2017.12.27