<template>
  <div v-if="article" class="article-wrapper">
    <div class="title-time">
      <div class="title text-center">{{ article.title }}</div>
      <div class="time text-center">
        {{ new Date(article.createdAt).toLocaleDateString() }}
      </div>
    </div>
    <no-ssr>
      <mavon-editor
        v-model="article.content.mdValue"
        :subfield="false"
        default-open="preview"
        :toolbars-flag="false"
      />
    </no-ssr>
  </div>
</template>
<script>
export default {
  async asyncData({ app, params }) {
    try {
      const { data: article } = await app.$axios.get(
        `/articles/web/${params.id}`
      )
      return {
        article,
      }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>
<style lang="less" scoped>
.article-wrapper {
  .title-time {
    margin-bottom: 20px;
    .title {
      font-size: 32px;
      font-weight: bold;
    }
    .time {
      color: #909090;
      font-size: 16px;
      padding: 10px 0;
    }
  }
}
</style>
