import Dashboard from '../components/Dashboard'
import Login from '../pages/Login';
import Password from '../pages/Password';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome'
import User from '../pages/User'
import ArticleCategory from '../pages/ArticleCategory'
import Article from '../pages/Article'
import Message from '../pages/Message'
import Material from '../pages/Material'
import OperateMaterial from '../pages/Material/operate.jsx'
import MaterialCategory from '../pages/MaterialCategory'
import Project from '../pages/Project'
import Setting from '../pages/Setting'

import {
  HomeOutlined,
  PictureOutlined,
  FolderOutlined,
  FileOutlined,
  ProjectOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons';

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
    requiresAuth: false,
    routes: [
      {
        path: "/",
        exact: true,
        component: Welcome,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "首页", icon: <HomeOutlined />}
      },
      {
        path: "/user",
        component: User,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "用户管理", icon: <UserOutlined />}
      },
      {
        path: "/materialCategory",
        component: MaterialCategory,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "素材文件夹管理", icon: <FolderOutlined />}
      },
      {
        path: "/material",
        component: Material,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "素材管理", icon: <PictureOutlined />}
      },
      {
        path: "/materialoperate",
        component: Dashboard,
        requiresAuth: true, //需要登陆后才能跳转的页面
        menuShow: false,
        meta: {title: "素材管理", icon: <PictureOutlined />},
        routes: [
          {
            path: "/materialoperate/add",
            component: OperateMaterial,
            requiresAuth: true,
            meta: {title: "添加素材"}
          }
        ]
      },
      {
        path: "/articleCategory",
        menuShow: true,
        component: ArticleCategory,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "文章分类管理", icon: <FolderOutlined />}
      },
      {
        path: "/article",
        component: Article,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "文章管理", icon: <FileOutlined />}
      },
      {
        path: "/project",
        component: Project,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "项目管理", icon: <ProjectOutlined />}
      },
      {
        path: "/message",
        component: Message,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "留言管理", icon: <MessageOutlined />}
      },
      {
        path: "/setting",
        component: Setting,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "设置管理", icon: <SettingOutlined />}
      },
    ]
  }
]

export default routes
