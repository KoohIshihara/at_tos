import db, { firebase } from "@/components/utils/firebase"

export const state = () => ({
  test: null
})

export const mutations = {
  test(state, value) {
    state.test = value
  }
}

export const actions = {
  async test({ dispatch, commit }, test) {
    return new Promise(async resolve => {
      commit('test', test)
    })
  }
}
