<template>
  <div class="wrapper">
    <div>{{name | changeCase("capitalize")}}</div>
    <input type="text" :value="fullName | upperCase">

    <div>
      <router-link to="/">返回</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      name: "hello randy",
      fullName: "randy su"
    };
  },
  // 过滤器 局部注册
  filters: {
    // 默认第一个参数就是需要过滤的值 可以不传该参数
    // switch里面可以用return 代替break
    // 还可以使用Vue.filter("name", function(){})全局注册过滤器
    changeCase(val, type) {
      switch (type) {
        case "lowerCase":
          return val.toLowerCase();
        case "upperCase":
          return val.toUpperCase();
        case "capitalize":
          let tempArr = [];
          for (let item of val.split(" ")) {
            item = item.charAt(0).toUpperCase() + item.slice(1)
            tempArr.push(item)
          }
          return tempArr.join(" ");
        default:
          return val;
      }
    }
  }
};
</script>
