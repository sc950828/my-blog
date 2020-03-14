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
  }
];
