import {PureComponent} from 'react'
import { Table,Space, Button } from 'antd';
import { connect } from 'react-redux';
import { getArticleLists } from '../../store/actions/creatorArticleActions';

class Article extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '内容',
        dataIndex: 'content'
      },
      {
        title: '图片',
        dataIndex: 'banner'
      },
      {
        title: '评论数',
        dataIndex: 'comments'
      },
      {
        title: '浏览量',
        dataIndex: 'views'
      },
      {
        title: '是否发布',
        dataIndex: 'is_publish',
        render: (text, record) => (
          text ? '已发布' : '未发布'
        ),
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
    this.props.handleGetArticleLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetArticleLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetArticleLists(params)
  }

  render() {
    const {articleLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
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
    articleLists: state.get("article").get("articleLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetArticleLists(params) {
      dispatch(getArticleLists(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
