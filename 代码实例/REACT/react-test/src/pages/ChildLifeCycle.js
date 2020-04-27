import React from "react";

class ChildLifeCycle extends React.Component {
  // 初始化阶段
  static defaultProps = {
    name: "randy",
    age: 24
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
    console.log("子constructor", props, this.state);
  }

  componentWillMount() {
    // 组件即将被渲染到页面之前触发，此时可以进行开启定时器、向服务器发送请求等操作
    console.log("子componentWillMount");
  }

  render() {
    console.log("子render");
    return <div>child</div>;
  }

  componentDidMount() {
    // 组件已经被渲染到页面中后触发：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
    console.log("子componentDidMount");
  }

  // 更新阶段
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("子componentWillReceiveProps", nextProps, nextContext);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("子componentWillUpdate", nextProps, nextState, nextContext);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    console.log("子componentDidUpdate", preProps, preState, snapshot);
  }

  componentWillUnmount() {
    console.log("子componentWillUnmount");
  }
}

export default ChildLifeCycle;
