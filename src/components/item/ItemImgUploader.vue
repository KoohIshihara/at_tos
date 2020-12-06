<template lang="pug">
  div(@click="pickImg").wrap-add-text-record.f.fm
    input(type="file" v-on:change="onFileChange" ref="imgInput" accept="image/*" style="display: none")
    canvas(id="imgCanvas" ref="imgCanvas" width="0" height="0" style="display: none")
    div(v-if="uploadedImage === ''").button-upload.f.fh
      v-icon(v-if="!isUploading" color="#999") add
      v-progress-circular(v-else size="18" indeterminate color="#999")
    div(v-else)
      img(:src="uploadedImage").object-fit-cover
</template>

<style lang="scss" scoped>
.wrap-add-text-record {
  display: inline-flex;
  border-radius: 3px;
  .label {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
  canvas {
    display: none;
  }
  .button-upload {
    border: solid 0.6px rgba(0, 0, 0, 0.2);
    border-radius: 9px;
    width: 240px;
    height: 120px;
  }
}
</style>

<script>
import { strage } from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")

export default {
  props: {
    existingImg: {
      type: String,
      required: false
    },
    imgId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      uploadedImage: '',
      imgOrientation: 1,
      isUploading: false
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  created () {
    console.log('strage', strage)
    if (this.existingImg) this.uploadedImage = this.existingImg
  },
  methods: {
    pickImg () {
      this.$refs.imgInput.click()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files

      // get orientation
      const getOrientation = buffer => {
        const dv = new DataView(buffer)
        let app1MarkerStart = 2
        // もし JFIF で APP0 Marker がある場合は APP1 Marker の取得位置をずらす
        if (dv.getUint16(app1MarkerStart) !== 65505) {
          const length = dv.getUint16(4)
          app1MarkerStart += length + 2
        }
        if (dv.getUint16(app1MarkerStart) !== 65505) {
          return 0
        }
        // エンディアンを取得
        const littleEndian = dv.getUint8(app1MarkerStart + 10) === 73
        // フィールドの数を確認
        const count = dv.getUint16(app1MarkerStart + 18, littleEndian)
        for (let i = 0; i < count; i++) {
          const start = app1MarkerStart + 20 + i * 12
          const tag = dv.getUint16(start, littleEndian)
          // Orientation の Tag は 274
          if (tag === 274) {
            // Orientation は Type が SHORT なので 2byte だけ読む
            return dv.getUint16(start + 8, littleEndian)
          }
        }
        return 0
      }
      var reader = new FileReader()

      reader.addEventListener('load', () => {
        const orientation = getOrientation(reader.result)
        console.log(orientation)
        this.setImgOrientation(orientation)
      })
      // ArrayBuffer で読みたいのでこちら
      reader.readAsArrayBuffer(files[0])

      this.createImage(files[0])
    },
    // アップロードした画像を表示
    createImage (file) {
      // 画像リサイズ後の最大値の幅
      const THUMBNAIL_WIDTH = 1200
      const THUMBNAIL_HEIGHT = 1200

      var imgCanvas = this.$refs.imgCanvas

      var image = new Image()
      var reader = new FileReader()
      reader.onload = (e) => {
        // this.uploadedImage = e.target.result
        this.isUploading = true

        image.onload = () => {
          var width, height, ratio
          if (image.width > image.height) {
            // 横長の画像は横のサイズを指定値にあわせる
            ratio = image.height / image.width
            width = THUMBNAIL_WIDTH
            height = THUMBNAIL_WIDTH * ratio
          } else {
            // 縦長の画像は縦のサイズを指定値にあわせる
            ratio = image.width / image.height
            width = THUMBNAIL_HEIGHT * ratio
            height = THUMBNAIL_HEIGHT
          }

          // var canvas = document.getElementById("imgCanvas")
          // var imgCanvas = document.createElement("canvas")
          imgCanvas.setAttribute('width', width)
          imgCanvas.setAttribute('height', height)

          var ctx = imgCanvas.getContext('2d')

          if ([5, 6, 7, 8].indexOf(this.imgOrientation) > -1) {
            imgCanvas.width = height
            imgCanvas.height = width
          } else {
            imgCanvas.width = width
            imgCanvas.height = height
          }
          switch (this.imgOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break
            case 7: ctx.transform(0, -1, -1, 0, height, width); break
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break
          }

          // canvasに既に描画されている画像をクリア
          ctx.clearRect(0, 0, width, height)
          // canvasにサムネイルを描画
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
        }
        // image.onload = this.createBase64
        image.src = e.target.result
        setTimeout(this.uploadImg, 400)
      }
      reader.readAsDataURL(file)
    },
    async uploadImg () {
      var base64 = this.$refs.imgCanvas.toDataURL()

      // this.uploadedImage = base64

      // ストレージオブジェクト作成
      var strageRef = strage.ref()
      // ファイルのパスを設定
      var imgRef = strageRef.child(`post/${this.uid}/${this.imgId}.png`)
      // ファイルを適用してファイルアップロード開始
      //  imgRef.put(this.imageFile).then(snapshot => {
      var imgUrl = await imgRef.putString(base64.split(',')[1], 'base64').then(async (snapshot) => {
        var url = await snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          this.isUploading = false
          this.uploadedImage = downloadURL
          this.$emit('updateNodeContent', this.uploadedImage)
          return downloadURL
        })
        return url
      })
      console.log('imgUrl:', imgUrl)

      this.$emit('afterUpload', {imgUrl, base64})
    },
    getImgUrl () {
      return this.uploadedImage
    },
    setImgOrientation (orientation) {
      this.imgOrientation = orientation
    }
  }
}
</script>
