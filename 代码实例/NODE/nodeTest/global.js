const path = require("path")
//在node中全局变量不在是window而是global
console.log(global)
//当前文件所在路径，不包括当前文件名。与path.dirname(__filename)值相同
console.log(__dirname)
console.log(path.dirname(__filename))
//当前文件所在路径，包括当前文件名
console.log(__filename)

console.log(process.env)
//用于处理与解析 URL
console.log(new URL("http://www.baidu.com").host)
console.log(new URL("http://www.baidu.com").hostname)
console.log(new URL("http://www.baidu.com").origin)
console.log(new URL("http://www.baidu.com").port)

console.log(module)

console.log(exports)

console.log(Buffer)
