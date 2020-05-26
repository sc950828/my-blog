import React, { Component } from "react";

class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }
  render() {
    return (
      <div>
        <div className={this.state.show ? 'show' : 'hide'}>显示隐藏切换</div>
        <button onClick={this.toggle.bind(this)}>切换</button>
      </div>
    );
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }
}

export default AnimationTest;
