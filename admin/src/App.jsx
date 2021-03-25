import {Component } from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import {renderRouter} from './utils/renderRouter'
import routes from './router'
import store from './store'

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <BrowserRouter>
            {renderRouter(routes)}
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App
