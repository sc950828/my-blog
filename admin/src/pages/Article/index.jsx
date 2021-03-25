import {PureComponent} from 'react'
import { Table, Space, Button, Row, Col, Image, Modal, Select, Switch } from 'antd';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { changeArticleStatusAction, deleteArticleAction, getArticleLists } from '../../store/actions/creatorArticleActions';
import { getAllArticleCategoryLists } from '../../store/actions/creatorArticleCategoryActions';
import HeadWrap from "../../components/HeadWrap"

const {confirm} = Modal
const {Option} = Select
class Article extends PureComponent {
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
        title: '所属分类',
        dataIndex: 'article_category',
        ellipsis: true,
        render: (text) => {
          return text.title
        }
      },
      {
        title: '评论数',
        width: 100,
        dataIndex: 'comments'
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
            <Button onClick={() => {this.lookArticle(record)}} type="primary" size="small">查看</Button>
            <Button onClick={() => {this.editArticle(record)}} type="primary" size="small">编辑</Button>
            <Button onClick={() => {this.deleteArticle(record)}} type="danger" size="small">删除</Button>
          </Space>
        ),
      }
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10,
      articleCategory: ""
    }
  }

  onPublishChange = (record, value) => {
    this.props.handleChangeStatus({id: record._id, status: value})
  }

  lookArticle = (record) => {
    this.props.history.push({
      pathname: "/articleOperate/look",
      state: {id: record._id, isLook: true}
    })
  }

  editArticle = (record) => {
    this.props.history.push({
      pathname: "/articleOperate/edit",
      state: {id: record._id}
    })
  }

  deleteArticle = (record) => {
    const {handleDeleteArticle} = this.props
    confirm({
      title: '删除文章',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除该文章吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: "取消",
      onOk() {
        handleDeleteArticle(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  async componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.articleCategory) {
      await this.setState({
        articleCategory: location.state.articleCategory
      })
    }
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      articleCategory: this.state.articleCategory
    }
    this.props.handleGetAllArticleCategoryLists()
    this.props.handleGetArticleLists(params)
  }

  selectChange = async (value) => {
    await this.setState({
      articleCategory: value
    })
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      articleCategory: this.state.articleCategory
    }
    this.props.handleGetArticleLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize,
      articleCategory: this.state.articleCategory
    }
    this.props.handleGetArticleLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size,
      articleCategory: this.state.articleCategory
    }
    this.props.handleGetArticleLists(params)
  }

  addArticle = () => {
    this.props.history.push("/articleOperate/add")
  }

  render() {
    const {articleLists, allArticleCategoryLists} = this.props
    const {pageNo, pageSize, articleCategory} = this.state
    return (
      <section>
      <HeadWrap>
        <Row>
          <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
            <Select
              style={{ width: 240 }}
              placeholder="请选择素材文件夹"
              value={articleCategory}
              onChange={this.selectChange}
            >
              <Option value="">全部</Option>
              {
                allArticleCategoryLists.articleCategorys && allArticleCategoryLists.articleCategorys.map((item) => {
                  return <Option key={item._id} value={item._id}>{item.title}</Option>
                })
              }
            </Select>
          </Col>
          <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} xl={{span: 12}}>
            <Button type="primary" style={{float: "right"}} onClick={this.addArticle}>添加文章</Button>
          </Col>
        </Row>
      </HeadWrap>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: articleLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={articleLists.articles}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allArticleCategoryLists: state.get("articleCategory").get("allArticleCategoryLists"),
    articleLists: state.get("article").get("articleLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetArticleLists(params) {
      dispatch(getArticleLists(params))
    },
    handleGetAllArticleCategoryLists() {
      dispatch(getAllArticleCategoryLists())
    },
    handleDeleteArticle(params) {
      dispatch(deleteArticleAction(params))
    },
    handleChangeStatus(data) {
      dispatch(changeArticleStatusAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
