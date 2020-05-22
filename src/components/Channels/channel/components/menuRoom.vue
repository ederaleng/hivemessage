<template>
  <div
    class="
    relative bg-black-200 md:bg-black-400 flex-none block overflow-y-auto overflow-x-hidden w-11/12 h-11/12 rounded-md
    md:rounded-none md:w-full md:h-full
  "
  >
    <div
      class="border-b-2 border-black-200 px-4 py-3 flex justify-between items-center"
    >
      <h1 class="text-white font-bold text-sm leading-tight my-1 truncate">
        {{ nameChannel }}
      </h1>
      <div class="flex">
        <img
          @click="openModal('inviteChannel')"
          class="w-4 h-4 mx-1"
          :src="icon_invite"
        />
      </div>
    </div>
    <div class="py-4 px-0 md:px-2">
      <router-link
        v-for="(room, key) in rooms"
        :key="key"
        :event="activeRoute(room) ? 'click' : ''"
        :to="getRouteRoom(room)"
        :class="{ 'bg-black-100': rooomSelected(room) }"
        class="py-1 px-4 md:px-2 text-white flex items-center font-semibold rounded-md text-xs hover:bg-black-200 capitalize"
      >
        {{ getNameRoom(room) }}
      </router-link>
      <button
        v-if="owner"
        @click="openModal('createroom')"
        class="w-full py-1 px-4 md:px-2 text-white flex items-center font-semibold outline-none rounded-md text-sm hover:bg-black-200 truncate"
      >
        <img class="w-4 mr-2" :src="iconMore" />
        Create room
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get as _get } from "lodash";
import More from "@/assets/img/more.svg";
import invite from "@/assets/img/invite.svg";
import settings from "@/assets/img/settings.svg";

export default {
  name: "menu-rooms",
  data: () => ({
    iconMore: More,
    icon_invite: invite,
    icon_settings: settings
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
      return this.username === _get(singleChannel, "username", null);
    }
  },
  methods: {
    ...mapActions({
      openModal: "modals/openModal"
    }),
    activeRoute (data) {
      const { room } = this.$route.params;
      return !(_get(data, "id", null) === room);
    },
    getNameRoom(data) {
      return _get(data, "meta_data.name", _get(data, "id").substr(0, 8));
    },
    getRouteRoom(data) {
      return { name: "room", params: { room: _get(data, "id") } };
    },
    rooomSelected(data) {
      const { room } = this.$route.params;
      return _get(data, "id", null) === room;
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
