<template>
  <div class="category-wrapper">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 1, lg: 2, xl: 3, xxl: 4 }"
      :data-source="articleCategorys"
      :pagination="pagination"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        :row-key="item._id"
        @click="goArticleList(item)"
      >
        <a-card hoverable>
          <img slot="cover" :alt="item.title" :src="item.banner" />
          <a-card-meta :title="item.title">
            <template slot="description">{{ item.description }} </template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  async asyncData({ app, params }) {
    const {
      data: { articleCategorys, total, pageSize },
    } = await app.$axios.get(`/articleCategorys/web`)
    let pagination = false
    if (total > 0) {
      pagination = {
        total,
        pageSize,
      }
    }
    return {
      articleCategorys,
      pagination,
    }
  },
  data() {
    return {}
  },
  created() {
    if (this.pagination) {
      this.pagination.onChange = (page) => {
        this._getData(page)
      }
    }
  },
  methods: {
    async _getData(page) {
      const {
        data: { articleCategorys, total },
      } = await this.$axios.get(`/articleCategorys/web`, {
        params: { pageNo: page },
      })

      this.articleCategorys = articleCategorys
      this.pagination.total = total
    },
    goArticleList(item) {
      this.$router.push(`/articleListByCategory/${item._id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.category-wrapper {
  /deep/ .ant-row {
    display: flex;
    flex-wrap: wrap;

    .ant-col {
      float: none;
    }

    .ant-card-meta-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ant-card-meta-description {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
