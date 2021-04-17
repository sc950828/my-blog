<template>
  <section class="article-wrapper">
    <div class="title-time">
      <div class="title text-center">{{ article.title }}</div>
      <div class="time text-center">
        {{ new Date(article.createdAt).toLocaleDateString() }}
      </div>
    </div>
    <div class="markdown-body" v-html="article.content.htmlValue"></div>
    <a-back-top />

    <div class="message-wrap">
      <a-comment>
        <div slot="content">
          <a-form-model ref="form" :model="messageForm" :rules="rules">
            <a-form-model-item prop="content" style="margin-bottom: 24px">
              <a-textarea
                v-model="messageForm.content"
                :rows="4"
                allow-clear
                placeholder="请输入评论内容，不要超过200个字符哦！"
              />
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
          :header="`${total} 条评论`"
          item-layout="horizontal"
          :data-source="messages"
        >
          <a-list-item slot="renderItem" slot-scope="item" :row-key="item._id">
            <a-comment :datetime="new Date(item.createdAt).toLocaleString()">
              <template slot="author">
                <span v-if="item.visitor">
                  {{ item.visitor.name }}
                </span>
                <span v-else class="bozhu-name">博主</span>
              </template>
              <template slot="content">
                {{ item.content }}
              </template>
              <template slot="actions">
                <span class="pointer" @click="reply(messages, item)">
                  <a-icon type="message" /><span class="ml-5">回复</span>
                </span>
              </template>
              <!-- 评论框 -->
              <a-comment v-if="item.reply">
                <div slot="content">
                  <a-form-model
                    ref="secondForm"
                    :model="secondMessageForm"
                    :rules="rules"
                  >
                    <a-form-model-item prop="content">
                      <a-textarea
                        v-model="secondMessageForm.content"
                        :rows="4"
                        allow-clear
                        placeholder="请输入评论内容，不要超过200个字符哦！"
                      />
                    </a-form-model-item>
                    <a-form-model-item>
                      <a-button
                        type="primary"
                        block
                        @click="handleSubmitSecond(item)"
                      >
                        发布
                      </a-button>
                    </a-form-model-item>
                  </a-form-model>
                </div>
              </a-comment>

              <!-- 二级评论 -->
              <a-list
                v-if="item.children.length > 0"
                item-layout="horizontal"
                :data-source="item.children"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item2"
                  :row-key="item2._id"
                >
                  <a-comment
                    :datetime="new Date(item2.createdAt).toLocaleString()"
                  >
                    <template slot="author">
                      <span v-if="item2.visitor">
                        {{ item2.visitor.name }}
                      </span>
                      <span v-else class="bozhu-name">博主</span>
                    </template>
                    <template slot="content">
                      <span v-if="item2.message._id !== item._id"
                        >回复
                        <span style="color: #1890ff"
                          >@{{ item2.message.visitor.name }}:</span
                        ></span
                      >
                      {{ item2.content }}
                    </template>
                    <template slot="actions">
                      <span
                        class="pointer"
                        @click="reply(item.children, item2)"
                      >
                        <a-icon type="message" /><span class="ml-5">回复</span>
                      </span>
                    </template>
                    <!-- 评论框 -->
                    <a-comment v-if="item2.reply">
                      <div slot="content">
                        <a-form-model
                          ref="thirdForm"
                          :model="thirdMessageForm"
                          :rules="rules"
                        >
                          <a-form-model-item prop="content">
                            <a-textarea
                              v-model="thirdMessageForm.content"
                              :rows="4"
                              allow-clear
                              placeholder="请输入评论内容，不要超过200个字符哦！"
                            />
                          </a-form-model-item>
                          <a-form-model-item>
                            <a-button
                              type="primary"
                              block
                              @click="handleSubmitThird(item._id, item2)"
                            >
                              发布
                            </a-button>
                          </a-form-model-item>
                        </a-form-model>
                      </div>
                    </a-comment>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-comment>
          </a-list-item>
        </a-list>
        <div v-if="loading && !noMore" class="text-center">
          <a-spin tip="加载中..." />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { debounce } from '@/utils/help'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ app, params }) {
    try {
      const { data: article } = await app.$axios.get(
        `/articles/web/${params.id}`
      )

      const {
        data: { messages, total, pageSize, pageNo },
      } = await app.$axios.get(`/messages/web`, {
        params: { articleId: params.id },
      })
      const noMore = total <= pageSize * pageNo

      messages.forEach((element) => {
        element.reply = false
        if (element.children && element.children.length > 0) {
          element.children.forEach((item) => {
            item.reply = false
          })
          // 倒序
          element.children.reverse()
        }
      })

      return {
        article,
        messages,
        total,
        pageSize,
        pageNo,
        noMore,
        id: params.id,
      }
    } catch (e) {
      console.error(e)
    }
  },
  data() {
    return {
      messageForm: {
        content: '',
      },
      secondMessageForm: {
        content: '',
      },
      thirdMessageForm: {
        content: '',
      },
      rules: {
        content: [
          {
            required: true,
            message: '请输入评论内容',
            trigger: 'blur',
          },
          {
            max: 200,
            message: '请输入200个字符以内的评论内容',
            trigger: 'blur',
          },
        ],
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['getterUser']),
  },
  methods: {
    handleSubmit() {
      this._checkoutLogin() &&
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            try {
              await this.$axios.post(
                `/messages`,
                {
                  ...this.messageForm,
                  articleId: this.id,
                },
                {
                  headers: {
                    token: this.getterUser.token,
                  },
                }
              )
              this.$message.success('评论成功！')
              this.messageForm.content = ''
              // 重新获取数据
              await this._getData(1)
            } catch (e) {
              console.error(e)
              this.$message.error('评论失败！')
            }
          } else {
            return false
          }
        })
    },

    handleSubmitSecond(item) {
      this._checkoutLogin() &&
        this.$refs.secondForm.validate(async (valid) => {
          if (valid) {
            try {
              await this.$axios.post(
                `/messages`,
                {
                  ...this.secondMessageForm,
                  articleId: this.id,
                  messageId: item._id,
                  parentMessageId: item._id,
                },
                {
                  headers: {
                    token: this.getterUser.token,
                  },
                }
              )
              this.$message.success('评论成功！')
              item.reply = false
              this.secondMessageForm.content = ''
              // 重新获取数据
              await this._getData(1)
            } catch (e) {
              console.error(e)
              this.$message.error('评论失败！')
            }
          } else {
            return false
          }
        })
    },

    handleSubmitThird(parentMessageId, item) {
      this._checkoutLogin() &&
        this.$refs.thirdForm.validate(async (valid) => {
          if (valid) {
            try {
              await this.$axios.post(
                `/messages`,
                {
                  ...this.thirdMessageForm,
                  articleId: this.id,
                  messageId: item._id,
                  parentMessageId,
                },
                {
                  headers: {
                    token: this.getterUser.token,
                  },
                }
              )
              this.$message.success('评论成功！')
              item.reply = false
              this.thirdMessageForm.content = ''
              // 重新获取数据
              await this._getData(1)
            } catch (e) {
              console.error(e)
              this.$message.error('评论失败！')
            }
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
          data: { messages, total, pageNo, pageSize },
        } = await this.$axios.get(`/messages/web`, {
          params: { pageNo: page, articleId: this.id },
        })
        this._formatData(messages)
        // 第一页
        if (page === 1) {
          this.messages = messages
        } else {
          this.messages = this.messages.concat(messages)
        }
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

    _formatData(messages) {
      messages.forEach((element) => {
        element.reply = false
        if (element.children && element.children.length > 0) {
          element.children.forEach((item) => {
            item.reply = false
          })
          // 倒序
          element.children.reverse()
        }
      })
    },

    _checkoutLogin() {
      if (!this.getterUser) {
        this.$confirm({
          title: '登录',
          content: '请先登录',
          okText: '去登录',
          okType: 'primary',
          cancelText: '取消',
          onOk: () => {
            this.$router.push('/user')
          },
          onCancel: () => {
            console.log('Cancel')
          },
        })
        return false
      }
      return true
    },

    reply(lists, item) {
      lists.forEach((message) => {
        if (message._id === item._id) {
          message.reply = !message.reply
        } else {
          message.reply = false
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
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

  .message-wrap {
    margin-top: 30px;
    box-shadow: 0 20px 40px rgb(103 118 128 / 3%);
    padding: 20px;
    /deep/ .ant-form {
      .ant-form-item {
        margin-bottom: 0;
      }
    }

    /deep/ .ant-comment-avatar {
      margin-right: 0;
    }

    /deep/ .ant-comment {
      width: 100%;
      .ant-comment-inner {
        padding: 0;
      }
    }

    .comment-list {
      margin-top: 20px;
    }

    .bozhu-name {
      color: #1890ff;
      background-image: linear-gradient(90deg, #1890ff, #2db7f5, #6bc30d);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
