<template>
  <div class="index-wrapper">
    <div class="banner">
      <img
        src="https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_b4ecd0428bb9577059e9151bcb045c08.jpg"
      />
      <div class="user-info">
        <div class="avatar-name">
          <a-avatar size="large" :src="userInfo.avatar_url" />
          <div class="name-job">
            <div class="name-count">
              <span class="name">{{ userInfo.nick_name }}</span>
              <span class="icon"
                ><a-icon :type="userInfo.gender === 'male' ? 'man' : 'woman'"
              /></span>
            </div>
            <div class="job">{{ userInfo.job }}</div>
          </div>
        </div>
        <div class="info">
          <div class="item-box">
            <div class="item">
              <a-icon type="qq" /> <span class="value">{{ userInfo.qq }}</span>
            </div>
            <div class="item">
              <a-icon type="mail" theme="filled" />
              <span class="value">{{ userInfo.email }}</span>
            </div>
          </div>
          <div class="item-box">
            <div class="item">
              <a-icon type="wechat" />
              <span class="value">{{ userInfo.wechat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="introduction markdown-body"
      v-html="userInfo.introduction.htmlValue"
    ></div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const { data: userInfo } = await app.$axios.get(`/users/web/userInfo`)
    return {
      userInfo,
    }
  },
}
</script>
<style lang="less" scoped>
.index-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145.44deg, #f2f4fa 0, #fafbfc 100%);
  padding-bottom: 50px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .banner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
      width: 100%;
    }
    .user-info {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 20px 40px rgb(103 118 128 / 3%);
      padding: 20px;
      width: 90%;
      position: relative;
      bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .avatar-name {
        display: flex;
        align-items: center;
        .ant-avatar-lg {
          width: 120px;
          height: 120px;
          transition: all 2.6s cubic-bezier(0.17, 0.67, 0.62, 1.22);
          &:hover {
            transform: rotate(360deg);
          }
        }
        .name-job {
          margin: 0 18px;
          .name-count {
            font-weight: 600;
            .name {
              font-size: 26px;
            }
            .icon {
              font-size: 20px;
            }
          }
          .job {
            padding: 5px 0;
            font-size: 16px;
          }
        }
      }
      .info {
        display: flex;
        padding: 10px 0;
        font-size: 16px;
        .item-box {
          padding: 0 5px;
          .item {
            padding: 5px;
            .value {
              color: #5e6e80;
              margin-left: 2px;
            }
          }
        }

        @media screen and(max-width: 576px) {
          .item-box {
            padding: 0;
          }
        }
      }
    }

    @media screen and(max-width: 576px) {
      .user-info {
        width: 95%;
        padding: 20px 10px;
        bottom: 20px;
      }
    }
  }
  .introduction {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgb(103 118 128 / 3%);
    padding: 24px;
    width: 90%;
  }

  @media screen and(max-width: 576px) {
    .introduction {
      width: 95%;
    }
  }
}

@media screen and(max-width: 576px) {
  .index-wrapper {
    padding-bottom: 10px;
  }
}
</style>
