<template>
  <div class="flex w-full h-full">
    <MenuRooms v-if="Array.isArray(rooms) && rooms.length > 0" />
    <ChatsRooms />
  </div>
</template>

<script>
import ChatsRooms from "./components/ChatsRooms";
import MenuRooms from "./components/MenuRooms";
import send from "@/assets/img/send.svg";
import { mapActions, mapState } from "vuex";
import { get as _get } from "lodash";

export default {
  name: "channel",
  components: { ChatsRooms, MenuRooms },
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
      rooms: state => state.rooms.rooms
    }),
    routerChannel() {
      return this.$route.params;
    }
  },
  methods: {
    ...mapActions({
      loadRooms: "rooms/loadRooms"
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
