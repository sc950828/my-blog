<template>
  <div class="category-list-wrapper">
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
          <div slot="cover" class="img-box">
            <img :alt="item.title" width="100%" :src="item.banner" />
            <div class="count-time">
              <div class="count">{{ item.count }}</div>
              <div class="line"></div>
              <div class="time">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </div>
            </div>
          </div>
          <a-card-meta>
            <span slot="title" :title="item.title">
              {{ item.title }}
            </span>
            <span slot="description" :title="item.description">
              {{ item.description }}
            </span>
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
.category-list-wrapper {
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

  .img-box {
    position: relative;
    overflow: hidden;
    img {
      transition: transform 0.6s;
      &:hover {
        transform: scale(1.08, 1.08);
      }
    }
    .count-time {
      position: absolute;
      padding: 5px 10px;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.3);
      transition: background 0.6s;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 2px;
      .count {
        font-size: 20px;
      }
      .line {
        height: 3px;
        width: 100%;
        margin: 2px 0;
        background-color: #fff;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
