<template lang="pug">
  div.wrap-item-p5-bg
    div(:class="{'active': showBG}")#p5Canvas
</template>

<style lang="scss" scoped>
.wrap-item-p5-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 0;
  overflow: hidden;
  #p5Canvas {
    opacity: 0.0;
    transition: all ease-out 800ms;
    &.active {
      opacity: 1.0;
    }
  }
}
</style>

<script>
import db from "@/components/utils/firebase"

export default {
  props: {
    showBG: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      tags: [],
      p5: null
    }
  },
  async created () {
    // this.tags = await db.collection("TAG")
    //   .where("published", "==", true)
    //   .limit(1000)
    //   .get()
    //   .then(q => { return q.docs.map(d => { 
    //     let tag = d.data()
    //     return tag
    //   })})  
  },
  async mounted () {
    this.tags = await db.collection("TAG")
      .where("published", "==", true)
      .limit(100)
      .get()
      .then(q => { 
        return q.docs.map(d => { 
          let tag = d.data()
          return tag
        })
      })

    const P5 = require("p5")
    new P5(this.bgScript)
  },
  methods: {
    bgScript (p5) {
      let speed = 2
      let posX = 0
      this.p5 = p5
      this.p5.setup = this.setup
      this.p5.draw = this.draw
    },
    setup () {
      let canvas = this.p5.createCanvas(this.p5.windowWidth, this.p5.windowHeight)
      canvas.parent("p5Canvas")

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].size = this.p5.random(8, 14)
        this.tags[i].speed = this.tags[i].size / 6
        this.tags[i].pos = {
          x: -this.p5.random(0, 400),
          y: this.p5.random(0, this.p5.windowHeight)
        }
      }
    },
    draw () {
      this.p5.background(0)
      this.p5.fill(255, 200)

      for (let i = 0; i < this.tags.length; i++) {
        let tag = this.tags[i]
        this.p5.textSize(tag.size)
        this.p5.text(tag.name, tag.pos.x, tag.pos.y)
        tag.pos.x += tag.speed
        if (this.p5.windowWidth + 200 < tag.pos.x) {
          tag.pos.x = -400
          tag.pos.y = this.p5.random(0, this.p5.windowHeight)
        }
      }
    }
  }
}
</script>
