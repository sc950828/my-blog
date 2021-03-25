import React, { PureComponent } from "react";
import { Form, Input, Space, Button, Switch } from 'antd';
import { addArticleCategoryAction, updateArticleCategoryAction, getArticleCategoryAction } from '../../store/actions/creatorArticleCategoryActions';
import {connect} from 'react-redux'
const { TextArea } = Input;
class ArticleCategoryOperate extends PureComponent {
  formRef = React.createRef();

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

  onFinish = (formData) => {
    const {id} = this.state
    formData.goArticleCategory = () => {
      this.props.history.push("/articleCategory")
    }
    if(id) {
      formData.id = id
      this.props.handleUpdateArticleCategory(formData)
    } else {
      this.props.handleAddArticleCategory(formData)
    }
    
  }

  onCancel = () => {
    const {history} = this.props
    history.push("/articleCategory")
  }

  componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.id) {
      const params = {id: location.state.id}
      params.setFormData = () => {
        const {title, description, banner, is_publish: isPublish} = this.props.articleCategory
        this.formRef.current.setFieldsValue({
          title,
          description,
          banner,
          isPublish
        });
      }
      this.props.handleGetArticleCategooryById(params)
      this.setState({id: location.state.id})
    }
    if(location.state && location.state.isLook) {
      this.setState({
        isLook: location.state.isLook
      })
    }
  }

  render() {
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
            label="标题"
            name="title"
            rules={[
              { required: true, message: '请输入文章分类标题' },
              { whitespace: true, message: '请输入正确的分类标题' },
              { type: "string", max: 20 , message: '请输入正确的分类标题(不超过20个字符)' }
            ]}
          >
            <Input disabled={isLook} placeholder="请输入文章分类标题，不超过20个字符"></Input>
          </Form.Item>
          <Form.Item
            label="封面图链接"
            name="banner"
            rules={[
              { required: true, message: '请输入封面图链接' },
            ]}
          >
            <Input  disabled={isLook} placeholder="请输入封面图链接"></Input>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[
              { required: true, message: '请输入描述' },
              { whitespace: true, message: '请输入正确的描述' },
              { type: "string", max: 300 , message: '请输入正确的描述(不超过300个字符)' }
            ]}
          >
            <TextArea  disabled={isLook} rows={4} placeholder="请输入描述，不超过300个字符"/>
          </Form.Item>
          <Form.Item
            label="是否发布"
            name="isPublish"
            valuePropName="checked"
            required
          >
            <Switch checkedChildren="是" unCheckedChildren="否" disabled={isLook}/>
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
    articleCategory: state.get("articleCategory").get("articleCategoryInfo")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddArticleCategory(data) {
      dispatch(addArticleCategoryAction(data))
    },
    handleUpdateArticleCategory(data) {
      dispatch(updateArticleCategoryAction(data))
    },
    handleGetArticleCategooryById(data) {
      dispatch(getArticleCategoryAction(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCategoryOperate)
