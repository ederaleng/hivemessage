<template>
  <div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div
      class="bg-black-200 text-purple-lighter flex-none w-24 py-4 hidden md:block"
    >
      <div
        v-for="(channel, index) in channels"
        :key="index"
        class="cursor-pointer mb-4"
      >
        <router-link class="h-16 w-16 bg-gray-600 flex items-center justify-center mx-auto rounded-lg" :to="getRouteChannel(channel)">
          <img v-if="getImagenChannel(channel)" :src="getImagenChannel(channel)" />
          <div v-else>
            {{ getNameChannel(channel) }}
          </div>
        </router-link>
      </div>
      <button
        @click="openModal('createchannel')"
        class=" cursor-pointer mb-4 h-16 w-16 flex items-center justify-center rounded-lg mx-auto"
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
  mounted() {
    this.loadChannels();
  },
  components: { Modals },
  data: () => ({
    iconMore: More
  }),
  computed: {
    ...mapState({
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
      return _get(data, "meta_data.img", null);
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
