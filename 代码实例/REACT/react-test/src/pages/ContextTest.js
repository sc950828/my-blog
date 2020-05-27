import React, { Component } from "react";
import PropTypes from "prop-types";

// 新版用法
const colorContext = React.createContext("");

class Top extends Component {
  render() {
    return (
      // 新版用法
      <colorContext.Provider value="yellow">
        <Middle>我是父级</Middle>
      </colorContext.Provider>

      // 老版
      // <Middle>我是父级</Middle>
    );
  }

  // 老版本
  // static childContextTypes = {
  //   colorContext: PropTypes.string
  // };

  // 老版本
  // getChildContext() {
  //   return { colorContext: "yellow" };
  // }
}

export default Top;

class Middle extends Component {
  render() {
    return <Bottom>我是中间的元素</Bottom>;
  }
}

class Bottom extends Component {
  // 新版本
  static contextType = colorContext;

  // 老版本
  // static contextTypes = {
  //   colorContext: PropTypes.string
  // };
  render() {
    return (
      // 新版本
      <div>值是{this.context}</div>
      // 老版本
      // <div>值是{this.context.colorContext}</div>
    );
  }
}
