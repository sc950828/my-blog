/*
 * @Author: your name
 * @Date: 2020-05-28 14:04:31
 * @LastEditTime: 2020-05-28 14:09:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/hooks/ReducerTest.js
 */
import React, { useReducer } from "react";

function ReducerTest() {
  const [score, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "inc":
        return state + 1;
      case "dec":
        return state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <div>
      <div>分数是{score}</div>
      <button onClick={() => dispatch("inc")}>increment</button>
      <button onClick={() => dispatch("dec")}>decrement</button>
    </div>
  );
}

export default ReducerTest;
