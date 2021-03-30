<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="noMore"
    :infinite-scroll-distance="10"
    class="article-wrapper"
  >
    <a-list
      :data-source="articles"
      item-layout="vertical"
      size="large"
      class="pointer"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        :row-key="item._id"
        @click="goArticle(item)"
      >
        <img slot="extra" width="260" :src="item.banner" />
        <a-list-item-meta>
          <div slot="title" class="ellipsis-1">{{ item.title }}</div>
        </a-list-item-meta>
        <div class="ellipsis-2">{{ item.description }}</div>
        <template>
          <span slot="actions">
            <a-icon type="clock-circle" style="margin-right: 8px" />
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </span>
          <span slot="actions">
            <a-icon type="eye" style="margin-right: 8px" />
            {{ item.views }}
          </span>
          <span slot="actions">
            <a-icon type="message" style="margin-right: 8px" />
            {{ item.comments }}
          </span>
        </template>
      </a-list-item>
      <div v-if="loading && !noMore" class="text-center">
        <a-spin tip="加载中..." />
      </div>
    </a-list>
    <a-back-top />
  </div>
</template>
<script>
import { debounce } from '@/utils/help'

export default {
  async asyncData({ app, params }) {
    const {
      data: { articles, total, pageSize, pageNo },
    } = await app.$axios.get(`/articles/web`)
    const noMore = total <= pageSize * pageNo

    return {
      articles,
      total,
      pageSize,
      pageNo,
      noMore,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {},
  methods: {
    async _getData(page) {
      try {
        this.loading = true
        const {
          data: { articles, total, pageNo, pageSize },
        } = await this.$axios.get(`/articles/web`, {
          params: { pageNo: page },
        })

        this.articles = this.articles.concat(articles)
        this.total = total
        this.pageNo = pageNo
        this.pageSize = pageSize
        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },
    // 节流
    handleInfiniteOnLoad: debounce(function () {
      const { total, pageSize, pageNo } = this
      if (total > pageSize * pageNo) {
        this._getData(pageNo + 1)
      } else {
        this.noMore = true
      }
    }, 1000),
    goArticle(item) {
      this.$router.push(`/article/${item._id}`)
    },
  },
}
</script>
