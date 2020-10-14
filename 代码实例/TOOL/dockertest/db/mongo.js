const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.set('useCreateIndex', true)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.cyan(`db is connect`))
  })
  .catch((error) => {
    console.log(chalk.red(`db is error ${error}`))
  })

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})

mongoose.connection.on('open', function () {})

mongoose.connection.on('error', function (error) {
  console.log(error)
  mongoose.connection.close(function () {})
})

module.exports = mongoose
