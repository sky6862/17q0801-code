<?php 
error_reporting(0);
//连接接数据库
$con = mysql_connect("127.0.0.1","root","root");//服务器地址，用户名，密码
$p = mysql_select_db("17q0801",$con);//数据名称：book_d0801
mysql_query("set names utf8"); //set names utf8

//操作
$do=trim($_REQUEST["do"])?trim($_REQUEST["do"]):"";

//执行不同的操作
switch($do){
	case "post_msg":
	    $msg_con = $_REQUEST["con"];
	    $time = time();

	    //用户是否登录
	    if(!isset($_COOKIE["uid"])){
	    	echo json_encode(array("status"=>-1,"msg"=>"先登录后再留言!"));
	    	exit();
	    }
	    
	    $uid = $_COOKIE["uid"];

	    // $support = mt_rand(100);
	    // $oppose = mt_rand(100);

	    $sql = "insert into contents(uid,content,dateline,support,oppose) value($uid,'$msg_con','$time',0,0)";
	    $row = mysql_query($sql);

	    if($row){
	       //echo "留言成功!";  //成功
	       $arr = array(
	       	    "cid"=>mysql_insert_id(),
	    		"username"=>$_COOKIE["username"],
	    	    "content"=>$msg_con,
	    	    "dateline"=>date("Y-m-d H:i:s",$time),
	    	    "support"=>0,
	    	    "oppose"=>0,
				"status"=>1,
				"msg"=>"留言成功!"
	       );
	       echo json_encode($arr);//转为json 字符串
	       exit();
	    }else{
	       echo json_encode(array("status"=>0,"msg"=>"网络延迟-错误代码007"));
	       exit();
	    }
		break;
	
	//do=reg?username=&&password=	
	case "reg":
	    $username = trim(isset($_REQUEST['username']) ? $_REQUEST['username'] : '');
	    $password = trim(isset($_REQUEST['password']) ? $_REQUEST['password'] : '');
	    $avatar = trim(isset($_REQUEST['avatar']) && in_array($_REQUEST['avatar'], array(1,2,3,4,5,6,7,8,9)) ? intval($_REQUEST['avatar']) : 1);
	
        //检测用户名是否存在
        $u_sql = "select count(uid) as ct from users where username='{$username}'";
        $u_query = mysql_query($u_sql);
        $u_row = mysql_fetch_array($u_query);
        
        if($u_row['ct']>0){
            echo json_encode(array("status"=>2,"msg"=>"用户名:".$username."已经注册!"));
	        exit();
        }
        
        //注册信息写入数据库
	    $password = md5($password);
	    $sql = "INSERT INTO `users` (`username`, `password`, `avatar`) VALUES ('{$username}', '{$password}', {$avatar})";
	    $row = mysql_query($sql);
		//$row = mysql_fetch_row($query);
	   
	    if($row){
	    	//$_SESSION["uid"] = $username;//保存用户信息
	        echo json_encode(array("status"=>1,"msg"=>"注册成功!","username"=>$username));
	        exit();
	    }else{
	        echo json_encode(array("status"=>0,"msg"=>"注册失败!"));
	        exit();
	    }
		break;
		
	case "login":
	    $username = trim(isset($_REQUEST['username']) ? $_REQUEST['username'] : '');
	    $password = trim(isset($_REQUEST['password']) ? $_REQUEST['password'] : '');
	
	    if (isset($_COOKIE['uid'])) {
	        echo json_encode(array('status'=>2,'msg'=>'你已经登陆过了！','username'=>$username));
	        exit();
	    }
	
	    $pwd_sql = "SELECT * FROM `users` WHERE `username`='{$username}' limit 1";

	    $pwd_query = mysql_query($pwd_sql);
	    $rs = mysql_fetch_row($pwd_query);
	
	    if ($rs) {
	      if ($rs[2] != md5($password)) {
	        echo json_encode(array('status'=>0,'msg'=>'密码不正确'));exit();
	      } else {
	        setcookie('uid', $rs[0], time() + 3600*60, '/');
	        setcookie('username', $rs[1], time() + 3600*60, '/');

	        echo json_encode(array('status'=>1,'msg'=>'登陆成功！',"username"=>$rs[1],"uid"=>$rs[0]));
	        exit();
	      }
	    } else {
	      echo json_encode(array('status'=>3,'msg'=>'用户没有注册！'));
	      exit();
	    }
		break;
		
	case "list":
	    $c_sql ="select count(*) as count from contents";
	    $c_query = mysql_query($c_sql);
        $c_row = mysql_fetch_row($c_query);
        // echo ($c_row[0]);die();
        
        //每页条数
        $per_page_count = 5;

        //总记录数
	    $count = $c_row[0];

        $page_total = ceil($count/$per_page_count);

	    //当前页面
	    $page = $_REQUEST["page"]?$_REQUEST["page"]:1;
        
        //分页语句
        $limit_str = ($page-1)*$per_page_count.",".$per_page_count;

		$sql = "SELECT a.*,b.username from contents as a left JOIN users as b on a.uid=b.uid order by a.cid desc limit $limit_str";
		
	    $query = mysql_query($sql);
		
		$i=0;
		while($row=mysql_fetch_assoc($query)){
			$rs[]=$row;
			$rs[$i]['dateline']= date("Y-m-d H:i:s",$rs[$i]['dateline']);
			$i++;
		}

		if(!empty($rs)){
			echo json_encode(array('status'=>1,'msg'=>'ok！',"page_count"=>$page_total,"data"=>$rs));
		}else{
			echo json_encode(array('status'=>0,'msg'=>'暂时没有留言内容!',"page_count"=>$page_total));
		}
		break;
	case "logout":
		if (!isset($_COOKIE['uid'])) {
			echo json_encode(array('status'=>0,'msg'=>'你还没有登陆！'));
			exit();
		} else {
			setcookie('uid', 0, time() - 3600*60, '/');
			setcookie('username', 0, time() - 3600*60, '/');
			echo json_encode(array('status'=>1,'msg'=>'退出成功！'));
		}
		break;
	case "is_login":
	    if($_COOKIE["username"]){
	    	echo json_encode(array('status'=>1,'msg'=>'已经登陆',"data"=>array("username"=>$_COOKIE["username"],"uid"=>$_COOKIE['uid'])));
			exit();
	    }else{
	    	echo json_encode(array('status'=>0,'msg'=>'没有登陆！'));
			exit();
	    }
	    break;
	case "oppose":
		if (!isset($_COOKIE['uid'])) {
			echo json_encode(array('status'=>0,'msg'=>'你还没有登陆!'));
			exit();
		} else {
			$uid = $_COOKIE['uid'];
			$cid = $_REQUEST['cid'];

			$sql = "update contents set oppose=oppose+1,uid=".$uid." where cid=".$cid;
            $ret = mysql_query($sql);

            if($ret){
            	$s = "select oppose from contents where cid=".$cid;
            	$q = mysql_query($s);
            	$r = mysql_fetch_assoc($q);
            	echo json_encode(array('status'=>1,'msg'=>'谢谢参与！','number'=>$r['oppose']));exit();
            }else{
            	echo json_encode(array('status'=>-1,'msg'=>'网络忙,稍后再试!'));
            	exit();
            }
		}
		break;
	case "support":
		if (!isset($_COOKIE['uid'])) {
			echo json_encode(array('status'=>0,'msg'=>'你还没有登陆!'));
			exit();
		} else {
			$uid = $_COOKIE['uid'];
			$cid = $_REQUEST['cid'];
			
			$sql = "update contents set support=support+1,uid=".$uid." where cid=".$cid;
            $ret = mysql_query($sql);

            if($ret){
            	$s = "select support from contents where cid=".$cid;
            	$q = mysql_query($s);
            	$r = mysql_fetch_assoc($q);
                // var_dump($r);
            	echo json_encode(array('status'=>1,'msg'=>'谢谢参与！','number'=>$r['support']));exit();
            }else{
            	echo json_encode(array('status'=>-1,'msg'=>'网络忙,稍后再试!'));
            	exit();
            }
		}
		break;
    default:
        echo json_encode(array('status'=>0,'msg'=>'非法请求，缺少参数:do!eg:do=reg'));
		break;
}