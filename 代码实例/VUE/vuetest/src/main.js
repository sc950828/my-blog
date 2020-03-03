// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.config.productionTip = false

console.log(Vue.version)

// axios.interceptors.request.use(function(config){
//   console.log(config)
//   return config
// }, function(error){
//   return Promise.reject(error);
// })
//
// axios.interceptors.response.use(function(data){
//   console.log(`拦截器${data}`)
//   return data
// }, function(error){
//   return Promise.reject(error);
// })
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(ElementUi)

router.beforeEach((to, from, next) => {
  console.log('全局前置守卫 beforeEach')
  next()
})

router.afterEach((to, from) => {
  console.log('全局后置守卫 afterEach')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
