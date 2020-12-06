import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/sticker",
      name: "sticker",
      component: () =>
        import("@/views/Sticker")
    },
    {
      path: "/mapping",
      name: "mapping",
      component: () =>
        import("@/views/Mapping")
    },
    {
      path: "/",
      name: "diverseman",
      component: () =>
        import("@/views/Diverseman")
    },
    {
      path: "/:id",
      name: "diverseman_with_id",
      props: true,
      component: () =>
        import("@/views/Diverseman")
    }
  ]
})
