import React, { PureComponent } from "react";
import { Form, Input, Space, Button, Switch, Select } from 'antd';
import { addSourceAction, updateSourceAction, getSourceAction } from '../../store/actions/creatorSourceActions';
import {getAllSourceCategoryLists} from '../../store/actions/creatorSourceCategoryActions'
import {connect} from 'react-redux'

const { TextArea } = Input;
const {Option} = Select
class SourceOperate extends PureComponent {
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
    formData.goSource = () => {
      this.props.history.push("/source")
    }
    if(id) {
      formData.id = id
      this.props.handleUpdateSource(formData)
    } else {
      this.props.handleAddSource(formData)
    }
    
  }

  onCancel = () => {
    const {history} = this.props
    history.push("/source")
  }

  componentDidMount() {
    const {location} = this.props
    if(location.state && location.state.id) {
      const params = {id: location.state.id}
      params.setFormData = () => {
        const {title, source_category: sourceCategory,description, logo, link, is_publish: isPublish} = this.props.sourceInfo
        this.formRef.current.setFieldsValue({
          title,
          sourceCategory,
          description,
          logo,
          link,
          isPublish
        });
      }
      this.props.handleGetSourceById(params)
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
    const {allSourceCategoryLists} = this.props

    return (
      <div>
        <Form
          {...this.layout}
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{isPublish: false}}
        >
          <Form.Item
            label="学习资源分类"
            name="sourceCategory"
            rules={[
              { required: true, message: '请选择学习资源分类' },
            ]}
          >
            <Select disabled={isLook} placeholder="请选择学习资源分类">
              {
                allSourceCategoryLists.sourceCategorys && allSourceCategoryLists.sourceCategorys.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[
              { required: true, message: '请输入学习资源标题' },
              { whitespace: true, message: '请输入正确的学习资源标题' },
              { type: "string", max: 20 , message: '请输入正确的学习资源标题(不超过20个字符)' }
            ]}
          >
            <Input disabled={isLook} placeholder="请输入学习资源标题，不超过20个字符"></Input>
          </Form.Item>
          <Form.Item
            label="logo链接"
            name="logo"
          >
            <Input  disabled={isLook} placeholder="请输入学习资源logo链接"></Input>
          </Form.Item>
          <Form.Item
            label="资源地址"
            name="link"
            rules={[
              { required: true, message: '请输入资源地址' },
            ]}
          >
            <Input  disabled={isLook} placeholder="请输入资源地址"></Input>
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
    allSourceCategoryLists: state.get("sourceCategory").get("allSourceCategoryLists"),
    sourceInfo: state.get("source").get("sourceInfo")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllArticleCategoryLists() {
      dispatch(getAllSourceCategoryLists())
    },
    handleAddSource(data) {
      dispatch(addSourceAction(data))
    },
    handleUpdateSource(data) {
      dispatch(updateSourceAction(data))
    },
    handleGetSourceById(data) {
      dispatch(getSourceAction(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceOperate)
