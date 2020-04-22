import React from "react";

function BoilingVerdict(props) {
  if (props.celsius > 100) {
    return <p>the water is boil</p>;
  } else {
    return <p>the water is not boil</p>;
  }
}

export default BoilingVerdict
