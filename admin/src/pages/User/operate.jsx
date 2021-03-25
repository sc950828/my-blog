import React,{ PureComponent } from 'react';
import { Form, Input, Space, Button, Radio, Switch } from 'antd';
import { getUserInfoByIdAction, addUserAction, updateUserAction } from '../../store/actions/creatorUserActions';
import {connect} from 'react-redux'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class userOperate extends PureComponent {
  formRef = React.createRef();
  mdEditor = null

  constructor(props) {
    super(props)
    this.state = {
      id: "",
      isLook: false
    }
  }

  onFinish = (formData) => {
    const {id} = this.state
    const mdValue = this.getMdValue()
    const htmlValue = this.getHtmlValue()
    formData.introduction = {mdValue, htmlValue}
    formData.goUserList = () => {
      this.props.history.push("/user")
    }
    if(id) {
      formData.id = id
      this.props.handleUpdateUser(formData)
    } else {
      this.props.handleAddUser(formData)
    }
  };

  goBack = () => {
    this.props.history.push("/user")
  }

  getMdValue = () => {
    if (this.mdEditor) {
      return this.mdEditor.getMdValue()
    }

    return ""
  };

  getHtmlValue = () => {
    if (this.mdEditor) {
      return this.mdEditor.getHtmlValue()
    }

    return ""
  };

  componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.id) {
      this.mdEditor.setView({menu: true, html: false, md: true})
      const params = {id: location.state.id}
      params.setFormData = () => {
        const {name, nick_name: nickName, wechat, qq, job, gender, phone, password, email, status, avatar_url: avatar, introduction} = this.props.userInfo
        this.formRef.current.setFieldsValue({
          name,
          email,
          nickName,
          password,
          password2: password,
          gender,
          status,
          avatar,
          phone,
          wechat,
          qq,
          job,
          introduction
        });
        this.mdEditor.setText(introduction.mdValue)
      }
      this.props.handleGetUserInfoById(params)
      this.setState({id: location.state.id})
    }
    if(location.state && location.state.isLook) {
      this.mdEditor.setView({menu: false, md: false, html: true})
      this.setState({
        isLook: location.state.isLook
      })
    }
  }

  layout = {
    labelCol: {
      xxl: {span: 7},
      xl: {span: 5},
      sm: {span: 4},
    },
    wrapperCol: {
      xxl: {span: 10},
      xl: {span: 14},
      sm: {span: 20},
    },
  };

  tailLayout = {
    wrapperCol: {
      xxl: {offset: 7},
      lg: {offset: 5},
      sm: {offset: 4},
    },
  };

  render() {
    const {isLook} = this.state
    return (
      <Form
        {...this.layout}
        ref={this.formRef}
        initialValues={{gender: "male", status: true}}
        onFinish={this.onFinish}
      >
        <Form.Item
          label="账号"
          name="name"
          rules={[
            { required: true, message: '请输入账号'},
            { whitespace: true, message: '请输入正确的账号' },
            { type: "string", max: 10 , message: '请输入正确的账号(不超过10个字符)' }
          ]}
        >
          <Input disabled={isLook} placeholder="请输入账号，不超过10个字符"/>
        </Form.Item>

        <Form.Item
          label="姓名"
          name="nickName"
          rules={[
            { required: true, message: '请输入姓名'},
            { whitespace: true, message: '请输入正确的姓名' },
            { type: "string", max: 4 , message: '请输入正确的姓名(不超过4个字符)' }
          ]}
        >
          <Input disabled={isLook} placeholder="请输入姓名，不超过4个字符"/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {required: true,message: '请输入密码'},
            { type: "string", min: 6 , message: '请输入正确的密码(大于6个字符)'},
            ({getFieldValue}) => ({
              validator(rule, value, callback){
                const password2 = getFieldValue("password2")
                if(password2 && value !== password2) {
                  return Promise.reject("两次输入的密码不一致");
                } else {
                  return Promise.resolve();
                }
              }
            })
          ]}
        >
          {
            isLook ? <Input placeholder="请输入密码，大于6个字符" disabled={isLook}/>
            :
            <Input.Password disabled={isLook} placeholder="请输入密码，大于6个字符"/>
          }
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="password2"
          rules={[
            {required: true,message: '请输入确认密码'},
            { type: "string", min: 6 , message: '请输入正确的确认密码(大于6个字符)' },
            ({getFieldValue}) => ({
              validator(rule, value, callback){
                const password1 = getFieldValue("password")
                if(password1 && value !== password1) {
                  return Promise.reject("两次输入的密码不一致");
                } else {
                  return Promise.resolve();
                }
              }
            })
          ]}
        >
          {
            isLook ? <Input placeholder="请输入确认密码，大于6个字符" disabled={isLook}/>
            :
            <Input.Password disabled={isLook} placeholder="请输入确认密码，大于6个字符"/>
          }
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {required: true,message: '请输入邮箱'},
            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱' }
          ]}
        >
          <Input disabled={isLook} placeholder="请输入邮箱"/>
        </Form.Item>

        <Form.Item
          label="微信"
          name="wechat"
          rules={[
            {required: true,message: '请输入微信'},
            { type: "string", max: 20 , message: '请输入正确的微信号(不大于20个字符)' },
          ]}
        >
          <Input disabled={isLook} placeholder="请输入微信"/>
        </Form.Item>

        <Form.Item
          label="QQ"
          name="qq"
          rules={[
            {required: true,message: '请输入QQ'},
            { type: "string", max: 15 , message: '请输入正确的QQ号(不大于15个字符)' },
          ]}
        >
          <Input disabled={isLook} placeholder="请输入QQ"/>
        </Form.Item>

        <Form.Item
          label="职业"
          name="job"
          rules={[
            {required: true,message: '请输入职业'},
            { type: "string", max: 20 , message: '请输入正确的职业(不大于20个字符)' },
          ]}
        >
          <Input disabled={isLook} placeholder="请输入您的职业"/>
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          required
        >
          <Radio.Group disabled={isLook}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="状态"
          name="status"
          required
          valuePropName="checked"
        >
          <Switch checkedChildren="已启用" unCheckedChildren="已禁用" disabled={isLook}/>
        </Form.Item>
        <Form.Item
          label="头像链接"
          name="avatar"
        >
          <Input disabled={isLook} placeholder="请输入头像链接"/>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号' }
          ]}
        >
          <Input disabled={isLook} placeholder="请输入手机号"/>
        </Form.Item>
        <Form.Item 
          label="个人介绍"
        >
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            config={{view: {html: false}}}
          />
        </Form.Item>

        <Form.Item {...this.tailLayout}>
          <Space size="middle">
            <Button onClick={this.goBack}>{!isLook ? '取消' : '返回'}</Button>
            {!isLook && <Button type="primary" htmlType="submit">提交</Button>}
          </Space>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.get("user").get("currentUserInfo")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddUser(data) {
      dispatch(addUserAction(data))
    },
    handleUpdateUser(data) {
      dispatch(updateUserAction(data))
    },
    handleGetUserInfoById(data) {
      dispatch(getUserInfoByIdAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(userOperate)
