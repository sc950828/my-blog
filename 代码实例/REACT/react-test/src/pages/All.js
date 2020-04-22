import React from "react";
import { useLocation } from "react-router-dom";

function All() {
  const location = useLocation();
  // pathname: "/guodu1"
  // search: ""
  // hash: ""
  // state: undefined
  console.log(location);
  return <div>all 404</div>;
}

export default All;
