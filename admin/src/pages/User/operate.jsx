import { Form, Input, Space, Cascader, Button, Radio, DatePicker } from 'antd';
import cityLists from '../../utils/city'

const userOperate = (props) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 4
    },
  };

  return (
    <Form
      {...layout}
      initialValues={{
        gender: "male",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="账号"
        name="name"
        rules={[
          { required: true, message: '请输入账号'}
        ]}
      >
        <Input placeholder="请输入账号"/>
      </Form.Item>

      <Form.Item
        label="昵称"
        name="nickName"
        rules={[
          { required: true, message: '请输入昵'}
        ]}
      >
        <Input placeholder="请输入昵称"/>
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {required: true,message: '请输入密码'}
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="password2"
        rules={[
          {required: true,message: '请输入确认密码'}
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {required: true,message: '请输入邮箱'}
        ]}
      >
        <Input placeholder="请输入邮箱"/>
      </Form.Item>

      <Form.Item
        label="手机"
        name="phone"
      >
        <Input placeholder="请输入手机"/>
      </Form.Item>

      <Form.Item
        label="生日"
        name="birthday"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="户籍所在地"
        name="originLocations"
      >
        <Cascader options={cityLists} placeholder="请选择户籍所在地" />
      </Form.Item>

      
      <Form.Item
        label="目前所在地"
        name="locations"
      >
        <Cascader options={cityLists} placeholder="请选择目前所在地" />
      </Form.Item>
      
      <Form.Item
        label="性别"
        name="gender"
      >
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space size="middle">
          <Button>取消</Button>
          <Button type="primary" htmlType="submit">提交</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default userOperate
