<template lang="pug">
  transition
    div(v-if="show").wrap-item-message
      div.wrap-message.block
        span.name.px12.py4.fz12.bold ダイバースマン
        div.message.pt22
          //- span(ref="line0").block.fz14.mb2 どうも、こんにちは。ダイバースマンです。
          //- span(v-for="p in message").block.fz14.mb2 {{p}}
          span(ref="line0").block.fz14.mb2 {{line0}}
          span(ref="line1").block.fz14.mb2 {{line1}}
          span(ref="line2").block.fz14 {{line2}}
        div(v-if="showIcon").next-icon
          v-icon(v-if="currentEvent.type === 'normal'" dark size="14px") double_arrow
          v-icon(v-if="currentEvent.type !== 'normal'" dark size="14px") help
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-item-message {
  position: relative;
  top: calc(146px + 32px + 32px);
  background: rgba(0, 0, 0, 0.6);
  .wrap-message {
    position: relative;
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
    border: solid #fff 1px;
    border-radius: 3px;
    height: 106px;
    .name {
      position: absolute;
      left: 10px;
      top: -12px;
      background: #fff;
      border-radius: 3px;
    }
    .message {
      width: 90%;
      margin: 0 auto;
      span {
        color: #fff;
      }
    }
    .next-icon {
      position: absolute;
      right: 8px;
      bottom: 4px;
      cursor: pointer;
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
import ShuffleText from "shuffle-text"

export default {
  props: {
    currentEvent: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: false,
      message: [],
      line0: "",
      line1: "",
      line2: "",
      showIcon: false,
      durationPerChar: 80,
      replaceCharTimer: null
    }
  },
  watch: {
    currentEvent () {
      this.message = this.currentEvent.message
    },
    async message () {
      // console.log("change msg:", this.currentEvent.message)
      if (this.randomlyReplaceChar) clearInterval(this.replaceCharTimer)
      // this.message = []
      this.line0 = ""
      this.line1 = ""
      this.line2 = ""
      this.showIcon = false

      for (let i = 0; i < this.message.length; i++) {
        this.updateLine(i)
        await this.sleepByPromise(this.message[i].length * this.durationPerChar)
      }
      this.replaceCharTimer = setInterval(this.randomlyReplaceChar, 3000)
      this.showIcon = true
    }
  },
  mounted () {
    this.show = true
    this.message = this.currentEvent.message
  },
  methods: {
    updateLine (i) {
      if (i === 0) this.line0 = this.message[i]
      if (i === 1) this.line1 = this.message[i]
      if (i === 2) this.line2 = this.message[i]
      // console.log("updateLine:", i)
      this.$nextTick(async () => {
        const targetElem = this.$refs[`line${i}`]
        // if (targetElem) {
          targetElem.innerText = this.message[i] // これ入れないと挙動が変
          const shuffleText = new ShuffleText(targetElem)
          shuffleText._originalStr = this.message[i]
          // console.log(shuffleText._originalStr)
          shuffleText.duration = this.message[i].length * this.durationPerChar
          shuffleText.start()
        // }
      })
    },
    async randomlyReplaceChar () {
      // console.log("randomlyReplaceChar")
      const i = this.random(0, this.message.length)
      const targetElem = this.$refs[`line${i}`]
      const targetLine = this[`line${i}`]
      const charArr = ["私", "俺", "僕", "我", "君", "L", "G", "B", "T", "Q"]
      const char = charArr[Math.floor(Math.random() * charArr.length)];
      const charBefore = targetLine[this.random(0, targetLine.length-1)]
      if (targetElem) {
        if (targetElem.innerText) targetElem.innerText = targetLine.replace(charBefore, char)
        await this.sleepByPromise(300)
        if (targetElem.innerText) targetElem.innerText = targetLine
      }
    },
    async resetMessage () {
      // console.log("resetMessage")
      this.message = []
      this.line0 = ""
      this.line1 = ""
      this.line2 = ""
      this.$refs.line0.innerText = ""
      this.$refs.line1.innerText = ""
      this.$refs.line2.innerText = ""
      clearInterval(this.replaceCharTimer)
    },
    sleepByPromise (msec) {
      return new Promise(resolve => setTimeout(resolve, msec))
    },
    random (max, min) {
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}
</script>
