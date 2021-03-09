import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './login.module.scss';

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['login-title']}>博客后台管理系统</div>
      <Form
        name="normal_login"
        className={styles['login-form']}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入密码"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className={styles['login-remember']}>记住我</Checkbox>
          </Form.Item>
          <Form.Item noStyle>
            <a className={styles['login-forget']} href="/forget">
              忘记密码
            </a>
          </Form.Item>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" block> 登 录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
