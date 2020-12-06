<template lang="pug">
  transition
    div(v-if="showInput").wrap-item-input-tags
      div.wrap-tags.section.f.fh
        div.f.fc.flex-wrap
          div(v-for="tag in tags").tag.f.fm.px8.py6.mr12.mt12
            span.fz14.pt1.mr2 {{`#${tag}`}}
            v-icon(@click="removeTag(tag)" size="18px" dark) close
      div.wrap-input.section.f.fh
        div.input
          div.f.fm
            v-text-field(v-model="tagValue" label="タグを入力" dark).mr4
            v-icon(v-if="showAdd" @click="addCircle" size="28px" dark).pt10 add_circle
          span.block.fz12 例：学生、ヒップホップ、きのこ派、etc
          span.block.fz12 特徴でも好きなものでもなんでもいいですよ
      div.wrap-ok.section.f.fh
        span(v-if="showOK" @click="onOK").ok.py14 決定
</template>

<style lang="scss" scoped>
.wrap-item-input-tags {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  .section {
    height: 33%;
  }
  .wrap-tags {
    // height: 40%;
    overflow: scroll;
    .tag {
      color: #fff;
      border: solid #fff 1px;
      border-radius: 48px;
    }
  }
  .wrap-input {
    // height: 30%;
    .input {
      width: 240px;
    }
    span {
      color: #fff;
    }
  }
  .wrap-ok {
    // height: 30%;
    span {
      width: 120px;
      text-align: center;
      color: #fff;
      border: solid #fff 1px;
      border-radius: 48px;
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

<style lang="scss">
.wrap-item-input-tags {
  .v-text-field__details {
    display: none;
  }
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")

export default {
  computed: {
    ...mapStateAuth(["uid"])
  },
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
      tags: [],
      tagValue: "",
      showOK: false,
      showAdd: true
    }
  },
  watch: {
    tags () {
      this.showOK = (this.tags.length > 0) ? true : false
      this.showAdd = (this.tags.length === 3) ? false: true
    }
  },
  methods: {
    addCircle () {
      if (this.tagValue === "") return
      this.tags.push(this.tagValue)
      this.tagValue = ""
    },
    removeTag (tag) {
      this.tags = this.tags.filter(t => { return t !== tag })
    },
    onOK () {
      for (let i = 0; i < this.tags.length; i++) {
        let tagObj = { 
          name: this.tags[i],
          createdBy: this.uid,
          createdAt: new Date(),
          published: true
        }
        if (this.$route.params.id) tagObj.channelId = this.$route.params.id
        db.collection("TAG").add(tagObj)
      }
      this.$parent.showInput = false
      this.$emit("triggerEventScenario", this.currentEvent.next)
      this.$emit("resetMessage")
    }
  }
}
</script>
