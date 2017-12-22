<template>
  <div id="app">
   <img src="./assets/logo.png">
   <!--  <HelloWorld/> -->
   <hr>
   <router-link to="/user">用户首页</router-link>
   <router-link to="/user/1">用户首页-带参数</router-link>
   <!-- 显示路由中目标页面的地方 -->
   <router-view></router-view>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
