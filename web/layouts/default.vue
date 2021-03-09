<template>
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
  </a-layout>
</template>
<script>
import DefaultHeader from '@/components/Default-Header'
import DefaultContent from '@/components/Default-Content'
import DefaultFooter from '@/components/Default-Footer'

export default {
  components: {
    DefaultFooter,
    DefaultHeader,
    DefaultContent,
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
}

.ant-layout-content {
  padding: 20px 50px;
}
</style>
