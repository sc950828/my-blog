module.exports = (data) => {
  return data == null || data == undefined ||
    (typeof data == 'string' && data.trim().length == 0) ||
    (typeof  data == 'object' && Object.keys(data).length == 0)
}