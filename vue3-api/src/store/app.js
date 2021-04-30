export default {
  namespaced: true,
  state: {
    count: 1,
    message: 'hello world',
    list: new Map([
      ['a', 1]
    ])
  },
  mutations: {
    setCount(state, payload) {
      state.count = payload
    },
    setMessage(state, payload) {
      state.message = payload
    }
  },
  getters: {
    getInfo: (state, getters) => {
      return state.message + ' ' + state.count;
    }
  },
  actions: {
    postCount({ commit, state, rootState }) {
      commit('setMessage', state.message + ' ' + rootState.user.name + ' ')
    }
  }
}