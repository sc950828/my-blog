const add = (a, b) => {
  return `两个数的和为${a + b}`
}

const subtraction = (a, b) => {
  return `两个数的差为${a - b}`
}

//exports就是等于module.exports
// exports.add = add
// exports.subtraction = subtraction

//使用module.exports的方式
// module.exports.add = add
// module.exports.subtraction = subtraction

//也能使用这种方式 这里不能把module.exports用exports替换，这样会切掉exports与module.exports的联系
module.exports = {
  add,
  subtraction
}