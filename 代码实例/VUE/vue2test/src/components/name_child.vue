<template>
  <div class="wrapper">
    <div v-for="list of lists" :key="list.name">
      {{list.name}}
      <NameChild v-if="list.lists && list.lists.length > 0" :lists="list.lists"></NameChild>
    </div>
  </div>
</template>

<script>
export default {
  name: "NameChild",
  // 组件
  components: {},
  // 属性
  props: {
    lists: {
      type: Array
    }
  },
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
