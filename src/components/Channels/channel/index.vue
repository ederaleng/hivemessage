<template>
  <div class="flex w-full h-100">
    <div
      :class="{ hidden: !navigation, block: navigation }"
      class="
     main-modal absolute inset-0 z-50 flex flex-col justify-center items-center animated fadeIn faster
     md:block md:h-full md:w-1/6 md:relative"
      style="background: rgba(0,0,0,.7);"
    >
      <menuRoom v-if="Array.isArray(rooms)" />
      <svg
        @click="navigationRoomStatus()"
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
    <chatsRoom />
  </div>
</template>

<script>
import chatsRoom from "./components/chatsRoom";
import menuRoom from "./components/menuRoom";
import send from "@/assets/img/send.svg";
import { mapActions, mapState } from "vuex";
import { get as _get } from "lodash";

export default {
  name: "channel",
  components: { chatsRoom, menuRoom },
  data: () => ({
    icon_send: send
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
      await this.loadRooms(channel);
      if (!room && this.rooms.length > 0) {
        let firstRoom = this.getRouteRoom(this.rooms[0]);
        this.$router.push(firstRoom);
        return;
      }
    }
  }
};
</script>
