const fetch = require("randy-fetch")

// fetch.get("http://jsonplaceholder.typicode.com/users").then(res => {
//   console.log(res)
// })

const postData = {
  "id": 11,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

// fetch.post("http://jsonplaceholder.typicode.com/users", postData).then(res => {
//   console.log(res)
// })

const putData = {
  "id": 1,
  "name": "randy",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

// fetch.put("http://jsonplaceholder.typicode.com/users/1", putData).then(res => {
//   console.log(res)
// })

fetch.delete("http://jsonplaceholder.typicode.com/users/1").then(res => {
  console.log(res)
})