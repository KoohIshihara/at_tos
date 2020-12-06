<template lang="pug">
  div
    div(id="firebaseui-auth-container")
</template>

<script>
import { firebase } from "@/components/utils/firebase"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  data () {
    return {
      isSignInUILoaded: false,
      isSignUp: false
    }
  },
  watch: {
    $route (to, from) {
      this.isSignUp = (to.name === "sign-up")
      if (this.isSignUp) {
        setTimeout(this.replaceSignInText, 10)
      }
      if (!this.isSignUp) {
        setTimeout(this.replaceSignUpText, 10)
      }
    }
  },
  created () {
    if (this.$route.name.indexOf("sign-up") !== -1) this.isSignUp = true
  },
  mounted () {
    this.$nextTick(() => {
      this.setupSignInUi()
    })
  },
  methods: {
    setupSignInUi () {
      const vInstance = this
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
          uiShown () {
            vInstance.isSignInUILoaded = true
          },
          signInSuccess: (authResult, redirectUrl) => {
            this.$emit("signInSuccess", redirectUrl)
            // console.log("authResult", authResult)
            return false
          }
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
          },
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
          }
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: "https://truffle.ai/terms.pdf",
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
          // window.location.assign("<your-privacy-policy-url>")
          location.href = "https://truffle.ai/privacy.pdf"
        }
      }

      // Initialize the FirebaseUI Widget using Firebase.

      // The start method will wait until the DOM is loaded.

      // this.$nextTick(() => {
      //   ui.start("#firebaseui-auth-container", uiConfig)
      // })

      setTimeout(() => {
        ui.start("#firebaseui-auth-container", uiConfig)
        // if (this.isSignUp) setTimeout(this.replaceSignInText, 10)
      }, 800)
    }
  }
}
</script>

<style>
/* Collapse height of firebase ui loading spinner container */
.mdl-card .firebaseui-callback-indicator-container {
  height: 2px;
}

/* Collapse height of firebase ui loading spinner container */
.mdl-card.firebaseui-container {
  min-height: 2px;
}
</style>
