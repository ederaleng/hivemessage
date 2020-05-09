<template>
  <div
    class="shadow-lg modal-container bg-black-100 w-9/12 md:w-6/12 lg:w-4/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
  >
    <div class="modal-content text-left py-4 px-6">
      <div
        class="flex justify-between items-center pb-3 text-hive-black border-b-2"
      >
        <p class="text-lg lg:text-2xl font-bold flex text-white">
          <span> Create channel </span>
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
            v-model="channel.name"
            class="w-full my-2 text-sm bg-grey-light text-grey-darkest rounded-md p-3 focus:outline-none"
            placeholder="Name channel"
          />
          <textarea
            v-model="channel.description"
            class="w-full h-64 resize-none my-2 text-sm bg-grey-light text-grey-darkest rounded-md p-3 focus:outline-none"
            placeholder="Description channel"
          />
          <input
            v-model="channel.urlImage"
            type="text"
            class="w-full my-2 text-sm bg-grey-light text-grey-darkest rounded-md p-3 focus:outline-none"
            placeholder="URL Image channel (optional)"
          />
          <button
            :disabled="!channel.description || !channel.name || loading"
            @click="submitChannel()"
            :class="{
              'opacity-50': !channel.description || !channel.name || loading
            }"
            class="flex justify-center bg-hive-red w-full h-10 my-3 lg:my-2 text-white font-bold py-2 px-4 rounded outline-none"
          >
            <img v-if="loading" class="w-6 mr-2" :src="loadingIcon" />
            Create channel
          </button>
        </div>
      </div>
    </div>
    <notifications
      class="my-3 mx-2"
      position="bottom right"
      group="create_channel"
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
  name: "createServer",
  data: () => ({
    loadingIcon,
    channel: {
      name: "",
      description: "",
      urlImage: ""
    },
    loading: false
  }),
  methods: {
    ...mapActions({
      closeModal: "modals/closeModal",
      createChannel: "channels/createChannel"
    }),
    async submitChannel() {
      this.loading = true;
      try {
        await this.createChannel(this.channel);
      } catch (error) {
        this.$notify({
          group: "create_channel",
          type: "error",
          title: "Error in creation channel",
          text: _get(error, "message", "Unidentified error")
        });
        return;
      }
      this.closeModal();
    }
  }
};
</script>
