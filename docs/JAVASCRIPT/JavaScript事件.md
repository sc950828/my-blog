1、给dom绑定事件的方式有哪些？
  主要有三种：在dom元素上直接绑定 在js中获取dom元素再进行绑定 利用事件监听。利用事件监听的优点是可以给同一dom对象绑定多个事件
  标准的事件监听 ie9及以上才支持
    element.addEventListener(event, function, useCapture) 移除事件用removeEventListener(event, function)
      event : （必需）事件名，支持所有 DOM事件 。使用监听的时候需要去掉事件前缀on
      function：（必需）指定要事件触发时执行的函数。
      useCapture：（可选）指定事件是否在捕获或冒泡阶段执行。true，捕获。false，冒泡。默认false。
  非标准 ie8及以下使用这种
    element.attachEvent("on" + event, function) 移除事件用detachEvent("on" + event, function)
    event：（必需）事件类型。需加“on“，例如：onclick。
    function：（必需）指定要事件触发时执行的函数。
    
  兼容方案 移除事件一个道理  需要注意 移除监听的时候传入的回调函数需要跟新增监听的回调函数一致
    if(element.addEventListener){
      element.addEventListener(type,fn);
    }else{
      element.attachEvent("on"+type,fn);
    }

2、事件委托
  事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果。
    <input type="button" value="click me" id="btn6">
    var btn6 = document.getElementById("btn6");
    document.onclick = function(event){
      var event = event || window.event; 非标准event对象在window上而不是入参
      var target = event.target || event.srcElement;
      if(target == btn6){ //或者通过标签名target.nodeName.toUpperCase() == xxx
        alert(btn5.value);
      }
    }
  提高JavaScript性能。事件委托可以显著的提高事件的处理速度，减少内存的占用

3、方法
  preventDefault() 阻止默认行为
  stopPropagation() 阻止事件的冒泡或捕获

4、load和DOMContentLoaded
  当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
  当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
    如果页面中同时存在css和js，并且存在js在css后面，则DOMContentLoaded事件会在css加载完后才执行。
    其他情况下，DOMContentLoaded都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。

5、什么是事件传播 事件传播的三个阶段是什么？
  当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。 在“冒泡阶段”中，事件冒泡或向上传播至父级，祖父母，祖父母或父级，直到到达window为止
  在捕获阶段事件从window开始向下触发，直到到达目标元素。
  IE只支持事件冒泡。

  捕获阶段 事件从 window 开始，然后向下到每个元素，直到到达目标元素。
  目标阶段 事件已达到目标元素。
  冒泡阶段 事件从目标元素冒泡，然后上升到每个元素，直到到达 window。

6、如何知道是否在元素中使用了`event.preventDefault()`方法？
  我们可以在事件对象中使用event.defaultPrevented属性。 它返回一个布尔值用来表明是否在特定元素中调用了event.preventDefault()

7、target currentTarget区别
  target是触发事件的元素
  currentTarget是挂载事件的元素

8、mouseover和mouseenter的区别是什么？
  mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，有冒泡的过程。对应的移除事件是mouseout
  mouseenter：当鼠标移入元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave
