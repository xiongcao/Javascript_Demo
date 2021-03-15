import { createStore } from 'vuex'
import app from './app'
import user from './user'

const store = createStore({
  modules: {
    app,
    user
  }
})

export default store;