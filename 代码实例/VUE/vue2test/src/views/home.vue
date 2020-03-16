<template>
  <div class="wrapper">
    <router-link to="/lifecycle">生命周期</router-link>
    <br />
    <router-link to="/valuebind">插值绑定</router-link>
    <br />
    <router-link to="/styleclass">类名和样式的绑定</router-link>
    <br />
    <router-link to="/event">事件</router-link>
    <br />
    <router-link to="/forifshow">for v-if v-show</router-link>
    <br />
    <router-link to="/methodscomputedwatch">methods computed watch</router-link>
    <br />
    <router-link to="/set">Vue.set this.$set</router-link>
    <br />
    <router-link to="/filter">filter</router-link>
    <br />
    <router-link to="/directive">directive</router-link>
    <br />
    <router-link to="/mixin">mixin</router-link>
    <br />
    <router-link to="/slot">slot</router-link>
    <br />
    <router-link to="/nexttick">nexttick</router-link>
    <br />
    <router-link to="/model">model</router-link>
    <br />
    <router-link to="/parent">parent 父子组件</router-link>
    <br />
    <router-link to="/name">name 组件递归调用</router-link>
    <br />
    <router-link to="/pre">v-pre指令</router-link>
    <br />
    <router-link to="/once">只渲染一次</router-link>
    <br />
    <router-link to="/store1">vuex store1</router-link>
  </div>
</template>

<script>
export default {
  // 组件
  components: {},
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
