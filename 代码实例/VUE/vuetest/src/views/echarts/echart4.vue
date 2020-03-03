<template>
  <div ref="chart4"></div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      options: {
        title: {
          text: "我的chart4"
        },
        legend: {
          data: ["饼图"]
        },
        tooltip: {
          show: true,
          trigger: "item",
          axisPointer: {
            type: "line"
          }
        },
        series: [
          //饼图不需要x轴y轴
          {
            name: "饼图",
            type: "pie",
            data: [
              { name: "语文,我是名字我是名字我是名字我是名字", value: 10 },
              { name: "数学", value: 20 },
              { name: "英语", value: 30 }
            ],
            selectedMode: "multiple", //(感觉鸡肋)选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
            clockwise: false, //是否是顺时针排列 默认是true
            startAngle: 0, //起始的角度 默认90度
            minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。
            minShowLabelAngle: 5, //小于5度的不显示标签
            roseType: false, //是否展示成南丁格尔图，通过半径区分数据大小
            label: {
              //label的相关设置
              show: true,
              formatter: "{b}:{c}",
              position: "inside", //label出现的位置
              align: "left",
              verticalAlign: "bottom",
              fontSize: 16,
              lineHeight: 50,
              rich: {}
            },
            center: ["40%", "50%"], //设置圆心的坐标
            radius: ["20%", "60%"] //内半径 外半径 可以设置成环状
          }
        ]
      }
    };
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.chart4, "light", {
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
