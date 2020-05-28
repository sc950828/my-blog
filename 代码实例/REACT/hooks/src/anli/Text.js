/*
 * @Author: your name
 * @Date: 2020-05-28 14:26:55
 * @LastEditTime: 2020-05-28 14:37:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/anli/Text.js
 */
import React, { useContext } from "react";
import { ColorContext } from "./color";

function Text() {
  const { color } = useContext(ColorContext);
  return <div style={{ color: color }}>颜色是蓝色{color}</div>;
}

export default Text;
