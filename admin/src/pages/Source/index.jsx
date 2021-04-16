import React, { PureComponent } from "react";
import {
  Table,
  Space,
  Button,
  Row,
  Col,
  Image,
  Select,
  Modal,
  Switch,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getSourceLists,
  deleteSource,
  updateSourceAction,
  changeSourceStatusAction,
} from "../../store/actions/creatorSourceActions";
import { getAllSourceCategoryLists } from "../../store/actions/creatorSourceCategoryActions";
import HeadWrap from "../../components/HeadWrap";
import { copyLink } from "../../utils/help";

const { confirm } = Modal;
const { Option } = Select;
class Source extends PureComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "学习资源名",
        dataIndex: "title",
      },
      {
        title: "资源logo",
        dataIndex: "logo",
        render: (logo) => {
          return <Image width={120} src={logo} placeholder={true} />;
        },
      },
      {
        title: "资源链接 (点击复制)",
        dataIndex: "link",
        ellipsis: true,
        render: (text) => {
          return <span onClick={copyLink}>{text}</span>;
        },
      },
      {
        title: "所属分类",
        dataIndex: "source_category",
        ellipsis: true,
        render: (text) => {
          return text.name;
        },
      },
      {
        title: "状态",
        width: 100,
        dataIndex: "is_publish",
        render: (text, record) => (
          <Switch
            onChange={(value) => {
              this.onPublishChange(record, value);
            }}
            checked={text}
            checkedChildren="已发布"
            unCheckedChildren="未发布"
          />
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        sorter: true,
        width: 180,
        render: (text) => {
          return new Date(text).toLocaleString();
        },
      },
      {
        title: "修改时间",
        dataIndex: "updatedAt",
        width: 180,
        render: (text) => {
          return new Date(text).toLocaleString();
        },
      },
      {
        title: "操作",
        width: 220,
        render: (text, record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                this.lookSource(record);
              }}
              size="small"
            >
              查看
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.editSource(record);
              }}
              size="small"
            >
              编辑
            </Button>
            <Button
              type="danger"
              onClick={() => {
                this.deleteSource(record);
              }}
              size="small"
            >
              删除
            </Button>
          </Space>
        ),
      },
    ];
    this.state = {
      pageNo: 1,
      pageSize: 10,
      id: "",
      sourceCategory: "",
      sortField: "createdAt",
      sortOrder: "descend",
    };
  }

  deleteSource = (record) => {
    const { handleDeleteSource, sourceLists } = this.props;
    const {
      pageNo,
      pageSize,
      sortField,
      sortOrder,
      sourceCategory,
    } = this.state;
    let _pageNo = pageNo;
    // 当页只有一条数据就退回一页
    if (sourceLists.sources.length <= 1) {
      _pageNo = Math.max(pageNo - 1, 1);
    }
    confirm({
      title: "删除学习资源",
      icon: <ExclamationCircleOutlined />,
      content: "确定删除该学习资源吗？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDeleteSource({
          id: record._id,
          params: {
            pageNo: _pageNo,
            pageSize,
            sortField,
            sourceCategory,
            sortOrder,
          },
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  selectChange = async (value) => {
    await this.setState({
      sourceCategory: value,
      pageNo: 1,
    });
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      sourceCategory: this.state.sourceCategory,
      sortField: this.state.sortField,
      sortOrder: this.state.sortOrder,
    };
    this.props.handleGetSourceLists(params);
  };

  async componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      const {
        sourceCategory,
        pageNo,
        pageSize,
        sortField,
        sortOrder,
      } = location.state;
      await this.setState({
        sourceCategory,
        pageNo,
        pageSize,
        sortField,
        sortOrder,
      });
    }
    const {
      sourceCategory,
      pageNo,
      pageSize,
      sortField,
      sortOrder,
    } = this.state;
    const params = {
      pageNo,
      pageSize,
      sourceCategory,
      sortField,
      sortOrder,
    };
    this.props.handleGetAllSourceCategoryLists();
    this.props.handleGetSourceLists(params);
  }

  addSource = async () => {
    this.props.history.push("/sourceOperate/add");
  };

  lookSource = (record) => {
    const {
      sourceCategory,
      pageNo,
      pageSize,
      sortField,
      sortOrder,
    } = this.state;
    this.props.history.push({
      pathname: "/sourceOperate/look",
      state: {
        id: record._id,
        isLook: true,
        listParams: {
          sourceCategory,
          pageNo,
          pageSize,
          sortField,
          sortOrder,
        },
      },
    });
  };

  editSource = (record) => {
    const {
      sourceCategory,
      pageNo,
      pageSize,
      sortField,
      sortOrder,
    } = this.state;
    this.props.history.push({
      pathname: "/sourceOperate/edit",
      state: {
        id: record._id,
        listParams: {
          sourceCategory,
          pageNo,
          pageSize,
          sortField,
          sortOrder,
        },
      },
    });
  };

  onPublishChange = (record, value) => {
    const {
      sourceCategory,
      pageNo,
      pageSize,
      sortField,
      sortOrder,
    } = this.state;
    this.props.handleChangeStatus({
      id: record._id,
      status: value,
      params: {
        sourceCategory,
        pageNo,
        pageSize,
        sortField,
        sortOrder,
      },
    });
  };

  // 分页、排序、筛选变化时触发
  handleTableChange = async (pagination, filters, sorter) => {
    const { field, order } = sorter;
    await this.setState({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      sortField: field ?? "createdAt",
      sortOrder: order ?? "descend",
    });
    const {
      pageNo,
      pageSize,
      sortField,
      sortOrder,
      sourceCategory,
    } = this.state;
    const params = {
      pageNo,
      pageSize,
      sortField,
      sortOrder,
      sourceCategory,
    };
    this.props.handleGetSourceLists(params);
  };

  render() {
    const { allSourceCategoryLists, sourceLists } = this.props;
    const { pageNo, pageSize } = this.state;
    return (
      <section>
        <HeadWrap>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 12 }}
            >
              <Select
                style={{ width: 240 }}
                placeholder="请选择学习资源文件夹"
                value={this.state.sourceCategory}
                onChange={this.selectChange}
              >
                <Option value="">全部</Option>
                {allSourceCategoryLists.sourceCategorys &&
                  allSourceCategoryLists.sourceCategorys.map((item) => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 12 }}
            >
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={this.addSource}
              >
                添加学习资源
              </Button>
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
            onShowSizeChange: this.changePageSize,
          }}
          columns={this.columns}
          dataSource={sourceLists.sources}
          onChange={this.handleTableChange}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allSourceCategoryLists: state
      .get("sourceCategory")
      .get("allSourceCategoryLists"),
    sourceLists: state.get("source").get("sourceLists"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllSourceCategoryLists() {
      dispatch(getAllSourceCategoryLists());
    },
    handleGetSourceLists(params) {
      dispatch(getSourceLists(params));
    },
    handleDeleteSource(params) {
      dispatch(deleteSource(params));
    },
    handleUpdateSource(params) {
      dispatch(updateSourceAction(params));
    },
    handleChangeStatus(data) {
      dispatch(changeSourceStatusAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Source);
