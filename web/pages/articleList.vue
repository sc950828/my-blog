<template>
  <div></div>
</template>
<script>
export default {
  async asyncData({ app, params }) {
    const { articles, total, pageNo, pageSize } = await app.$axios.get(
      `/articles/web`
    )
    console.log(articles)
    return {
      articles,
      total,
      pageNo,
      pageSize,
    }
  },
}
</script>
