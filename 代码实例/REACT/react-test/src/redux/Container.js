import React from "react";
import { connect } from "react-redux";
import { getDataByThunk } from "./actions";

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
      updateName,
      getDataByThunk,
      getDataBySaga
    } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}> +1</button>
        <span>{name1}</span>
        <button onClick={updateName}> updateName</button>
        <span>{age}</span>
        <button onClick={updateAge}> updateAge</button>
        <button onClick={getDataByThunk}>使用redux-thunk获取数据</button>
        <button onClick={getDataBySaga}>使用redux-saga获取数据</button>
      </div>
    );
  }
}

//  将state映射到Container组件的props
function mapStateToProps(state) {
  // 这里是store里面的state 获取的是所有reducer里面的state {Reducer1: {…}, Reducer2: {…}}
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
    updateAge: () => dispatch({ type: "updateage" }),
    //提交action方法  方法是异步请求 请求成功然后dispatch更改state的action 这是redux-thunk的用法
    getDataByThunk: () => dispatch(getDataByThunk({ id: 10 })),
    // 使用saga获取数据
    getDataBySaga: () =>
      dispatch({ type: "GET_DATA_BY_SAGA", payload: { id: 10 } })
  };
}

// 传入上面两个函数参数，将Container组件变为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Container);
