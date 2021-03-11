import {PureComponent} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  PictureOutlined,
  FolderOutlined,
  FileOutlined,
  ProjectOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';

import styles from './home.module.scss'
import Welcome from '../Welcome'
import User from '../User'
import Category from '../Category'
import Article from '../Article'
import Message from '../Message'
import Material from '../Material'
import Project from '../Project'

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

class Home extends PureComponent {
  constructor(props) {
    super(props)
    const path = props.history.location.pathname
    this.state = {
      collapsed: false,
      path: path === "/" ? "/welcome" : path
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  changeMenu = ({key}) => {
    this.setState({ path: key });
    this.props.history.push(key)
  }

  render() {
    const { collapsed, path } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={styles.logo}></div>
          <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline" onClick={this.changeMenu}>
            <Menu.Item key="/welcome" icon={<HomeOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="/user" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="/material" icon={<PictureOutlined  />}>
              素材管理
            </Menu.Item>
            <Menu.Item key="/category" icon={<FolderOutlined  />}>
              分类管理
            </Menu.Item>
            <Menu.Item key="/article" icon={<FileOutlined />}>
              文章管理
            </Menu.Item>
            <Menu.Item key="/project" icon={<ProjectOutlined  />}>
              项目管理
            </Menu.Item>
            <Menu.Item key="/message" icon={<MessageOutlined  />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.head} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.content}>
              <Switch>
                <Route path="/welcome" component={Welcome}></Route>
                <Route path="/user" component={User}></Route>
                <Route path="/material" component={Material}></Route>
                <Route path="/category" component={Category}></Route>
                <Route path="/article" component={Article}></Route>
                <Route path="/message" component={Message}></Route>
                <Route path="/project" component={Project}></Route>
                <Route path="/">
                  <Redirect to="/welcome"></Redirect>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Randy ©2021</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home
