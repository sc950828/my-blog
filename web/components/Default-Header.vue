<template>
  <a-row type="flex" justify="center">
    <!-- xs <576px -->
    <!-- sm ≥576px -->
    <!-- md ≥768px -->
    <!-- lg ≥992px -->
    <!-- xl ≥1200px -->
    <!-- xxl ≥1600px -->
    <a-col :xs="24" :sm="24" :lg="20" :xl="16" :xxl="14">
      <a-menu v-model="current" mode="horizontal" @click="selectMenu">
        <a-menu-item key="/articleList">
          <a-icon type="file-text" />文章
        </a-menu-item>
        <a-menu-item key="/categoryList">
          <a-icon type="folder" />类目
        </a-menu-item>
        <a-menu-item key="/project">
          <a-icon type="project" />项目经历
        </a-menu-item>
        <a-menu-item key="/work">
          <a-icon type="appstore" />工作经历
        </a-menu-item>
        <a-menu-item key="/education">
          <a-icon type="fund" />教育经历
        </a-menu-item>
        <a-menu-item key="/message">
          <a-icon type="message" />留言
        </a-menu-item>
        <a-menu-item key="/about"> <a-icon type="user" />关于 </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>
<script>
export default {
  data() {
    return {
      current: ['articleList'],
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        this.current = [newValue.path]
      },
      immediate: true,
    },
  },
  methods: {
    selectMenu({ item, key, keyPath }) {
      this.$router.push(key)
    },
  },
}
</script>
<style lang="less" scoped>
.ant-menu-horizontal {
  line-height: 62px;
  border: none;
}
</style>
