import { Form, Input, Button, Checkbox } from 'antd';
import {PureComponent} from 'react'
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import styles from './login.module.scss';
import {login} from '../../sotre/actions/creatorUserActions'

class Login extends PureComponent {
  render() {
    const {handleLogin, history} = this.props

    const goPassword = () => {
      history.push("/password")
    }

    return (
      <div className={styles['login-wrapper']}>
        <div className={styles['login-title']}>博客后台管理系统</div>
        <Form
          name="normal_login"
          className={styles['login-form']}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className={styles['login-remember']}>记住我</Checkbox>
            </Form.Item>
            <Form.Item noStyle>
              <span className={styles['login-forget']} onClick={goPassword}>
                忘记密码
              </span>
            </Form.Item>
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" block> 登 录</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // 因为使用了immutable管理了store数据 需要使用get获取数据 使用set设置数据
    userInfo: state.get("user").get("userInfo")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleLogin(formData){
      formData.goHome = () => {
        ownProps.history.push("/")
      }
      dispatch(login(formData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
