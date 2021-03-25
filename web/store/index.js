export const state = () => ({
  collapsed: false,
})

export const getters = {
  getterCollapsed: (state) => {
    return state.collapsed
  },
}

export const mutations = {
  changeCollapsed(state) {
    state.collapsed = !state.collapsed
  },
}
