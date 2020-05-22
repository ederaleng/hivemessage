import Vue from "vue";
import Router from "vue-router";

// routes
import home from "./components/home";
import login from "./components/login";
import notFound from "./components/notFound";
import channels from "./components/channels";
import invitation from "./components/invitation";
// components
import channel from "./components/channels/channel";
import room from "./components/channels/channel/components/chatsRoom";
import perfil from "./components/channels/perfil";
import invite from "./components/invitation/components/invite.vue";
import invite_404 from "./components/invitation/components/invite_404.vue";
// pages under construction
import me from "./components/channels/perfil/components/me";
import pm from "./components/channels/perfil/components/pm";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
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
      path: "/invite",
      name: "invite",
      component: invitation,
      children: [
        {
          path: "404",
          name: "invite_404",
          component: invite_404
        },
        {
          path: ":channel",
          name: "invite_channel",
          component: invite
        }
      ]
    },
    {
      path: "/channels",
      name: "channels",
      component: channels,
      redirect: { name: "perfil" },
      children: [
        {
          path: "perfil",
          name: "perfil",
          component: perfil,
          redirect: { name: "me" },
          children: [
            {
              path: "",
              name: "me",
              component: me
            },
            {
              path: "pm",
              name: "pm",
              component: pm
            }
          ]
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
