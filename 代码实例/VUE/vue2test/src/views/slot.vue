<template>
  <div class="wrapper">
    <SlotChild>
      <span slot="footer">footer</span>
      <span slot="header">header</span>
      <span>我是没命名的slot</span>
      <span>请把我插到中间把</span>
      <span>我会插到哪里呢</span>
    </SlotChild>
  </div>
</template>

<script>
import SlotChild from "@/components/slot_child";

export default {
  // 组件
  components: {
    SlotChild
  },
  // 属性
  props: {},
  // 数据
  data() {
    return {};
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
