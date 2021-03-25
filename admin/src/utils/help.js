import {message} from 'antd'

const copyLink = (e) => {
  const range = document.createRange()
  window.getSelection().removeAllRanges()
  range.selectNode(e.target)
  window.getSelection().addRange(range)
  const successful = document.execCommand("copy")
  window.getSelection().removeAllRanges()
  if(successful) {
    message.success("素材链接复制成功")
  }
}

export {
  copyLink
}
