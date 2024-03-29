<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="noMore"
    :infinite-scroll-distance="10"
    class="article-category-wrapper"
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
        class="article"
        @click="goArticle(item)"
      >
        <img slot="extra" class="img" :src="item.banner" />
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
  </div>
</template>
<script>
import { debounce } from '@/utils/help'

export default {
  async asyncData({ app, params }) {
    const {
      data: { articles, total, pageSize, pageNo },
    } = await app.$axios.get(`/articles/web`, {
      params: { articleCategory: params.id },
    })

    return {
      articles,
      total,
      pageSize,
      pageNo,
      articleCategory: params.id,
    }
  },
  data() {
    return {
      noMore: false,
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
          params: { pageNo: page, articleCategory: this.articleCategory },
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
    }, 400),
    goArticle(item) {
      this.$router.push(`/article/${item._id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.article-category-wrapper {
  .article {
    transition: opacity 0.35s;
    &:hover {
      opacity: 0.85;
    }
  }
  /deep/ .ant-list-item-extra {
    overflow: hidden;
  }
  .img {
    width: 260px;
    transition: transform 0.6s;
    &:hover {
      transform: scale(1.08, 1.08);
    }
  }
  @media screen and(max-width: 576px) {
    .img {
      width: 100%;
    }
  }
}
</style>
