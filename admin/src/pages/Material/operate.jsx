import React, { PureComponent } from 'react'; 
import { Upload, Select, Form, Button, Space, Radio, Modal, Image } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import ImgCrop from 'antd-img-crop';
import {getAllMaterialCategoryLists} from '../../store/actions/creatorMaterialCategoryActions'
import {addMaterialAction} from '../../store/actions/creatorMaterialActions'
import './material.module.scss';

const { Option } = Select;
class MaterialOperate extends PureComponent{
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
      fileList: [
        // {
        //   uid: -1,
        //   url: "https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_7b9609d373a7e2a9d4c53c6024822b2d.JPG"
        // }
      ],
      isTailor: true,
      shape: 'rect',
      materialType: 1/1,
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

  onTailorRadioChange = (e) => {
    this.setState({
      isTailor: e.target.value
    })
  }

  onShapeRadioChange = (e) => {
    this.setState({
      shape: e.target.value
    })
  }

  onFinish = (formData) => {
    formData.goMaterial = () => {
      this.props.history.goBack()
    }
    this.props.handleAddMaterial(formData)
  }

  onCancel = () => {
    const {history} = this.props
    history.push("/material")
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
    const {allMaterialCategoryLists} = this.props
    const token = localStorage.getItem("token")
    return (
      <div>
        <Form
          {...this.layout}
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{isTailor: true, shape: 'rect',materialType: 1/1}}
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
            label="素材是否需要裁剪"
            tooltip={{icon: <ExclamationCircleOutlined />, title: "文章分类封面图和文章封面图最好选择16/9裁剪比例"}}
            name="isTailor"
            required
          >
            <Radio.Group onChange={this.onTailorRadioChange}>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          {
            this.state.isTailor ?
            (
              <>
                <Form.Item
                  label="素材裁剪形状"
                  tooltip={{icon: <ExclamationCircleOutlined />, title: "头像素材最好是圆形"}}
                  name="shape"
                  required
                >
                  <Radio.Group onChange={this.onShapeRadioChange}>
                    <Radio value='rect'>方形</Radio>
                    <Radio value='round'>圆形</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="素材裁剪比"
                  name="materialType"
                  required
                >
                  <Radio.Group onChange={this.onRadioChange}>
                    <Radio value={1/1}>1/1</Radio>
                    <Radio value={1/2}>1/2</Radio>
                    <Radio value={2/1}>2/1</Radio>
                    <Radio value={3/4}>3/4</Radio>
                    <Radio value={4/3}>4/3</Radio>
                    <Radio value={1/4}>1/4</Radio>
                    <Radio value={4/1}>4/1</Radio>
                    <Radio value={16/9}>16/9</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            ) :
            null
          }
          <Form.Item
            label="选择素材图"
            name="fileList"
            rules={[
              { required: true, message: '请选择素材图片' },
            ]}
          >
            {
              this.state.isTailor ?
              (
                <ImgCrop
                  rotate
                  modalTitle="裁剪素材"
                  modalOk="确定"
                  modalCancel="取消"
                  modalWidth="620px"
                  shape={this.state.shape}
                  aspect={this.state.materialType}
                  minZoom={0.5}
                >
                  <Upload
                    action="/api/home/ossUploadImg"
                    multiple={true}
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
              ) :
              (
                <Upload
                  action="/api/home/ossUploadImg"
                  headers={{Authorization: `Bearer ${token}`}}
                  listType="picture"
                  multiple={true}
                  fileList={this.state.fileList}
                  onChange={this.onChange}
                  onRemove={this.onRemove}
                  onPreview={this.onPreview}
                >
                  {this.state.fileList.length < 5 && <Button block icon={<UploadOutlined />}>点击选择素材</Button>}
                </Upload>
              )
            }
            
          </Form.Item>
          <Form.Item {...this.tailLayout}>
            <Space size="middle">
              <Button onClick={this.onCancel}>取消</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Space>
          </Form.Item>
        </Form>

        <Modal
          okText="确定"
          cancelText="取消"
          title="预览"
          width={620}
          visible={this.state.isModalVisible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Image width={572} src={this.state.image}></Image>
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
