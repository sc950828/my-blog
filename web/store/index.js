export const state = () => ({
  collapsed: false,
  user: null,
})

export const getters = {
  getterCollapsed: (state) => {
    return state.collapsed
  },
  getterUser: (state) => {
    return state.user
  },
}

export const mutations = {
  changeCollapsed(state) {
    state.collapsed = !state.collapsed
  },
  changeUser(state, payload) {
    state.user = payload
  },
}
