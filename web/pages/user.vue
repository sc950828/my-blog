<template>
  <section class="user-wrapper">
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="20" :md="14" :lg="12" :xl="10" :xxl="8">
        <div class="title">{{ title }}</div>
        <!-- 登录 -->
        <a-form-model
          v-show="isLogin"
          ref="userForm"
          :model="userForm"
          :rules="userRules"
        >
          <a-form-model-item prop="email" has-feedback>
            <a-input
              v-model="userForm.email"
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
          <a-form-model-item prop="password" has-feedback>
            <a-input-password
              v-model="userForm.password"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item style="margin-bottom: 0">
            <a-button type="primary" block @click="handleLogin">
              登录
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="link" style="padding: 0" @click="goRegister">
              还没有账号去注册
            </a-button>
          </a-form-model-item>
        </a-form-model>

        <!-- 注册 -->
        <a-form-model
          v-show="!isLogin"
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
        >
          <a-form-model-item prop="name" has-feedback>
            <a-input v-model="registerForm.name" placeholder="请输入用户名">
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="email" has-feedback>
            <a-input
              v-model="registerForm.email"
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
          <a-form-model-item prop="code">
            <a-input
              v-model="registerForm.code"
              style="width: 60%"
              placeholder="请输入验证码"
            >
              <a-icon
                slot="prefix"
                type="code"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
            <div class="send-code-box">
              <a-button type="primary" @click="sendCode">发送验证码</a-button>
            </div>
          </a-form-model-item>
          <a-form-model-item prop="password" has-feedback>
            <a-input-password
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item prop="password2" has-feedback>
            <a-input-password
              v-model="registerForm.password2"
              type="password"
              placeholder="请输入确认密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item style="margin-bottom: 0">
            <a-button type="primary" block @click="handleRegister">
              注册
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="link" style="padding: 0" @click="goLogin">
              已有账号去登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
  </section>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.registerForm.password && this.registerForm.password2 !== '') {
        this.$refs.registerForm.validateField('password2')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      userForm: {
        password: '',
        email: '',
      },
      registerForm: {
        name: '',
        password: '',
        password2: '',
        code: '',
        email: '',
      },
      userRules: {
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
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 18,
            message: '请输入大于6个字符小于18个字符的密码',
            trigger: 'blur',
          },
        ],
      },
      registerRules: {
        name: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
          {
            max: 5,
            message: '请输入5个字符以内的账号名',
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
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
          {
            max: 4,
            min: 4,
            message: '请输入4个字符的验证码',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 18,
            message: '请输入大于6个字符小于18个字符的密码',
            trigger: 'blur',
          },
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        password2: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 18,
            message: '请输入大于6个字符小于18个字符确认密码',
            trigger: 'blur',
          },
          {
            validator: validatePass2,
            trigger: 'blur',
          },
        ],
      },
      isLogin: true,
      title: '登录',
    }
  },
  methods: {
    handleLogin() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            const {
              data: { visitor },
            } = await this.$axios.post(`/visitors/login`, this.userForm)
            this.$message.success('登录成功')
            // 存储到本地
            localStorage.setItem('user', JSON.stringify(visitor))
            this.$store.commit('changeUser', visitor)
          } catch (e) {
            const {
              response: { data },
            } = e
            this.$message.error(data.message || '登录失败')
          }
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.$axios.post(`/visitors`, this.registerForm)
            this.$message.success('注册成功，请登录')
            this.goLogin()
          } catch (e) {
            const {
              response: { data },
            } = e
            this.$message.error(data.message || '注册失败')
          }
        }
      })
    },
    sendCode() {
      this.$refs.registerForm.validateField(['email'], async (errors) => {
        if (!errors) {
          // 发送验证码
          await this.$axios.post(`/home/sendRegisterEmail`, {
            email: this.registerForm.email,
          })
        }
      })
    },
    goRegister() {
      this.$refs.userForm.clearValidate()
      this.isLogin = false
      this.title = '注册'
    },
    goLogin() {
      this.$refs.registerForm.clearValidate()
      this.isLogin = true
      this.title = '登录'
    },
  },
}
</script>
<style lang="less" scoped>
.user-wrapper {
  .title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 24px;
  }

  .send-code-box {
    display: inline-block;
    width: 40%;
    text-align: right;
  }
}
</style>
