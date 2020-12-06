<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="loginFailed")
    NowLoading(:show="showNowLoading")
    div.wrap-sign-ui.f.fh
      div.sign-ui
        div.wrap-title.f.fc.mb30
          span.welcome tmpへようこそ！
        div.wrap-sign-in-ui.mb24
          SignIn(@signInSuccess="onLoggedIn")
        div.wrap-select-sign-in-up.f.fc
          span(v-if="$route.name === 'sign-up'" @click="$router.push('/sign-in')").fz12 サインイン
          span(v-if="$route.name === 'sign-in'" @click="$router.push('/sign-up')").fz12 サインアップ
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-sign-ui {
  width: 100%;
  height: 100vh;
  .sign-ui {
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
    .wrap-select-sign-in-up {
      color: $active_color;
    }
  }
}
</style>

<script>
import db, { firebase } from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
import Auth from "@/components/shared/Auth"
import SignIn from "@/components/sign-in/firebase-sign-in-ui"
import NowLoading from "@/components/shared/NowLoading"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  components: {
    Auth,
    SignIn,
    NowLoading
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    resultRedirect: null,
    redirectUrl: null,
    showNowLoading: true
  }),
  computed: {
    ...mapStateAuth(["isLoggedIn", "uid"])
  },
  mounted () {
    if (this.uid) this.$router.push("/tmp")
  },
  methods: {
    loginFailed () {
      this.showNowLoading = false
    },
    async onLoggedIn () {
      this.showNowLoading = false

      await this.sleepByPromise(0.8)
      let firebaseUser = await firebase.auth().currentUser
      console.log("firebaseUser:", firebaseUser)

      if (this.uid) {
        this.showNowLoading = true

        let user = await firebase.auth().currentUser
        let userDoc = await db.collection("USER").doc(this.uid).get()

        if (!userDoc.exists) {
          let userObj = {
            uid: user.uid,
            name: user.displayName,
            profile: "No Profile",
            iconURL: user.photoURL,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime
          }

          const defaultUserIcon = "https://firebasestorage.googleapis.com/v0/b/fir-tmp-project.appspot.com/o/public%2Faccount.png?alt=media&token=4ad2981f-61ac-42d9-a5ed-45eda74077d0"
          if (!userObj.iconURL) userObj.iconURL = defaultUserIcon

          await db.collection("USER")
            .doc(user.uid)
            .set(userObj)
        } // if (!userDoc.exists)

        this.showNowLoading = false

        const path = (this.$route.params.redirectPath) ? 
          decodeURIComponent(this.$route.params.redirectPath)
          : `/tmp`
        this.$router.push(path)
      }
    },
    signInSuccess (redirectUrl) {
      this.redirectUrl = redirectUrl
    },
    sleepByPromise (sec) {
      return new Promise(resolve => setTimeout(resolve, sec * 1000))
    }
  }
}
</script>
