<template lang="pug">
  transition
    div(v-if="showInput").wrap-item-input-selection.f.fm.flex-around
      span(v-for="item in currentEvent.selection"
        @click="onSelection(item.next, item.label)").selection.py14.fz16 {{item.label}}
</template>

<style lang="scss" scoped>
.wrap-item-input-selection {
  width: 80%;
  max-width: 480px;
  height: 100%;
  margin: 0 auto;
  .selection {
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
  methods: {
    onSelection (next, label) {
      this.$parent.showInput = false

      const selection = this.currentEvent.selection.filter(s => {
        return s.label === label
      })[0]
      if (selection.action) this.$emit("triggerAction", selection.action)
      this.$emit("triggerEventScenario", next)
      this.$emit("resetMessage")
    }
  }
}
</script>
