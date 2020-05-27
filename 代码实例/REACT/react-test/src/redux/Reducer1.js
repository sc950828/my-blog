// Reducer 基于原有state根据action得到新的state
export default function counter(state = { count: 0 }, action) {
  // 只能访问到自身的状态 不能访问到别的reducer里面的state
  // console.log(state);
  // 获取action对象 {type: "increase", qq: "randy"}
  console.log(action);
  const count = state.count;
  switch (action.type) {
    case "increase":
      return { ...state, count: count + 1 };
    case "getListByThunk":
      return {...state, todolistsByThunk: action.data}
    case "getListBySaga":
      return {...state, todolistsBySaga: action.data}
    default:
      return state;
  }
}
