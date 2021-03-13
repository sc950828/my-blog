import {PureComponent} from 'react'
import { Table,Space, Button } from 'antd';
import { connect } from 'react-redux';
import { getMaterialLists } from '../../store/actions/creatorMaterialActions';

class Material extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '素材链接',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Space size="middle">
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
    this.props.handleGetMaterialLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetMaterialLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetMaterialLists(params)
  }

  render() {
    const {MaterialLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: MaterialLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={MaterialLists.Materials}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MaterialLists: state.get("material").get("materialLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetMaterialLists(params) {
      dispatch(getMaterialLists(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Material)
