const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = (data) => {
  const error =  {}

  if (validator.isEmpty(data.email)) {
    error.email = '邮箱不能为空'
  }

  if (!validator.isEmail(data.email)) {
    error.email = '请输入正确的邮箱'
  }

  if (!validator.isLength(data.name, {min:2, max:30})) {
    error.name = '名字不能少于2位或大于30位'
  }
  if (!validator.isLength(data.password, {min: 6, max: 15})) {
    error.password = '密码长度不能小于6位不能大于15位'
  }
  return {
    error,
    isValid: isEmpty(error)
  }
}