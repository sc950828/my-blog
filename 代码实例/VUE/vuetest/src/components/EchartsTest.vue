<template>
  <div>
    <div ref="demo" :style="{width: width, height: height}"></div>
    <div>
      <img :src="imgSrc" alt="复制的图片呢">
    </div>
    <div>
      <button v-on:click="update">更新</button>
      <button v-on:click="copy">复制</button>
      <button v-on:click="clear">清空</button>
      <button v-on:click="con">con</button>
      <button v-on:click="action">action</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EchartsTest",
  data() {
    return {
      data: [50, 200, 360, 100, 100, 200],
      myChart: null,
      height: '400px',
      width: '600px',
      imgSrc: ''
    };
  },

  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
       this.myChart = this.$echarts.init(this.$refs.demo, "light", {
        renderer: "canvas"
      });
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "ECharts 入门示例",
          subtext: "randy",
          subtextStyle: { color: "red" },
          // show: false
          textAlign: "auto"
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.data
          }
        ]
      }
      console.log(this.$echarts.getInstanceByDom(this.$refs.demo)) //获取实例
      this.$echarts.connect("21")
      this.$echarts.registerTheme("light")

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);

      this.myChart.on('finished', () => {
          this.imgSrc = this.myChart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
          })
      });
    },
    update() {
      //this.myChart.dispose()//销毁
      console.log(this.myChart.getWidth())
      console.log(this.myChart.getHeight())
      console.log(this.myChart.getDom())
      console.log(this.myChart.getOption())
      this.height = '300px'
      this.myChart.showLoading('default', {
        text: 'loading',
        color: 'blue',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
      //使用nextTick
      this.$nextTick(() => {
        this.myChart.resize()//容器大小改变 重新画图
        
      })

      setTimeout(() => {
        this.myChart.hideLoading()
      }, 2000)
    },

    copy() {
      this.imgSrc = this.myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
    },
    clear() {
      // this.myChart.clear()
      this.myChart.dispose()
    },
    con () {
      console.log(this.myChart.isDisposed())
    },
    action() {
      this.myChart.dispatchAction({
        type: 'highlight',
        // 可选，系列 index，可以是一个数组指定多个系列
        // seriesIndex : 0
        // 可选，系列名称，可以是一个数组指定多个系列
        // seriesName: "销量"
        // 可选，数据的 index
        dataIndex: 2
        // 可选，数据的 名称
        // name: 
      })

      // this.myChart.dispatchAction({
      //     type: 'legendUnSelect',
      //     // 图例名称
      //     name: "销量"
      // })

      this.myChart.dispatchAction({
          type: 'showTip',
          // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
          // seriesIndex: 
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          // dataIndex: 
          // 可选，数据名称，在有 dataIndex 的时候忽略
          // name:
          // 本次显示 tooltip 的位置。只在本次 action 中生效。
          // 缺省则使用 option 中定义的 tooltip 位置。
          // position:
      })
    }
  },
  mounted() {
    this.draw();
  }
};
</script>

<style scoped>
</style>
