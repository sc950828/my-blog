### 1、ECharts是什么？
  ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

### 2、ECharts方法
    this.$echarts.init(dom, theme, options)
      dom是实例容器，一般是一个div， echarts3支持直接使用canvas作为容器。不能在单个容器上初始化多个 ECharts 实例。
      theme 主题，自带default light dark三种，也可以下载自定义更多的主题。
      options
        devicePixelRatio 设备像素比，默认取浏览器的值window.devicePixelRatio
        renderer 渲染器 有svg canvas
        width 实例宽度 不写默认容器宽度
        height 实例高度 不写默认容器高度
    this.$echarts.connect(groupid || [groupid1, groupid2]) 多个图表实例实现联动
    this.$echarts.disconnect(groupid)解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 group 设为空。
    this.$echarts.getInstanceByDom() 获取 dom 容器上的实例。
    this.$echarts.registerTheme() 设置主题,在init的时候也可以指定

### 3、myChartInstance方法
    myChartInstance.dispose() 销毁实例，实例销毁后无法再被使用
    myChartInstance.isDisposed() 当前实例是否已经被释放。没有释放返回undefined，释放了返回true
    myChartInstance.group 设置groupid，用于联动
    myChartInstance.setOption(options, notMerge, lazyUpdate, silent)
      options 参数 很多很多
      notMerge 是否跟上一次设置的合并，默认false 合并
      lazyUpdate 懒更新 默认false 改变立即更新
      silent 阻止设置option是否抛出事件 默认false 抛出
    myChartInstance.getWidth() 获取实例容器的宽度
    myChartInstance.getHeight() 获取实例容器的高度
    myChartInstance.getDom() 获取实例容器的dom节点
    myChartInstance.getOption() 获取当前实例中维护的 option 对象
    myChartInstance.dispatchAction() 触发图表行为。 ECharts 中的事件有两种，一种是通过on监听，还有一种是调用dispatchAction后触发的事件。
    myChartInstance.on(eventName, query, callback(){}) 绑定事件处理函数
    myChartInstance.off() 解绑事件处理函数
    myChartInstance.resize() 容器大小改变的时候重新绘制图。可以配合this.$mextTick(function(){})使用
    myChartInstance.showLoading(type, options) 显示加载动画效果。可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      type目前只有一个 default
      options 默认的是{text: 'loading',color: '#c23531',textColor: '#000',maskColor: 'rgba(255, 255, 255, 0.8)',zlevel: 0}
    myChartInstance.hideLoading() 隐藏动画加载效果。
    myChartInstance.getDataURL(options) 导出图表图片，返回一个 base64 的 URL，可以设置为img的src。
      options = {
        // 导出的格式，可选 png, jpeg
        type?: string,
        // 导出的图片分辨率比例，默认为 1。
        pixelRatio?: number,
        // 导出的图片背景色，默认使用 option 里的 backgroundColor
        backgroundColor?: string,
        // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
        excludeComponents?: Array.<string>
      }
    myChartInstance.getConnectedDataURL(options) 导出联动的图表图片，返回一个 base64 的 url。options跟getDataURL方法的options一样
    myChartInstance.clear() 清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。

### 4、知识点
*  1.init的时候需要指定chart的宽和高，不然就是容器的宽高，如果都没指定则没有图形。如果既指定了容器宽高又指定了chart的宽高，按chart的宽高来。
*  2.legend图例的设置data需要和series里面每一项的name一一对应相等才能展示出图例。
