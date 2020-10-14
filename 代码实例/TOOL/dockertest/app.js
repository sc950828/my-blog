const express = require('express')
require('dotenv').config({ path: '.env' })

require('./db/mongo')

const app = express()

app.use('/', (req, res, next) => {
  res.end('-----docker node is running-------')
})

app.listen(3000, () => {
  console.log(`server is running at port 3000`)
})
