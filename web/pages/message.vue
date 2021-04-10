<template>
  <section class="message-wrapper">
    <a-comment>
      <div slot="content">
        <a-form-model ref="form" :model="messageForm" :rules="rules">
          <a-form-model-item prop="content">
            <a-textarea
              v-model="messageForm.content"
              :rows="4"
              allow-clear
              placeholder="请输入评论内容，不要超过200个字符哦！"
            />
          </a-form-model-item>
          <a-form-model-item prop="name">
            <a-input v-model="messageForm.name" placeholder="请输入姓名">
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="email">
            <a-input
              v-model="messageForm.email"
              type="email"
              placeholder="请输入邮箱"
            >
              <a-icon
                slot="prefix"
                type="mail"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" block @click="handleSubmit">
              发布
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-comment>

    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      class="comment-list"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-distance="10"
    >
      <a-list
        :header="`${total} 条留言`"
        item-layout="horizontal"
        :data-source="messages"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-comment :author="item.name" :datetime="item.createdAt">
            <div slot="content">
              {{ item._id }}
            </div>
          </a-comment>
        </a-list-item>
      </a-list>
      <div v-if="loading && !noMore" class="text-center">
        <a-spin tip="加载中..." />
      </div>
    </div>
  </section>
</template>

<script>
import { debounce } from '@/utils/help'

export default {
  name: 'Message',
  async asyncData({ app, params }) {
    const {
      data: { sources: messages, total, pageSize, pageNo },
    } = await app.$axios.get(`/sources/web`)
    const noMore = total <= pageSize * pageNo

    return {
      messages,
      total,
      pageSize,
      pageNo,
      noMore,
    }
  },
  data() {
    return {
      messageForm: {
        content: '',
        name: '',
        email: '',
      },
      rules: {
        content: [
          {
            required: true,
            message: '请输入留言内容',
            trigger: 'blur',
          },
          {
            max: 200,
            message: '请输入200个字符以内的留言内容',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
          {
            max: 10,
            message: '请输入10个字符以内的姓名',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur',
          },
        ],
      },
      loading: false,
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    handleInfiniteOnLoad: debounce(function () {
      if (!this.noMore) {
        this._getData(this.pageNo + 1)
      } else {
        this.noMore = true
      }
    }, 400),
    async _getData(page) {
      try {
        this.loading = true
        const {
          data: { sources: messages, total, pageNo, pageSize },
        } = await this.$axios.get(`/sources/web`, {
          params: { pageNo: page },
        })

        this.messages = this.messages.concat(messages)
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
.message-wrapper {
  /deep/ .ant-form {
    .ant-form-item {
      margin-bottom: 0;
      &:not(:first-child) {
        display: inline-block;
        margin-right: 10px;
      }
      &:last-child {
        margin-right: 0;
        float: right;
      }
      @media screen and (max-width: 576px) {
        & {
          width: 100%;
        }
      }
    }
  }

  /deep/ .ant-comment-avatar {
    margin-right: 0;
  }

  .comment-list {
    margin-top: 20px;
  }
}
</style>
