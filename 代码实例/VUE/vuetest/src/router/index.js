import Vue from 'vue'
import  VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('../components/Home'),
    beforeEnter: (to, from, next) => {
      console.log('路由独享守卫', to, from)
      next()
    },
    meta: {name: 'randy'}, //带一些元数据
    children:[ //嵌套路由
      {
        name: 'contact',
        path: '/contact',
        component: () => import('../components/Contact')
      },
      {
        name: 'about',
        path: '/home/about',
        component: () => import('../components/About')
      }
    ]
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('../components/Main'),
    alias: '/m'
  },
  {
    name: 'content',
    path: '/content',
    component: () => import('../components/Content'),
    redirect: '/home'
  },
  {
    name: 'about',
    path: '/about/:name',
    component: resolve => require(['../components/About'], resolve)
  },
  {
    name: 'all',
    path: '/all',
    components: {
      default: resolve => require(['../components/About'], resolve),
      home: resolve => require(['../components/Home'], resolve),
      main: resolve => require(['../components/Main'], resolve)
    }
  },
  {
    name: 'axios',
    path: '/axios',
    component: () => import('../components/Axios')
  },
  {
    name: 'vuex',
    path: '/vuex',
    component: () => import('../components/VuexTest')
  },
  {
    name: 'layout',
    path: '/layout',
    component: () => import('../components/Layout')
  },
  {
    name: 'container',
    path: '/container',
    component: resolve => require(['../components/ContainerTest'], resolve)
  },
  {
    name: 'table',
    path: '/table',
    component: () => import('../components/TableTest')
  },
  {
    name: 'transitiontest',
    path: '/transitiontest',
    component: resolve => require(['../components/transitionTest'], resolve)
  },
  {
    name: 'methodstest',
    path: '/methodstest',
    component: () => import('../components/methodsTest')
  },
  {
    name: 'eventtest',
    path: '/eventtest',
    component: () => import('../components/Event')
  },
  {
    name: 'lifecycletest',
    path: '/lifecycletest',
    component: () => import('../components/LifeCycle')
  },
  {
    name: 'eventmodifiertest',
    path: '/eventmodifiertest',
    component: () => import('../components/EventModifier')
  },
  {
    name: 'xunhuan',
    path: '/xunhuan',
    component: () => import('../components/XunHuan')
  },
  {
    name: 'methods',
    path: '/methods',
    component: () => import('../views/methods')
  },
  {
    name: 'filters',
    path: '/filters',
    component: () => import('../views/filters')
  },
  {
    name: 'slot',
    path: '/slot',
    component: () => import('../views/slot')
  },
  {
    name: 'watch',
    path: '/watch',
    component: () => import('../components/Watch')
  },
  {
    name: 'allEcharts',
    path: '/allEcharts',
    component: () => import('../components/AllEcharts'),
    children: [
      {
        name: 'echarts',
        path: 'echarts',
        component: () => import('../components/EchartsTest')
      },
      {
        name: "echart1",
        path: "echart1",
        component: resolve => require(["../views/echarts/echart1"], resolve)
      },
      {
        name: "echart2",
        path: "echart2",
        component: resolve => require(["../views/echarts/echart2"], resolve)
      },
      {
        name: 'echart3',
        path: 'echart3',
        component: () => import("../views/echarts/echart3")
      },
      {
        name: 'echart4',
        path: 'echart4',
        component: () => import("../views/echarts/echart4")
      }
    ]
  },
  {
    name: 'elementlayout',
    path: '/elementlayout',
    component: () => import("../views/elementui/layout")
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
