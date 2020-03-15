<template>
  <div class="wrapper">
    <div ref="dom">{{name}}</div>
    <div>
      <button @click="changeName">改变名字</button>
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
      name: "randy"
    };
  },
  // 计算属性
  computed: {},
  // 监听属性
  watch: {},
  // 方法
  methods: {
    changeName() {
      this.name = this.name === "demi" ? "randy" : "demi";
      const innerText = this.$refs.dom.innerText;
      alert(innerText);
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
      // 它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
      this.$nextTick(function() {
        const innerText = this.$refs.dom.innerText;
        alert(innerText);
      });
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
