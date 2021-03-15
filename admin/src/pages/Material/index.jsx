import {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Image, Select, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getMaterialLists, deleteMaterial } from '../../store/actions/creatorMaterialActions';
import {getAllMaterialCategoryLists} from '../../store/actions/creatorMaterialCategoryActions'
import {HeadWrap} from './style'

const {confirm} = Modal
const { Option } = Select;
class Material extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '素材',
        dataIndex: 'link',
        render: (link) => {
          return <Image width={120} src={link} placeholder={true}/>
        }
      },
      {
        title: '素材链接',
        dataIndex: 'link'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt'
      },
      {
        title: '操作',
        width: 100,
        render: (text, record) => (
          <Space size="middle">
            <Button type="danger" onClick={() => {this.deleteMaterial(record)}} size="small">删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10,
      materialCategory: ""
    }
  }

  deleteMaterial = (record) => {
    const {handleDeleteMaterial} = this.props
    const{pageNo, pageSize, materialCategory} = this.state
    confirm({
      title: '删除素材',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该素材吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        const params = {
          pageNo,
          pageSize,
          materialCategory
        }
        handleDeleteMaterial({id: record._id, params})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  selectChange = async (value) => {
    await this.setState({
      materialCategory: value
    })
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      materialCategory: this.state.materialCategory
    }
    this.props.handleGetMaterialLists(params)
  }

  async componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.materialCategory) {
      await this.setState({
        materialCategory: location.state.materialCategory
      })
    }
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      materialCategory: this.state.materialCategory
    }
    this.props.handleGetAllMaterialCategoryLists()
    this.props.handleGetMaterialLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize,
      materialCategory: this.state.materialCategory
    }
    this.props.handleGetMaterialLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size,
      materialCategory: this.state.materialCategory
    }
    this.props.handleGetMaterialLists(params)
  }

  addMaterial = async () => {
    this.props.history.push("/materialoperate")
  }

  render() {
    const {allMaterialCategoryLists, materialLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
              <Select
                style={{ width: 200 }}
                placeholder="请选择素材文件夹"
                value={this.state.materialCategory}
                onChange={this.selectChange}
              >
                <Option value="">全部</Option>
                {
                  allMaterialCategoryLists.materialCategorys && allMaterialCategoryLists.materialCategorys.map((item) => {
                    return (
                      <Option key={item._id} value={item._id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addMaterial}>添加素材</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: materialLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={materialLists.materials}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allMaterialCategoryLists: state.get("materialCategory").get("allMaterialCategoryLists"),
    materialLists: state.get("material").get("materialLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllMaterialCategoryLists() {
      dispatch(getAllMaterialCategoryLists())
    },
    handleGetMaterialLists(params) {
      dispatch(getMaterialLists(params))
    },
    handleDeleteMaterial(params) {
      dispatch(deleteMaterial(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Material)
