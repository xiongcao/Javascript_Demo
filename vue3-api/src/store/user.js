export default {
  namespaced: true,
  state: {
    name: 'JS'
  },
  mutations: {
    setName(state, payload) {
      state.name = payload
    }
  },
  actions: {
  }
}