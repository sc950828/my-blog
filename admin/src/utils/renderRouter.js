import {Switch, Route, Redirect} from "react-router-dom";

const renderRoutes = (routes, authPath = '/login', extraProps = {}, switchProps = {}) => {
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

export default renderRoutes;
