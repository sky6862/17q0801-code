//模块化的思想，每个js,css,vue.js，*.vue　都可以看成是一个模块，用的时候，
//使用import 导入就能用了
import Vue from 'vue'    //Ｖue 核心
import VueRouter from 'vue-router' //引入路由(模块、插件)

import App from './App'　//Ａpp.vue　单文件组件
import User from './components/User.vue' //引入　Ｕser.Vue组件
import Login from './components/Login.vue' //引入　Ｕser.Vue组件
import Register from './components/Register.vue' //引入 Register.Vue组件

//*注册路由插件
Vue.use(VueRouter )

// Vue.config.productionTip = false

//1.创建路由规则
var route_rule = [
    {path:"/user",component:User},
    // /user/1
    {path:"/user/:uid",component:User},//带参数的
    {path:"/login",component:Login},
    {path:"/register",component:Register}
];

//2.创建路由实例
var routes = new VueRouter({
	routes:route_rule
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App><App/>',
  components: { App },
  // routes:routes　错的
  router:routes //3.在实例中指定路由
})
