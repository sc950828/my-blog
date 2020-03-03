<template>
  <div>
    <div ref="chart2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart2: null,
      options: {
        title: {
          text: '我的chart2'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis:{
          data: ['星期一', '星期二', '星期三'],
          axisTick: {//x轴刻度相关的设置
            show: true, //x轴刻度是否显示
            alignWithLabel: true,// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: [1, 2, 3],
            symbol: 'rect', //点的形状 还可以自定义为图片。
            symbolSize: 8, //点的大小 默认是4
            step: true,//是否设置成阶梯状，还可以设置start middle end 在何处开始形成阶梯
            label: { //图形上的文本标签
              show: true,//是否展示label
              position: 'right', //label出现的位置 默认是top
              formatter: '{b}{c}'
            },
            itemStyle: {//点的样式相关设置
              color: 'black'
            },
            lineStyle: {//线的样式的相关设置
              color: 'blue',
              width: 5,
              type: 'dashed'
            },
            areaStyle: {//区域填充的样式 默认是#000
              color: {
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
              }
            },
            emphasis: { //item高亮时的相关设置
              label: {//高亮时标签的相关设置
                show: true,//高亮时是否显示标签
                position: 'bottom', //高亮时标签的位置
              },
              itemStyle: { //高亮时点的相关设置
                color: 'pink'
              }
            },
            smooth: false, //是否平滑曲线显示 取值范围0-1 越小越折线 true为0.5
            markPoint: {//标记点
              data: [
                {
                  name: '最大的标记点',
                  type: 'max'
                },
                {
                  name: '某个坐标',
                  coord: ["星期一", 2.5]
                }
              ]
            },
            markLine: {//标线
              data: [
                [
                  {
                    name: '两个坐标之间的标线',
                    coord: ["星期一", 2.5]
                  },
                  {
                    coord: ["星期二", 3]
                  }
                ]
              ]
            },
            markArea: {//标记区域
              data: [
                 [
                    {
                        name: '两个坐标之间的标域',
                        coord: ["星期一", 0]
                    },
                    {
                        coord: ["星期二", 3]
                    }
                ]
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    initChart() {
      this.myChart2 = this.$echarts.init(this.$refs.chart2, 'light', {
        width: 600,
        height: 400
      })
      this.myChart2.setOption(this.options)
    }
  },
  mounted(){
    this.initChart()
  }
}
</script>

<style>

</style>
