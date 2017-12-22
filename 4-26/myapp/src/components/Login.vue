<template>
	<!-- html -->
	<div class="login">
		<h1>登录</h1>
		<form action="" method="get" accept-charset="utf-8">
			<ul>
				<li>用户名：<input type="text" v-model="username"></li>
				<li>密码：<input type="text"></li>
				<li><button type="submit" v-on:click="login">提交</button></li>
			</ul>
		</form>
	</div>
</template>
<script type="text/javascript">
	export default{
		data:function(){
			return {
				username:""
			}
		},
		methods:{
			login:function(){
				alert(this.username)
			}
		}
	}
</script>
<style type="text/css" scoped>
	.login{
		border:1px solid orange;
	}
</style>