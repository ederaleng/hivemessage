<template>
  <div
    v-if="existRoom"
    class="relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden"
  >
    <div
      class="border-b-2 border-black-200 px-8 py-3 flex justify-between items-center"
    >
      <h1 class="text-white text-sm leading-tight my-1 truncate capitalize">
        {{ nameRoom }}
      </h1>
    </div>
    <div class="pr-8 pt-2 mr-1 mb-16 flex-1 overflow-y-auto overflow-x-hidden">
      <div v-for="(message, key) in messages" :key="key" class="w-full my-2">
        <div v-if="getMessage(message)" class="pl-8 flex text-white px-2 rounded-r-md hover:bg-black-500">
          <img class="w-10 h-10 rounded-full" :src="getImageUserMessage(message)" />
          <div class="ml-2 mr-6 text-justify ">
            <h5 class="text-white font-semibold text-sm"> {{ getUserMessage(message) }} </h5>
            <p class="text-gray-100 font-light w-full text-sm">
              {{ getMessage(message) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bg-black-300 bottom-0 w-full px-8 pb-6">
      <div class="rounded bg-black-100 px-4 border-0 flex items-center w-full">
        <input
          class="placeholder-hive-100 bg-black-100 pr-4 font-light text-white text-xl rounded h-10 w-full tracking-wide outline-none"
          placeholder="send a message"
          v-model="message"
          @keyup.enter="sendToRoom"
        />
        <img v-if="sending" class="h-6 ml-2" :src="icon_sending" />
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
import { mapState, mapActions } from "vuex";
import { get as _get } from "lodash";
import send from "@/assets/img/send.svg";
import sending from "@/assets/img/sending.svg";
import working from "@/assets/img/working.svg";

export default {
  name: "chats-room",
  data: () => ({
    icon_send: send,
    icon_sending: sending,
    icon_working: working,
    message: '',
    sending: false
  }),
  watch: {
    existRoom(room) {
      if(room != undefined) { this.loadRoom() }
    }
  },
  computed: {
    ...mapState({
      rooms: state => state.rooms.rooms,
      messages: state => state.messages.messages
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
  },
  methods: {
    ...mapActions({
      loadMessages: "messages/loadMessages",
      sendMessageToRoom: "messages/sendMessageToRoom"
    }),
    getUserMessage(data) {
      return _get(data, 'username', null)
    },
    getImageUserMessage (data) {
      return `https://images.hive.blog/u/${_get(data, 'username', null)}/avatar`
    },
    getMessage(data) {
      return _get(data, 'meta_data.message')
    },
    async loadRoom () {
      const { room } = this.$route.params;
      console.log(this.$route.params)
      await this.loadMessages({ room });
    },
    async sendToRoom () {
      if(this.sending || this.message=="") { return; }
      this.sending = true;
      let { room } = this.$route.params;
      try {
        await this.sendMessageToRoom({ room, data: { message: this.message } })
      } catch (error) {
        console.log(error)
      }
      this.message = ''
      this.sending = false;
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