/*
 * @Author: your name
 * @Date: 2020-05-28 13:39:05
 * @LastEditTime: 2020-05-28 13:57:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/hooks/ContextTest.js
 */
import React, { useState, createContext, useContext } from "react";

const CountContext = createContext(0);

function Top() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>context count是{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <CountContext.Provider value={count}>
        <Middle></Middle>
      </CountContext.Provider>
    </div>
  );
}

function Middle() {
  return <Bottom></Bottom>;
}

function Bottom(props) {
  const count = useContext(CountContext);
  return <div>我的count是{count}</div>;
}

export default Top;
