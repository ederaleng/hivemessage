<template>
  <div  class="relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden">
    <div class="border-b-2 border-black-200 px-8 py-3 flex justify-start items-center">
      <svg
        @click="navigationChannelStatus()"
        class="fill-current block md:hidden text-white h-5 w-5 mr-4"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
      <h1 @click="navigationRoomStatus()" class="text-white text-sm leading-tight my-1 truncate capitalize">
        {{ nameRoom ? nameRoom : 'Channel not have rooms' }}
      </h1>
    </div>
    <div v-if="existRoom">
      <div id="full_messages" class="relative pr-8 pt-2 mr-1 mb-16 flex-col justify-end items-stretch h-full overflow-y-auto overflow-x-hidden" >
        <div
          v-for="(message, key) in messages"
          :key="key"
          @mouseover="changeFocus(message)"
          @mouseleave="changeFocus(null)"
          class="relative w-full my-2"
        >
          <div
            v-if="getMessage(message)"
            :class="{ 'bg-black-500': hoverMessage == getIdMessage(message) }"
            class="relative pl-8 flex text-white px-2 rounded-r-md"
          >
            <img
              class="w-10 h-10 rounded-full"
              :src="getImageUserMessage(message)"
            />
            <div class="ml-2 mr-6 text-justify ">
              <h5 class="text-white font-semibold text-sm">
                {{ getUserMessage(message) }}
              </h5>
              <p class="text-gray-100 font-light w-full text-sm">
                {{ getMessage(message) }}
              </p>
            </div>
            <div
              v-show="hoverMessage == getIdMessage(message)"
              class="absolute top-0 right-0 pr-2"
            >
              <div class="relative">
                <img
                  @click="isVisible = !isVisible"
                  class="w-4"
                  :src="icon_morePoint"
                />
                <transition
                  enter-active-class="transition duration-300 ease-out transform"
                  enter-class="-translate-y-3 scale-95 opacity-0"
                  enter-to-class="translate-y-0 scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in transform"
                  leave-class="translate-y-0 opacity-100"
                  leave-to-class="-translate-y-3 opacity-0"
                >
                  <div
                    v-show="isVisible"
                    class="absolute bg-white top-0 right-0 mr-8 rounded-sm"
                  >
                    <div class="relative">
                      <a
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        :href="
                          `https://www.hiveblockexplorer.com/tx/${getIdMessage(
                            message
                          )}`
                        "
                        class="block text-sm p-1 font-light text-gray-700 whitespace-no-wrap hover:bg-gray-200 rounded-sm"
                      >
                        check transaction
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
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
    <div v-else class="px-4 flex justify-center items-center relative bg-black-300 flex-1 flex flex-col bg-white overflow-hidden">
      <img class="w-1/5" :src="icon_working" />
      <h2 class="text-4xl text-gray-909">Not Rooms</h2>
      <p class="text-3xl text-gray-909">
        There is no room in this channel, if you are the owner
      </p>
      <p class="text-3xl text-gray-909">
        you can create them from button create room
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { get as _get } from "lodash";
import send from "@/assets/img/send.svg";
import sending from "@/assets/img/sending.svg";
import working from "@/assets/img/working.svg";
import morePoint from "@/assets/img/morePoint.svg";

export default {
  name: "chats-room",
  data: () => ({
    icon_send: send,
    icon_sending: sending,
    icon_working: working,
    icon_morePoint: morePoint,
    message: "",
    sending: false,
    hoverMessage: null,
    isVisible: false
  }),
  watch: {
    async existRoom(room) {
      if (room != undefined) {
        await this.loadRoom();
        await this.modeScroll();
      }
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
      sendMessageToRoom: "messages/sendMessageToRoom",
      startPooling: "messages/startPooling",
      stopPooling: "messages/stopPooling",
      clearMessages: "messages/clearMessages",
      navigationRoomStatus: "rooms/navigationRoomStatus",
      navigationChannelStatus: "channels/navigationChannelStatus"
    }),
    getIdMessage(data) {
      return _get(data, "id", null);
    },
    getUserMessage(data) {
      return _get(data, "username", null);
    },
    getImageUserMessage(data) {
      return `https://images.hive.blog/u/${_get(
        data,
        "username",
        null
      )}/avatar`;
    },
    getMessage(data) {
      return _get(data, "meta_data.message");
    },
    async loadRoom() {
      const { room } = this.$route.params;
      await this.navigationRoomStatus();
      await this.stopPooling();
      await this.clearMessages();
      await this.loadMessages({ room });
      await this.startPooling({ room });
    },
    async sendToRoom() {
      if (this.sending || this.message == "") {
        return;
      }
      this.sending = true;
      let { room } = this.$route.params;
      try {
        await this.sendMessageToRoom({ room, data: { message: this.message } });
      } catch (error) {
        console.log(error);
      }
      this.message = "";
      this.sending = false;
    },
    changeFocus(data) {
      if (!this.isVisible) {
        this.hoverMessage = this.getIdMessage(data);
        return;
      }
    },
    modeScroll() {
      var objDiv = document.getElementById("full_messages");
      objDiv.scrollTop = objDiv.scrollHeight;
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
