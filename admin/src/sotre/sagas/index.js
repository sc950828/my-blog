
import user from './user'

// 批量注册路由
const sagas = (sagaMiddleware) => {
  sagaMiddleware.run(user)
};

export default sagas
