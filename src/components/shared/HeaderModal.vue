<template lang="pug">
  div.wrap-header-modal
    div.header-modal-content
      div(@click="$emit('onLeft')").left.f.fm
        div(v-if="client").wrap-icon.f.fm.mr8
          img(:src="client.photoURL")
        span(v-if="client").name.pt1 {{client.name}}
      div(@click="$emit('onRight')").right.f.fm
        div(v-if="rightIcon").f.fm
          v-icon(size="20px" color="#fff").mr4 {{rightIcon.icon}}
          span {{rightIcon.label}}

</template>

<style lang="scss" scoped>
.wrap-header-modal {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #2a2a2a;
  .header-modal-content {
    position: relative;
    width: 93%;
    max-width: 820px;
    height: 100%;
    margin: 0 auto;
    .header-label {
      color: #fff;
      text-align: center;
    }
    .left {
      position: absolute;
      left: 0;
      height: 100%;
      .wrap-icon {
        width: 26px;
        height: 26px;
        overflow: hidden;
        border-radius: 50%;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #fff;
      }
    }
    .right {
      position: absolute;
      right: 0;
      height: 100%;
      span {
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  props: {
    rightIcon: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      client: null
    }
  },
  async created () {
    this.client = await this.getClientByUid(this.$route.params.clientId)
  },
  methods: {
    ...mapActionsAuth(['getClientByUid'])
  }
}
</script>
