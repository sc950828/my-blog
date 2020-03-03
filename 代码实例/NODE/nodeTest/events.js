const events = require('events')

class myEmitter extends events { }

const myEventEmitter = new myEmitter()

myEventEmitter.on("myEvent", (msg) => {
  console.log(msg)
})

myEventEmitter.emit("myEvent", '自己注册的事件执行了!')

//this指向myEventEmitter2
const myEventEmitter2 = new myEmitter()

myEventEmitter2.on("myEvent", function (msg) {
  this.name = 'randy'
  console.log(msg, this)
})

myEventEmitter2.emit("myEvent", "这里的this指向myEventEmitter2对象")

//this指向{}
const myEventEmitter3 = new myEmitter()

myEventEmitter3.on("myEvent", (msg) => {
  this.name = 'randy'
  console.log(msg, this)
})

myEventEmitter3.emit("myEvent", "这里的this指向myEventEmitter3对象")


//同步 异步
const myEventEmitter4 = new myEmitter()

myEventEmitter4.on("myEvent", (msg) => {
  console.log(msg)
})

myEventEmitter4.emit("myEvent", "同步执行")

const myEventEmitter5 = new myEmitter()

myEventEmitter5.on("myEvent", (msg) => {
  setImmediate(() => {
    console.log(msg, '所有的同步方法执行完了我才会执行')
  })
})

myEventEmitter5.emit("myEvent", "异步执行")

console.log("同步异步方法")


//一次性事件
const myEventEmitter6 = new myEmitter()

myEventEmitter6.once("onceEvent", function () {
  console.log('我只被执行一次')
})

myEventEmitter6.emit("onceEvent")
myEventEmitter6.emit("onceEvent")


//newListener
const myEventEmitter7 = new myEmitter()

myEventEmitter7.once("newListener", (eventName, listener) => {
  console.log(eventName)
  console.log(listener)
  if (eventName === 'myEvent') {
    myEventEmitter7.on("myEvent", function () {
      console.log('B')
    })
  }
})

myEventEmitter7.on("myEvent", function () {
  console.log('A')
})

myEventEmitter7.emit("myEvent")
