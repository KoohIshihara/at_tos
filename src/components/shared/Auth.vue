<template lang="pug">
  div
    slot(:sign-out="signOut")
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("auth")
export default {
  computed: {
    ...mapState([
      "uid",
      "isLoggedIn",
      "isAuthenticating",
      "roles",
      "isAnonymous"
    ])
  },
  props: {
    redirectWithLoginFailed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // Check if we should login again if authentication info changes
    isAuthenticating (isAuthenticating) {
      this.checkAuthStatus(
        isAuthenticating,
        this.isLoggedIn
      )
    },
    // Check if we should login again if isLoggedIn info changes
    isLoggedIn (isLoggedIn) {
      this.checkAuthStatus(
        this.isAuthenticating,
        isLoggedIn
      )
    }
  },
  created () {
    this.setupAuthStateHandler()

    // Check our auth status when we first start rendering
    this.checkAuthStatus(this.isAuthenticating, this.isLoggedIn)
  },
  methods: {
    ...mapMutations([
      "updateOnboardingData",
      "updateIsSigningOut",
      "updateAuthStatus"
    ]),
    ...mapActions(["setupAuthStateHandler", "signOut"]),

    // Check if we need to login, or if we are logged in
    async checkAuthStatus (isAuthenticating, isLoggedIn) {
      if (!isAuthenticating && !isLoggedIn) {
        this.$emit("loginFailed")
        if (this.redirectWithLoginFailed) {
          const path = encodeURIComponent(this.$route.path)
          this.$router.push(`/sign-in/${path}`)
        }
      } else if (isLoggedIn) {
        this.$emit("loggedIn")
      }

      // if (this.isAnonymous) {
      //   // mixpanel.identify(this.uid)
      //   mixpanel.register({
      //     userId: this.uid,
      //     name: "Anonymous"
      //   })
      //   mixpanel.people.set({
      //     "$last_login": new Date(),
      //     userId: this.uid,
      //     name: "Anonymous"
      //   })
      // } else {
      //   mixpanel.identify(this.uid)
      //   mixpanel.register({
      //     userId: this.uid,
      //     name: this.uid
      //   })
      //   mixpanel.people.set({
      //     "$last_login": new Date(),
      //     userId: this.uid,
      //     name: this.uid
      //   })
      // }
    }
  }
}
</script>
