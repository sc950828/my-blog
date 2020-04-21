import React from "react";

function Child1(props) {
  if (!props.isShow) {
    return null;
  }
  return <div>is show 类似vue的v-if v-show</div>;
}

export default Child1;
