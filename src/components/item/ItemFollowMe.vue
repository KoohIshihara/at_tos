<template lang="pug">
  transition
    div(v-if="showFollowMe" :class="{'active': active}").wrap-item-follow-me.f.fh
      div.follow-me-content.f.flex-around
        a(href="https://twitter.com/diverseman_y" target="brank").twitter
          v-icon(size="42px" color="#fff") mdi-twitter
        a(href="https://www.instagram.com/diverse.man.you" target="brank").instagram
          v-icon(size="42px" color="#fff") mdi-instagram
</template>

<style lang="scss" scoped>
.wrap-item-follow-me {
  width: 100%;
  height: 100%;
  transition: all ease-out 800ms;
  opacity: 0.0;
  &.active {
    opacity: 1.0;
  }
  .follow-me-content {
    width: 120px;
    @keyframes rumble1 {
      0%   { transform: translate(0, -4px); }
      25%  { transform: translate(0, 0px) scale(1.2); }
      50%  { transform: translate(0, 4px) scale(1); }
      75%  { transform: translate(0, 0px) scale(1.2); }
      100% { transform:translate(0, -4px); }
    }
    @keyframes rumble2 {
      0%   { transform: translate(0, 4px); }
      25%  { transform: translate(0, 0px) scale(1.2); }
      50%  { transform: translate(0, -4px) scale(1.0); }
      75%  { transform: translate(0, 0px) scale(1.2); }
      100% { transform:translate(0, 4px); }
    }
    .twitter {
      animation: rumble1 4000ms linear infinite;
    }
    .instagram {
      animation: rumble2 4000ms linear infinite;
    }
  }
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
    showFollowMe: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.active = true
    }, 800)
  }
}
</script>
