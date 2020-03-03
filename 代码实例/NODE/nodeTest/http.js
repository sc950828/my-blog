const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
  res.writeHead(200, {'Content-type': 'text/plain'})
  res.write("hello world!")
  res.end()
})

server.listen(7000, "127.0.0.1")

console.log("server is running")