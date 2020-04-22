import React from "react";
import {useParams} from 'react-router-dom'

function Child() {
  let { name } = useParams();

  return <div>child 参数是{name}</div>;
}

export default Child;
