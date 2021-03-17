import React,{ PureComponent } from 'react';
import { Form, Input, Space, Button, Radio } from 'antd';
import { getUserInfoByIdAction, addUserAction, updateUserAction } from '../../store/actions/creatorUserActions';
import {connect} from 'react-redux'

class userOperate extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      id: "",
      isLook: false
    }
  }

  onFinish = (formData) => {
    const {id} = this.state
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

  componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.id) {
      const params = {id: location.state.id}
      params.setFormData = () => {
        const {name, nick_name: nickName, gender, password, email} = this.props.userInfo
        this.formRef.current.setFieldsValue({
          name,
          email,
          nickName,
          password,
          password2: password,
          gender
        });
      }
      this.props.handleGetUserInfoById(params)
      this.setState({id: location.state.id})
    }
    if(location.state && location.state.isLook) {
      this.setState({
        isLook: location.state.isLook
      })
    }
  }

  layout = {
    labelCol: {
      xxl: {span: 8},
      lg: {span: 6},
      sm: {span: 4},
    },
    wrapperCol: {
      xxl: {span: 8},
      lg: {span: 12},
      sm: {span: 20},
    },
  };

  tailLayout = {
    wrapperCol: {
      xxl: {offset: 8},
      lg: {offset: 6},
      sm: {offset: 4},
    },
  };

  render() {
    const {isLook} = this.state
    // const {userInfo, location} = this.props
    // console.log(userInfo);
    // let initValue = {gender: "male"}
    // if(userInfo && location.state && location.state.id) {
    //   const {name, nick_name: nickName, gender, password, email} = userInfo
    //   initValue = {
    //     name,
    //     nickName,
    //     gender,
    //     password,
    //     password2: password,
    //     email
    //   }
    // }
    // console.log(initValue);
    return (
      <Form
        {...this.layout}
        ref={this.formRef}
        initialValues={{gender: "male"}}
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
          <Input disabled={isLook} placeholder="请输入不超过十个字符的账号"/>
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[
            { required: true, message: '请输入昵称'},
            { whitespace: true, message: '请输入正确的昵称' },
            { type: "string", max: 10 , message: '请输入正确的昵称(不超过10个字符)' }
          ]}
        >
          <Input disabled={isLook} placeholder="请输入不超过十个字符的昵称"/>
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
                  callback(new Error("两次密码不一致"))
                } else {
                  callback()
                }
              }
            })
          ]}
        >
          {
            isLook ? <Input placeholder="请输入密码" disabled={isLook}/>
            :
            <Input.Password disabled={isLook} placeholder="请输入密码"/>
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
                  callback(new Error("两次密码不一致"))
                } else {
                  callback()
                }
              }
            })
          ]}
        >
          {
            isLook ? <Input placeholder="请输入确认密码" disabled={isLook}/>
            :
            <Input.Password disabled={isLook} placeholder="请输入确认密码"/>
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
          label="性别"
          name="gender"
        >
          <Radio.Group disabled={isLook}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...this.tailLayout}>
          <Space size="middle">
            <Button onClick={this.goBack}>取消</Button>
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
