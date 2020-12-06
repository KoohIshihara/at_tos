<template lang="pug">
  Auth
    div.wrap-shared-header.f.fc
      div.header-content.f.fh
        div(v-if="content.left" @click="onLeft").left.f.fm
          v-icon(:color="content.left.color").mr4 {{content.left.icon}}
          span(:style="`color: ${content.left.color};`").fz14 {{content.left.label}}
        div.wrap-title
          span(v-if="content.title").line-clamp-1.fz14 {{content.title}}
        div(v-if="content.right" @click="onRight").right.f.fm
          span(:style="`color: ${content.right.color};`").fz14.mr4 {{content.right.label}}
          v-icon(:color="content.right.color") {{content.right.icon}}
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-shared-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  background: $primary_bg_color;
  border-bottom: solid $border_size $border_color;
  z-index: 1000;
  .header-content {
    position: relative;
    width: $base_width_percent;
    max-width: $base_max_width_px;
    height: 100%;
    // margin: 0 auto;
    .left {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      color: $primary_text_color;
    }
    .wrap-title {
      max-width: 160px;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      color: $primary_text_color;
    }
  }
}
</style>

<script>
import Auth from "@/components/shared/Auth"

export default {
  components: {
    Auth
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    onLeft () {
      this.content.left.to && this.$router.push(this.content.left.to)
      this.content.left.action && this.content.left.action()
    },
    onRight () {
      this.content.right.to && this.$router.push(this.content.right.to)
      this.content.right.action && this.content.right.action()
    }
  }
}
</script>
