<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- App 组件里面 又使用了 HelloWorld 组件 -->
    <!-- <HelloWorld/> -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
//在当前组件中引入 其它组件
import HelloWorld from './components/HelloWorld'
//导出组件，在本页面使用
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
