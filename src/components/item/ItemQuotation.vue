<template lang="pug">
  transition
    div(v-if="showQuotation").wrap-item-quotation.py20
      div.quotation-content.pl8
        span.fz14 {{quotation}}
</template>

<style lang="scss" scoped>
.wrap-item-quotation {
  position: relative;
  width: 92%;
  max-width: 480px;
  margin: 0 auto;
  // opacity: 0.0;
  // transition: all ease-out 800ms;
  // &.active {
  //   opacity: 1.0;
  // }
  .quotation-content {
    width: 90%;
    max-height: 64px;
    margin: 0 auto;
    border-left: solid #fff 4px;
    overflow: scroll;
    span {
      color: #fff;
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

export default {
  props: {
    showQuotation: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      quotation: ""
      // active: false
    }
  },
  async created () {
    let quotations = await db.collection("MESSAGE")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then(q => {
        return q.docs.map(d => { return d.data().value })
      })
    this.quotation = quotations[Math.floor(Math.random() * quotations.length)]
    if (this.quotation === "") this.quotation = "No Message"
  },
  mounted () {
    // setTimeout(() => {
    //   this.active = true
    // }, 800)
  }
}
</script>
