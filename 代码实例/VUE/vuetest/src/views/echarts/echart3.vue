<template>
  <div ref="chart3"></div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      options: {
        title: {
          text: "我的chart3"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "value",
          // data: [1, 2, 3, 4, 5, 6, 7],
          min: 0,
          max: 10
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: [[1, 0.1235], [2, 0.2541], [3.2, 0.124]],
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息
              show: false
            },
            emphasis: {
              //高亮时的item样式
              label: {
                show: true,
                rotate: 50
              }
            },
            // barWidth: 50, //设置item的宽度
            barCategoryGap: 100, //同系列的item之间的间距
            barGap: 100 //不同系列的item之间的间距
          }
        ],
        toolbox: {//工具栏 内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          show: true,
          feature: {
            saveAsImage:{},//保存为图片
            restore: {}, //配置项还原
            dataView: {}, //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            dataZoom: {}, //数据区域缩放。目前只支持直角坐标系的缩放。
            magicType: {
              type: ['line', 'bar', 'stack', 'tiled']
            },//动态类型切换
            brush: {
            type: ['rect']
            },//选框组件的控制按钮
          },
          right: 20
        },
      }
    };
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.chart3, "light", {
        width: 600,
        height: 400
      });

      this.myChart.setOption(this.options);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style>
</style>
