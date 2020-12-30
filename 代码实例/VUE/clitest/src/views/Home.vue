<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <img alt="Vue logo" src="@/assets/logo.png" />
    <!-- ~后的会被当做模块来解析 -->
    <img alt="Vue logo" src="~@/assets/logo.png" />
    <!-- 这是使用绝对路径 -->
    <img alt="Vue logo" src="/img/logo.82b9c7a5.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div :class="[aLess.a, aLess.b]">测试css模块</div>
    <div class="flex">测试公共样式</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import aLess from "@/styles/a.module.less";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: {
    aLess() {
      return aLess
    }
  },
  created() {
    console.log(aLess)
  }
};
</script>
