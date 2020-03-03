const fs = require('fs')

//同步读写
const readResult = fs.readFileSync("./a.txt", 'utf-8')
console.log(readResult)

fs.writeFileSync("./a-copy-sync.txt", readResult)

//异步读写
fs.readFile("./a.txt", "utf-8", (err, data) => {
  if (err) throw err
  console.log(data)
  fs.writeFile("./a-copy.txt", data, function (err) {console.log(err)})
})

//删除文件
// const unlinkResult = fs.unlinkSync("./a-copy1.txt")
// console.log(unlinkResult) //返回undefined

// fs.unlink("./a-copy1.txt", function (err) {
//   if (err) console.log(err)
// })

//创建文件夹
// fs.mkdirSync("dist")//不能重复创建，不然会报错
// fs.mkdir("dist1/content", { recursive: true }, (err) => { //创建多层级的需要使用{ recursive: true }
//   if (err) throw err
// })

//删除文件夹
// fs.rmdirSync("dist1/content")//删除的文件夹一定要是空的
// fs.rmdir("dist", (err) => {
//   if (err) throw err
// })

//判断文件
// const statsResult1 = fs.statSync("a.txt").isFile()
// const statsResult2 = fs.statSync("a.txt").isDirectory()
// const statsResult3 = fs.statSync("dist1").isDirectory()
// fs.stat("dist1", function (err, data) {
//   if (err) console.log(err)
//   console.log(data.isDirectory())
// })
// console.log(statsResult1)
// console.log(statsResult2)
// console.log(statsResult3)

//复制文件
const copyResult = fs.copyFileSync(__dirname + '/a.txt', __dirname + '/copy-Sync.txt')
console.log(copyResult)

fs.copyFile(__dirname + '/a.txt', __dirname + '/copy-Sync1.txt', function (err){
  if(err) throw err
})

//判断文件
const access = fs.accessSync(__dirname + '/a.txt', fs.constants.F_OK)
console.log(access, fs.constants.F_OK)

fs.access(__dirname + '/a.txt', fs.constants.F_OK, (err) => {
  console.log(`文件 ${err ? '不存在' : '存在'}`);
});