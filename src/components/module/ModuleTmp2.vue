<template lang="pug">
  div.wrap-tmp
    p module tmp 2
    //- p(@click="$emit('closeModalPage')") close moadal page
</template>

<style lang="scss" scoped>
.wrap-tmp {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")

export default {
  components: {
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  data () {
    return {
      
    }
  },
  methods: {
  }
}
</script>
