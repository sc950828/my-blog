/*
 * @Author: your name
 * @Date: 2020-05-28 15:20:09
 * @LastEditTime: 2020-05-28 15:30:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myprojects/my-blog/代码实例/REACT/hooks/src/zidingyi/ZiDingYiHook.js
 */
import React, { useState, useCallback, useEffect } from "react";

const useWinSize = () => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    console.log("useeffect");
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return size;
};

function ZiDingYiHook() {
  const size = useWinSize();

  return (
    <div>
      size是width{size.width} x height{size.height}
    </div>
  );
}

export default ZiDingYiHook;
