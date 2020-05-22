<template>
  <div class="flex w-full h-100">
    <div v-show="load_channel" :class="{ hidden: !navigation, block: navigation }" class="main-modal absolute inset-0 z-50 flex flex-col justify-center items-center animated fadeIn faster md:block md:h-full md:w-1/6 md:relative" style="background: rgba(0,0,0,.7);">
      <menuRoom v-if="Array.isArray(rooms)" />
      <svg
        @click="navigationRoomStatus(false)"
        class="block md:hidden mt-2"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 18 18"
      >
        <path
          style="fill: #fff;"
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        ></path>
      </svg>
    </div>
    <chatsRoom v-show="load_channel" />
    <div v-show="!load_channel" class="bg-black-300 w-full h-full flex justify-center items-center">
      <img class="w-12 h-12 text-black mr-2" :src="icon_loading" />
    </div>
  </div>
</template>

<script>
import chatsRoom from "./components/chatsRoom";
import menuRoom from "./components/menuRoom";
import send from "@/assets/img/send.svg";
import loadingIcon from "@/assets/img/loading.svg";
import { mapActions, mapState } from "vuex";
import { get as _get } from "lodash";

export default {
  name: "channel",
  components: { chatsRoom, menuRoom },
  data: () => ({
    icon_send: send,
    icon_loading: loadingIcon,
    load_channel: false
  }),
  mounted() {
    this.loadChannel();
  },
  watch: {
    routerChannel() {
      this.loadChannel();
    }
  },
  computed: {
    ...mapState({
      rooms: state => state.rooms.rooms,
      navigation: state => state.rooms.app.navigation
    }),
    routerChannel() {
      const { channel } = this.$route.params;
      return channel;
    }
  },
  methods: {
    ...mapActions({
      loadRooms: "rooms/loadRooms",
      navigationRoomStatus: "rooms/navigationRoomStatus"
    }),
    getRouteRoom(data) {
      return { name: "room", params: { room: _get(data, "id") } };
    },
    async loadChannel() {
      const { channel, room } = this.$route.params;
      this.load_channel = false
      await this.loadRooms(channel);
      if (!room && this.rooms.length > 0) {
        let firstRoom = this.getRouteRoom(this.rooms[0]);
        this.$router.push(firstRoom);
      }
      this.load_channel = true
    }
  }
};
</script>
