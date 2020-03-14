<template>
  <div ref="dom">
    <div>vue 生命周期函数</div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
    <!-- 这种方式 切换 子组件会重新创建 销毁 -->
    <!-- <LifeCycleChild v-if="show"></LifeCycleChild> -->
    <!-- 这种方式子组件并不会重新创建和销毁 -->
    <!-- <LifeCycleChild v-show="show"></LifeCycleChild> -->
    <keep-alive>
      <!-- <LifeCycleChild v-if="show"></LifeCycleChild> -->
      <!-- 动态组件 -->
      <component v-if="show" v-bind:is="'LifeCycleChild'"></component>
    </keep-alive>

    <div>
      <button v-on:click="show = !show">切换显示子组件</button>
    </div>
  </div>
</template>

<script>
import LifeCycleChild from "@/components/life_cycle_child.vue";

export default {
  components: {
    LifeCycleChild
  },
  props: {
    age: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      name: "randy",
      show: true
    };
  },
  // 生命周期函数 创建前
  beforeCreate() {
    console.log("beforeCreate");
    console.log("beforeCreate 获取 data里面的数据", this.name);
    // 获取不到props里面的数据 会报错。
    // console.log("beforeCreate 获取 props里面的数据", this.age);
    console.log("beforeCreate 获取 props里面的数据,会报错");
    console.log("beforeCreate 获取 dom", this.$refs.dom);
  },
  // 生命周期函数 已创建
  created() {
    console.log("created");
    console.log("created 获取 data里面的数据", this.name);
    console.log("created 获取 props里面的数据", this.age);
    console.log("created 获取 dom", this.$refs.dom);
  },
  // 生命周期函数 挂载前
  beforeMount() {
    console.log("beforeMount");
    console.log("beforeMount 获取 dom", this.$refs.dom);
  },
  // 生命周期函数 已挂载
  mounted() {
    console.log("mounted");
    console.log("mounted 获取 dom", this.$refs.dom);
  },
  // 生命周期函数 更新前
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  // 生命周期函数 更新后
  updated() {
    console.log("updated");
  },
  // 生命周期函数 销毁前
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  // 生命周期函数 已销毁
  destroyed() {
    console.log("destroyed");
  },
  // keep-alive 组件被激活时调用
  activated() {
    console.log("activated");
  },
  // keep-alive 组件停止时调用
  deactivated() {
    console.log("deactivated");
  },
  // 错误 2.5.0+ 新增。当捕获一个来自子孙组件的错误时被调用
  errorCaptured(err, com, mes) {
    console.log("errorCaptured");
    console.log("message是", mes);
    console.log("component是", com);
    console.log("error是", err);
  }
};
</script>
