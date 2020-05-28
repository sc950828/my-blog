/*
 * @Author: your name
 * @Date: 2020-05-28 11:12:19
 * @LastEditTime: 2020-05-28 11:15:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/hooks/StateTest.js
 */
import React, { useState } from "react";

export default function StateTest(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>state count是{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
