<template>
  <div class='wrapper'>{{params.id}}</div>
</template>

<script>
export default {
  name: '',
  components: {},
  // 数据
  data() {
    return {}
  },
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    console.log(params)
    return {params}
  },
  // 方法
  methods: {},
  // 生命周期函数 已创建
  created() {},
  // 生命周期函数 已挂载
  mounted() {},
}
</script>

<style lang='less' scoped>
.wrapper {}
</style>
