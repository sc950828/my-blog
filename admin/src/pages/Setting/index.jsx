import React,{PureComponent} from 'react'
import { Table,Space, Button, Row, Col, Modal, Form, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getSettingLists, addSettingAction, updateSettingAction, deleteSettingAction } from '../../store/actions/creatorSettingActions';
import HeadWrap from "../../components/HeadWrap"

const {confirm} = Modal

class Setting extends PureComponent {
  formRef = React.createRef();
  columns = [
    {
      title: '键',
      ellipsis: true,
      dataIndex: 'key'
    },
    {
      title: '值',
      ellipsis: true,
      dataIndex: 'value'
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
      dataIndex: 'updatedAt',
      width: 180,
      render: (text) => {
        return new Date(text).toLocaleString()
      }
    },
    {
      title: '操作',
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" size="small" onClick={() => {this.editSetting(record)}}>编辑</Button>
          <Button type="danger" size="small" onClick={() => {this.deleteSetting(record)}}>删除</Button>
        </Space>
      ),
    }
  ];
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 10,
      isAdd: true,
      id: ""
    }
  }

  showModal = (isAdd=true, id="") => {
    this.setState({
      isModalVisible: true,
      isAdd,
      id,
      pageSize: 10,
      pageNo: 1,
      searchKey: ""
    })
  };

  
  addSetting = async () => {
    await this.showModal()
    this.formRef.current.resetFields();
  }

  editSetting = async (record) => {
    const {key, value, _id} = record
    await this.showModal(false, _id)
    this.formRef.current.setFieldsValue({
      key,
      value
    });
  }

  deleteSetting = (record) => {
    const {handleDeleteSetting} = this.props
    confirm({
      title: '删除设置',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该设置吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteSetting(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

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
      pageSize: this.state.pageSize,
      searchKey: this.state.searchKey
    }
    this.props.handleGetSettingLists(params)
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
    this.props.handleGetSettingLists(params)
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
    this.props.handleGetSettingLists(params)
  }

  onFinish = (formData) => {
    if(this.state.isAdd) {
      this.props.handleAddSetting(formData)
    } else {
      formData.id = this.state.id
      this.props.handleUpdateSetting(formData)
    }
    this.setState({
      isModalVisible: false
    })
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
    this.props.handleGetSettingLists(params)
  }

  render() {
    const {settingLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 12}}>
              <Input.Search placeholder="请输入键" onSearch={this.onSearch} allowClear enterButton style={{ maxWidth: 240 }}/>
            </Col>
            <Col xs={{span: 24}} sm={{span: 24}} xl={{span: 12}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addSetting}>添加设置</Button>
            </Col>
          </Row>
        </HeadWrap>

        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: settingLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={settingLists.settings}
        />

        <Modal
          okText="确定"
          cancelText="取消"
          title={this.state.isAdd ? '添加素材文件夹' : '编辑素材文件夹'}
          visible={this.state.isModalVisible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="键名"
                name="key"
                rules={[
                  { required: true, message: '请输入键名' },
                  { whitespace: true, message: '请输入正确的键名' }
                ]}
              >
                <Input disabled={!this.state.isAdd} placeholder="请输入键名"/>
              </Form.Item>
              <Form.Item
                label="键值"
                name="value"
                rules={[
                  { required: true, message: '请输入键值' },
                  { whitespace: true, message: '请输入正确的键值' }
                ]}
              >
                <Input placeholder="请输入键值"/>
              </Form.Item>
          </Form>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settingLists: state.get("setting").get("settingLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetSettingLists(params) {
      dispatch(getSettingLists(params))
    },
    handleAddSetting(params) {
      dispatch(addSettingAction(params))
    },
    handleUpdateSetting(params) {
      dispatch(updateSettingAction(params))
    },
    handleDeleteSetting(params) {
      dispatch(deleteSettingAction(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
