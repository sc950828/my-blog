<template>
  <div class="wrapper">
    <div :style="show ? 'color: red' : 'color: green'">style 字符串方式绑定</div>
    <div :style="{color: show ? 'green' : 'yellow'}">style 对象方式绑定</div>
    <div :style="[style1, style2]">style 数组方式绑定</div>

    <div :class="show ? 'class1' : 'class2'">class 字符串方式绑定</div>
    <div :class="{class1: !show, class2: show}">class 对象方式绑定</div>
    <div :class="['class1', 'class2']">class 数组方式绑定</div>

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
      show: true,
      style1: {
        "background-color": "pink"
      },
      style2: {
        "font-size": "18px"
      }
    };
  }
};
</script>
<style lang="css" scoped>
.class1 {
  background-color: aqua;
}
.class2 {
  font-size: 18px;
}
</style>
