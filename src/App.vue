<template lang="pug">
v-app
  v-content
    router-view
</template>

<script>
export default {
  name: "App",
  created () {
    console.log("おっ、君はwebにちょっと明るかったりするな？")
    console.log("ようこそ同士よ。歓迎するよ。")
    console.log("ホメカフンタス。2428。これはちょっとしたヒントさ。")
  }
}
</script>

<style lang="scss">
@import "./plugins/meltline.css";

html,
body {
  margin: 0;
  height: 100%;
}
</style>
