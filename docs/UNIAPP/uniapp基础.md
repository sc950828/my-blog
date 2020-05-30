### 1、uniapp

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

uni-app 使用 vue 的语法+小程序的标签和 API。

uni-app 在开发者数量、案例、跨端抹平度、扩展灵活性、性能体验、周边生态、学习成本、开发成本等 8 大关键指标上拥有更强的优势。

### 2、uni-app 基本结构

```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录
├─platforms             存放各平台专用页面的目录
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期 配置全局的存储globalData
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            全局配置 决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
└─uni.scss              uni.scss文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。
```

### 3、资源引入

```html
<!-- html静态资源引入 -->
<!-- 引入的静态资源在非h5平台，均不转为base64。H5平台，小于4kb的资源会被转换成base64，其余不转 -->
<!-- 支付宝小程序组件内 image 标签不可使用相对路径 -->
<!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
<image class="logo" src="/static/logo.png"></image>
<image class="logo" src="@/static/logo.png"></image>
<!-- 相对路径 -->
<image class="logo" src="../../static/logo.png"></image>
```

```css
/* css引入静态资源 */
/* 绝对路径 */
@import url("/common/uni.css");
@import url("@/common/uni.css");
/* 相对路径 */
@import url("../../common/uni.css");
```

```js
// js的引入
// js文件不支持使用/开头的方式引入
// 绝对路径，@指向项目根目录，在cli项目中@指向src目录
import add from "@/common/add.js";
// 相对路径
import add from "../../common/add.js";
```

### 4、生命周期

uni-app 完整支持 Vue 实例的生命周期，同时还新增 应用生命周期 及 页面生命周期。

应用生命周期 应用生命周期仅可在 App.vue 中监听，在其它页面监听无效。

- onLaunch 当 uni-app 初始化完成时触发（全局只触发一次）
- onShow 当 uni-app 启动，或从后台进入前台显示
- onHide 当 uni-app 从前台进入后台
- onError 当 uni-app 报错时触发
- onUniNViewMessage 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯

页面生命周期

- onLoad 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
- onShow 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
- onReady 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
- onHide 监听页面隐藏
- onUnload 监听页面卸载
- onResize 监听窗口尺寸变化
- onPullDownRefresh 监听用户下拉动作，一般用于下拉刷新
- onReachBottom 页面上拉触底事件的处理函数
- onTabItemTap 点击 tab 时触发，参数为 Object
- onShareAppMessage 用户点击右上角分享
- onPageScroll 监听页面滚动，参数为 Object
- onNavigationBarButtonTap 监听原生标题栏按钮点击事件，参数为 Object
- onBackPress 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack 表示来源是 uni.navigateBack ；
- onNavigationBarSearchInputChanged 监听原生标题栏搜索输入框输入内容变化事件
- onNavigationBarSearchInputConfirmed 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
- onNavigationBarSearchInputClicked 监听原生标题栏搜索输入框点击事件

### 5、路由

uni-app 页面路由为框架统一管理，开发者需要在 pages.json 里配置每个路由页面的路径及页面样式。类似小程序在 app.json 中配置页面路由一样。所以 uni-app 的路由用法与 Vue Router 不同

uni-app 有两种页面路由跳转方式：使用 navigator 组件跳转、调用 API 跳转。

```
初始化 新页面入栈 uni-app 打开的第一个页面
打开新页面 新页面入栈 调用 API uni.navigateTo 、使用组件 <navigator open-type="navigate"/>
页面重定向 当前页面出栈，新页面入栈 调用 API uni.redirectTo 、使用组件 <navigator open-type="redirectTo"/>
页面返回 页面不断出栈，直到目标返回页 调用 API uni.navigateBack 、使用组件 <navigator open-type="navigateBack"/> 、用户按左上角返回按钮、安卓用户点击物理 back 按键
Tab 切换 页面全部出栈，只留下新的 Tab 页面 调用 API uni.switchTab 、使用组件 <navigator open-type="switchTab"/> 、用户切换 Tab
重加载 页面全部出栈，只留下新的页面 调用 API uni.reLaunch 、使用组件 <navigator open-type="reLaunch"/>
```

### 6、页面样式与布局

uni-app 支持的通用 css 单位包括 px、rpx

- px 即屏幕像素
- rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。

vue 页面支持普通 H5 单位，但在 nvue 里不支持，nvue 还不支持百分比单位。

- rem 默认根字体大小为 屏幕宽度/20（微信小程序、字节跳动小程序、App、H5）
- vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%
- vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%

目前所支持的样式

- .class .intro 选择所有拥有 class="intro" 的组件
- #id #firstname 选择拥有 id="firstname" 的组件
- element view 选择所有 view 组件
- element, element view, checkbox 选择所有文档的 view 组件和所有的 checkbox 组件
- ::after view::after 在 view 组件后边插入内容，仅微信小程序和 App 生效
- ::before view::before 在 view 组件前边插入内容，仅微信小程序和 App 生效

在 uni-app 中不能使用 `*` 选择器。page 相当于 body 节点。

定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

App.vue 中通过 @import 语句可以导入外联样式，一样作用于每一个页面。

nvue 页面暂不支持全局样式

### 7、条件编译

以 #ifdef(仅在某平台) 或 #ifndef(仅不在某平台) 加 %PLATFORM%(平台名) 开头，以 #endif 结尾。

%PLATFORM%的值

- APP-PLUS App
- APP-PLUS-NVUE App nvue
- H5 H5
- MP-WEIXIN 微信小程序
- MP-ALIPAY 支付宝小程序
- MP-BAIDU 百度小程序
- MP-TOUTIAO 字节跳动小程序
- MP-QQ QQ 小程序
- MP-360 360 小程序
- MP 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ 小程序/360 小程序

注意

`条件编译是利用注释实现的，在不同语法里注释写法不一样，js 使用 // 注释、css 使用 /* 注释 */、vue/nvue 模板里使用 <!-- 注释 -->`

`样式的条件编译，无论是 css 还是 sass/scss/less/stylus 等预编译语言中，必须使用 /*注释*/ 的写法。`
