<template>
  <div class='app-header-wrapper'>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav align="end">
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/jokes" >Jokes</b-nav-item>
        <b-nav-item href="/about" >About</b-nav-item>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {}
  },
  // 方法
  methods: {},
  // 生命周期函数 已创建
  created() {},
  // 生命周期函数 已挂载
  mounted() {},
}
</script>
