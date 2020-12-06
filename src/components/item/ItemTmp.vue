<template lang="pug">
  div.wrap-item-tmp

</template>

<style lang="scss" scoped>
.wrap-item-tmp {
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  props: {
    // data: {
    //   type: Object,
    //   required: true
    // }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  async created () {

  },
  methods: {

  }
}
</script>
