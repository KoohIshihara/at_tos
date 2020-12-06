import { firebase } from "@/components/utils/firebase"
// import { firestore } from "~/components/firestore"
// import * as Sentry from "@sentry/browser"
// import { collections } from "~/components/vars"

export const state = () => ({
  userDisplayName: null,
  userAuthEmail: null,
  isAuthenticating: true,
  isLoggedIn: false,
  isSigningOut: false,
  uid: null,
  subscriptionEnder: null,
  isAnonymous: null
})

export const mutations = {
  updateUid (state, value) {
    state.uid = value
  },
  updateUserDisplayName (state, value) {
    state.userDisplayName = value
  },
  updateIsAuthenticating (state, value) {
    state.isAuthenticating = value
  },
  updateIsLoggedIn (state, value) {
    state.isLoggedIn = value
  },
  updateIsSigningOut (state, value) {
    state.isSigningOut = value
  },
  updateAuthStatus (state, user) {
    const isLoggedIn = !!user
    const hasAuthEmail = !!user && !!user.email
    state.userDisplayName = isLoggedIn ? user.displayName : null
    state.uid = isLoggedIn ? user.uid : null
    state.userAuthEmail = hasAuthEmail ? user.email : null
    state.isAuthenticating = false
    state.isLoggedIn = isLoggedIn
    state.isSigningOut = false
    state.isAnonymous = user ? user.isAnonymous : null
  },
  resetState (state) {
    state.isLoggedIn = false
    state.isAuthenticating = true
    state.userAuthEmail = null
    state.isSigningOut = false
    state.userDisplayName = null
    state.isAnonymous = null
  },
  updateSubscriptionEnder (state, value) {
    state.subscriptionEnder = value
  }
}

export const actions = {
  setupAuthStateHandler ({ dispatch, commit, state }) {
    const shouldSetupAuthstate =
      !state.isLoggedIn && state.isAuthenticating && !state.isSigningOut
    if (shouldSetupAuthstate) {
      const ender = firebase.auth().onAuthStateChanged(user => {
        commit('updateAuthStatus', user)
      })

      commit('updateSubscriptionEnder', ender)
    }
  },
  endSubscription ({ state, commit }) {
    if (state.subscriptionEnder) {
      state.subscriptionEnder()
      commit('updateSubscriptionEnder', null)
    }
  },
  async signOut ({ commit, dispatch }) {
    commit('updateIsSigningOut', true)
    try {
      dispatch('endSubscription')
      await firebase.auth().signOut()
      commit('resetState')
    } catch (err) {
      console.error('error signing out of firebase', err)
    } finally {
      commit('updateIsSigningOut', false)
    }
  },
  async signInAnonymously ({ commit }) {
    return new Promise(async resolve => {
      await firebase.auth().signInAnonymously().catch(function (error) {
        console.error('Login anonymously error: ', error)
      })
      var user = await firebase.auth().currentUser
      commit('updateAuthStatus', user)
      resolve(user)
    })
  }
}
