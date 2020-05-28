/*
 * @Author: your name
 * @Date: 2020-05-28 11:21:40
 * @LastEditTime: 2020-05-28 13:23:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/hooks/Effect.js
 */
import React, { useState, useEffect } from "react";
export default function EffectTest(props) {
  const [count, setCount] = useState(0);
  const [name] = useState("randy");
  // 相当于componentDidMount componentDidUpdate
  useEffect(() => {
    console.log("useEffect执行了");
    // 相当于componentWillUnmount
    return () => {
      console.log("effect unmount");
    };
  }, [count]);

  return (
    <div>
      <div>effect name是{name}</div>
      <div>effect count是{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
