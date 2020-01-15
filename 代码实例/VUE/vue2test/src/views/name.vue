<template>
  <div class="wrapper">
    <NameChild :lists="lists"></NameChild>
  </div>
</template>

<script>
import NameChild from "@/components/name_child";

export default {
  // 组件
  components: {
    NameChild
  },
  // 属性
  props: {},
  // 数据
  data() {
    return {
      lists: [
        {
          name: "湖南省",
          lists: [
            {
              name: "岳阳市"
            },
            {
              name: "长沙市"
            }
          ]
        },
        {
          name: "湖北省",
          lists: [
            {
              name: "武汉市"
            },
            {
              name: "襄阳市"
            }
          ]
        }
      ]
    };
  },
  // 计算属性
  computed: {},
  // 监听属性
  watch: {},
  // 方法
  methods: {},
  // 生命周期函数 已创建
  created() {},
  // 生命周期函数 已挂载
  mounted() {},
  // 生命周期函数 销毁前
  beforeDestroy() {},
  // 生命周期函数 已销毁
  destroyed() {}
};
</script>
