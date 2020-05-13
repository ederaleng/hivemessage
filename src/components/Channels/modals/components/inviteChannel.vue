<template>
  <div
    class="shadow-lg modal-container bg-black-100 w-9/12 md:w-6/12 lg:w-4/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
  >
    <div class="modal-content text-left py-4 px-6">
      <div
        class="flex justify-between  items-center pb-3 text-hive-black border-b-2"
      >
        <p class="text-md lg:text-xl font-bold flex text-white">
          <span> Invite channel </span>
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
        <p class="bg-black-300 text-white rounded-md truncate p-2 my-2">
          {{ urlChannel }}
        </p>
        <button
          @click="inviteLink()"
          class="w-full px-4 py-1 bg-hive-red h-8 text-white font-bold rounded outline-none"
        >
          Copy
        </button>
      </div>
    </div>
    <notifications class="m-3" position="bottom center" group="copy_invite">
      <template slot="body" slot-scope="props">
        <div class=" bg-green-600 rounded-md py-2 px-3 my-2">
          <a class=" text-md text-white font-bold"> {{ props.item.title }} </a>
          <div
            class="text-md text-black-none font-semibold"
            v-html="props.item.text"
          />
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import copy from "copy-to-clipboard";

export default {
  name: "invite_channel",
  computed: {
    urlChannel() {
      const { channel } = this.$route.params;
      return `${location.origin}/invite/${channel}`;
    }
  },
  methods: {
    ...mapActions({
      createRoom: "rooms/createRoom",
      closeModal: "modals/closeModal"
    }),
    inviteLink() {
      copy(this.urlChannel);
      this.$notify({
        group: "copy_invite",
        type: "success",
        title: "Invite",
        text: "Invitation copied"
      });
    }
  }
};
</script>
