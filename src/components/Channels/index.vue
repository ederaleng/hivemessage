<template>
  <div
    class="min-h-screen max-h-screen font-sans antialiased flex overflow-hidden"
  >
    <!-- Sidebar / channel list -->
    <div
      class="bg-black-200 text-purple-lighter flex-none w-16 py-4 hidden md:block overflow-y-auto overflow-x-hidden"
    >
      <div class="cursor-pointer mb-4">
        <router-link :to="{ name: 'perfil' }">
          <img
            :src="`https://images.hive.blog/u/${username}/avatar`"
            class="h-10 w-10 flex items-center justify-center mx-auto rounded-full my-3"
          />
        </router-link>
        <div class=" relative border-black-300 border-b-2 mx-6 h-px"></div>
      </div>
      <div
        v-for="(channel, index) in channels"
        :key="index"
        class="cursor-pointer mb-4"
      >
        <router-link :to="getRouteChannel(channel)">
          <img
            class="h-10 w-10 flex items-center justify-center mx-auto rounded-full"
            :src="getImagenChannel(channel)"
            v-if="getImagenChannel(channel)"
          />
          <div
            class="bg-gray-600 h-10 w-10 flex items-center justify-center mx-auto rounded-full"
            v-else
          >
            {{ getNameChannel(channel) }}
          </div>
        </router-link>
      </div>
      <button
        @click="openModal('createchannel')"
        class=" cursor-pointer mb-4 h-10 w-10 flex items-center justify-center rounded-lg mx-auto"
      >
        <img class="w-100" :src="iconMore" />
      </button>
    </div>
    <router-view></router-view>
    <Modals v-if="appModals" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { get as _get } from "lodash";
import More from "@/assets/img/more.svg";
import Modals from "./modals";

export default {
  name: "channels",
  created() {
    if (!this.username) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.loadChannels();
  },
  components: { Modals },
  data: () => ({
    iconMore: More
  }),
  computed: {
    ...mapState({
      username: state => state.app.username,
      appModals: state => state.modals.modal,
      channels: state => state.channels.channels
    })
  },
  methods: {
    ...mapActions({
      loadChannels: "channels/loadChannels",
      openModal: "modals/openModal"
    }),
    getImagenChannel(data) {
      return _get(data, "meta_data.urlImage", null);
    },
    getNameChannel(data) {
      return _get(data, "meta_data.name", _get(data, "id")).substr(0, 2);
    },
    getRouteChannel(data) {
      return { name: "channel", params: { channel: _get(data, "id") } };
    }
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  background-color: rgba(71, 71, 71, 0.808);
  border-radius: 4px;
  height: 8px;
  width: 8px;
  margin-left: 12px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(41, 41, 41, 0.986);
  border-radius: 4px;
}
</style>
