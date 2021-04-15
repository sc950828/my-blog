<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="noMore"
    :infinite-scroll-distance="10"
    class="source-wrapper"
  >
    <a-list
      :data-source="sources"
      item-layout="vertical"
      size="large"
      class="pointer"
    >
      <a-list-item slot="renderItem" slot-scope="item" :row-key="item._id">
        <a-list-item-meta>
          <div slot="title" class="name ellipsis">{{ item.name }}</div>
        </a-list-item-meta>
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="list of item.lists"
            :key="list._id"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="6"
            :xxl="4"
          >
            <div class="card" @click="goSource(list)">
              <div class="avatar-title">
                <img
                  width="38"
                  height="38"
                  :alt="list.title"
                  :src="list.logo"
                />
                <div class="title ellipsis" :title="list.title">
                  {{ list.title }}
                </div>
              </div>
              <div class="description ellipsis-2" :title="list.description">
                {{ list.description }}
              </div>
            </div>
          </a-col>
        </a-row>
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
      data: { sources, total, pageSize, pageNo },
    } = await app.$axios.get(`/sources/web`)
    const noMore = total <= pageSize * pageNo

    return {
      sources,
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
  methods: {
    async _getData(page) {
      try {
        this.loading = true
        const {
          data: { sources, total, pageNo, pageSize },
        } = await this.$axios.get(`/sources/web`, {
          params: { pageNo: page },
        })

        this.sources = this.sources.concat(sources)
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
    // 节流
    handleInfiniteOnLoad: debounce(function () {
      if (!this.noMore) {
        this._getData(this.pageNo + 1)
      } else {
        this.noMore = true
      }
    }, 400),
    goSource(item) {
      window.open(item.link, '_blank')
    },
  },
}
</script>

<style lang="less" scoped>
.source-wrapper {
  .ant-list-split .ant-list-item {
    border: none;
  }
  .ant-list-item-meta-title {
    border-bottom: 1px solid #ebebeb;
    font-weight: 700;
    position: relative;
    .name {
      margin-left: 8px;
      padding: 10px 0;
    }
    &::before {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 4px;
      background-image: linear-gradient(180deg, #1890ff, #2db7f5, #6bc30d);
    }
  }

  .card {
    padding: 10px;
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.3s, border-color 0.3s;
    &:hover {
      border-color: transparent;
      box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
        0 5px 12px 4px rgb(0 0 0 / 9%);
    }

    .avatar-title {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      .title {
        margin-left: 16px;
      }
    }

    .description {
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.45);
      height: 42px;
    }
  }
}
</style>
