<template>
  <div class='wrapper'>
    <div>我是子组件</div>
    <div>
      <button @click="throwNewError">子组件抛个错</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    throwNewError() {
      throw new Error("抛个错")
    }
  },
  // 生命周期函数 创建前
  beforeCreate() {
    console.log("child beforeCreate");
  },
  // 生命周期函数 已创建
  created() {
    console.log("child created");
  },
  // 生命周期函数 挂载前
  beforeMount() {
    console.log("child beforeMount");
  },
  // 生命周期函数 已挂载
  mounted() {
    console.log("child mounted");
  },
  // 生命周期函数 更新前
  beforeUpdate() {
    console.log("child beforeUpdate");
  },
  // 生命周期函数 更新后
  updated() {
    console.log("child updated");
  },
  // 生命周期函数 销毁前
  beforeDestroy() {
    console.log("child beforeDestroy");
  },
  // 生命周期函数 已销毁
  destroyed() {
    console.log("child destroyed");
  },
  // keep-alive 组件被激活时调用
  activated() {
    console.log("child activated");
  },
  // keep-alive 组件停止时调用
  deactivated() {
    console.log("child deactivated");
  }
}
</script>
