import React, {PureComponent} from 'react'
import { Table,Space, Button, Modal, Row, Col, Form, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getMaterialCategoryLists, addMaterialCategoryAction, updateMaterialCategoryAction, deleteMaterialCategoryAction } from '../../store/actions/creatorMaterialCategoryActions';
import { changePathAction} from '../../store/actions/creatorMenuActions';
import HeadWrap from "../../components/HeadWrap"

const {confirm} = Modal

class MaterialCategory extends PureComponent {
  formRef = React.createRef();
  columns = [
    {
      title: '素材文件夹名',
      ellipsis: true,
      dataIndex: 'name'
    },
    {
      title: '素材个数',
      width: 100,
      dataIndex: 'count'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },{
      title: '修改时间',
      dataIndex: 'updatedAt',
      width: 180,
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '操作',
      width: 240,
      render: (text, record) => (
        <Space size="middle">
        <Button type="primary" size="small" onClick={() => this.lookMaterialCategory(record)}>查看素材</Button>
        <Button type="primary" size="small" onClick={() => this.editMaterialCategory(record)}>编辑</Button>
        <Button type="danger" size="small" onClick={() => this.deleteMaterialCategory(record)}>删除</Button>
        </Space>
      ),
    }
  ];

  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 10,
      isModalVisible: false,
      isAdd: true,
      id: ""
    }
  }

  addMaterialCategory = async () => {
    await this.showModal()
    this.formRef.current.resetFields();
  }

  lookMaterialCategory = (record) => {
    this.props.handleChangeMenuPath("/material")
    this.props.history.push({pathname: "/material", state: {materialCategory: record._id}})
  }

  editMaterialCategory = async (record) => {
    await this.showModal(false, record._id)
    this.formRef.current.setFieldsValue({
      name: record.name
    });
  }

  deleteMaterialCategory = (record) => {
    const {handleDeleteMaterialCategory} = this.props
    confirm({
      title: '删除素材文件夹',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该素材文件夹吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteMaterialCategory(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showModal = (isAdd=true, id="") => {
    this.setState({
      isModalVisible: true,
      isAdd,
      id
    })
  };

  handleOk = () => {
    this.formRef.current.submit()
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  };

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

  onFinish = (formData) => {
    if(this.state.isAdd) {
      this.props.handleAddMaterialCategory(formData)
    } else {
      formData.id = this.state.id
      this.props.handleUpdateMaterialCategory(formData)
    }
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    const {materialCategoryLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addMaterialCategory}>添加素材文件夹</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: materialCategoryLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={materialCategoryLists.materialCategorys}
        />

        <Modal
          okText="确定"
          cancelText="取消"
          title={this.state.isAdd ? '添加素材文件夹' : '编辑素材文件夹'}
          visible={this.state.isModalVisible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="素材文件夹名"
                name="name"
                rules={[
                  { required: true, message: '请输入素材文件夹名' },
                  { whitespace: true, message: '请输入正确的素材文件夹名' },
                  { type: "string", max: 10 , message: '请输入正确的素材文件夹名(不超过10个字符)' }
                ]}
              >
                <Input placeholder="请输入素材文件夹名，不超过10个字符"/>
              </Form.Item>
          </Form>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    materialCategoryLists: state.get("materialCategory").get("materialCategoryLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetMaterialCategoryLists(params) {
      dispatch(getMaterialCategoryLists(params))
    },
    handleAddMaterialCategory(params) {
      dispatch(addMaterialCategoryAction(params))
    },
    handleUpdateMaterialCategory(params) {
      dispatch(updateMaterialCategoryAction(params))
    },
    handleDeleteMaterialCategory(params) {
      dispatch(deleteMaterialCategoryAction(params))
    },
    handleChangeMenuPath(params) {
      dispatch(changePathAction(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialCategory)
