import {PureComponent} from 'react'
import { Table,Space, Button } from 'antd';
import { connect } from 'react-redux';
import { getMaterialCategoryLists } from '../../store/actions/creatorMaterialCategoryActions';

class MaterialCategory extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '素材分类名',
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
    this.props.handleGetMaterialCategoryLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetMaterialCategoryLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetMaterialCategoryLists(params)
  }

  render() {
    const {MaterialCategoryLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: MaterialCategoryLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={MaterialCategoryLists.MaterialCategorys}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MaterialCategoryLists: state.get("materialCategory").get("materialCategoryLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetMaterialCategoryLists(params) {
      dispatch(getMaterialCategoryLists(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCategory)
