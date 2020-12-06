<template lang="pug">
  div.wrap-module-diverseman.f.fh
    div.diverseman-content
      ItemP5BG(:showBG="showBG")
      ItemDiversemanImg(:active="diversemanActive")
      ItemMessage(
        ref="item_message"
        v-if="currentEvent"
        :currentEvent="currentEvent")
      div.wrap-user-input
        ItemQuotation(v-if="currentEvent && currentEvent.attachment === 'quotation' && showQuotation"
          :showQuotation="showQuotation")
        ItemFollowMe(v-if="currentEvent && currentEvent.attachment === 'follow_me'"
          :showFollowMe="currentEvent.attachment === 'follow_me'")
        //- ItemShare(v-if="currentEvent && currentEvent.attachment === 'share'"
          :showShare="currentEvent.attachment === 'share'")
        ItemInputSelection(
          v-if="currentEvent && currentEvent.type === 'selection'"
          :currentEvent="currentEvent"
          :showInput="showInput"
          @triggerEventScenario="triggerEventScenario"
          @triggerAction="triggerAction"
          @resetMessage="resetMessage")
        ItemInputTags(
          v-if="currentEvent && currentEvent.type === 'ask_tags'"
          :currentEvent="currentEvent"
          :showInput="showInput"
          @triggerEventScenario="triggerEventScenario"
          @resetMessage="resetMessage")
        ItemAskQuotation(v-if="currentEvent && currentEvent.type === 'ask_message'"
          :currentEvent="currentEvent"
          :showInput="showInput"
          @triggerEventScenario="triggerEventScenario"
          @resetMessage="resetMessage")
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-module-diverseman {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
  .diverseman-content {
    position: relative;
    width: 100%;
    max-height: 800px;
    height: 100vh;
    .wrap-user-input {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: calc(100% - 146px - 32px * 2 - 106px);
    }
  }
}
</style>

<script>
import db from "@/components/utils/firebase"
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import { scenario } from "@/components/scenario"
import ItemP5BG from "@/components/item/ItemP5BG"
import ItemDiversemanImg from "@/components/item/ItemDiversemanImg"
import ItemMessage from "@/components/item/ItemMessage"
import ItemQuotation from "@/components/item/ItemQuotation"
import ItemFollowMe from "@/components/item/ItemFollowMe"
import ItemShare from "@/components/item/ItemShare"
import ItemInputSelection from "@/components/item/ItemInputSelection"
import ItemInputTags from "@/components/item/ItemInputTags"
import ItemAskQuotation from "@/components/item/ItemAskQuotation"

export default {
  components: {
    ItemP5BG,
    ItemDiversemanImg,
    ItemMessage,
    ItemQuotation,
    ItemFollowMe,
    ItemShare,
    ItemInputSelection,
    ItemInputTags,
    ItemAskQuotation
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  data () {
    return {
      scenario: null,
      diverseManNum: null,
      diversemanActive: false,
      currentEvent: null,
      showBG: false,
      showInput: false,
      showQuotation: false,
      diversePower: 0,
      diverseManNumViaHere: 0
    }
  },
  created () {
    this.scenario = scenario
  },
  async mounted () {
    let firstEvent = "START"

    this.diverseManNum = await db.collection("USER")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(q => {
        return (q.docs[0]) ? q.docs[0].data().number : 0
      })

    if (this.$route.params.id) {
      let sameChannelUsers = await db.collection("USER")
        .where("channelId", "==", this.$route.params.id)
        .get()
        .then(q => {
          return q.docs.map(d => { return d.data() })
        })
      this.diverseManNumViaHere = sameChannelUsers.length
      firstEvent = (sameChannelUsers[0]) ? "START_WITH_GUYS" : "START_AS_FIRST"
    }

    let userDoc = await db.collection("USER").doc(this.uid)
      .get().then(d => { return d })
    if (userDoc.exists) {
      this.diverseManNum = userDoc.data().number
      firstEvent = "COME_BACK"
    }

    await this.sleepByPromise(1600)
    this.diversemanActive = true
    await this.sleepByPromise(1600)
    this.showBG = true

    this.triggerEventScenario(firstEvent)
    // this.triggerEventScenario("6-1")
  },
  methods: {
    async triggerEventScenario (id) {
      this.currentEvent = this.getEventById(id)
      if (!this.currentEvent) return

      this.currentEvent.message = this.currentEvent.message.map(m => {
        let newMsg = m
        if (newMsg.indexOf("${diverseManNumViaHere}") > -1) {
          newMsg = m.replace("${diverseManNumViaHere}", this.diverseManNumViaHere + 1)
        }
        if (newMsg.indexOf("${diverseManNum}") > -1) {
          newMsg = m.replace("${diverseManNum}", this.diverseManNum)
        }
        if (newMsg.indexOf("${diverseManNewNum}") > -1) {
          newMsg = m.replace("${diverseManNewNum}", this.diverseManNum + 1)
        }
        if (newMsg.indexOf("${diversePower}") > -1) {
          newMsg = m.replace("${diversePower}", this.diversePower + 1)
        }
        return newMsg
      })
      // console.log("currentEvent:", this.currentEvent.message)

      if (this.currentEvent.action) await this.triggerAction(this.currentEvent.action)
      // switch (this.currentEvent.action) {
      //   case "loadQuotation":
      //     console.log("loadQuotation")
      //     this.quotation = "卵とキャラメルが出会って、プリンが生まれた。出会いって、愛。組み合わせって、未来かも。公園の下に、ハイブランド。"
      //     break
      // }

      if (this.currentEvent.type !== "normal") this.activateInput()
      if (this.currentEvent.attachment && 
        this.currentEvent.attachment === 'quotation') {
        this.activateQuotation()
      } else {
        this.showQuotation = false
      }

      if (this.currentEvent.next
      && this.currentEvent.type === "normal"
      && this.currentEvent.id !== "END") {
        const durationPerChar = 80
        const combinedMessage = this.currentEvent.message.reduce((a,x) => a+=x,0)
        await this.sleepByPromise(combinedMessage.length * durationPerChar * 2)
        this.resetMessage()
        this.showInput = false
        this.triggerEventScenario(this.currentEvent.next)
      }
    },
    async triggerAction (action) {
      // console.log("triggerAction:", action)
      switch (action) {
        case "saveUser":
          let userDoc = await db.collection("USER").doc(this.uid).get().then(d => { return d })
          if (userDoc.exists) {
            let user = userDoc.data()
            this.diverseManNum = user.number
          } else {
            let userObj = { createdAt: new Date(), number: this.diverseManNum + 1 }
            if (this.$route.params.id) userObj.channelId = this.$route.params.id
            await db.collection("USER").doc(this.uid).set(userObj)
          }
          break
        case "calc_diverse_power":
          let myTags = await db.collection("TAG")
            .where("createdBy", "==", this.uid)
            .orderBy("createdAt", "desc")
            .limit(3)
            .get()
            .then(q => {
              return q.docs.map(d => { return d.data() })
            })
          let duplicatedTagsNum = 0
          for (let i = 0; i < myTags.length; i++) {
            let dupulicatedTagsNumInDB = await db.collection("TAG")
              .where("name", "==", myTags[i].name)
              .get()
              .then(q => { return q.docs.length })
            if (dupulicatedTagsNumInDB > 1) duplicatedTagsNum++
          }
          console.log("duplicatedTagsNum:", duplicatedTagsNum)
          this.diversePower = (1 + myTags.length - duplicatedTagsNum) * Math.round( Math.random(100) * 1000 ) / 10
          db.collection("USER").doc(this.uid).update({ diversePower: this.diversePower })
          break
      }
    },
    getEventById (id) {
      return this.scenario.filter(e => {
        return e.id === id
      })[0]
    },
    async activateInput () {
      const durationPerChar = 80
      const combinedMessage = this.currentEvent.message.reduce((a,x) => a+=x,0)
      await this.sleepByPromise(combinedMessage.length * durationPerChar + 200)
      this.showInput = true
    },
    async activateQuotation () {
      const durationPerChar = 80
      const combinedMessage = this.currentEvent.message.reduce((a,x) => a+=x,0)
      await this.sleepByPromise(combinedMessage.length * durationPerChar + 200)
      this.showQuotation = true
    },
    resetMessage () {
      this.$refs.item_message.resetMessage()
    },
    sleepByPromise (msec) {
      return new Promise(resolve => setTimeout(resolve, msec))
    }
  }
}
</script>
