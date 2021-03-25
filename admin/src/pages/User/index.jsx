import {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Modal, Input, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getUserLists, deleteUserAction, changeUserStatusAction } from '../../store/actions/creatorUserActions';
import HeadWrap from "../../components/HeadWrap"

const {confirm} = Modal
class User extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '账号',
        ellipsis: true,
        dataIndex: 'name',
      },
      {
        title: '姓名',
        ellipsis: true,
        dataIndex: 'nick_name',
      },
      {
        title: '邮箱',
        ellipsis: true,
        dataIndex: 'email'
      },
      {
        title: '性别',
        width: 100,
        dataIndex: 'gender',
        render: text => text === "male" ? "男" : "女"
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (text, record) => (
          <Switch onChange={(value)=> {this.onStatusChange(record, value)}} checked={text} checkedChildren="已启用" unCheckedChildren="已禁用" />
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 180,
        render: (text) => {
          return new Date(text).toLocaleString()
        }
      },
      {
        title: '修改时间',
        width: 180,
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
      searchKey: ""
    }
  }

  onStatusChange = (record, value) => {
    this.props.handleChangeStatus({id: record._id, status: value})
  }

  addUser = () => {
    this.props.history.push("/userOperate/add")
  }

  lookUser = (record) => {
    this.props.history.push({
      pathname: "/userOperate/look",
      state: {id: record._id, isLook: true}
    })
  }

  editUser = (record) => {
    this.props.history.push({
      pathname: "/userOperate/edit",
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
      pageSize: this.state.pageSize,
      searchKey: this.state.searchKey
    }
    this.props.handleGetUserLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize,
      searchKey: this.state.searchKey
    }
    this.props.handleGetUserLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size,
      searchKey: this.state.searchKey
    }
    this.props.handleGetUserLists(params)
  }

  onSearch = (value) => {
    const {pageNo, pageSize} = this.state
    this.setState({
      searchKey: value
    })
    const params = {
      pageNo: pageNo,
      pageSize: pageSize,
      searchKey: value
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
            <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 12}}>
              <Input.Search placeholder="请输入账号姓名或邮箱" onSearch={this.onSearch} allowClear enterButton style={{ maxWidth: 240 }}/>
            </Col>
            <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 12}}>
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
    },
    handleChangeStatus(data) {
      dispatch(changeUserStatusAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
