<template lang="pug">
  transition(name="fade")
    div(v-if="showModalPage"
      :style="`z-index: ${100 + index}`").wrap-modal-page
      div(@click.stop)
        slot
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-modal-page {
  position: absolute;
  width: 100%;
  min-height: 100%;
  left: 0;
  padding-top: 48px;
  z-index: 101;
  background: $primary_bg_color;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
  transform: translateX(0%);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>

<script>
export default {
  props: {
    showModalPage: {
      type: Boolean,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
