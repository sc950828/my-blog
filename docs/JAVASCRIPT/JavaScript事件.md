### 给 dom 绑定事件的方式有哪些？

- 主要有三种：在 dom 元素上直接绑定，在 js 中获取 dom 元素再进行绑定 ，利用事件监听。
- 利用事件监听的优点是可以给同一 dom 对象绑定多个事件。

```js
  //标准的事件监听 ie9及以上才支持
  添加事件 element.addEventListener(event, function, EventListenerOptions)
  移除事件用removeEventListener(event, function)
    event : （必需）事件名，支持所有 DOM事件 。使用监听的时候需要去掉事件前缀on
    function：（必需）指定要事件触发时执行的函数。
    EventListenerOptions { // 一般我们只设置一个布尔值 也就是capture的值，定义时冒泡还是捕获。
      capture?: boolean // （可选）指定事件是否在捕获或冒泡阶段执行。true，捕获。false，冒泡。默认false。
      once?: boolean // 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除
      passive?: boolean // 设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告
    }
  //非标准 ie8及以下使用这种
  element.attachEvent("on" + event, function) 移除事件用detachEvent("on" + event, function)
  event：（必需）事件类型。需加“on“，例如：onclick。
  function：（必需）指定要事件触发时执行的函数。

  //兼容方案 移除事件一个道理  需要注意 移除监听的时候传入的回调函数需要跟新增监听的回调函数一致
  if(element.addEventListener){
    element.addEventListener(type,fn);
  }else{
    element.attachEvent("on"+type,fn);
  }
```

### 事件委托

- 事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果。

        <input type="button" value="click me" id="btn6">
        var btn6 = document.getElementById("btn6");
        document.onclick = function(event){
          var event = event || window.event; 非标准event对象在window上而不是入参
          var target = event.target || event.srcElement;
          if(target == btn6){ //或者通过标签名target.nodeName.toUpperCase() == xxx
            alert(btn5.value);
          }
        }

- 提高 JavaScript 性能。事件委托可以显著的提高事件的处理速度，减少内存的占用使用事件委托我们可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理我们还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。

### 方法

- preventDefault() 阻止默认行为 ie 下的方法 window.event.returnValue = false
- stopPropagation() 阻止事件的冒泡。ie 下的方法 event.cancelBubble = true;
- stopImmediatePropagation() 阻止剩下的事件处理程序被执行。如果一个元素上绑定了三个事件，在其中一个事件上调用了这个方法，那其他 的两个事件将不会被执行。

### load 和 DOMContentLoaded

- 当 onload 事件触发时，页面上所有的 DOM，样式表，脚本，图片，flash 都已经加载完成了。
- 当 DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表，图片，flash。如果页面中同时存在 css 和 js，并且存在 js 在 css 后面，则 DOMContentLoaded 事件会在 css 加载完后才执行。其他情况下，DOMContentLoaded 都不会等待 css 加载，并且 DOMContentLoaded 事件也不会等待图片、视频等其他资源加载。

### 什么是事件传播 事件传播的三个阶段是什么？

当事件发生在 DOM 元素上时，该事件并不完全发生在那个元素上。 在“冒泡阶段”中，事件冒泡或向上传播至父级，祖父母，祖父母或父级，直到到达 window 为止。在捕获阶段事件从 window 开始向下触发，直到到达目标元素。IE 只支持事件冒泡。

- 捕获阶段 事件从 window 开始，然后向下到每个元素，直到到达目标元素。
- 目标阶段 事件已达到目标元素。
- 冒泡阶段 事件从目标元素冒泡，然后上升到每个元素，直到到达 window。

### 如何知道是否在元素中使用了`event.preventDefault()`方法？

我们可以在事件对象中使用 event.defaultPrevented 属性。 它返回一个布尔值用来表明是否在特定元素中调用了 event.preventDefault()

### target currentTarget 区别

- target 是触发事件的元素
- currentTarget 是挂载事件的元素

### mouseover mouseout 和 mouseenter mouseleave 的区别是什么？

- mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，有冒泡的过程。对应的移除事件是 mouseout
- mouseenter：当鼠标移入元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是 mouseleave

### 三种事件模型是什么？

- 事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。

- 第一种事件模型是最早的 DOM0 级模型，这种模型事件不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。

- 第二种事件模型是 IE 事件模型，在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。

- 第三种是 DOM2 级事件模型，在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

### 事件冒泡和事件捕获

事件捕获（event capturing）： 当鼠标点击或者触发 dom 事件时（被触发 dom 事件的这个元素被叫作事件源），浏览器会从根节点 =>事件源（由外到内）进行事件传播。

事件冒泡（dubbed bubbling）： 事件源 =>根节点（由内到外）进行事件传播。

dom 标准事件流的触发的先后顺序为：先捕获再冒泡。即当触发 dom 事件时，会先进行事件捕获，捕获到事件源之后通过事件传播进行事件冒泡。但是默认是冒泡事件，所以冒泡的时候才会进行事件的触发，就是由内到外。

在 vue 里面我们使用`@click.capture` 把事件变为捕获阶段执行，事件的执行顺序就是由外到里了，本质上还会进行冒泡，但是冒泡不会再执行事件了。先捕获再冒泡是一直会执行的。

我们使用`e.stopPropagation()`阻止冒泡事件，在 vue 里面我们使用`@click.stop`阻止事件冒泡

### 自定义事件

```js
// 监听自定义事件
document.addEventListener("test", function() {
  console.log("自定义事件触发了");
});

// 创建自定义事件 不能传递参数
const myEvevt = new Event("test");

setTimeout(function() {
  // 触发自定义事件
  if (document.dispatchEvent) {
    document.dispatchEvent(myEvent2);
  } else {
    // 兼容低版本浏览器
    document.fireEvent(myEvent2);
  }
}, 2000);

document.addEventListener("test2", function(e) {
  console.log("自定义事件触发了参数是", e.detail.name);
});

// 创建自定义事件 能传递参数
const myEvent2 = new CustomEvent("test2", { detail: { name: "randy" } });

setTimeout(function() {
  if (document.dispatchEvent) {
    document.dispatchEvent(myEvent2);
  } else {
    document.fireEvent(myEvent2);
  }
}, 3000);
```

### 写一个通用的事件侦听器函数。

```js
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function(event) {
    return event || window.event;
  },

  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
};
```

### 实现 EventEmitter

```js
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb);
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```
