### vue-router 是什么？

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

### vue-router 的特点优势是什么？

    嵌套的路由/视图表
    模块化的、基于组件的路由配置
    路由参数、查询、通配符
    基于 Vue.js 过渡系统的视图过渡效果
    细粒度的导航控制
    带有自动激活的 CSS class 的链接
    HTML5 历史模式或 hash 模式，在 IE9 中自动降级
    自定义的滚动条行为

### 动态路由

    // 动态路径参数 以冒号开头 在浏览器能看到
    { path: '/user/:id', component: User }
    浏览器路径如果是/user/123的话我们使用this.$route.params.id=123
    动态参数在浏览器路径能看到

### 响应路由参数变化

    在/user/123 到/user/456我们想知道路由参数的变化我们有两种方法
    第一种：watch (监测变化) $route 对象
      const User = {
        template: '...',
        watch: {
          '$route' (to, from) {
            // 对路由变化作出响应...
          }
        }
      }
    第二种：利用导航守卫 beforeRouteUpdate
      const User = {
        template: '...',
        beforeRouteUpdate (to, from, next) {
          // react to route changes...
          // don't forget to call next()
        }
      }

### 编程式导航

    this.$router.push()等同于<router-link to="...">这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。传递对象的时候使用:to=""。
    this.$router.replace()等同于<router-link to="..." replace>它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
    this.$router.go()这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
    this.$router.back()
    this.$router.forward()
    // 字符串
    this.$router.push('home')

    // 对象
    this.$router.push({ path: 'home' })

    // 命名的路由
    this.$router.push({ name: 'user', params: { userId: '123' }})

    // 带查询参数，变成 /register?plan=private
    this.$router.push({ path: 'register', query: { plan: 'private' }})

    // 需要注意的是这里 path的时候不能带params，只能写在路径里面
    this.$router.push({ path: `/user/${userId}` }) // -> /user/123

    // 需要注意的是这里，这里的 params 不生效 但是query会生效
    this.$router.push({ path: '/user', params: { userId }}) // -> /user

    params在浏览器路径里看不到参数，query传的参数在浏览器中能看到

    取参数使用this.$route

### 命名路由

    routes: [
      {
        path: '/user/:userId',
        name: 'user',
        component: User
      }
    ]
    我们可以使用<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    或者this.$router.push({ name: 'user', params: { userId: 123 }})

### 命名视图

    假如一个路由对应多个组件就可以使用命名视图，注意是components
    routes: [
      {
        path: '/',
        components: {
          default: Foo,
          a: Bar,
          b: Baz
        }
      }
    ]

    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>

### 重定向和别名

    “重定向”的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b
    routes: [
      { path: '/a', redirect: '/b' }
    ]
    routes: [
      { path: '/a', redirect: { name: 'foo' }}
    ]
    routes: [
      { path: '/a', redirect: to => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      }}
    ]
    /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
    别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
    取别名后使用path或者别名都能定位到component，例如这里path="/a"或者path="/b"都匹配到A
    routes: [
      { path: '/a', component: A, alias: '/b' }
    ]

### 路由模式

    默认为hash模式，url比较丑会有#，如果想好看就使用history模式，创建router的时候加上mode: 'history'，不过后端也需要配置。
    const router = new VueRouter({
      mode: 'history',
      routes: [...]
    })

    Apache配置
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

    nginx配置
    location / {
      try_files $uri $uri/ /index.html;
    }

### 导航守卫

    全局前置守卫 由router对象调用，参数是一个函数
      router.beforeEach((to, from, next) => {
        // ...to去哪 from来自哪 next()确认， 或者next(false)中断， 或者next('/') 或者 next({ path: '/' })进入指定路由
        确保要调用 next 方法，否则钩子就不会被 resolved。
      })
    全局后置钩子
      router.afterEach((to, from) => {
        // ...这些钩子不会接受 next 函数也不会改变导航本身
      })
    全局解析守卫
      同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
      router.beforeResolve((to, from, next) => {
        console.log("beforeResolve to", to);
        console.log("beforeResolve from", from);
        next();
      });
    路由独享守卫
      进入该路由时会触发
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    组件内守卫
      const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }
    }

### 路由元信息 meta

    routes: [
      {
        path: '/foo',
        component: Foo,
        children: [
          {
            path: 'bar',
            component: Bar,
            // a meta field
            meta: { requiresAuth: true }
          }
        ]
      }
    ]

    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
    })

### 过渡动画

    定义所有的
      <transition>
        <router-view></router-view>
      </transition>
    或者在创建组件的时候单独定义
    const Foo = {
        template: `
          <transition name="slide">
            <div class="foo">...</div>
          </transition>
        `
      }
    或者还可以基于当前路由与目标路由的变化关系，动态设置过渡效果
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>

    // 接着在父组件内 watch $route 决定使用哪种过渡
    watch: {
      $route (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }

### 数据获取

    总共分两种，导航完成前获取，导航完成后获取
    导航完成后获取就需要在组件的created、beforeMount、mounted方法内获取数据
    导航完成前获取需要使用beforeRouteEnter组件内守卫 需要注意拿不到this 需要通过vm得到实例
      next(vm => {
        // 通过 `vm` 访问组件实例 类似this
      })

### 路由懒加载

    const Foo = () => import('./Foo.vue')
    const Foo = resolve => require([’./Foo’], resolve)

### tag 属性

    <router-link> 组件默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签。
    <router-link to="/foo" tag="li">foo</router-link>

### vue 项目中怎么跳转到外部链接

    我们使用a标签触发的跳转默认被router处理，所以会加上localhost:8080前缀，导致访问失败
    我们可以使用window.location.href或者加上https://或者http://前缀就可以解决。

### vue-router 传参问题

    使用params传参参数在浏览器看不到，页面刷新参数会丢失
    使用query传参参数在浏览器能看到，页面刷新参数不会丢失。query传的参数如果是int 刷新页面会变成字符串。

### 做动态路由的时候 import 动态引入组件

    () => import(`@/${m.component}`)开发环境没问题，但是打包后会出错， 因为打包使用了webpack，webpack里的import必须是纯粹的字符串，不能是动态参数。
    需要使用resolve => require([`@/${m.component}`], resolve)就可以。

### $route 和 $router 的区别？

    $route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。
    $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。

### 路由滚动 scrollBehavior

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
```
