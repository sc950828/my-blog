<template>
  <div class="wrapper">
    <Child></Child>
    <div ref="childName"></div>
  </div>
</template>

<script>
import Child from "@/components/child";

export default {
  name: "Parent",
  provide: {
    sex: "男"
  },
  // 组件
  components: {
    Child
  },
  // 属性
  props: {},
  // 数据
  data() {
    return {
      name: "传递给子组件的name",
      age: 24
    };
  },
  // 计算属性
  computed: {
    fullName() {
      return "randy su"
    }
  },
  // 监听属性
  watch: {},
  // 方法
  methods: {
    clickMe() {
      alert("我是父组件的方法")
    }
  },
  // 生命周期函数 已创建
  created() {},
  // 生命周期函数 已挂载
  mounted() {
    console.log(this.$children);
    this.$refs.childName.innerText = this.$children[0].name
  },
  // 生命周期函数 销毁前
  beforeDestroy() {},
  // 生命周期函数 已销毁
  destroyed() {}
};
</script>
