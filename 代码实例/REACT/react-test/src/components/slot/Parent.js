import React from "react";
import Child from "./Child";

function Parent() {
  return (
    <Child>
      <p>Parent</p>
      <p>我是组件中间的元素，在子组件中使用props.children获取到</p>
    </Child>
  );
}

export default Parent;
