import Vue from "vue";
import Router from "vue-router";

// routes
import home from "@/components/home";
import login from "@/components/login";
import notFound from "@/components/notFound";
import channels from "@/components/channels";
// components
import channel from "@/components/channels/channel";
import room from "@/components/channels/channel/components/ChatsRooms";
import perfil from "@/components/channels/perfil";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "login" },
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/channels",
      name: "channels",
      component: channels,
      redirect: { name: "perfil" },
      children: [
        {
          path: "/",
          name: "perfil",
          component: perfil
        },
        {
          path: ":channel",
          name: "channel",
          component: channel,
          children: [
            {
              path: ":room",
              name: "room",
              component: room
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "not_found",
      component: notFound
    }
  ]
});
