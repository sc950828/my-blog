import {PureComponent} from 'react'
import { Table,Space, Button } from 'antd';
import { connect } from 'react-redux';
import { getSettingLists } from '../../store/actions/creatorSettingActions';

class Setting extends PureComponent {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '键',
        dataIndex: 'key'
      },
      {
        title: '值',
        dataIndex: 'value'
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
    this.props.handleGetSettingLists(params)
  }

  changePageNo = (page, pageSize) => {
    this.setState({
      pageNo: page
    })
    const params = {
      pageNo: page,
      pageSize: pageSize
    }
    this.props.handleGetSettingLists(params)
  }

  changePageSize = (current, size) => {
    this.setState({
      pageSize: size
    })
    const params = {
      pageNo: current,
      pageSize: size
    }
    this.props.handleGetSettingLists(params)
  }

  render() {
    const {settingLists} = this.props
    const {pageNo, pageSize} = this.state
    return (
      <section>
        <Table 
          rowKey="_id"
          pagination={{
            current: pageNo,
            pageSize,
            total: settingLists.total,
            showSizeChanger: true,
            onChange: this.changePageNo,
            onShowSizeChange: this.changePageSize
          }}
          columns={this.columns}
          dataSource={settingLists.settings}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settingLists: state.get("setting").get("settingLists")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetSettingLists(params) {
      dispatch(getSettingLists(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
