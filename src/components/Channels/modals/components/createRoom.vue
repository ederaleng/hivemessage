<template>
  <div
    class="shadow-lg modal-container bg-black-100 w-9/12 md:w-6/12 lg:w-4/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
  >
    <div class="modal-content text-left py-4 px-6">
      <div
        class="flex justify-between  items-center pb-3 text-hive-black border-b-2"
      >
        <p class="text-md lg:text-xl font-bold flex text-white">
          <span> Create room </span>
        </p>
        <div class="modal-close z-50" @click="closeModal()">
          <svg
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
      </div>
      <div class="my-2">
        <div class="py-4 px-2">
          <input
            type="text"
            v-model="room.name"
            class="w-full my-2 text-sm bg-grey-light text-grey-darkest rounded-md p-2 focus:outline-none"
            placeholder="Name channel"
          />
          <button
            :disabled="!room.name || loading"
            @click="submitRoom()"
            :class="{ 'opacity-50': !room.name || loading }"
            class="flex justify-center items-center text-xs bg-hive-red w-full h-8 my-2 text-white font-bold rounded outline-none"
          >
            <img v-if="loading" class="w-4 mr-2" :src="loadingIcon" />
            Create room
          </button>
        </div>
      </div>
    </div>
    <notifications
      class="my-3 mx-2"
      position="bottom right"
      group="create_room"
    >
      <template slot="body" slot-scope="props">
        <div class="bg-hive-red rounded-md py-2 px-3 my-2">
          <a class="text-xl text-white font-bold"> {{ props.item.title }} </a>
          <div
            class="text-xl text-black-none font-semibold"
            v-html="props.item.text"
          />
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
import { get as _get } from "lodash";
import { mapActions } from "vuex";
import loadingIcon from "@/assets/img/loading.svg";

export default {
  name: "createRoom",
  data: () => ({
    loadingIcon,
    room: {
      name: ""
    },
    loading: false
  }),
  methods: {
    ...mapActions({
      createRoom: "rooms/createRoom",
      closeModal: "modals/closeModal"
    }),
    async submitRoom() {
      this.loading = true;
      try {
        const { channel } = this.$route.params;
        await this.createRoom(Object.assign({ channel }, { data: this.room }));
      } catch (error) {
        this.$notify({
          group: "create_channel",
          type: "error",
          title: "Error in creation channel",
          text: _get(error, "message", "Unidentified error")
        });
        this.loading = false;
        return;
      }
      this.loading = false;
      this.closeModal();
    }
  }
};
</script>
