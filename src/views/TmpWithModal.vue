<template lang="pug">
  Auth(:redirectWithLoginFailed="true")
    ModalController(ref="modalController")
      div.wrap-tmp
        div.py50
          p(@click="$router.push(`/tmp/${uid}`)").block to modal page
          p(@click="$refs['modalController'].openModalWindow('tmp')").block open modal window
          p(@click="logout").block Sign Out
</template>

<style lang="scss" scoped>
.wrap-tmp {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
import Auth from "@/components/shared/Auth"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import ModalController from "@/components/shared/ModalController"

export default {
  components: {
    Auth,
    ModalController
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  methods: {
    ...mapActionsAuth(["signOut"]),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push("/sign-in")
      }, 400)
    }
  }
}
</script>
