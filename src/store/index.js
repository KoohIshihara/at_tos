import Vue from "vue"
import Vuex from "vuex"
import * as auth from "./auth"
import * as tmp from "./tmp"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: {
      namespaced: true,
      ...auth
    },
    tmp: {
      namespaced: true,
      ...tmp
    }
  }
})
