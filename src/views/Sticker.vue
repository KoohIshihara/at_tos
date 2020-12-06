<template lang="pug">
  div.page
    div#sticker.wrap-sticker.f.flex-between.flex-wrap
      div(v-if="stickers" v-for="item in stickers").sticker-grid
        div.qr
          img(:src="item.src")
        span.id.fz6 {{item.url.split("https://diverseman.wiki/")[1]}}
        div.bg
          img(src="/img/sticker-bg.jpg")
      div(@click="downloadPDF" v-if="showBtn").download-btn.f.fc
        span.px20.py14 Download PDF (A4)
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  // position: relative;
}
.wrap-sticker {
  position: relative;
  width: calc(210mm / 1.344);
  height: calc(297mm / 1.344);
  left: 0.5mm;
  top: 0.7mm;
  // width: 210mm;
  // height: 297mm;
  overflow: hidden;
  size: A4 landscape;
  page-break-before: always;
  // background: #005;
  margin: 0 auto;
  .sticker-grid {
    position: relative;
    width: 50%;
    // width: calc(210mm / 2);
    // height: calc(297mm / 3);
    // background-image: url("/img/sticker-bg.svg");
    .qr {
      position: absolute;
      z-index: 10;
      width: 22%;
      top: 29%;
      left: 40%;
      // width: 24mm;
      // height: 24mm;
      // left: 41.5mm;
      // top: 29.5mm;
      border-radius: 18px;
      overflow: hidden;
      img {
        transform: scale(1.1);
      }
    }
    .id {
      position: absolute;
      z-index: 10;
      right: 4%;
      bottom: 4%;
      color: #fff;
      font-family: sans-serif;
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // width: 105mm;
      // height: 99mm;
      img {
        // width: 105mm;
        // height: 99mm;
        // width: 100%;
        // height: 100%;
      }
    }
  }
  .download-btn {
    position: fixed;
    left: 0;
    bottom: 32px;
    width: 100%;
    span {
      font-family: sans-serif;
      background: rgba(255, 255, 255, 0.9);
      border: solid 0.8px;
      border-radius: 3px;
      cursor: pointer;
      filter: drop-shadow(2px 2px 1px rgba(0,0,0,.1));
    }
  }
}
</style>

<script>
import db from "@/components/utils/firebase"
import QRCode from "qrcode"
import { jsPDF } from "jspdf"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  data () {
    return {
      stickers: null,
      showBtn: true
    }
  },
  computed: {
    ...mapStateAuth(["uid"]),
    stickersURL: function () {
      return [
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`,
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`,
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`,
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`,
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`,
        `https://diverseman.wiki/${this.getUniqueStr('s1')}`
      ]
    }
  },
  async created () {
    let stickers = []
    for (let i = 0; i < this.stickersURL.length; i++) {
      let src = await this.getImageQR(this.stickersURL[i])
      stickers.push({
        url: this.stickersURL[i],
        src: src
      })
    }
    this.stickers = stickers

    window.exportPDF = this.downloadPDF
  },
  methods: {
    // async generateObjWithQR () {
    //   let src = await this.getImageQR(url)
    //   return { src, url }
    // },
    getImageQR (url) {
      return new Promise(resolve => {
        QRCode.toDataURL(url)
        .then(url => {
          return resolve(url)
        })
      })
    },
    downloadPDF () {
      this.showBtn = false

      let idArr = this.stickers.map(e => {
        return e.url.split("https://diverseman.wiki/")[1]
      })
      let stickerObj = {
        idArr,
        createdAt: new Date()
      }
      if (this.uid) stickerObj.createdBy = this.uid
      db.collection("STICKER").add(stickerObj)

      // const doc = new jsPDF("p","pt","a4")
      // doc.addHTML(document.body, () => {
      //   doc.save("html.pdf")
      // })

      const pdf = new jsPDF("p","pt","a4")
      pdf.setFont('san-serif')
      pdf.html(document.getElementById("sticker"), {
        callback: function () {
          pdf.save("ダイバースマンシール.pdf")
          // window.open(pdf.output("bloburl")) // to debug
        }
      })
      this.showBtn = true
    },
    getUniqueStr (prefix) {
      var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      var N = 4
      return prefix + Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n)=>S[n%S.length]).join('')
    }
  }
}
</script>
