const mongoose = require("mongoose")
const Schema = mongoose.Schema

// mongoose.connect(uri, options); 函数接受回调函数，或返回一个 promise。
mongoose.connect("mongodb://localhost/test1").then(async res => {
  console.log('connect success')

  const schema1 = new Schema({
    name: {
      type: String,
      alias: "nickname" // 别名
    },
    createdTime: {
      type: Date,
      default: Date.now
    },
    books: {
      type: Array
    }
  });
  
  const TestSchema1 = mongoose.model("TestSchema1", schema1)
  // 创建
  // TestSchema1.create({name: 'randy2'}).then(res => {
  //   console.log(res)
  // })

  // const p1 = new TestSchema1({name: 'randy1'})
  // const saveResult = await p1.save()
  // console.log(saveResult)

  // p1.save().then(res => {
  //   console.log(res)
  // })

  // 查询
  // const findResult = await TestSchema1.find()
  // console.log(findResult)
  // console.log(result[1].nickname)

  const findResult = await TestSchema1.findOne({_id: "5fcf3036eb307c18863968d8"})
  findResult.name = 'randy unmarkModified'
  findResult.unmarkModified("name") // 该字段不修改
  await findResult.save()
  console.log(findResult)
}).catch(e => {
  console.log('connect error', e)
})



