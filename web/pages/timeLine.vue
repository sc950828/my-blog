<template>
  <div class="timeline-wrapper">
    <a-timeline mode="alternate">
      <a-timeline-item v-for="item of timeLines" :key="item._id">
        <div class="pointer" @click="goArticle(item)">
          {{ `${item.year}/${item.time} ${item.article.title}` }}
        </div>
      </a-timeline-item>
    </a-timeline>
    <div v-if="!noMore" class="load-more">
      <a-button type="primary" :loading="loading" @click="loadMore">
        加载更多
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app }) {
    const {
      data: { timeLines, total, pageSize, pageNo },
    } = await app.$axios.get(`/timelines/web`)
    const noMore = total <= pageSize * pageNo

    return {
      timeLines,
      pageSize,
      pageNo,
      total,
      noMore,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    goArticle(item) {
      this.$router.push(`/article/${item.article._id}`)
    },
    loadMore() {
      this._getData(this.pageNo + 1)
    },
    async _getData(page) {
      try {
        this.loading = true
        const {
          data: { timeLines, total, pageNo, pageSize },
        } = await this.$axios.get(`/timelines/web`, {
          params: { pageNo: page },
        })

        this.timeLines = this.timeLines.concat(timeLines)
        this.total = total
        this.pageNo = pageNo
        this.pageSize = pageSize
        this.loading = false
        this.noMore = total <= pageSize * pageNo
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },
  },
}
</script>
<style lang="less" scoped>
.timeline-wrapper {
  .load-more {
    text-align: center;
  }
}
</style>
