import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './home.module.scss'
import { connect } from 'react-redux';
import {renderRouter, renderMenu, renderBreadcrumb, findCurrentRoute} from '../../utils/renderRouter'
import { getUserInfoAction } from '../../store/actions/creatorUserActions';
import { changePathAction, changeCollapsedAction } from '../../store/actions/creatorMenuActions';
import HeadMenu from '../../components/HeadMenu'

const { Header, Content, Footer, Sider } = Layout;
class Home extends Component {

  onCollapse = collapsed => {
    this.props.handleChangeCollapsed(collapsed)
  };

  changeMenu = ({key}) => {
    this.props.handleChangePath(key)
    this.props.history.push(key)
  }

  componentDidMount() {
    const { userInfo, getUserInfo, routes, location} = this.props
    const token = localStorage.getItem("token")
    // 没有用户信息 但是有token
    if(!userInfo && token) {
      getUserInfo()
    }
    
    const path = findCurrentRoute(routes, location.pathname)
    this.props.handleChangePath(path)
  }

  render() {
    const {routes, path, collapsed, location, userInfo} = this.props
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider className={styles.sider} collapsible collapsed={collapsed} breakpoint="lg" trigger={null}>
          <div className={styles.logo}></div>
          <Menu theme="dark" selectedKeys={[path]} mode="inline" onClick={this.changeMenu}>
            {renderMenu(routes, userInfo && userInfo.is_admin)}
          </Menu>
        </Sider>
        <Layout className={styles['right-content']}>
          <Header className={styles.head}>
            <div className={styles.collapsed}>
              {
                collapsed ? 
                <MenuUnfoldOutlined onClick={() => {this.onCollapse(false)}}/> :
                <MenuFoldOutlined onClick={() => {this.onCollapse(true)}}/>
              }
            </div>
            <HeadMenu />
          </Header>
          <Content className={styles.main}>
            <Breadcrumb className={styles.breadcrumb}>
              {renderBreadcrumb(routes, location.pathname)}
            </Breadcrumb>
            <div className={styles.content}>
              {renderRouter(routes)}
            </div>
          </Content>
          <Footer className={styles.footer}>©2021 Created by Randy</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.getIn(["user", "userInfo"]),
    path: state.getIn(["menu", "path"]),
    collapsed: state.getIn(["menu", "collapsed"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo() {
      dispatch(getUserInfoAction())
    },
    handleChangePath(path) {
      dispatch(changePathAction(path))
    },
    handleChangeCollapsed(collapsed) {
      dispatch(changeCollapsedAction(collapsed))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
