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
            }
            if (!route.requiresAuth || token) {
              return <route.component {...props} {...extraProps} routes={route.routes} />
            }
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
          }
        }
        />
      ))}
    </Switch>
  ) : null;
}

const renderMenu = (routes, isAdmin) => {
  let menus = []
  routes.forEach(item => {
    if(item.menuShow) {
      if(!item.onlyAdminShow) {
        menus.push(<Menu.Item key={item.path} icon={item.meta.icon}>{item.meta.title}</Menu.Item>)
      } else {
        if(isAdmin) {
          menus.push(<Menu.Item key={item.path} icon={item.meta.icon}>{item.meta.title}</Menu.Item>)
        }
      }
    }
  });

  return menus
}

const formatPath = (path) => {
  const pathArr = path.split("/").slice(1)
  const arr = []
  let i = 0
  for (let index = 0; index < pathArr.length; index++) {
    let newPath = ""
    for (let index = 0; index <= i; index++) {
      newPath += `/${pathArr[index]}`
    }
    i++
    arr.push(newPath)
  }

  return arr
}

const renderBreadcrumb = (routes, path) => {
  const arr = formatPath(path)
  const flattenRoutes = flatten(routes)
  let breadcrumbs = []
  flattenRoutes.forEach(item => {
    arr.forEach(path => {
      if(item.path === path) {
        breadcrumbs.push(<Breadcrumb.Item key={item.path}>{item.meta.title}</Breadcrumb.Item>)
      }
    })
  });
  return breadcrumbs
}

// 数组扁平化
const flatten = (arr) => {
  return arr.reduce((result, item)=> {
    return result.concat(Array.isArray(item.routes) ? [item].concat(flatten(item.routes)) : item);
  }, []);
}

const findCurrentRoute = (routes, path) => {
  const flattenRoutes = flatten(routes)
  let activePath = ""
  flattenRoutes.forEach(route => {
    if(path === route.path) {
      activePath = route.meta.activePath
    }
  })

  return activePath
}

export{
  renderRouter,
  renderMenu,
  renderBreadcrumb,
  findCurrentRoute
}
