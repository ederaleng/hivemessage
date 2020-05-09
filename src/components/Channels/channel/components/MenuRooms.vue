<template>
  <div class="bg-black-400 flex-none w-1/6 pb-6 hidden md:block ">
    <div
      class="border-b-2 border-black-200 px-4 py-5 flex justify-between items-center"
    >
      <h1 class="text-white font-bold text-2xl leading-tight my-1 truncate">
        {{ nameChannel }}
      </h1>
    </div>
    <div class="py-4 px-2">
      <router-link
        v-for="(room, key) in rooms"
        :key="key"
        :to="getRouteRoom(room)"
        class="py-3 px-4 text-white flex items-center font-semibold rounded-md text-xl hover:bg-black-200 capitalize"
      >
        {{ getNameRoom(room) }}
      </router-link>
      <button
        v-if="owner"
        @click="openModal('createroom')"
        class="w-full py-3 px-4 text-white flex items-center font-semibold outline-none rounded-md text-xl hover:bg-black-200"
      >
        <img class="w-4 mr-2" :src="iconMore" />
        create room
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import More from "@/assets/img/more.svg";
import { get as _get } from "lodash";

export default {
  name: "menu-rooms",
  data: () => ({
    iconMore: More
  }),
  computed: {
    ...mapState({
      rooms: state => state.rooms.rooms,
      channels: state => state.channels.channels,
      username: state => state.app.username
    }),
    nameChannel() {
      const { channel } = this.$route.params;
      let singleChannel = this.channels.find(dt => dt.id === channel);
      return _get(singleChannel, "meta_data.name", "Not have name");
    },
    owner() {
      const { channel } = this.$route.params;
      let singleChannel = this.channels.find(dt => dt.id === channel);
      console.log(singleChannel)
      return this.username === _get(singleChannel, "username", null);
    }
  },
  methods: {
    ...mapActions({
      openModal: "modals/openModal"
    }),
    getNameRoom(data) {
      return _get(data, "meta_data.name", _get(data, "id").substr(0, 8));
    },
    getRouteRoom(data) {
      return { name: "room", params: { room: _get(data, "id") } };
    }
  }
};
</script>
