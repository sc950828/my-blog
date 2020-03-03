const fetch = require("node-fetch")

//get
module.exports.get = async function (url) {
  const response = await fetch(url)
  const result = await response.json()

  return result
}

//post
module.exports.post = async function(url, data){
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()

  return result
}

//put
module.exports.put = async function(url, data){
  const response = await fetch(url, {
    method: "put",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()

  return result
}

//delete
module.exports.delete = async function(url){
  const response = await fetch(url, {
    method: "delete"
  })
  const result = await response.json()

  return result
}