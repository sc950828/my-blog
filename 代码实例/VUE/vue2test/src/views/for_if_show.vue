<template>
  <div class="wrapper">
    <div v-if="show">v-if测试 隐藏的时候我的dom不见了</div>
    <div v-else-if="!show">v-else-if</div>
    <div v-else>v-else</div>
    <div v-show="show">v-show测试 隐藏的时候 我的style的display的属性的值是none</div>
    <div>
      <button @click="show = !show">切换显示隐藏</button>
    </div>

    <mark>不推荐同时使用 v-if 和 v-for, 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级</mark>
    <ul>
      <li v-for="(item, index) of users" v-bind:key="index">{{item.name + ": " + item.age}}</li>
    </ul>

    <div>
      <router-link to="/">返回</router-link>
    </div>
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
    return {
      show: true,
      users: [
        {
          name: "randy1",
          age: 24
        },
        {
          name: "randy2",
          age: 23
        },
        {
          name: "randy3",
          age: 25
        },
        {
          name: "randy4",
          age: 27
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

<style scoped>
.wrapper {
}
</style>
