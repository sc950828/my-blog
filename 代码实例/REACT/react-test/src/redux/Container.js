import React from "react";
import { connect } from "react-redux";

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      onIncreaseClick,
      age,
      name1,
      updateAge,
      updateName
    } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}> +1</button>
        <span>{name1}</span>
        <button onClick={updateName}> updateName</button>
        <span>{age}</span>
        <button onClick={updateAge}> updateAge</button>
      </div>
    );
  }
}

//  将state映射到Container组件的props
function mapStateToProps(state) {
  // 这里是store里面的state
  console.log(state);
  return {
    value: state.Reducer1.count,
    name1: state.Reducer2.name1,
    age: state.Reducer2.age
  };
}

//  将action映射到Container组件的props
function mapDispatchToProps(dispatch, ownprops) {
  // 组件自身的props 有history location match staticContext
  console.log(ownprops);
  // history: {length: 50, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
  // location: {pathname: "/container", search: "", hash: "", state: undefined, key: "j3yu28"}
  // match: {path: "/container", url: "/container", isExact: true, params: {…}}
  // staticContext: undefined
  return {
    onIncreaseClick: () => dispatch({ type: "increase", qq: "randy" }),
    updateName: () => dispatch({ type: "updatename" }),
    updateAge: () => dispatch({ type: "updateage" })
  };
}

// 传入上面两个函数参数，将Container组件变为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Container);
