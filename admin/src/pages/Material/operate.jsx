import React, { PureComponent } from 'react'; 
import { Upload, Select, Form, Button, Space, Radio, Modal, Image } from 'antd';
import { UploadOutlined  } from '@ant-design/icons';
import {connect} from 'react-redux'
import ImgCrop from 'antd-img-crop';
import {getAllMaterialCategoryLists} from '../../store/actions/creatorMaterialCategoryActions'
import {addMaterialAction} from '../../store/actions/creatorMaterialActions'

const { Option } = Select;
class MaterialOperate extends PureComponent{
  formRef = React.createRef();

  layout = {
    labelCol: {
      xxl: {span: 8},
      lg: {span: 6},
      sm: {span: 4},
    },
    wrapperCol: {
      xxl: {span: 8},
      lg: {span: 12},
      sm: {span: 20},
    },
  };

  tailLayout = {
    wrapperCol: {
      xxl: {offset: 8},
      lg: {offset: 6},
      sm: {offset: 4},
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      materialType: 16/9,
      isModalVisible: false,
      image: ""
    };
  }

  componentDidMount() {
    this.props.handleGetAllMaterialCategoryLists()
  }

  onChange = ({ fileList: newFileList, file: newFile  }) => {
    this.setState({fileList: newFileList});
    if(newFile && newFile.response) {
      const list = []
      newFileList.forEach(item => {
        if(item.url) {
          list.push(item)
        } else {
          list.push({
            uid: item.response.name,
            url: item.response.url,
          })
        }
      })
      this.formRef.current.setFieldsValue({
        fileList: list
      });
      this.setState({fileList: list});
    }
  };

  onRemove = (file) => {
    const files = this.state.fileList.filter(v => v.url !== file.url);
    this.formRef.current.setFieldsValue({
      fileList: files
    });
    this.setState({fileList: files});
  }

  onPreview = async file => {
    this.setState({
      image: file.url,
      isModalVisible: true
    })
  };

  onRadioChange = (e) => {
    this.setState({
      materialType: e.target.value
    })
  }

  onFinish = (formData) => {
    formData.goMaterial = () => {
      this.props.history.goBack()
    }
    this.props.handleAddMaterial(formData)
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    const {allMaterialCategoryLists, history} = this.props
    const token = localStorage.getItem("token")
    return (
      <div>
        <Form
          {...this.layout}
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{materialType: 16/9}}
        >
          <Form.Item
            label="素材文件夹"
            name="materialCategory"
            rules={[
              { required: true, message: '请选择素材文件夹' },
            ]}
          >
            <Select placeholder="请选择素材文件夹">
              {
                allMaterialCategoryLists.materialCategorys && allMaterialCategoryLists.materialCategorys.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="素材裁剪比"
            name="materialType"
            rules={[
              { required: true, message: '请选择素材裁剪比' },
            ]}
          >
            <Radio.Group onChange={this.onRadioChange}>
              <Radio value={16/9}>16/9</Radio>
              <Radio value={4/3}>4/3</Radio>
              <Radio value={3/4}>3/4</Radio>
              <Radio value={2/1}>2/1</Radio>
              <Radio value={1/2}>1/2</Radio>
              <Radio value={1/1}>1/1</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="选择素材图"
            name="fileList"
            rules={[
              { required: true, message: '请选择素材图片' },
            ]}
          >
            <ImgCrop
              rotate
              modalTitle="裁剪素材"
              modalOk="确定"
              modalCancel="取消"
              modalWidth="620px"
              aspect={this.state.materialType}
              minZoom={0.5}
            >
              <Upload
                action="/api/home/ossUploadImg"
                headers={{Authorization: `Bearer ${token}`}}
                listType="picture"
                fileList={this.state.fileList}
                onChange={this.onChange}
                onRemove={this.onRemove}
                onPreview={this.onPreview}
              >
                {this.state.fileList.length < 5 && <Button block icon={<UploadOutlined />}>点击选择素材</Button>}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item {...this.tailLayout}>
            <Space size="middle">
              <Button onClick={()=>{history.goBack()}}>取消</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Space>
          </Form.Item>
        </Form>

        <Modal
          okText="确定"
          cancelText="取消"
          title="预览"
          visible={this.state.isModalVisible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <Image width={472} src={this.state.image}></Image>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allMaterialCategoryLists: state.get("materialCategory").get("allMaterialCategoryLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllMaterialCategoryLists() {
      dispatch(getAllMaterialCategoryLists())
    },
    handleAddMaterial(data) {
      dispatch(addMaterialAction(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialOperate)
