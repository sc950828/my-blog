import Dashboard from '../components/Dashboard'
import Login from '../pages/Login';
import Password from '../pages/Password';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome'
import User from '../pages/User'
import OperateUser from '../pages/User/operate.jsx'
import ArticleCategory from '../pages/ArticleCategory'
import OperateArticleCategory from '../pages/ArticleCategory/operate.jsx'
import Article from '../pages/Article'
import OperateArticle from '../pages/Article/operate.jsx'
import Message from '../pages/Message'
import Material from '../pages/Material'
import OperateMaterial from '../pages/Material/operate.jsx'
import MaterialCategory from '../pages/MaterialCategory'
import SourceCategory from '../pages/SourceCategory';
import Source from '../pages/Source';
import OperateSource from '../pages/Source/operate.jsx';
import Setting from '../pages/Setting'

import {
  HomeOutlined,
  PictureOutlined,
  FolderOutlined,
  FileOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  HddOutlined 
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
        meta: {title: "首页", icon: <HomeOutlined />, activePath: "/"}
      },
      {
        path: "/user",
        component: User,
        menuShow: true,
        onlyAdminShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "用户管理", icon: <UserOutlined />, activePath: "/user"}
      },
      {
        path: "/userOperate",
        component: Dashboard,
        menuShow: false,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "用户管理", icon: <UserOutlined />, activePath: "/user"},
        routes: [
          {
            path: "/userOperate/add",
            component: OperateUser,
            requiresAuth: true,
            meta: {title: "添加用户", activePath: "/user"}
          },
          {
            path: "/userOperate/edit",
            component: OperateUser,
            requiresAuth: true,
            meta: {title: "编辑用户", activePath: "/user"}
          },
          {
            path: "/userOperate/look",
            component: OperateUser,
            requiresAuth: true,
            meta: {title: "查看用户", activePath: "/user"}
          }
        ]
      },
      {
        path: "/setting",
        component: Setting,
        menuShow: true,
        onlyAdminShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "设置管理", icon: <SettingOutlined />, activePath: "/setting"}
      },
      {
        path: "/materialCategory",
        component: MaterialCategory,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "素材文件夹管理", icon: <FolderOutlined />, activePath: "/materialCategory"}
      },
      {
        path: "/material",
        component: Material,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "素材管理", icon: <PictureOutlined />, activePath: "/material"}
      },
      {
        path: "/materialOperate",
        component: Dashboard,
        requiresAuth: true, //需要登陆后才能跳转的页面
        menuShow: false,
        meta: {title: "素材管理", icon: <PictureOutlined />, activePath: "/material"},
        routes: [
          {
            path: "/materialOperate/add",
            component: OperateMaterial,
            requiresAuth: true,
            meta: {title: "添加素材", activePath: "/material"}
          }
        ]
      },
      {
        path: "/articleCategory",
        menuShow: true,
        component: ArticleCategory,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "文章分类管理", icon: <FolderOutlined />, activePath: "/articleCategory"}
      },
      {
        path: "/articleCategoryOperate",
        component: Dashboard,
        requiresAuth: true, //需要登陆后才能跳转的页面
        menuShow: false,
        meta: {title: "文章分类管理", icon: <PictureOutlined />, activePath: "/articleCategory"},
        routes: [
          {
            path: "/articleCategoryOperate/add",
            component: OperateArticleCategory,
            requiresAuth: true,
            meta: {title: "添加文章分类", activePath: "/articleCategory"}
          },
          {
            path: "/articleCategoryOperate/edit",
            component: OperateArticleCategory,
            requiresAuth: true,
            meta: {title: "编辑文章分类", activePath: "/articleCategory"}
          },
          {
            path: "/articleCategoryOperate/look",
            component: OperateArticleCategory,
            requiresAuth: true,
            meta: {title: "查看文章分类", activePath: "/articleCategory"}
          }
        ]
      },
      {
        path: "/article",
        component: Article,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "文章管理", icon: <FileOutlined />, activePath: "/article"}
      },
      {
        path: "/articleOperate",
        component: Dashboard,
        requiresAuth: true, //需要登陆后才能跳转的页面
        menuShow: false,
        meta: {title: "文章管理", icon: <PictureOutlined />, activePath: "/article"},
        routes: [
          {
            path: "/articleOperate/add",
            component: OperateArticle,
            requiresAuth: true,
            meta: {title: "添加文章", activePath: "/article"}
          },
          {
            path: "/articleOperate/edit",
            component: OperateArticle,
            requiresAuth: true,
            meta: {title: "编辑文章", activePath: "/article"}
          },
          {
            path: "/articleOperate/look",
            component: OperateArticle,
            requiresAuth: true,
            meta: {title: "查看文章", activePath: "/article"}
          }
        ]
      },
      {
        path: "/sourceCategory",
        component: SourceCategory,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "学习资源分类管理", icon: <FolderOutlined />, activePath: "/sourceCategory"}
      },
      {
        path: "/source",
        component: Source,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "学习资源管理", icon: <HddOutlined />, activePath: "/source"}
      },
      {
        path: "/sourceOperate",
        component: Dashboard,
        requiresAuth: true, //需要登陆后才能跳转的页面
        menuShow: false,
        meta: {title: "学习资源管理", icon: <HddOutlined />, activePath: "/source"},
        routes: [
          {
            path: "/sourceOperate/add",
            component: OperateSource,
            requiresAuth: true,
            meta: {title: "添加学习资源", activePath: "/source"}
          },
          {
            path: "/sourceOperate/edit",
            component: OperateSource,
            requiresAuth: true,
            meta: {title: "编辑学习资源", activePath: "/source"}
          },
          {
            path: "/sourceOperate/look",
            component: OperateSource,
            requiresAuth: true,
            meta: {title: "查看学习资源", activePath: "/source"}
          }
        ]
      },
      {
        path: "/message",
        component: Message,
        menuShow: true,
        requiresAuth: true, //需要登陆后才能跳转的页面
        meta: {title: "留言管理", icon: <MessageOutlined />, activePath: "/message"}
      }
    ]
  }
]

export default routes
