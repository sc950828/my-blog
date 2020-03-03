const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  content: {
    type: String
  },
  status: {
    type: Boolean
  }
})

module.exports = mongoose.model('record', RecordSchema)