import React from "react";
import ChildLifeCycle from "./ChildLifeCycle";

class LifeCycle extends React.Component {
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
    console.log("父constructor", props, this.state);
  }

  componentWillMount() {
    // 组件即将被渲染到页面之前触发，此时可以进行开启定时器、向服务器发送请求等操作
    console.log("父componentWillMount");
  }

  handleClickPlus = () => {
    this.setState(function (state, props) {
      console.log(props);
      return {
        number: state.number + 2
      };
    });
  };

  handleClickReduce = () => {
    this.setState(function (state, props) {
      return {
        number: state.number - 2
      };
    });
  };

  render() {
    console.log("父render");
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={this.handleClickPlus}>number+2</button>
        <button onClick={this.handleClickReduce}>number-2</button>
        {this.state.number > 5 ? (
          <ChildLifeCycle number={this.state.number}></ChildLifeCycle>
        ) : (
          ""
        )}
      </div>
    );
  }

  componentDidMount() {
    // 组件已经被渲染到页面中后触发：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
    console.log("父componentDidMount");
  }

  // 更新阶段
  componentWillReceiveProps(nextProps, nextContext) {
    console.log("父componentWillReceiveProps", nextProps, nextContext);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("父componentWillUpdate", nextProps, nextState, nextContext);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    console.log("父componentDidUpdate", preProps, preState, snapshot);
  }

  componentWillUnmount() {
    console.log("父componentWillUnmount");
  }
}

export default LifeCycle;
