import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes
});

// 全局导航前置守卫
router.beforeEach((to, from, next) => {
  console.log("beforeEach to", to);
  console.log("beforeEach from", from);
  next();
});

// 全局导航后置守卫
router.afterEach((to, from) => {
  console.log("afterEach to", to);
  console.log("afterEach from", from);
});

// beforeResolve 同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
router.beforeResolve((to, from, next) => {
  console.log("beforeResolve to", to);
  console.log("beforeResolve from", from);
  next();
});

export default router;
