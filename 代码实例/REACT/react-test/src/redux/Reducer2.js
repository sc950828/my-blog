// Reducer 基于原有state根据action得到新的state
export default function addAge(state = { age: 24, name1: "randy" }, action) {
  const age = state.age;
  const name1 = state.name1;
  console.log(action)
  switch (action.type) {
    case "updateage":
      return { ...state, age: age + 1 };
    case "updatename":
      return { ...state, name1: name1 + 1 };
    default:
      return state;
  }
}
