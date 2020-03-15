export default {
  data() {
    return {
      name: "Randy",
      sex: "男"
    };
  },
  computed: {
    message() {
      return this.name.toUpperCase()
    }
  },
  watch: {
    sex() {
      console.log("mixin watch sex");
    }
  },
  methods: {
    say() {
      console.log("mixin say");
    }
  },
  // 生命周期函数
  // 生命周期函数 创建前
  beforeCreate() {
    console.log("mixin beforeCreate");
  },
  // 生命周期函数 已创建
  created() {
    console.log("mixin created");
  },
  // 生命周期函数 挂载前
  beforeMount() {
    console.log("mixin beforeMount");
  },
  // 生命周期函数 已挂载
  mounted() {
    console.log("mixin mounted");
  },
  // 生命周期函数 更新前
  beforeUpdate() {
    console.log("mixin beforeUpdate");
  },
  // 生命周期函数 更新后
  updated() {
    console.log("mixin updated");
  },
  // 生命周期函数 销毁前
  beforeDestroy() {
    console.log("mixin beforeDestroy");
  },
  // 生命周期函数 已销毁
  destroyed() {
    console.log("mixin destroyed");
  },
  // keep-alive 组件被激活时调用
  activated() {
    console.log("mixin activated");
  },
  // keep-alive 组件停止时调用
  deactivated() {
    console.log("mixin deactivated");
  }
};
