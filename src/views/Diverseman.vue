<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="loginFailed" :redirectWithLoginFailed="false")
    div.wrap-diverseman
      //- v-icon(@click="signOut" color="#fff") mdi-home
      ModuleDiverseman(v-if="!nowLoading")
      NowLoading(:show="nowLoading")
</template>

<style lang="scss" scoped>
.wrap-diverseman {
  width: 100%;
  height: 100vh;
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import Auth from "@/components/shared/Auth"
import NowLoading from "@/components/shared/NowLoading"
import ModuleDiverseman from "@/components/module/ModuleDiverseman"

export default {
  components: {
    Auth,
    ModuleDiverseman,
    NowLoading
  },
  data () {
    return {
      nowLoading: true
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  created () {
    
  },
  methods: {
    ...mapActionsAuth(["signOut", "signInAnonymously"]),
    onLoggedIn () {
      if (this.$route.params.id) {
        // just replace adderess bar
        gtag('event', 'viaSticker', {
          uid: this.uid,
          id: this.$route.params.id
        })
        history.replaceState('','','/')
        // console.log("onLoggedIn replaceState")
        // window.channelId = this.$route.params.id
        // this.$router.push("/")
      }
      this.nowLoading = false
    },
    async loginFailed () {
      const user = await this.signInAnonymously()      
    }
  }
}
</script>
