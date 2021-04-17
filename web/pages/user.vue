<template>
  <section class="user-wrapper">
    <div class="text-center">
      <a-spin :spinning="loading" tip="加载中..." />
    </div>
    <a-row v-if="!loading" type="flex" justify="center">
      <a-col :xs="24" :sm="20" :md="14" :lg="12" :xl="10" :xxl="8">
        <div class="title">{{ title }}</div>
        <!-- 登录 -->
        <a-form-model
          v-show="!getterUser && showLogin && !showForgetPassword"
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
            <div class="flex-j-b">
              <a-button type="link" style="padding: 0" @click="goRegister">
                还没有账号去注册
              </a-button>
              <a-button type="link" style="padding: 0" @click="forgetPassword">
                忘记密码
              </a-button>
            </div>
          </a-form-model-item>
        </a-form-model>

        <!-- 注册 -->
        <a-form-model
          v-show="!getterUser && !showLogin && !showForgetPassword"
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
              <a-button
                type="primary"
                :disabled="hasSendCode"
                @click="sendRegisterCode"
              >
                {{
                  hasSendCode ? `${time}秒后重新发送` : '发送验证码'
                }}</a-button
              >
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

        <!-- 用户信息 -->
        <a-form-model
          v-show="getterUser"
          ref="userInfoForm"
          :model="userInfoForm"
        >
          <a-form-model-item prop="name">
            <a-input v-model="userInfoForm.name" disabled>
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="email">
            <a-input v-model="userInfoForm.email" disabled type="email">
              <a-icon
                slot="prefix"
                type="mail"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item style="margin-bottom: 0">
            <a-button type="primary" block @click="handleLogout">
              退出登录
            </a-button>
          </a-form-model-item>
        </a-form-model>

        <!-- 忘记密码 showForgetPassword -->
        <a-form-model
          v-show="!getterUser && !showLogin && showForgetPassword"
          ref="passwordForm"
          :model="passwordForm"
          :rules="passwordRules"
        >
          <a-form-model-item prop="email" has-feedback>
            <a-input
              v-model="passwordForm.email"
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
              v-model="passwordForm.code"
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
              <a-button
                type="primary"
                :disabled="hasSendCode"
                @click="sendPasswordCode"
              >
                {{
                  hasSendCode ? `${time}秒后重新发送` : '发送验证码'
                }}</a-button
              >
            </div>
          </a-form-model-item>
          <a-form-model-item prop="password" has-feedback>
            <a-input-password
              v-model="passwordForm.password"
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
              v-model="passwordForm.password2"
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
            <a-button type="primary" block @click="handleUpdatePassword">
              确定
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="link" style="padding: 0" @click="goLogin">
              返回登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  asyncData() {
    return {
      loading: true,
    }
  },
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
    const passwordValidatePass = (rule, value, callback) => {
      if (this.passwordForm.password && this.passwordForm.password2 !== '') {
        this.$refs.passwordForm.validateField('password2')
      }
      callback()
    }
    const passwordValidatePass2 = (rule, value, callback) => {
      if (value !== this.passwordForm.password) {
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
      passwordForm: {
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
      passwordRules: {
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
            validator: passwordValidatePass,
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
            validator: passwordValidatePass2,
            trigger: 'blur',
          },
        ],
      },
      showLogin: true,
      showForgetPassword: false,
      time: 60,
      hasSendCode: false,
    }
  },
  computed: {
    ...mapGetters(['getterUser']),
    title() {
      return this.getterUser
        ? '用户信息'
        : this.showLogin
        ? '登录'
        : this.showForgetPassword
        ? '找回密码'
        : '注册'
    },
    userInfoForm() {
      return {
        name: this.getterUser ? this.getterUser.visitor.name : '',
        email: this.getterUser ? this.getterUser.visitor.email : '',
      }
    },
  },
  mounted() {
    this.loading = false
  },
  methods: {
    ...mapMutations(['changeUser']),
    handleLogin() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$axios.post(
              `/visitors/login`,
              this.userForm
            )
            this.$message.success('登录成功')
            // 存储到本地
            localStorage.setItem('user', JSON.stringify(data))
            // store
            this.changeUser(data)
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
    sendRegisterCode() {
      this.$refs.registerForm.validateField(['email'], async (errors) => {
        if (!errors) {
          try {
            // 发送验证码
            await this.$axios.post(`/home/sendRegisterEmail`, {
              email: this.registerForm.email,
            })
            this.$message.success('验证码发送成功')
          } catch (e) {
            const {
              response: { data },
            } = e
            this.$message.error(data.message || '验证码发送失败')
          }
          this.hasSendCode = true
          let timer = null
          timer = setInterval(() => {
            if (this.time > 0) {
              this.time--
            } else {
              this.hasSendCode = false
              clearInterval(timer)
              this.time = 60
            }
          }, 1000)
        }
      })
    },
    sendPasswordCode() {
      this.$refs.passwordForm.validateField(['email'], async (errors) => {
        if (!errors) {
          try {
            // 发送验证码
            await this.$axios.post(`/home/sendWebUpdatePasswordEmail`, {
              email: this.passwordForm.email,
            })
            this.$message.success('验证码发送成功')
          } catch (e) {
            const {
              response: { data },
            } = e
            this.$message.error(data.message || '验证码发送失败')
          }
          this.hasSendCode = true
          let timer = null
          timer = setInterval(() => {
            if (this.time > 0) {
              this.time--
            } else {
              this.hasSendCode = false
              clearInterval(timer)
              this.time = 60
            }
          }, 1000)
        }
      })
    },
    handleUpdatePassword() {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.$axios.post(
              `/visitors/forgetPassword`,
              this.passwordForm
            )
            this.$message.success('密码修改成功，请登录')
            this.goLogin()
          } catch (e) {
            const {
              response: { data },
            } = e
            this.$message.error(data.message || '密码修改失败')
          }
        }
      })
    },
    goRegister() {
      this.$refs.userForm.clearValidate()
      this.showLogin = false
      this.showForgetPassword = false
    },
    goLogin() {
      this.$refs.registerForm.clearValidate()
      this.showLogin = true
      this.showForgetPassword = false
    },
    handleLogout() {
      this.$confirm({
        title: '退出登录',
        content: '确定退出登录吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.showLogin = true
          // 清除本地存储
          localStorage.removeItem('user')
          // 清除store里面的user
          this.changeUser(null)
        },
        onCancel: () => {
          console.log('Cancel')
        },
      })
    },
    forgetPassword() {
      this.showLogin = false
      this.showForgetPassword = true
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
