import Login from '../pages/Login';
import Password from '../pages/Password';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome'
import User from '../pages/User'
import Category from '../pages/Category'
import Article from '../pages/Article'
import Message from '../pages/Message'
import Material from '../pages/Material'
import Project from '../pages/Project'
import Setting from '../pages/Setting'

const routes = [
  {
    path: '/login',
    component: Login,
    requiresAuth: false
  },
  {
    path: '/password',
    component: Password,
    requiresAuth: false
  },
  {
    path: '/',
    component: Home,
    requiresAuth: true, //需要登陆后才能跳转的页面
    routes: [
      {
        path: "/",
        exact: true,
        component: Welcome,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/user",
        component: User,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/category",
        component: Category,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/article",
        component: Article,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/message",
        component: Message,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/material",
        component: Material,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/project",
        component: Project,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
      {
        path: "/setting",
        component: Setting,
        requiresAuth: true, //需要登陆后才能跳转的页面
      },
    ]
  }
]

export default routes
