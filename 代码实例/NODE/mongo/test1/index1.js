const mongoose = require("mongoose")

// mongoose.connect(uri, options); 函数接受回调函数，或返回一个 promise。
mongoose.connect("mongodb://localhost/test1").then(res => {
  console.log('connect success')

  const db = mongoose.connection
  console.log(db.readyState)
  console.log(db.collections)
  console.log(db.name)
  console.log(db.host)
  console.log(db.port)
  console.log(db.config)
  console.log(db.user)
  console.log(db.pass)
  console.log(db.db)
  
}).catch(e => {
  console.log('connect error')
})


