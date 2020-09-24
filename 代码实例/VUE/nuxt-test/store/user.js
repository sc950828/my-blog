export const state = () => ({
  age: 25
})

export const mutations = {
  increment(state) {
    state.age++
  },
  decrement(state) {
    state.age--
  }
}
