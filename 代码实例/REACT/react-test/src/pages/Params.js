import React from "react";
import { useParams } from "react-router-dom";

function Params(props) {
  console.log(props);
  let { name } = useParams();

  return <div>params {name}</div>;
}

export default Params;
