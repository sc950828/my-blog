import { Fragment, PureComponent } from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import renderRouter from './utils/renderRouter'
import routes from './router'
import store from './store'
import { getUserInfoAction } from './store/actions/creatorUserActions'

class App extends PureComponent {
  componentDidMount() {
    console.log(store);
  }
  render() {
    const userInfo = store.getState().get("user").get("current")
    if(!userInfo) {
      console.log(store.dispatch(getUserInfoAction()));
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            {renderRouter(routes, true)}
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
