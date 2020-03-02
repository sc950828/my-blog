1、promise
  promise解决层层回调函数，代码不清晰问题，使异步代码能链式调用 流程更加清晰，代码更加优雅
  一个 Promise 对象值是未知的，状态是可变的，但是无论怎么变化，它的状态永远处于以下三种之间：
    pending：初始状态，既不是成功，也不是失败。
    fulfilled：意味着操作成功完成。
    rejected：意味着操作失败。
  Promise 的状态会发生变化，成功时会从pending -> fulfilled，失败时会从pending -> rejected，但是此过程是不可逆的，也就是不能从另外两个状态变成pending。fulfilled/rejected这两个状态也被称为 settled 状态。

2. promise方法
  then() 获取的是成功的数据
  catch() 获取的是出错的异常
  finally() 不管成功失败都会执行
  all() 接收一个 Promise 对象数组作为参数,参数所有回调成功才是成功，返回值数组与参数顺序一致,参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。
  race() 接收一个 Promise 对象数组作为参数,参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为结果
  allSettled() 接收一个 Promise 对象数组作为参数,不管子promise成功失败都返回。

3. async await
  没有了链式调用，用完全同步的方法写异步代码 缺点是没有promise.all()这种并发的方法
