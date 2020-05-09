<template>
  <div
    v-if="existRoom"
    class="relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden"
  >
    <div
      class="border-b-2 border-black-200 px-8 py-3 flex justify-between items-center"
    >
      <h1 class="text-white text-xl leading-tight my-1 truncate capitalize">
        {{ nameRoom }}
      </h1>
    </div>
    <div class="px-8 pt-2 pb-16 flex-1 overflow-y-auto overflow-x-hidden">
      messages room
    </div>
    <div class="absolute bottom-0 w-full px-8 pb-6">
      <div class="rounded bg-black-100 px-4 border-0 flex items-center w-full">
        <input
          class="placeholder-hive-100 bg-black-100 pr-4 font-light text-white text-xl rounded h-10 w-full tracking-wide outline-none"
          placeholder="send a message"
        />
        <img class="h-6 ml-2" :src="icon_send" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex justify-center items-center relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden"
  >
    <img class="w-1/5" :src="icon_working" />
    <h2 class="text-4xl text-gray-909">Not Rooms</h2>
    <p class="text-3xl text-gray-909">
      There is no room in this channel, if you are the owner
    </p>
    <p class="text-3xl text-gray-909">
      you can create them from button create room
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get as _get } from "lodash";
import send from "@/assets/img/send.svg";
import working from "@/assets/img/working.svg";

export default {
  name: "chats-room",
  data: () => ({
    icon_send: send,
    icon_working: working
  }),
  computed: {
    ...mapState({
      rooms: state => state.rooms.rooms
    }),
    existRoom() {
      const { room } = this.$route.params;
      return room;
    },
    nameRoom() {
      const { room } = this.$route.params;
      let singleRoom = this.rooms.find(dt => dt.id === room);
      return _get(singleRoom, "meta_data.name", _get(singleRoom, "id"));
    }
  }
};
</script>
