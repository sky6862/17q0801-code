<template>
    <div>
    	<h2>{{msg}}-id是：{{$route.params.uid}}</h2>
    	<hr>
    	{{uid}}
	    <hr>
		<router-link to="/login">登录</router-link>
		<router-link to="/register">注册</router-link>	
		<router-link to="/user/login">用户-登录：/user/login</router-link>
    </div>
</template>
<script type="text/javascript">
    //{里面的内容是组件的选项；data,methods,computed,...}
    //导出组件,其它地方可以使用
	export default{
		data:function(){
			return {
				msg:"Ｌucy 欢迎来到用户首页",
				uid:this.$route.params.uid 
			}
		}
	}
	//参数的获取：html：$route.params.uid
　　//            js:this.$route.params.uid
</script>
<style scoped>
	h2{
		color:orange;
		font-weight: bold;
	}
</style>