import React, { PureComponent } from 'react';
import { Upload, Select, Form, Button, Space } from 'antd';
import {connect} from 'react-redux'
import ImgCrop from 'antd-img-crop';
import {getAllMaterialCategoryLists} from '../../store/actions/creatorMaterialCategoryActions'

const { Option } = Select;
class MaterialOperate extends PureComponent{
  formRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      src: "https://xiaosu72.oss-cn-shanghai.aliyuncs.com/blog/images/upload_8ec88423ab91c4fb3387aebf37f0364b.jpg",
      fileList: []
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

  onFinish = (formData) => {
    console.log(formData);
  }

  render() {
    const {allMaterialCategoryLists, history} = this.props
    const token = localStorage.getItem("token")
    return (
      <div>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="素材分类名"
            name="materialCategory"
            rules={[
              { required: true, message: '请选择素材分类' },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择素材分类"
            >
              {
                allMaterialCategoryLists.materialCategorys && allMaterialCategoryLists.materialCategorys.map((item) => {
                  return (
                    <Option key={item._id} value={item.name}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="上传素材"
            name="fileList"
            rules={[
              { required: true, message: '请选择素材分类' },
            ]}
          >
            <ImgCrop rotate modalTitle="裁剪素材" modalOk="确定" modalCancel="取消">
              <Upload
                action="/api/home/ossUploadImg"
                headers={{Authorization: `Bearer ${token}`}}
                listType="picture-card"
                fileList={this.state.fileList}
                onChange={this.onChange}
              >
                {this.state.fileList.length < 5 && '+ 选择素材'}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item>
            <Space size="middle">
              <Button onClick={()=>{history.goBack()}}>取消</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Space>
          </Form.Item>
        </Form>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialOperate)
