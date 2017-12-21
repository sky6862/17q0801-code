// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//es6 引入
import Vue from 'vue'  //引入vuejs
import App from './App'//引入 App.vue 单文件组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<App/>',
  template:"<App></App>",//模板里面使用的是一个组件:App
  components: { App }  //组件:App
 /* components:{
  	a:{},
  	b:{}
  }
  components:{a,b}*/
})
