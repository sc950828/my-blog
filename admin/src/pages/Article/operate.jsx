import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { Form, Space, Button, Input, Select, Switch} from 'antd';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getAllArticleCategoryLists } from '../../store/actions/creatorArticleCategoryActions';
import { addArticleAction, getArticleAction, updateArticleAction } from "../../store/actions/creatorArticleActions";

const { TextArea } = Input;
const {Option} = Select
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ArticleOperate extends PureComponent {
  formRef = React.createRef();
  mdEditor = null

  layout = {
    labelCol: {
      xxl: {span: 7},
      xl: {span: 5},
      sm: {span: 4},
    },
    wrapperCol: {
      xxl: {span: 10},
      xl: {span: 14},
      sm: {span: 20},
    },
  };

  tailLayout = {
    wrapperCol: {
      xxl: {offset: 7},
      xl: {offset: 5},
      sm: {offset: 4},
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      id: "",
      isLook: false
    }
  }

  componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.id) {
      this.mdEditor.setView({menu: true, html: false, md: true})
      const params = {id: location.state.id}
      params.setFormData = () => {
        const {content, title, description, article_category: articleCategory, banner, is_publish: isPublish} = this.props.articleInfo
        this.formRef.current.setFieldsValue({
          title,
          description,
          articleCategory,
          banner,
          isPublish
        });
        this.mdEditor.setText(content.mdValue)
      }
      this.props.handleGetArticle(params)
      this.setState({id: location.state.id})
    }
    if(location.state && location.state.isLook) {
      this.mdEditor.setView({menu: false, md: false, html: true})
      this.setState({
        isLook: location.state.isLook
      })
    }
  }

  getMdValue = () => {
    if (this.mdEditor) {
      return this.mdEditor.getMdValue()
    }

    return ""
  };

  getHtmlValue = () => {
    if (this.mdEditor) {
      return this.mdEditor.getHtmlValue()
    }

    return ""
  };

  onCancel = () => {
    this.props.history.push("/article")
  }

  onFinish = (formData) => {
    const mdValue = this.getMdValue()
    const htmlValue = this.getHtmlValue()
    formData.content = {mdValue, htmlValue}
    formData.goArticle = () => {
      this.props.history.push("/article")
    }
    const {id} = this.state
    if(id) {
      formData.id = id
      this.props.handleUpdateArticle(formData)
    } else {
      this.props.handleAddArticle(formData)
    }
  }

  render() {
    const {allArticleCategoryLists} = this.props
    const {isLook} = this.state
    return (
      <div>
        <Form
          {...this.layout}
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{isPublish: false}}
        >
          <Form.Item
            label="文章分类"
            name="articleCategory"
            rules={[
              { required: true, message: '请选择文章分类' },
            ]}
          >
            <Select disabled={isLook} placeholder="请选择文章分类">
              {
                allArticleCategoryLists.articleCategorys && allArticleCategoryLists.articleCategorys.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.title}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[
              { required: true, message: '请输入文章标题' },
              { whitespace: true, message: '请输入正确的文章标题' },
              { type: "string", max: 20 , message: '请输入正确的文章标题(不超过20个字符)' }
            ]}
          >
            <Input disabled={isLook} placeholder="请输入文章标题，不超过20个字符"></Input>
          </Form.Item>
          <Form.Item
            label="封面图链接"
            name="banner"
            rules={[
              { required: true, message: '请输入封面图链接' },
            ]}
          >
                <Input disabled={isLook} placeholder="请输入封面图链接"></Input>
          </Form.Item>
          <Form.Item
            label="文章描述"
            name="description"
            rules={[
              { required: true, message: '请输入描述' },
              { whitespace: true, message: '请输入正确的描述' },
              { type: "string", max: 300 , message: '请输入正确的描述(不超过300个字符)' }
            ]}
          >
            <TextArea  disabled={isLook} rows={4} placeholder="请输入文章简要描述，不超过300个字符"/>
          </Form.Item>
          <Form.Item
            label="是否发布"
            name="isPublish"
            valuePropName="checked"
            required
          >
            <Switch checkedChildren="是" unCheckedChildren="否" disabled={isLook} />
          </Form.Item>
          <Form.Item 
            label="文章内容"
          >
            <MdEditor
              ref={node => (this.mdEditor = node || undefined)}
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              config={{view: {html: false}}}
            />
          </Form.Item>
          <Form.Item {...this.tailLayout}>
            <Space size="middle">
              <Button onClick={this.onCancel}>{!isLook ? '取消' : '返回'}</Button>
              {!isLook ? <Button type="primary" htmlType="submit">保存</Button> : null}
            </Space>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allArticleCategoryLists: state.get("articleCategory").get("allArticleCategoryLists"),
    articleInfo: state.get("article").get("articleInfo"),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllArticleCategoryLists() {
      dispatch(getAllArticleCategoryLists())
    },
    handleAddArticle(data) {
      dispatch(addArticleAction(data))
    },
    handleUpdateArticle(data) {
      dispatch(updateArticleAction(data))
    },
    handleGetArticle(params) {
      dispatch(getArticleAction(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleOperate)
