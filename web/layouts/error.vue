<template>
  <div class="error-wrapper">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误</h1>
  </div>
</template>

<script>
export default {
  layout: 'default', // 你可以为错误页面指定自定义的布局
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
