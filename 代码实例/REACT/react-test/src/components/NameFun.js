import React from "react";

function NameFun(props) {
  const names = ["randy", "demi", "jack"];
  const lis = names.map(name => {
    return <li key={name}>{name.toUpperCase()}</li>;
  });
  return (
    <div>
      <p>
        hello {props.name}，我是函数组件。我是无状态组件。时间是
        {props.date.toLocaleDateString()}
      </p>
      {lis}
      <ul>{}</ul>
    </div>
  );
}

export default NameFun;
