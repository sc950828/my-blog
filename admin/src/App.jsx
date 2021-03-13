import {Component } from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import renderRouter from './utils/renderRouter'
import routes from './router'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {renderRouter(routes)}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
