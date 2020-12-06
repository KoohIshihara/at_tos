<template lang="pug">
  transition
    div(v-if="show").wrap-now-loading.f.fh
      v-progress-circular(indeterminate color="#fff")
</template>

<style lang="scss" scoped>
.wrap-now-loading {
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
}
/* アニメーション中のスタイル */
.v-leave-active,
.v-enter-active {
  transition: opacity 0.4s;
}

/* 表示アニメーション */
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}

/* 非表示アニメーション */
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>
