## js 的运行机制

本文大致分为以下这些的步骤来帮助我们由浅入深更加清晰的了解 JS 运行机制

1. 了解进程和线程的概念
2. 了解 js 中的执行栈和执行上下文
3. 了解 js 中的同步和异步 宏任务微任务
4. 了解 js 中的事件循环
5. 通过例子验证我们的总结

### 进程与线程

<details>
  <summary>什么是进程?</summary>
  <p>官网说法，进程是CPU资源分配的最小单位</p>
  <p>通俗的讲就是运行中的程序，我将它理解为一个可以独立运行且拥有自己的资源空间的任务程序，比如微信 qq</p>
</details>

<details>
  <summary>什么是线程?</summary>
  <p>官网说法，线程是CPU调度的最小单位</p>
  <p>线程是建立在进程的基础上的一次程序运行单位，通俗点解释线程就是程序中的一个执行流，一个进程可以有多个线程</p>
</details>

### 单线程与多线程

<details>
  <summary>什么是单线程?什么是多线程？</summary>
  <p>一个进程中只有一个执行流称作单线程，即程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的 才会执行
  </p>
  <p>一个进程中有多个执行流称作多线程，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务
  </p>
</details>

### 进程和线程的关系

<details>
  <summary>进程和线程有什么关系呢？</summary>
  <p>一个进程由一个或多个线程组成，线程可以理解为是一个进程中代码的不同执行路线。比如我可以打开qq音乐一边听歌一边下载。
  </p>
</details>

### js

<details>
  <summary>js是单线程还是多线程？</summary>
  <p>单线程</p>
</details>

<details>
  <summary>为什么？</summary>
  <p>作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？这样就要引入锁的概念了，更复杂了。
  </p>
</details>

### 什么是执行上下文？

执行上下文是 JavaScript 代码的环境的抽象概念。每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。

### JavaScript 中有三种执行上下文。

全局执行上下文 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。

函数执行上下文 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。

Eval 函数执行上下文 — 执行在 eval 函数内部的代码也会有它属于自己的执行上下文，不常用我们不讨论。

### 什么是执行栈？

用来存储代码运行时创建的执行上下文。

当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。

js 引擎会执行那些位于栈顶的执行上下文。当该执行上下文执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个执行上下文。

### 下面的代码会输出什么？会创建怎样的执行上下文呢？

```js
console.log("Global Execution Context start");

function first() {
  console.log("first function");
  second();
  console.log("Again first function");
}

function second() {
  console.log("second function");
}

first();
console.log("Global Execution Context end");
```

![image](http://xiaosu72.oss-cn-shanghai.aliyuncs.com/my-blog/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87.png)

### 简单总结 js 执行流程

在执行一段代码时，JS 引擎会首先创建一个执行栈，用来存放执行上下文。

然后 JS 引擎会创建一个全局执行上下文，并 push 到执行栈中, 这个过程 JS 引擎会为这段代码中所有变量分配内存并赋一个初始值（undefined），在创建完成后，JS 引擎会进入执行阶段，这个过程 JS 引擎会逐行的执行代码，即为之前分配好内存的变量逐个赋值(真实值)。

如果这段代码中存在 function 的调用，那么 JS 引擎会创建一个函数执行上下文，并 push 到执行栈中，其创建和执行过程跟全局执行上下文一样。

### 异步初探

js 是单线程的 到底是怎么处理异步的呢？

比如我们有个定时器，有个 ajax 请求，js 是停止运行了等待结果还是继续运行？

```js
let setTimeoutFun = function () {
  setTimeout(() => {
    console.log("我是定时器回调");
  }, 100);
};

let httpFun = function () {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
    });
};

// 同步任务
console.log("我是同步任务1");

// 异步定时任务
setTimeoutFun();

// 异步http请求任务
httpFun();

// 同步任务
console.log("我是同步任务2");
```

![image](http://xiaosu72.oss-cn-shanghai.aliyuncs.com/my-blog/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.png)

总结

同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，只有前一个任务执行完毕，才能执行后一个任务。异步任务不进入主线程而是进入 Event Table 并注册函数。

当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。

主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。

上述过程会不断重复，也就是常说的 Event Loop(事件循环)。

### 异步进阶

来看一下这个例子 会输出啥

```js
// 同步任务1
console.log("我是同步任务1");

// 异步任务
setTimeout(function () {
  console.log("我是异步任务定时器");
}, 0);

// 异步任务
new Promise(function (resolve, reject) {
  console.log("new promise");
  resolve("success");
}).then((res) => {
  console.log(res);
});

// 同步任务2
console.log("我是同步任务2");
```

所以异步有宏任务(macrotask) 和 微任务(microtask)

常见的宏任务

主代码块
setTimeout
setInterval

常见微任务

process.nextTick() Node 才有
Promise.then()

![image](http://xiaosu72.oss-cn-shanghai.aliyuncs.com/my-blog/%E5%AE%8C%E6%95%B4%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.png)

总结

首先，整体的 script(作为第一个宏任务)开始执行的时候，会把所有代码分为同步任务、异步任务两部分

同步任务会直接进入主线程依次执行

异步任务会再分为宏任务和微任务

宏任务进入到 Event Table 中，并在里面注册回调函数，每当指定的事件完成时，Event Table 会将这个函数移到 Event Queue 中

微任务也会进入到另一个 Event Table 中，并在里面注册回调函数，每当指定的事件完成时，Event Table 会将这个函数移到 Event Queue 中

当主线程内的任务执行完毕，主线程为空时，会检查微任务的 Event Queue，如果有任务，就全部执行，如果没有就执行下一个宏任务

上述过程会不断重复，这就是 Event Loop 事件循环

### 例子

```js
function test() {
  console.log(1);
  setTimeout(function () {
    // timer1
    console.log(2);
  }, 1000);
}

test();

setTimeout(function () {
  // timer2
  console.log(3);
  Promise.resolve(4).then((res) => {
    console.log(res);
  });
}, 0);

new Promise(function (resolve) {
  console.log(5);
  setTimeout(function () {
    // timer3
    console.log(6);
  }, 100);
  resolve();
}).then(function () {
  setTimeout(function () {
    // timer4
    console.log(7);
  }, 0);
  console.log(8);
});

console.log(9);
```
