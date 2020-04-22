import React from "react";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
}
class TemperatorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperator: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // this.setState({
    //   temperator: e.target.value
    // });
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    // const temperator = this.state.temperator;
    const temperator = this.props.temperator;
    return (
      <div>
        <label>{scaleNames[this.props.scale]}</label>
        <input value={temperator} onChange={this.handleChange}></input>
      </div>
    );
  }
}

export default TemperatorInput;
