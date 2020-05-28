/*
 * @Author: your name
 * @Date: 2020-05-28 14:30:44
 * @LastEditTime: 2020-05-28 14:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/anli/color.js
 */
import React, { createContext, useReducer } from "react";

export const ColorContext = createContext({});

export const UPDATE_COLOR = "UPDATE_COLOR";

const colorReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};

export const Color = props => {
  const [color, dispatch] = useReducer(colorReducer, "blue");

  return (
    <ColorContext.Provider value={{ color, dispatch }}>
      {props.children}
    </ColorContext.Provider>
  );
};
