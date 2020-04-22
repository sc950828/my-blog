import React, { useState } from "react";
import { Prompt } from "react-router-dom";

function GuoDu() {
  // 函数组件没有状态 只能通过useState设置state 返回变量名和修改变量的方法，参数是变量的初始值
  let [isBlocking, setIsBlocking] = useState(true);
  return (
    <Prompt
      when={isBlocking}
      message={location =>
        `Are you sure you want to go to ${location.pathname}`
      }
    />
  );
}

export default GuoDu;
