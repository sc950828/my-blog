import {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Modal, Image, Switch } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getArticleCategoryLists, deleteArticleCategoryAction, changeArticleCategoryStatusAction } from '../../store/actions/creatorArticleCategoryActions';
import HeadWrap from "../../components/HeadWrap"
import { changePathAction } from '../../store/actions/creatorMenuActions';

const {confirm} = Modal
class Category extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '标题',
        ellipsis: true,
        dataIndex: 'title'
      },
      {
        title: '封面图',
        dataIndex: 'banner',
        render: (link) => {
          return <Image width={120} src={link} placeholder={true}/>
        }
      },
      {
        title: '文章数',
        width: 100,
        dataIndex: 'count'
      },
      {
        title: '浏览量',
        width: 100,
        dataIndex: 'views'
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
        width: 180,
        dataIndex: 'createdAt',
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
        width: 300,
        render: (text, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => {this.lookArticle(record)}}size="small">查看文章</Button>
            <Button type="primary" onClick={() => {this.lookArticleCategory(record)}}size="small">查看</Button>
            <Button type="primary"onClick={() => {this.editArticleCategory(record)}} size="small">编辑</Button>
            <Button type="danger" onClick={() => {this.deleteArticleCategory(record)}} size="small">删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10
    }
  }

  onPublishChange = (record, value) => {
    this.props.handleChangeStatus({id: record._id, status: value})
  }

  deleteArticleCategory = (record) => {
    const {handleDeleteArticleCategory} = this.props
    confirm({
      title: '删除文章分类',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该文章分类吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteArticleCategory(record._id)
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
    this.props.handleGetCategoryLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetCategoryLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetCategoryLists(params)
  }

  addArticleCategory = () => {
    this.props.history.push("/articleCategoryOperate/add")
  }

  lookArticle = (record) => {
    this.props.handleChangeMenuPath("/article")
    this.props.history.push({
      pathname: "/article",
      state: {articleCategory: record._id}
    })
  }

  lookArticleCategory = (record) => {
    this.props.history.push({
      pathname: "/articleCategoryOperate/look",
      state: {id: record._id, isLook: true}
    })
  }

  editArticleCategory = (record) => {
    this.props.history.push({
      pathname: "/articleCategoryOperate/edit",
      state: {id: record._id}
    })
  }

  render() {
    const {articleCategoryLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}}>
              <Button type="primary" style={{float: "right"}} onClick={this.addArticleCategory}>添加文章分类</Button>
            </Col>
          </Row>
        </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: articleCategoryLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={articleCategoryLists.articleCategorys}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articleCategoryLists: state.get("articleCategory").get("articleCategoryLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryLists(params) {
      dispatch(getArticleCategoryLists(params))
    },
    handleDeleteArticleCategory(data) {
      dispatch(deleteArticleCategoryAction(data))
    },
    handleChangeMenuPath(params) {
      dispatch(changePathAction(params))
    },
    handleChangeStatus(data) {
      dispatch(changeArticleCategoryStatusAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
