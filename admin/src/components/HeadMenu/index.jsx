import { useState, useRef  } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Avatar, Menu, Modal, Input, Form } from "antd"
import { DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { changePasswordByOldPwdAction, logout } from "../../store/actions/creatorUserActions";
import styles from './headMenu.module.scss'

const {confirm} = Modal

const HeadMenu = (props) => {
  const {handleLogout, history, userInfo} = props
  const [showPwdModal, setPwdModal] = useState(false);
  const formRef =useRef() ;

  const clickLogout = () => {
    confirm({
      title: '退出',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出系统吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleLogout({goLogin: () => {history.push("/login")}})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const updatePwd = () => {
    setPwdModal(true)
  }

  const clickMenu = ({key}) => {
    switch(key) {
      case 'info':
        break;
      case 'password':
        updatePwd()
        break;
      case 'logout':
        clickLogout()
        break;
      default:
    }
  }

  const menu = (
    <Menu onClick={clickMenu}>
      <Menu.Item key="info">个人信息</Menu.Item>
      <Menu.Item key="password">修改密码</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  const handleOk = () => {
    formRef.current.submit()
  }

  const handleCancel = () => {
    setPwdModal(false)
  }

  const onFinish = (formData) => {
    formData.id = userInfo._id
    formData.goLogin = () => {
      history.push("/login")
    }
    props.handleUpdatePwd(formData)
    setPwdModal(false)
  }

  return (
    <>
      <Dropdown overlay={menu} className={styles.dropdown} trigger={['click']}>
        <div>
          <Avatar src={userInfo && userInfo.avatar_url}></Avatar>
          <Button type="link" className={styles.btn}>
            <span className={styles.name}>{userInfo && userInfo.nick_name}</span>
            <DownOutlined />
          </Button>
        </div>
      </Dropdown>
      <Modal
        okText="确定"
        cancelText="取消"
        title="修改密码"
        visible={showPwdModal}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}>
          <Form
            ref={formRef}
            onFinish={onFinish}
            labelCol={{span: 5}}
          >
            <Form.Item
              label="原密码"
              name="oldPassword"
              rules={[
                { required: true, message: '请输入原密码' },
                { whitespace: true, message: '请输入正确的原密码' },
                { type: "string", min: 6 , message: '请输入正确的原密码(大于6个字符)'},
              ]}
            >
              <Input.Password placeholder="请输入原始密码"/>
            </Form.Item>
            <Form.Item
              label="新密码"
              name="password"
              rules={[
                {required: true,message: '请输入密码'},
                { type: "string", min: 6 , message: '请输入正确的新密码(大于6个字符)'},
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
              <Input.Password placeholder="请输入原始密码"/>
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
              <Input.Password placeholder="请输入原始密码"/>
            </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.getIn(["user", "userInfo"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout(params) {
      dispatch(logout(params))
    },
    handleUpdatePwd(params) {
      dispatch(changePasswordByOldPwdAction(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeadMenu))
