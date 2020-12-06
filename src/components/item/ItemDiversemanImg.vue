<template lang="pug">
  div(:class="{'active': active}").wrap-diverseman.f.fc
    img(src="/img/diverseman.svg").img-diverseman
</template>

<style lang="scss" scoped>
.wrap-diverseman {
  position: absolute;
  width: 100%;
  height: 146px;
  top: calc(50vh - 73px);
  transition: top cubic-bezier(0, 0.55, 0.45, 1) 2000ms;
  &.active {
    top: 32px;
  }
  @keyframes rumble {
    0%   { transform: translate(0, 0); }
    // 25%  { transform: translate(0, 6px); }
    50%  { transform: translate(0, 12px); }
    // 75%  { transform: translate(0, -6px); }
    100% { transform:translate(0, 0); }
  }
  .img-diverseman {
    width: 100px;
    animation: rumble 8000ms linear infinite;
  }
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  props: {
    active: {
      type: Boolean,
      required: true
    }
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
