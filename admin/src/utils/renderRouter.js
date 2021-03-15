import {Switch, Route, Redirect} from "react-router-dom";
import { Menu, Breadcrumb } from 'antd';

const renderRouter = (routes, authPath = '/login', extraProps = {}, switchProps = {}) => {
  const token = localStorage.getItem("token")
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => ( 
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            if(token && route.path === authPath) {
              localStorage.removeItem("token")
              // return <Redirect to={{ pathname: "/"}} />
            }
            if (!route.requiresAuth || token) {
              return <route.component {...props} {...extraProps} meta={route.meta} routes={route.routes} />
            }
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
          }
        }
        />
      ))}
    </Switch>
  ) : null;
}

const renderMenu = (routes) => {
  let menus = []
  routes.forEach(item => {
    if(item.menuShow) {
      menus.push(<Menu.Item key={item.path} icon={item.meta.icon}>{item.meta.title}</Menu.Item>)
    }
  });
  return menus
}

const renderBreadcrumb = (routes, path, ) => {
  let breadcrumbs = []
  routes.forEach(item => {
    if(item.path === path) {
      breadcrumbs.push(<Breadcrumb.Item key={item.path}>{item.meta.title}</Breadcrumb.Item>)
    }
  });
  return breadcrumbs
}

export{
  renderRouter,
  renderMenu,
  renderBreadcrumb
}
