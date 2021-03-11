import { Fragment } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import Login from './pages/Login';
import Password from './pages/Password';
import Home from './pages/Home';
import sotre from './sotre'

const App = () => {
  return (
    <Provider store={sotre}>
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/password" component={Password}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
