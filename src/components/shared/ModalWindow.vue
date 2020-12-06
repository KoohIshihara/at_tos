<template lang="pug">
  transition(name="fade")
    div(v-if="showModal" @click="$emit('closeModalWindow')").wrap-modal.f.fh
      div(@click.stop).prevent-wrap.f.fc
        slot
</template>

<style lang="scss" scoped>
.wrap-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.4);
  overflow: scroll;
  .prevent-wrap {
    width: 90%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  }
}
</script>
