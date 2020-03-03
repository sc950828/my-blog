const path = require("path")

const basename1 = path.basename("./fsTest/fs.js")
const basename2 = path.basename("./fsTest/fs.js", '.js')
console.log(basename1)
console.log(basename2)

const dirname = path.dirname("./fsTest/fs.js")
console.log(dirname)

const extname = path.extname("./fsTest/fs.js")
console.log(extname)

const join = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
console.log(join)

const relative = path.relative("/home/index/content/a", "/home/index/about/b")
console.log(relative)

console.log(path.resolve('/foo/bar', './baz')) // /foo/bar/baz
console.log(path.resolve('foo/bar', './baz')) // /F:/myworkspace/node/nodeTest/foo/bar/baz
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')) // /F:/myworkspace/node/nodeTest/wwwroot/static_files/gif/image.gif
console.log(path.resolve('/foo/bar', '/tmp/file/')) // /tmp/file
console.log(path.resolve('/foo/bar', '/tmp/file/', '../images')) // /tmp/images