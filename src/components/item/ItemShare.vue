<template lang="pug">
  transition
    div(v-if="showShare").wrap-item-share.f.fh
      div.share-content
        a(:href="twitterURL"
          :data-url="url"
          data-lang="ja"
          target="_about").f.fm.mb8.px12.py4
          v-icon(color="#fff").mr4 mdi-twitter
          span.btn-label.fz14.pt2 Twitterでシェア
        a(:href="`http://www.facebook.com/share.php?u=${url}`"
          rel="nofollow"
          target="_blank").f.fm.mb8.px12.py4
          v-icon(color="#fff").mr4 mdi-facebook
          span.btn-label.fz14.pt2 Facebookでシェア
        a(v-clipboard:copy="url" v-clipboard:success="onCopyLink").f.fm.px12.py4
          v-icon(color="#fff").mr4 mdi-link-variant
          span.btn-label.fz14.pt2 リンクをコピー
</template>

<style lang="scss" scoped>
.wrap-item-share {
  width: 100%;
  height: 100%;
  .share-content {
    width: 200px;
    a {
      border: solid rgba(255, 255, 255, 0.8) 1px;
      border-radius: 9px;
      .btn-label {
        color: #fff;
      }
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
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  props: {
    showShare: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      hashtag: "ダイバースマン"
    }
  },
  computed: {
    ...mapStateAuth(["uid"]),
    url () {
      return `${location.href}shared`
    },
    twitterURL () {
      return `//twitter.com/share?hashtags=${this.hashtag}&url=${this.url}`
    }
  },
  async created () {

  },
  methods: {
    onCopyLink () {
      alert("リンクをコピーしたよ。")
    }
  }
}
</script>
