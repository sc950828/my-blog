import {connect} from 'react-redux'
import {PureComponent} from 'react'
import { Steps, Form, Input, Button, Layout} from 'antd';
import { MailOutlined, CodepenOutlined , LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import {changeStepAction, sendUpdatePasswordEmail, verifyUpdatePasswordEmailCode, changePassword} from '../../store/actions/creatorUserActions'
import MyFooter from '../../components/MyFooter'
import styles from './password.module.scss';

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

class Password extends PureComponent {
  render() {
    const { handleChangeStep, current, email, handleSendEmail, handleVerifyCode, handleChangePassword } = this.props

    const changeStep = (newCurrent) => {
      if(newCurrent < current) {
        handleChangeStep(newCurrent)
      }
    }

    const verifyCode = (formData) => {
      formData.email = email
      handleVerifyCode(formData)
    }

    const changePassword = (formData) => {
      formData.email = email
      formData.goLogin = () => {
        this.props.history.push("/login")
      }
      handleChangePassword(formData)
    }

    const emailForm = (
      <Form
        name="normal_login"
        initialValues={{ email: "" }}
        onFinish={handleSendEmail}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>获取验证码</Button>
        </Form.Item>
      </Form>
    )
    
    const codeForm = (
      <Form
        name="normal_login"
        onFinish={verifyCode}
        size="large"
      >
        <Form.Item
          name="code"
          rules={[
            { required: true, message: '请输入验证码' },
            { pattern: /^\d{4}$/, message: '请输入正确的验证码(四位数字)' },
          ]}
        >
          <Input prefix={<CodepenOutlined />} placeholder="请输入邮箱收到的验证码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>确定</Button>
        </Form.Item>
      </Form>
    )

    const passForm = (
      <Form
        name="normal_login"
        onFinish={changePassword}
        size="large"
      >
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            ({getFieldValue}) => ({
              validator(rule, value, callback){
                const password2 = getFieldValue("password2")
                if(password2 && value !== password2) {
                  callback(new Error("两次密码不一致"))
                } else {
                  callback()
                }
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          name="password2"
          rules={[
            { required: true, message: '请输入确认密码' },
            ({getFieldValue}) => ({
              validator(rule, value, callback){
                const password1 = getFieldValue("password")
                if(password1 && value !== password1) {
                  callback(new Error("两次密码不一致"))
                } else {
                  callback()
                }
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入确认密码"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>确定</Button>
        </Form.Item>
      </Form>
    )

    return (
      <Layout className={styles['password-wrapper']}>
        <Header className={styles['head']}>
          <div className={styles['password-title']}>博客后台管理系统</div>
        </Header>

        <Content>
          <div className={styles['step-wrap']}>
            <Steps current={current} responsive onChange={changeStep}>
              <Step title="邮箱" description="请填写账号绑定的邮箱" />
              <Step title="验证码" description="请填写收到的验证码" />
              <Step title="新密码" description="请输入并确定新密码" />
            </Steps>
          </div>
          
          <div className={styles['password-form']}>
            {current === 0 ? emailForm : (current === 1 ? codeForm: passForm)}
          </div>
        </Content>

        <Footer><MyFooter /></Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // 因为使用了immutable管理了store数据 需要使用get获取数据 使用set设置数据
    current: state.get("user").get("current"),
    email: state.getIn(['user', 'email'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeStep(current) {
      dispatch(changeStepAction(current))
    },
    handleSendEmail(formData) {
      dispatch(sendUpdatePasswordEmail(formData))
    },
    handleVerifyCode(formData) {
      dispatch(verifyUpdatePasswordEmailCode(formData))
    },
    handleChangePassword(formData) {
      dispatch(changePassword(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
