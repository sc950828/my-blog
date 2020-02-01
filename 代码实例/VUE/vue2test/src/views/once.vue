<template>
  <div class="wrapper">
    <template v-for="i of count" v-once>
      <Child :key="i" ></Child>
    </template>
    <button @click="changeCount">改变个数 不管用了 只渲染一次</button>
  </div>
</template>

<script>
import Child from "@/components/life_cycle_child.vue";

export default {
  // 组件
  components: {
    Child
  },
  // 属性
  props: {},
  // 数据
  data() {
    return {
      count: 2
    };
  },
  // 计算属性
  computed: {},
  // 监听属性
  watch: {},
  // 方法
  methods: {
    changeCount() {
      this.count = this.count === 3 ? 2 : 3
    }
  },
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
