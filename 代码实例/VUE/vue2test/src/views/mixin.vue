<template>
  <div class="wrapper">
    <div>{{message}}</div>
    <div>
      <button @click="changeSex">改变性别</button>
    </div>
    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
import mixin1 from "@/mixins/mixin1.js";
// mixin的生命周期函数早于组件 并且是一一调用 区别于父子组件的生命周期函数
// 除了生命周期函数和watch 其它的同名 组件会替代mixin
export default {
  mixins: [mixin1],
  // 数据
  data() {
    return {
      name: "Demi",
      age: 25
    };
  },
  // 计算属性
  computed: {
    message() {
      return this.name.toLowerCase() + this.sex + this.age;
    }
  },
  // 监听属性
  watch: {
    sex() {
      console.log("watch sex");
    }
  },
  // 方法
  methods: {
    say() {
      console.log("say");
    },
    changeSex() {
      this.sex = "女"
    }
  },
  // 生命周期函数 创建前
  beforeCreate() {
    console.log("beforeCreate");
  },
  // 生命周期函数 已创建
  created() {
    console.log("created");
  },
  // 生命周期函数 挂载前
  beforeMount() {
    console.log("beforeMount");
  },
  // 生命周期函数 已挂载
  mounted() {
    console.log("mounted");
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
