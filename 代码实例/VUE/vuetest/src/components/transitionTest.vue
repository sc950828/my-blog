<template>
  <div class="transition-wrapper">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>

    <transition>
      <div v-if="show">我是你的宝贝!</div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {}
}
</script>
<style lang="css">
.transition-wrapper {
  height: 500px;
  width: 100%;
}

 .fade-enter-active, .fade-leave-active { /*过渡运行期间*/
  transition: opacity 1s ease;
}
.fade-enter { /*元素被插入前生效 开始过渡的一瞬间*/
  opacity: 0;
}
.fade-enter-to {/*show 开始过渡的一瞬间开始 一直到过渡完成时移除*/
  color: red;
  /* font-size: 25px; */
}
.fade-leave { /*离开过渡开的一瞬间*/
  color: red;
}
.fade-leave-to {/*离开过渡开始一直到离开过渡完成时移除*/
  opacity: 0;
}

.v-enter { /* 开始展示元素的一瞬间是红色*/
  color: red;
}

.v-enter-active {
  transition: color 1s ease;
}

.v-enter-to{ /* 展示期间变为蓝色*/
  color: blue;
}

.v-leave{
  font-size: 16px;
}

.v-leave-active{
  transition: font-size 2s ease;
}

.v-leave-to{
  font-size: 40px;
}

</style>
