import React from "react";
import Child1 from "./Child1";

class NameClass extends React.Component {
  // 构造函数
  constructor(props) {
    // Class 组件应该始终使用 props 参数来调用父类的构造函数。
    super(props);
    this.state = { date: new Date(), isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  // 生命周期函数
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // 第一种写法
    // this.setState({
    //   date: new Date()
    // });

    // 第二种支持异步的写法
    this.setState(function (state, props) {
      return {
        date: new Date()
      };
    });
  }

  // 这种语法可以不用显示绑定this
  // handleClick = () => {
  //   this.setState(function (state) {
  //     return {
  //       isToggleOn: !state.isToggleOn
  //     };
  //   });
  // };

  handleClick(name) {
    console.log(name);
    this.setState(function (state) {
      return {
        isToggleOn: !state.isToggleOn
      };
    });
  }

  render() {
    const isToggleOn = this.state.isToggleOn;
    let message;
    if (isToggleOn) {
      message = <div>条件渲染 randy</div>;
    } else {
      message = message = <div>条件渲染 demi</div>;
    }
    return (
      <div>
        <header>
          hello {this.props.name}，我是类组件。我是有状态组件。时间是
          {this.state.date.toLocaleString()}
        </header>
        <main>
          {/* 还可以使用 () => this.handleClick() 解决this问题 */}
          {/* 还可以使用 this.handleClick.bind(this) 解决this问题 */}
          {/* <button onClick={this.handleClick}> */}
          {/* <button onClick={this.handleClick.bind(this, "randy")}> */}
          <button onClick={e => this.handleClick("randy", e)}>
            当前开关状态{this.state.isToggleOn ? "ON" : "OFF"}
          </button>
          {message}
          {isToggleOn && <p>条件渲染 我是使用 && 渲染的</p>}
          {!isToggleOn ? <p>条件渲染 我是使用三目运算符渲染的</p> : ""}
          <Child1 isShow={isToggleOn}></Child1>
        </main>
      </div>
    );
  }
}

export default NameClass;
