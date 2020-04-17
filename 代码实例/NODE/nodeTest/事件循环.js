console.log("start");
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
Promise.resolve().then(function () {
  console.log("promise3");
});
console.log("end");

// 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,
// 会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3

// 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，
// 同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，
// timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务

// start
// end
// promise3
// timer1
// timer2
// promise1
// promise2
