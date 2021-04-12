<template>
  <div v-show="loading" class="loader"></div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.loader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3px;
  z-index: 9999999;
  background-image: linear-gradient(
    to right,
    #f16f5c 0%,
    #f16f5c 12.5%,
    #5b56dd 12.5%,
    #5b56dd 25%,
    #e15ced 25%,
    #e15ced 37.5%,
    #27e559 37.5%,
    #27e559 50%,
    #18c8c9 50%,
    #18c8c9 62.5%,
    #dc8987 62.5%,
    #dc8987 75%,
    #bb83d6 75%,
    #bb83d6 87.5%,
    #e774bd 87.5%,
    #e774bd 100%
  );
  animation: loader 3s linear infinite;
}
@keyframes loader {
  100% {
    background-position: 930px 0;
  }
}
</style>
