import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import NotFound from "@/components/NotFound";
import Channels from "@/components/Channels";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/me",
      name: "me",
      component: Home
    },
    {
      path: "/channels",
      name: "channels",
      component: Channels,
      children: [
        {
          path: ":block",
          name: "block",
          component: Home,
          children: [
            {
              path: ":trx_id",
              name: "Home",
              component: Home,
              children: []
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "not_found",
      component: NotFound
    }
  ]
});
