const modules = {};
const requireAll = (r) => {
  r.keys().forEach(key => {
    const k = key.replace("./", "").replace(".js", "");
    modules[k] = r(key).default;
  });
}
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
requireAll(require.context("./", false, /\.js/));

// 处理一个文件只能一个saga的问题
const sagas = (sagaMiddleware) => {
  for (const module of Object.values(modules)) {
    if(module) {
      for (const saga of Object.values(module)) {
        sagaMiddleware.run(saga)
      }
    }
  }
};

export default sagas
