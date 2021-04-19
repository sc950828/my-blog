<template>
  <a-config-provider :locale="zhCN">
    <a-layout>
      <a-layout-header>
        <default-header></default-header>
      </a-layout-header>
      <a-layout-content>
        <default-content></default-content>
      </a-layout-content>
      <a-layout-footer>
        <default-footer></default-footer>
      </a-layout-footer>
      <a-drawer
        :z-index="1501"
        :width="200"
        title="菜单"
        :visible="getterCollapsed"
        @close="close"
      >
        <a-menu v-model="current" @click="selectMenu">
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
          <a-menu-item key="/user">
            <a-icon type="user" />{{
              getterUser ? getterUser.visitor.name : '登录/注册'
            }}
          </a-menu-item>
        </a-menu>
      </a-drawer>
    </a-layout>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      zhCN,
      current: [],
      user: null,
    }
  },
  computed: {
    ...mapGetters(['getterCollapsed', 'getterUser']),
  },
  watch: {
    $route: {
      handler(newValue) {
        this.current = [newValue.path]
      },
      immediate: true,
    },
  },
  beforeMount() {
    const user = localStorage.getItem('user')
    if (user) {
      this.$store.commit('changeUser', JSON.parse(user))
    }
  },
  methods: {
    ...mapMutations(['changeCollapsed']),
    close() {
      this.changeCollapsed()
    },
    selectMenu({ item, key, keyPath }) {
      this.$router.push(key)
      this.changeCollapsed()
    },
  },
}
</script>
<style lang="less" scoped>
.ant-layout {
  min-height: 100%;
  background-color: white;
}

.ant-layout-header {
  background: white;
  box-shadow: rgb(238, 238, 238) 0 2px 12px 0;
  position: fixed;
  width: 100%;
  z-index: 1501;
}

.ant-layout-content {
  margin-top: 64px;
  padding: 24px 50px;
}

@media screen and (max-width: 576px) {
  .ant-layout-header {
    padding: 0 14px;
  }

  .ant-layout-content {
    margin-top: 64px;
    padding: 14px;
  }

  .ant-layout-footer {
    padding: 14px;
  }
}

.ant-menu-vertical {
  border: none;
}

.ant-menu-item {
  font-weight: bold;
}
</style>
