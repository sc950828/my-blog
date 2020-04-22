import React from "react";
import BoilingVerdict from "./BoilingVerdict";
import TemperatorInput from "./TemperatorInput";

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: "c" };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <p>状态提升测试</p>
        <TemperatorInput
          scale="c"
          temperator={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        ></TemperatorInput>
        <TemperatorInput
          scale="f"
          temperator={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        ></TemperatorInput>
        <BoilingVerdict celsius={celsius}></BoilingVerdict>
      </div>
    );
  }
}

export default Calculator;
