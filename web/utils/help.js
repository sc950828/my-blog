// 防抖是规定时间内最后一次点击才有效(文本输入的验证);
const debounce = (fn, time) => {
  let timeout = null
  return function (...args) {
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      fn.apply(context, args)
    }, time)
  }
}

export { debounce }
