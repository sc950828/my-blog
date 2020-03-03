<template>
  <div>
    <div ref="chart1" :style="{width: '600px', height: '600px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart1: null,
      options: {
        //title的常用设置
        title: {//标题的设置
          show: true,//是否显示标题
          text: '我的chart1',//标题的值
          textStyle: {//标题的样式
            fontSize: '16px'
          },
          subtext: "我是副标题",//副标题
          subtextStyle: {//副标题的样式
            color: 'blue'
          },
          textAlign: "left", //标题副标题的水平对齐方式
          textVerticalAlign: 'auto', //标题副标题的垂直对齐方式
          triggerEvent: true, //是否触发事件
          left: 'left', //可以通过left right来控制标题副标题的左右位置
          top: 0, //top bottom来控制上下的位置 
        },
        //图例的常用设置
        legend: { // 图例的设置
          type: "plain", // 默认是普通图例 当图例较多时可以设置为scroll
          show: true, //是否显示图例
          left: 'center',
          data: [{name: 'chart1图例', icon: 'circle', textStyle: {color: 'pink'}}, 'chart2图例'], //与series里面的name要一一对应
          // icon: 'circle', //同样设置图例的形状
          orient: 'horizontal', //图例的排列方向 horizontal水平排列 vertical处置排列
          align: 'right', //图例标记和文本的对齐 left right auto 默认auto
          formatter: '图例是:{name}', //必须用name 获取到图例的名字, 用来格式化图例文本
          selectModel: true, //图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
          tooltip: {//设置legend的提示消息 配置跟tooltip的一样
            show: true,
            formatter: '我是图例的tooltip:{a}'//图例提示消息的格式化
          }
        },
        //提示的常用设置
        tooltip: {
          show: true, //是否显示提示
          trigger: 'item', //触发类型 有item数据项触发 axis坐标轴触发 none不触发
          axisPointer: {
            type: 'shadow',//指示器类型 还有line none cross
          },
          triggerOn: 'mousemove', //触发提示显示的条件 有mousemove和click 默认mousemove
          formatter: '{a} {b} {c} {d} {e}', //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。 模板变量有 {a}, {b}，{c}，{d}，{e}
          backgroundColor: 'rgba(50,50,50,0.8)', //提示框浮层的背景颜色。
          showDelay: 0, //展示的延迟
          hideDelay: 1000, //隐藏的延迟
        },
        //x轴的部分常用相关设置
        xAxis: { //x轴的设置
          show: true, //x轴是否显示
          name: "横坐标", //x轴的名字
          position: "bottom", //x轴的位置 top bottom
          nameLocation: "middle", //x轴名字的位置 start middle/center end 默认end
          nameTextStyle: { //x轴名字的样式
            borderWidth: 1, //x轴名字的边框宽度
            borderColor: 'red' //x轴名字边框的颜色
          },
          type: "category", //x轴类型 默认category类目轴 还有value数值轴 time时间轴 log对数轴
          nameGap: "20", //x坐标轴与坐标名字之间的距离，默认是15
          nameRotate: 20, //x坐标轴名字旋转角度
          inverse: false, //x轴是否是反向坐标轴
          boundaryGap: true, //类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。false的时候标签与刻度一一对应。
          triggerEvent: false, //坐标轴的标签是否响应和触发鼠标事件，默认不响应。
          axisLine: { //x轴线的设置
            show: true,//是否显示x轴线，标签不受影响
            symbol: ['arrow', 'arrow'], //x轴线两端的样式 默认none 可以设置成arrow就是箭头。可以为string那就是左右一起设置。
            symbolSize: [10, 20], //如果设置了两端样式 可以设置箭头大小 高 宽
            symbolOffset: [0, 15], //如果设置了两端样式 可以设置箭头往右移动的距离，可以为负值
            lineStyle: {//x轴线样式的设置
              width: 2,//x轴的高度
              color: {//x轴的颜色
                type: 'linear',//线性渐变
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: 'red' // 0% 处的颜色
                  },
                  {
                    offset: 0.2, color: 'green' // 20% 处的颜色
                  },
                  {
                    offset: 1, color: 'blue' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          axisTick: {//x轴刻度相关的设置
            show: true, //x轴刻度是否显示
            alignWithLabel: true,// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
          },
          axisLabel: {//x轴标签相关设置
            show: true
          },
          // axisPointer: {//指示器  这个配置项可以在外面的tootip.axisPointer里面配置更好
          //   show: true, //是否显示指示器
          //   label: {//坐标轴指示器的文本标签。 就是标签处的提示
          //     show: true, //是否显示
          //     precision: 2, //保留小数位数 默认auto
          //     formatter: '值是{value}' //显示格式 必须是value。这里的value是x轴的data里面的值。 formatter可以是字符串可以是方法。
          //   },
          //   type: "shadow", //指示器类型 有line shadow none 默认line
          //   status: 'show', //当前的状态 show就是第一次进来就会有指示器指示一次
          // },
          zlevel: 0, //X 轴所有图形的 zlevel 值。 值越小越在下面。
          data: [//x轴的数据
            '周一',
            { //可以设置成对象 单独设置样式
              value: '周二',
              textStyle: {
                color: 'red'
              }
            },
            '周三'
          ],
          splitLine: { //分隔线
            show: true,
            interval: 'auto', //0
          },
          splitArea: {//分割区域
            show: true
          }
        },
        //y轴的相关设置
        yAxis: {
          show: true,
          name: "y轴名字",
          splitLine: {//分隔线
            show: true
          },
          splitArea: {//分割区域
            show: true
          }
        },
        //值的设置 可以有多个
        series: [
          {
            name: "chart1图例",
            type: "line",
            data: [1, 2, 3]
          },
          {
            name: "chart2图例",
            type: "bar",
            data: [4, 5, -3]
          }
        ],
        //设置item的颜色 默认从['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']取
        color: {//背景色
            type: 'linear',
            x: 1,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
                offset: 0, color: 'green' // 0% 处的颜色
            }, {
                offset: 1, color: 'black' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        //设置chart的背景色
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
          }, {
              offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        //全局文字的相关设置
        textStyle: {
          fontStyle: 'normal'
        }
      }
    }
  },
  methods: {
    initChart1(){
      this.myChart1 = this.$echarts.init(this.$refs.chart1, 'default', {
        renderer: 'canvas',
        width: 600,
        height: 400
      })

      this.myChart1.setOption(this.options)
    }
  },
  mounted(){
    this.initChart1()
  }
}
</script>

<style>

</style>
