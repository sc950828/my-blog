/*
 * @Author: your name
 * @Date: 2020-05-28 14:26:55
 * @LastEditTime: 2020-05-28 14:40:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/anli/Text.js
 */
import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR } from "./color";

function Button() {
  const { dispatch } = useContext(ColorContext);

  return (
    <div>
      <button onClick={() => dispatch({ type: UPDATE_COLOR, color: "red" })}>
        红色
      </button>
      <button onClick={() => dispatch({ type: UPDATE_COLOR, color: "yellow" })}>
        黄色
      </button>
    </div>
  );
}

export default Button;
