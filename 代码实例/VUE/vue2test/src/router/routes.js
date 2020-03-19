export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue")
  },
  {
    path: "/lifecycle",
    name: "LifeCycle",
    component: () => import("../views/life_cycle.vue")
  },
  {
    path: "/valuebind",
    name: "ValueBind",
    component: () => import("../views/value_bind.vue")
  },
  {
    path: "/styleclass",
    name: "StyleClass",
    component: () => import("../views/style_class.vue")
  },
  {
    path: "/event",
    name: "Event",
    component: () => import("../views/event.vue")
  },
  {
    path: "/forifshow",
    name: "ForIfShow",
    component: () => import("../views/for_if_show.vue")
  },
  {
    path: "/methodscomputedwatch",
    name: "MethodsComputedWatch",
    component: () => import("../views/methods_computed_watch.vue")
  },
  {
    path: "/set",
    name: "Set",
    component: () => import("../views/set.vue")
  },
  {
    path: "/filter",
    name: "Filter",
    component: () => import("../views/filter.vue")
  },
  {
    path: "/directive",
    name: "Directive",
    component: () => import("../views/directive.vue")
  },
  {
    path: "/mixin",
    name: "Mixin",
    component: () => import("../views/mixin.vue")
  },
  {
    path: "/slot",
    name: "Slot",
    component: () => import("../views/slot.vue")
  },
  {
    path: "/nexttick",
    name: "NextTick",
    component: () => import("../views/next_tick.vue")
  },
  {
    path: "/model",
    name: "Model",
    component: () => import("../views/model.vue")
  },
  {
    path: "/parent",
    name: "Parent",
    component: () => import("../views/parent.vue")
  },
  {
    path: "/name",
    name: "Name",
    component: () => import("../views/name.vue")
  },
  {
    path: "/pre",
    name: "Pre",
    component: () => import("../views/pre.vue")
  },
  {
    path: "/once",
    name: "Once",
    component: () => import("../views/once.vue")
  },
  {
    path: "/store1",
    name: "Store1",
    component: () => import("../views/store1.vue")
  },
  {
    path: "/store2",
    name: "Store2",
    component: () => import("../views/store2.vue")
  },
  {
    path: "/router1/:id",
    name: "Router1",
    component: () => import("../views/router1.vue"),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      console.log("beforeEnter to", to);
      console.log("beforeEnter from", from);
      next()
    }
  }
];
