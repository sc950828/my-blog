<template>
  <div class="wrapper">
    <div>我是子组件</div>
    <div>这是父组件传递给我的name和age</div>
    <div @click="this.$parent.clickMe">{{this.$parent.name + ": " + this.$parent.age}}</div>
    <div>{{this.$parent.fullName}}</div>
    <div>{{this.sex}}</div>
  </div>
</template>

<script>
export default {
  name: "Child",
  // 组件
  components: {},
  // 属性
  props: {},
  inject: {
    sex: {
      from: "sex",
      default: "男"
    }
  },
  // 数据
  data() {
    return {
      name: "childName"
    };
  },
  // 计算属性
  computed: {},
  // 监听属性
  watch: {},
  // 方法
  methods: {},
  // 生命周期函数 已创建
  created() {
    console.log("$parent", this.$parent);
    console.log("$root", this.$root);
  },
  // 生命周期函数 已挂载
  mounted() {},
  // 生命周期函数 销毁前
  beforeDestroy() {},
  // 生命周期函数 已销毁
  destroyed() {}
};
</script>
