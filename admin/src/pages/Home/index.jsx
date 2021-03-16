import {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './home.module.scss'
import { connect } from 'react-redux';
import {renderRouter, renderMenu, renderBreadcrumb, findCurrentRoute} from '../../utils/renderRouter'
import { getUserInfoAction } from '../../store/actions/creatorUserActions';
import { changePathAction, changeCollapsedAction } from '../../store/actions/creatorMenuActions';

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
    if(!userInfo) {
      getUserInfo()
    }
    
    const path = findCurrentRoute(routes, location.pathname)
    this.props.handleChangePath(path)
  }

  render() {
    const {routes, path, collapsed, location} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} breakpoint="lg">
          <div className={styles.logo}></div>
          <Menu theme="dark" selectedKeys={[path]} mode="inline" onClick={this.changeMenu}>
            {renderMenu(routes)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.head} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {renderBreadcrumb(routes, location.pathname)}
            </Breadcrumb>
            <div className={styles.content}>
              {renderRouter(routes)}
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
