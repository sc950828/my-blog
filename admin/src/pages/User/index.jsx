import {PureComponent} from 'react'
import { Table,Space, Button } from 'antd';
import { connect } from 'react-redux';
import { getUserLists } from '../../store/actions/creatorUserActions';

class User extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        render: text => text === "male" ? "男" : "女"
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" size="small">查看</Button>
            <Button type="danger" size="small">删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10
    }
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
