const fs = require("fs")
const http = require("http")

const readStream = fs.createReadStream(__dirname + '/stream.txt', 'utf8')

const writeStream = fs.createWriteStream(__dirname + '/stream-copy1.txt')

//第一种方法
// readStream.on("data", function(chunk){
//   console.log("我复制了一部分 buffer")
//   writeStream.write(chunk)
// })

//第二种方法
// readStream.pipe(writeStream)


const server = http.createServer(function(req, res) {
  res.writeHeader(200, {'Content-type': "text/plain;", 'charset': 'utf-8'})
  readStream.pipe(res)
})

server.listen(7000, '127.0.0.1')

console.log('server is running')


