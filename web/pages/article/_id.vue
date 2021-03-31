<template>
  <div v-if="article" class="article-wrapper">
    <div class="title-time">
      <div class="title text-center">{{ article.title }}</div>
      <div class="time text-center">
        {{ new Date(article.createdAt).toLocaleDateString() }}
      </div>
    </div>
    <div class="markdown-body" v-html="article.content.htmlValue"></div>
    <a-back-top />
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
<style lang="less">
.article-wrapper {
  .title-time {
    margin-bottom: 10px;
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
