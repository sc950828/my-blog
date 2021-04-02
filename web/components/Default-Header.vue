<template>
  <a-row type="flex" justify="center">
    <!-- xs <576px -->
    <!-- sm ≥576px -->
    <!-- md ≥768px -->
    <!-- lg ≥992px -->
    <!-- xl ≥1200px -->
    <!-- xxl ≥1600px -->
    <a-col :xs="18" :sm="18" :lg="6" :xl="6" :xxl="6">
      <div class="title pointer" @click="goIndex">{{ title }}</div>
    </a-col>
    <a-col :xs="6" :sm="6" :lg="0" :xl="0" :xxl="0">
      <div class="menu-icon">
        <a-icon
          :type="getterCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="clickMenu"
        />
      </div>
    </a-col>
    <a-col :xs="0" :sm="0" :lg="18" :xl="14" :xxl="14">
      <a-menu v-model="current" mode="horizontal" @click="selectMenu">
        <a-menu-item key="/"> <a-icon type="home" />首页 </a-menu-item>
        <a-menu-item key="/articleList">
          <a-icon type="file-text" />文章列表
        </a-menu-item>
        <a-menu-item key="/categoryList">
          <a-icon type="folder" />文章归档
        </a-menu-item>
        <a-menu-item key="/timeLine">
          <a-icon type="fund" />时间轴
        </a-menu-item>
        <a-menu-item key="/source">
          <a-icon type="book" />学习资源
        </a-menu-item>
        <a-menu-item key="/message">
          <a-icon type="message" />留言墙
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      current: [],
      title: process.env.NAME === 'sc' ? '苏纯的博客' : '晏海燕的博客',
    }
  },
  computed: {
    ...mapGetters(['getterCollapsed']),
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
    ...mapMutations(['changeCollapsed']),
    selectMenu({ item, key, keyPath }) {
      this.$router.push(key)
    },
    clickMenu() {
      this.changeCollapsed()
    },
    goIndex() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="less" scoped>
.title {
  color: #1890ff;
  font-size: 32px;
  background-image: linear-gradient(90deg, #1890ff, #2db7f5, #6bc30d);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-icon {
  font-size: 32px;
  text-align: right;
  cursor: pointer;
}

.ant-menu-horizontal {
  line-height: 62px;
  border: none;
}
</style>
