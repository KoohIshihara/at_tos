<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="loginFailed" :redirectWithLoginFailed="false")
    div.wrap-mapping
      ModuleMapping(v-if="!nowLoading")
      NowLoading(:show="nowLoading")
</template>

<style lang="scss" scoped>
.wrap-mapping {
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
import ModuleMapping from "@/components/module/ModuleMapping"

export default {
  components: {
    Auth,
    ModuleMapping,
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
      this.nowLoading = false
    },
    async loginFailed () {
      const user = await this.signInAnonymously()      
    }
  }
}
</script>
