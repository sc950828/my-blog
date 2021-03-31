import React, {PureComponent} from 'react'
import { Table,Space, Button, Modal, Row, Col, Form, Input, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getSourceCategoryLists, addSourceCategoryAction, updateSourceCategoryAction, deleteSourceCategoryAction, changeSourceCategoryStatusAction } from '../../store/actions/creatorSourceCategoryActions';
import { changePathAction} from '../../store/actions/creatorMenuActions';
import HeadWrap from "../../components/HeadWrap"

const {confirm} = Modal

class SourceCategory extends PureComponent {
  formRef = React.createRef();
  columns = [
    {
      title: '学习资源分类名',
      ellipsis: true,
      dataIndex: 'name'
    },
    {
      title: '资源个数',
      width: 100,
      dataIndex: 'count'
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'is_publish',
      render: (text, record) => (
        <Switch onChange={(value)=> {this.onPublishChange(record, value)}} checked={text} checkedChildren="已发布" unCheckedChildren="未发布" />
      ),
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
        <Button type="primary" size="small" onClick={() => this.lookSourceCategory(record)}>查看资源</Button>
        <Button type="primary" size="small" onClick={() => this.editSourceCategory(record)}>编辑</Button>
        <Button type="danger" size="small" onClick={() => this.deleteSourceCategory(record)}>删除</Button>
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

  addSourceCategory = async () => {
    await this.showModal()
    this.formRef.current.resetFields();
  }

  lookSourceCategory = (record) => {
    this.props.handleChangeMenuPath("/sourceCategory")
    this.props.history.push({pathname: "/source", state: {sourceCategory: record._id}})
  }

  editSourceCategory = async (record) => {
    await this.showModal(false, record._id)
    this.formRef.current.setFieldsValue({
      name: record.name,
      isPublish: record.is_publish
    });
  }

  deleteSourceCategory = (record) => {
    const {handleDeleteSourceCategory} = this.props
    confirm({
      title: '删除素材文件夹',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该素材文件夹吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteSourceCategory(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  onPublishChange = (record, value) => {
    this.props.handleChangeStatus({id: record._id, status: value})
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
    this.props.handleGetSourceCategoryLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetSourceCategoryLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetSourceCategoryLists(params)
  }

  onFinish = (formData) => {
    if(this.state.isAdd) {
      this.props.handleAddSourceCategory(formData)
    } else {
      formData.id = this.state.id
      this.props.handleUpdateSourceCategory(formData)
    }
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    const {sourceCategoryLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addSourceCategory}>添加学习资源分类</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: sourceCategoryLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={sourceCategoryLists.sourceCategorys}
        />

        <Modal
          okText="确定"
          cancelText="取消"
          title={this.state.isAdd ? '添加学习资源分类' : '编辑学习资源分类'}
          visible={this.state.isModalVisible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={{isPublish: false}}
            >
              <Form.Item
                label="学习资源分类名"
                name="name"
                rules={[
                  { required: true, message: '请输入学习资源分类名' },
                  { whitespace: true, message: '请输入正确的学习资源分类名' },
                  { type: "string", max: 10 , message: '请输入正确的学习资源分类名(不超过10个字符)' }
                ]}
              >
                <Input placeholder="请输入学习资源分类名，不超过10个字符"/>
              </Form.Item>
              <Form.Item
                label="是否发布"
                name="isPublish"
                valuePropName="checked"
                required
              >
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
          </Form>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sourceCategoryLists: state.get("sourceCategory").get("sourceCategoryLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetSourceCategoryLists(params) {
      dispatch(getSourceCategoryLists(params))
    },
    handleAddSourceCategory(params) {
      dispatch(addSourceCategoryAction(params))
    },
    handleUpdateSourceCategory(params) {
      dispatch(updateSourceCategoryAction(params))
    },
    handleDeleteSourceCategory(params) {
      dispatch(deleteSourceCategoryAction(params))
    },
    handleChangeMenuPath(params) {
      dispatch(changePathAction(params))
    },
    handleChangeStatus(data) {
      dispatch(changeSourceCategoryStatusAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCategory)
