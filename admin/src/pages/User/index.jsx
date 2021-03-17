import {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getUserLists, deleteUserAction } from '../../store/actions/creatorUserActions';
import {HeadWrap} from './style'

const {confirm} = Modal
class User extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '账号',
        dataIndex: 'name',
      },
      {
        title: '昵称',
        dataIndex: 'nick_name',
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        render: text => text === "male" ? "男" : "女"
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: (text) => {
          return new Date(text).toLocaleString()
        }
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        render: (text) => {
          return new Date(text).toLocaleString()
        }
      },
      {
        title: '操作',
        width: 210,
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" size="small" onClick={() => this.lookUser(record)}>查看</Button>
            <Button type="primary" size="small" onClick={() => this.editUser(record)}>编辑</Button>
            <Button type="danger" size="small" onClick={() => this.deleteUser(record)}>删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10,
      isModalVisible: false,
      title: ""
    }
  }

  addUser = () => {
    this.props.history.push("/useroperate/add")
  }

  lookUser = (record) => {
    this.props.history.push({
      pathname: "/useroperate/look",
      state: {id: record._id, isLook: true}
    })
  }

  editUser = (record) => {
    this.props.history.push({
      pathname: "/useroperate/edit",
      state: {id: record._id}
    })
  }

  deleteUser = (record) => {
    const {handleDeleteUser} = this.props
    confirm({
      title: '删除用户',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该用户吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteUser(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount() {
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize
    }
    this.props.handleGetUserLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetUserLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetUserLists(params)
  }

  render() {
    const {userLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addUser}>添加用户</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: userLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={userLists.users}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLists: state.get("user").get("userLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetUserLists(params) {
      dispatch(getUserLists(params))
    },
    handleDeleteUser(id) {
      dispatch(deleteUserAction(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
