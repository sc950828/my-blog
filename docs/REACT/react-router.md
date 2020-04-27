### 1、路由介绍

react-router 是完整的 react 的路由解决方案，它保持 UI 与 URL 的同步。在项目中我们使用的是最新的 v4 版。

需要注意的是，在开发中不应该直接安装 react-router，因为 👉：在 v4 版中 react-router 被拆分成三个包：react-router，react-router-dom，react-router-native。

- react-router：提供核心的路由组件和函数。
- react-router-dom：提供浏览器使用的路由组件和函数。
- react-router-native：提供 react-native 对应平台使用的路由组件和函数。

v4 相比于 v1、v2、v3 几乎是重写了，遵循 Just Component 的 API 设计理念。主要变更有：声明式、可组合

进行网站（将会运行在浏览器环境中）构建，我们应当安装 react-router-dom。因为 react-router-dom 已经暴露出 react-router 中暴露的对象与方法，因此你只需要安装并引用 react-router-dom 即可。

```
React Router 中的组件主要分为三类：
路由器，像<BrowserRouter>和<HashRouter>
路线匹配器，例如<Route>和<Switch>
和导航，喜欢<Link>，<NavLink>和<Redirect>

对于Web项目，react-router-dom提供<BrowserRouter>和<HashRouter>路由器。
两者之间的主要区别是它们存储URL和与Web服务器通信的方式。

<BrowserRouter>使用常规的URL路径。这些通常是外观最好的URL，但是它们要求正确配置服务器。
具体来说，您的Web服务器需要在所有由React Router客户端管理的URL上提供相同的页面。需要额外配置。

<HashRouter>将当前位置存储在URL 的hash一部分中，因此URL看起来像http://example.com/#/your/page。
由于哈希从不发送到服务器，因此这意味着不需要特殊的服务器配置。

BrowserRouter
basename 所有位置的基本URL
getUserConfirmation：func 用于确认导航的功能。默认使用window.confirm。
forceRefresh：布尔 如果true路由器将使用整页刷新页面导航。
keyLength：数字 location.key的长度。默认为6。

HashRouter 哈希历史记录不支持location.key或location.state。这个是用来兼容老浏览器的，建议使用BrowserRouter
basename 所有位置的基本URL
getUserConfirmation：func 用于确认导航的功能。默认使用window.confirm。
hashType：字符串 编码类型window.location.hash 默认slash
```

### 2、Link

```
Link
to属性
  接受path字符串，<Link to="/a" />
  接受对象
  <Link to={{
      pathname: '/courses',  // 传递的pathname
      search: '?sort=name',  // 传递的url参数
      hash: '#the-hash', // 在url参数后面的hash值
      state: { fromDashboard: true } // 自定义属性存在location中
  }}/>
replace，设置为true，会取代当前历史记录
innerRef 访问Link标签的dom

NavLink
NavLink和Link一样最终都是渲染成a标签，NavLink可以给这个a标签添加额外的属性
<NavLink to="/a">组件一</NavLink> 当点击此路由，a标签默认添加一个名为active的class
属性
  activeClassName 用于自定义激活a标签的class
  activeStyle 用于设置激活a标签的样式
    activeStyle={{
        fontWeight: 'bold',
        color: 'red'
    }}
  exact，当路径百分百匹配的时候才展示样式和class，但是不影响路由的匹配，"/a"和"/a/" 是相等的
  strict，这个比exact还很，就算 "/a"和"/a/" 也是不相等的
  isActive，此属性接收一个回调函数，用来做跳转的最后拦截
    <NavLink isActive={oddEvent} to="/a/123">组件一</NavLink>
    const oddEvent = (match, location) => {
        if (!match) {
            return false
        }
        return true
    }
    match里面保存了路由匹配信息的参数，是动态化的
    location里面保存的Link中的to传递的所有信息
  location，此参数用来接受一个location对象，如果对象信息和当前的location信息对象匹配则跳转
    <NavLink to="/a/123" location={{key:"mb5wu3",pathname:"/a/123"}}/>
```

### 3、Router

```
低级路由，适用于任何路由组件，主要和redux深度集成，使用必须配合history对象
使用Router路由的目的是和状态管理库如redux中的history同步对接
import { Router } from 'react-router'
import { createBrowserHistory } from 'history/createBrowserHistory'
const history = createBrowserHistory();
<Router history={history}>
    ...
</Router>
```

### 4、Route

```
Route的作用就是用来渲染路由匹配的组件
路由渲染有三种方式，每一种方式都可以传递match,location,history对象
  component
    用来渲染组件
    <Route path="/a" component={MyComponent1}></Route>
  render
    用来渲染函数式组件，可以防止重复渲染组件
    <Route path="/b" render={({match,location,history}) => {
      console.log(match,location,history);
      return <div>组件二</div>
    }}></Route>
  children
    和render差不多，不过可以用来动态的展示组件
    差別之处在于，children会在路径不匹配的时候也调用回调从而渲染函数，而render只会在路径匹配的时候触发回调
    <Route path="/b" children={({match,location,history}) => {
      return (
        match ? <div>组件二</div>:<div>组件二二</div>
      )
    }}></Route>
属性
  path，字符串，匹配的路径
  exact，布尔值，路径完全匹配的时候跳转 "/a/"和"/a"是一样的
  strict，布尔值，单独使用和没有使用这个属性没有任何区別，如果和exact一起使用可以构建更为精确的匹配模式。"/a/"和"/a"是不同的。
  sensitive 是否区分path的大小写
  location，传递route对象，和当前的route对象对比，如果匹配则跳转，如果不匹配则不跳转。另外，如果route包含在swicth组件中，如果route的location和switch的location匹配，那么route的location会被switch的location替代
```

### 5、history

useHistory 挂钩使您可以访问 history 可用于导航的实例。

```js
import { useHistory } from "react-router-dom";

let history = useHistory();

// 有如下属性和方法
History {
  length: number;
  action: Action;
  location: Location;
  push(path: Path, state?: LocationState): void; // 调用push前进到一个地址,可以接受一个state对象，就是自定义的路由数据
  push(location: LocationDescriptorObject): void; // 接受一个location的描述对象
  replace(path: Path, state?: LocationState): void; // 用页面替换当前的路径，不可再goBack
  replace(location: LocationDescriptorObject): void; // 同上
  go(n: number): void; // 往前走多少也页面
  goBack(): void; // 返回一个页面
  goForward(): void; // 前进一个页面
  block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
  listen(listener: LocationListener): UnregisterCallback;
  createHref(location: LocationDescriptorObject): Href;
}
```

### 6、match

```js
// 对象表示当前的路由地址是怎么跳转过来的，包含的属性如下
{
  isExact: true, // 表示匹配到当前路径是否是完全匹配
  params: {}, // 表示路径的动态参数值
  path: '/c', // 匹配到的原始路径
  url: '/c' // 匹配到的实际路径
}
```

### 7、location

```js
// location对象表示当前的路由位置信息，主要包含如下属性
{
  hash: undefined,
  key: "k9r4i3",
  pathname: "/c",
  state: undefined,
  search: ""
}
```

### 8、withRouter

```js
// 当一个非路由组件也想访问到当前路由的match,location,history对象，那么withRouter将是一个非常好的选择
import { withRouter } from "react-router-dom";
const MyComponent = props => {
  const { match, location, history } = this.props;
  return <div>{props.location.pathname}</div>;
};
const FirstTest = withRouter(MyComponent);
```

### 9、使用

```js
// 根组件使用 BrowserRouter包裹
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

<Link to="/hello">to hello</Link>
<Link to="/params/randy">to params name = randy</Link>
// 当<Switch>被渲染，它会搜索其children <Route>内容找到一个其path当前的URL匹配。
// 当找到一个对象时，它将渲染该对象，<Route>而忽略所有其他对象。
// 这意味着您应将<Route>的特定性更高（通常更长）放在不那么特定的paths 之前。
<Switch>
  <Route path="/hello" component={Hello}></Route>
  <Route path="/params/:name" component={Params}></Route>
</Switch>

// 参数使用useParams获取参数
import {useParams} from 'react-router-dom'

function Params() {
  // 使用useParams获取到参数
  let { name } = useParams();

  return <div>params {name}</div>;
}
```

### 10、嵌套路由

```js
import { Route, useRouteMatch, Link } from "react-router-dom";

function Parent() {
  // 需要用到path url 也可以写死。
  const { path, url } = useRouteMatch();

  return (
    <div>
      Parent
      <Link to={url + "/hello"}>to hello , </Link>
      <Link to={url + "/child/randy"}>to child, </Link>
      <Route path={path + "/hello"} component={Hello}></Route>
      <Route path={path + "/child/:name"} component={Child}></Route>
    </div>
  );
}
```

### 11、自定义链接

实际上就是对 Link 组件的封装

```js
<CustomLink to="/hello" label="to customlink"></CustomLink>;

function CustomLink(props) {
  const { to, label, activeOnlyWhenExact } = props;
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <div>
      {match && ">"}
      <Link to={to}>{label}</Link>
    </div>
  );
}
```

### 12、过渡

```js
import React, { useState } from "react";
import { Prompt } from "react-router-dom";

function GuoDu() {
  // 函数组件没有状态 只能通过useState设置state 返回变量名和修改变量的方法，参数是变量的初始值
  let [isBlocking, setIsBlocking] = useState(true);
  // return true表示可以直接跳转，无需验证
  // return '你好'表示要给提示给用户的信息
  return (
    <Prompt
      when={isBlocking}
      message={location =>
        `Are you sure you want to go to ${location.pathname}`
      }
    />
  );
}

export default GuoDu;
```

### 13、404

```js
import React from "react";
import { useLocation } from "react-router-dom";

function All() {
  // 使用useLocation()获取到location对象
  const location = useLocation();
  // pathname: "/guodu1"
  // search: ""
  // hash: ""
  // state: undefined
  console.log(location);
  return <div>all 404</div>;
}

export default All;

// Switch 只会匹配一个 匹配到了就不往后面找了
// 所以利用这一特点就可以实现404
<Switch>
  <Route path="/" exact component={Home}></Route>
  <Route path="/hello" component={Hello}></Route>
  <Route path="*" component={All}></Route>
</Switch>;
```

### 14、重定向

```js
import { Redirect } from "react-router-dom";
// link to /redirecttest会被redirect到/hello链接上 所以会匹配/hello的组件
<Route to="/redirecttest">
  <Redirect to="/hello"></Redirect>
</Route>;

// 路由重定向
// 属性
//   to
//    字符串，要重定向的路径
//    对象，location对象
//   push，布尔值，是否将当前路径存到history中（是Link标签的to路径）
//   from，用来指定路由的原始值，如果不是给定的字符串，那么不渲染，反之渲染，只能用于switch组件中
```
