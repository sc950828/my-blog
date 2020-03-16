import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';

// 取消 Vue 所有的日志与警告 默认是false
Vue.config.silent = false
// 配置是否允许 vue-devtools 检查代码 默认为true
Vue.config.devtools = true

Vue.config.productionTip = false;

// 全局注册过滤器
Vue.filter("upperCase", function(val) {
  return val.toUpperCase();
});

// 全局注册指令
Vue.directive("fixed", {
  bind(el, bindling, newVnode) {
    console.log("globle bind");
    console.log(el);
    console.log(bindling);
    console.log(newVnode);
  },
  inserted(el, binding, newVnode) {
    console.log("globle instered");
    console.log(el);
    console.log(binding);
    console.log(newVnode);
    el.style.position = "fixed";
    // 参数和值
    el.style[binding.arg] = binding.value + "px";
  },
  update(el, binding, newVnode, oldVnode) {
    console.log("globle update");
    console.log(el);
    console.log(binding);
    console.log(newVnode);
    console.log(oldVnode);
  },
  componentUpdate(el, binding, newVnode, oldVnode) {
    console.log("globle componentUpdate");
    console.log(el);
    console.log(binding);
    console.log(newVnode);
    console.log(oldVnode);
  },
  unbind(el, binding, newVnode) {
    console.log("globle unbind");
    console.log(el);
    console.log(binding);
    console.log(newVnode);
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
