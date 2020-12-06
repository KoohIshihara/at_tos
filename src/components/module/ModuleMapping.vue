<template lang="pug">
  div.wrap-module-mapping.py40
    div.mapping-content
      v-text-field(label="ラベル" v-model="label")
      div.mb20
        ItemImgUploader(
          :imgId="imgId"
          ref="mediaUploader")
      div.mb20
        v-btn(@click="getLocation").mb4 位置情報取得
        span.block {{`lat: ${myPos.latitude} lng: ${myPos.longitude}`}}
      div.mb40
        div.f.flex-wrap
          div(v-for="item in stickerId").f.fm.mr6.mb4
            span.mr2 {{item}}
            v-icon(@click="removeId(item)") close
        div.f.fm
          v-text-field(label="id" v-model="id").mr6
          v-btn(@click="addId") 追加
      v-btn(@click="generateMarker") スポット生成
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-module-mapping {
  width: 100%;
  min-height: 100vh;
  .mapping-content {
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
  }
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import ItemImgUploader from "@/components/item/ItemImgUploader"

export default {
  components: {
    ItemImgUploader
  },
  computed: {
    ...mapStateAuth(["uid"]),
    imgId: () => {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var autoId = ''
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return autoId
    }
  },
  data () {
    return {
      label: "",
      myPos: {},
      stickerId: [],
      id: "s1"
    }
  },
  methods: {
    getLocation () {
      console.log("getLocation")
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getMyPos, (error) => {
          console.log("error:", error)
          alert("現在地が取得できません。ブラウザの位置情報設定が有効になっているかをご確認ください。")
        })
      } else { //Geolocation apiがサポートされていない場合
        alert("このブラウザでは現在地が取得できません")
      }
    },
    getMyPos (myPos) {
      this.myPos = {
        latitude: myPos.coords.latitude,
        longitude: myPos.coords.longitude
      }
    },
    addId () {
      this.stickerId.push(this.id)
      this.id = "s1"
    },
    removeId (target) {
      this.stickerId = this.stickerId.filter(id => {
        return id !== target
      })
    },
    async generateMarker () {
      console.log("send")

      let markerObj = {
        label: this.label,
        photo: this.$refs.mediaUploader.getImgUrl(),
        location: this.myPos,
        stickerId: this.stickerId,
        createdAt: new Date(),
        createdBy: this.uid
      }

      await db.collection("MARKER").add(markerObj)

      this.$refs.mediaUploader.uploadedImage = ""
      this.myPos = {}
      this.stickerId = []
      this.id = "s1"
      alert("マーキング完了！")
    }
  }
}
</script>
