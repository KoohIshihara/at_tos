<template lang="pug">
  div.wrap-module-tmp
    div.tmp-content
      p module tmp
      //- p(@click="$emit('closeModalPage')") close moadal page
      p(@click="$router.push(`/tmp/${uid}/settings`)") to modal page 2
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-module-tmp {
  width: 100%;
  min-height: 100vh;
  .tmp-content {
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
  }
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
