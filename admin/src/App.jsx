// import Login from './pages/Login';
import Password from './pages/Password';
import { Fragment } from 'react'
import {Provider} from 'react-redux'
import sotre from './sotre'

const App = () => {
  return (
    <Provider store={sotre}>
      <Fragment>
        {/* <Login></Login> */}
        <Password></Password>
      </Fragment>
    </Provider>
  );
}

export default App;
