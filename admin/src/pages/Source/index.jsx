import React, {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Image, Select, Modal, Switch} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getSourceLists, deleteSource, updateSourceAction, changeSourceStatusAction } from '../../store/actions/creatorSourceActions';
import {getAllSourceCategoryLists} from '../../store/actions/creatorSourceCategoryActions'
import HeadWrap from "../../components/HeadWrap"
import {copyLink} from '../../utils/help'

const {confirm} = Modal
const { Option } = Select;
class Source extends PureComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '学习资源名',
        dataIndex: 'title'
      },
      {
        title: '资源logo',
        dataIndex: 'logo',
        render: (logo) => {
          return <Image width={120} src={logo} placeholder={true}/>
        }
      },
      {
        title: '资源链接 (点击复制)',
        dataIndex: 'link',
        ellipsis: true,
        render: (text) => {
          return <span onClick={copyLink}>{text}</span>
        }
      },
      {
        title: '所属分类',
        dataIndex: 'source_category',
        ellipsis: true,
        render: (text) => {
          return text.name
        }
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
        width: 220,
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => {this.lookSource(record)}} size="small">查看</Button>
            <Button type="primary" onClick={() => {this.editSource(record)}} size="small">编辑</Button>
            <Button type="danger" onClick={() => {this.deleteSource(record)}} size="small">删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10,
      id: "",
      sourceCategory: "",
    }
  }

  deleteSource = (record) => {
    const {handleDeleteSource} = this.props
    const{pageNo, pageSize, sourceCategory} = this.state
    confirm({
      title: '删除学习资源',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该学习资源吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        const params = {
          pageNo,
          pageSize,
          sourceCategory
        }
        handleDeleteSource({id: record._id, params})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  selectChange = async (value) => {
    await this.setState({
      sourceCategory: value
    })
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      sourceCategory: this.state.sourceCategory
    }
    this.props.handleGetSourceLists(params)
  }

  async componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.sourceCategory) {
      await this.setState({
        sourceCategory: location.state.sourceCategory
      })
    }
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      sourceCategory: this.state.sourceCategory
    }
    this.props.handleGetAllSourceCategoryLists()
    this.props.handleGetSourceLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize,
      sourceCategory: this.state.sourceCategory
    }
    this.props.handleGetSourceLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size,
      sourceCategory: this.state.sourceCategory
    }
    this.props.handleGetSourceLists(params)
  }

  addSource = async () => {
    this.props.history.push("/sourceOperate/add")
  }

  lookSource = (record) => {
    this.props.history.push({
      pathname: "/sourceOperate/look",
      state: {id: record._id, isLook: true}
    })
  }

  editSource = (record) => {
    this.props.history.push({
      pathname: "/sourceOperate/edit",
      state: {id: record._id}
    })
  }

  onPublishChange = (record, value) => {
    this.props.handleChangeStatus({id: record._id, status: value})
  }

  onFinish = (formData) => {
    const{id, pageNo, pageSize, sourceCategory} = this.state
    const params = {
      pageNo,
      pageSize,
      sourceCategory
    }
    formData.params = params
    formData.id = id

    this.props.handleUpdateSource(formData)
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    const {allSourceCategoryLists, sourceLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
              <Select
                style={{ width: 240 }}
                placeholder="请选择学习资源文件夹"
                value={this.state.sourceCategory}
                onChange={this.selectChange}
              >
                <Option value="">全部</Option>
                {
                  allSourceCategoryLists.sourceCategorys && allSourceCategoryLists.sourceCategorys.map((item) => {
                    return (
                      <Option key={item._id} value={item._id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addSource}>添加学习资源</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: sourceLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={sourceLists.sources}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allSourceCategoryLists: state.get("sourceCategory").get("allSourceCategoryLists"),
    sourceLists: state.get("source").get("sourceLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllSourceCategoryLists() {
      dispatch(getAllSourceCategoryLists())
    },
    handleGetSourceLists(params) {
      dispatch(getSourceLists(params))
    },
    handleDeleteSource(params) {
      dispatch(deleteSource(params))
    },
    handleUpdateSource(params) {
      dispatch(updateSourceAction(params))
    },
    handleChangeStatus(data) {
      dispatch(changeSourceStatusAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Source)
