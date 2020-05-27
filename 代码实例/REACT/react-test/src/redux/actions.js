import axios from 'axios'

export const getDataByThunk = ({id}) => {
  return (dispatch) => {
    axios.get("http://jsonplaceholder.typicode.com/posts" + `/${id}`).then(res => {
      dispatch({
        type: "getListByThunk",
        data: res.data
      })
  })
  } 
}
