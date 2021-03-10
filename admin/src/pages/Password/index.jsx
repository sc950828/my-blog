import {connect} from 'react-redux'
import { Steps, Form, Input, Button, } from 'antd';
import { MailOutlined, CodepenOutlined , LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import {PasswordWrapper, Title, StepWrap, FormWrap} from './style'
import {changeStepAction, sendEmail} from '../../sotre/actions/creatorUserActions'
const { Step } = Steps;

const Password = (props) => {
  const { handleChangeStep, current, handleSendEmailCode } = props
  const onFinish1 = (formData) => {
    handleSendEmailCode(formData)
  }
  const onFinish2 = () => {
    
  }
  const onFinish3 = () => {
    
  }

  const emailForm = (
    <Form
      name="normal_login"
      initialValues={{ email: "" }}
      onFinish={onFinish1}
      size="large"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: '请输入邮箱' }]}
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
      onFinish={onFinish2}
      size="large"
    >
      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input prefix={<CodepenOutlined />} placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>确定</Button>
      </Form.Item>
    </Form>
  )

  const passForm = (
    <Form
      name="normal_login"
      onFinish={onFinish3}
      size="large"
    >
      <Form.Item
        name="password1"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="请输入密码"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item
        name="password2"
        rules={[{ required: true, message: '请输入确认密码' }]}
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
    <PasswordWrapper>
      <Title>博客后台管理系统</Title>
      <StepWrap>
        <Steps current={current} responsive onChange={handleChangeStep}>
          <Step title="邮箱" description="请填写账号绑定的邮箱" />
          <Step title="验证码" description="请填写收到的验证码" />
          <Step title="新密码" description="请输入并确定新密码" />
        </Steps>
      </StepWrap>
      
      <FormWrap>
        {current === 0 ? emailForm : (current === 1 ? codeForm: passForm)}
      </FormWrap>
    </PasswordWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    // 因为使用了immutable管理了store数据 需要使用get获取数据 使用set设置数据
    current: state.get("user").get("current")
    // current: state.getIn(['user', 'current'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeStep(current) {
      dispatch(changeStepAction(current))
    },
    handleSendEmailCode(formData) {
      dispatch(sendEmail(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
