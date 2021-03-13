import {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  PictureOutlined,
  FolderOutlined,
  FileOutlined,
  ProjectOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons';

import styles from './home.module.scss'
import { connect } from 'react-redux';
// const { SubMenu } = Menu;
import renderRouter from '../../utils/renderRouter'
import { getUserInfoAction } from '../../store/actions/creatorUserActions';

const { Header, Content, Footer, Sider } = Layout;

class Home extends Component {
  constructor(props) {
    super(props)
    const path = props.history.location.pathname
    this.state = {
      collapsed: false,
      path: path
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  changeMenu = ({key}) => {
    this.setState({ path: key });
    this.props.history.push(key)
  }

  componentDidMount() {
    const { userInfo, getUserInfo} = this.props
    if(!userInfo) {
      getUserInfo()
    }
  }

  render() {
    const { collapsed, path } = this.state;
    const {routes} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={styles.logo}></div>
          <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline" onClick={this.changeMenu}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="/user" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="/materialCategory" icon={<FolderOutlined />}>
              素材分类管理
            </Menu.Item>
            <Menu.Item key="/material" icon={<PictureOutlined  />}>
              素材管理
            </Menu.Item>
            <Menu.Item key="/articleCategory" icon={<FolderOutlined />}>
              文章分类管理
            </Menu.Item>
            <Menu.Item key="/article" icon={<FileOutlined />}>
              文章管理
            </Menu.Item>
            <Menu.Item key="/project" icon={<ProjectOutlined />}>
              项目管理
            </Menu.Item>
            <Menu.Item key="/setting" icon={<SettingOutlined />}>
              设置管理
            </Menu.Item>
            <Menu.Item key="/message" icon={<MessageOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.head} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.content}>
              {
                renderRouter(routes)
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Randy ©2021</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.getIn(["user", "userInfo"])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo() {
      dispatch(getUserInfoAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
