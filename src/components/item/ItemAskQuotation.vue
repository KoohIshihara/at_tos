<template lang="pug">
  transition
    div(v-if="showInput").wrap-item-ask-quotation
      v-textarea(v-model="value" label="メッセージを入力" rows="3" dark).mb12
      div.f.fc
        span(@click="onOK").ok.py14.fz16 書けたよ
</template>

<style lang="scss" scoped>
.wrap-item-ask-quotation {
  width: 80%;
  margin: 0 auto;
  .ok {
    width: 120px;
    text-align: center;
    color: #fff;
    border: solid #fff 1px;
    border-radius: 48px;
    cursor: pointer;
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
    currentEvent: {
      type: Object,
      required: true
    },
    showInput: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      value: ""
    }
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  methods: {
    async onOK () {
      let messageObj = {
        value: this.value,
        createdBy: this.uid,
        createdAt: new Date(),
        published: true
      }
      if (this.$route.params.id) messageObj.channelId = this.$route.params.id
      db.collection("MESSAGE").add(messageObj)
      this.$parent.showInput = false
      this.$emit("triggerEventScenario", this.currentEvent.next)
      this.$emit("resetMessage")
    }
  }
}
</script>
