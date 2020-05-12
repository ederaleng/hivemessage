<template>
  <div class="min-h-screen bg-black-400 flex justify-center items-center">
    <img v-if="invitate === null" class="w-12" :src="loadingIcon" />
    <div
      v-else
      class=" w-8/12 md:w-6/12 lg:w-4/12 bg-white rounded-md px-6 py-4"
    >
      <p class="w-full my-2 text-center text-xl font-semibold font-sans">
        You have been invited to join the server:
      </p>
      <div class="py-4 bg-gray-500 rounded-md">
        <h3 class="my-2 text-center text-sm font-semibold font-sans">
          {{ nameChannel }}
        </h3>
        <img
          v-if="imgChannel"
          :src="imgChannel"
          class="rounded-full w-3/12 mx-auto"
        />
        <img v-else :src="communityIcon" class="rounded-full w-3/12 mx-auto" />
      </div>

      <div class="relative my-2">
        <select
          v-model="userSelected"
          class="border-2 block appearance-none w-full text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
        >
          <option v-for="(user, key) in listUsers" :key="key" :value="user">
            {{ user }}
          </option>
          <option value="another">
            another user
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <input
        v-if="userSelected == 'another'"
        v-model="useranother"
        placeholder="username"
        class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
      />
      <button
        :disabled="activeButton"
        :class="{ 'opacity-50': activeButton }"
        @click="joinToChannel()"
        class="flex justify-center items-center w-full my-2 mx-auto px-4 bg-hive-red h-8 text-white font-bold rounded outline-none"
      >
        <img v-if="loading" class="w-4 mr-2" :src="loadingIcon" />
        Accept invitation
      </button>
    </div>
    <notifications
      class="my-3 mx-2"
      position="bottom right"
      group="join_channel"
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
import { mapActions, mapState } from "vuex";
import _get from "lodash/get";
import loadingIcon from "@/assets/img/loading.svg";
import communityIcon from "@/assets/img/channel.svg";
import LS from "@/helpers/storage";
import { tryParse } from "@/utils/parsing";

export default {
  name: "invite",
  data: () => ({
    loadingIcon,
    communityIcon,
    listUsers: [],
    userSelected: null,
    useranother: "",
    loading: false
  }),
  mounted() {
    this.loadUsers();
    this.checkInvite();
  },
  computed: {
    ...mapState({
      invitate: state => state.channels.invitate
    }),
    imgChannel() {
      return _get(this.invitate, "meta_data.urlImage", null);
    },
    nameChannel() {
      return _get(this.invitate, "meta_data.name", "Name not defined");
    },
    descriptionChannel() {
      return _get(
        this.invitate,
        "meta_data.description",
        "Description not defined"
      );
    },
    activeButton() {
      let check1 = this.userSelected == "another" && this.useranother == "";
      let check2 = this.userSelected == null;
      if (check1 || check2) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions({
      checkChannel: "channels/checkChannel",
      joinChannel: "channels/joinChannel"
    }),
    loadUsers() {
      let list = tryParse(LS.getItem("listUsers"));
      this.listUsers = Array.isArray(list) ? list : [];
    },
    async joinToChannel() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      // configure custom json
      let { channel } = this.$route.params;
      let username =
        this.userSelected == "another" ? this.useranother : this.userSelected;
      let _custom = { channel: channel, username };
      try {
        console.log(_custom)
        await this.joinChannel(_custom);
      } catch (error) {
        this.$notify({
          group: "join_channel",
          type: "error",
          title: "Error in join channel",
          text: _get(error, "message", "Unidentified error")
        });
        this.loading = false;
        return;
      }
      this.loading = false;
      this.$router.push({ name: "login" });
    },
    async checkInvite() {
      let { channel } = this.$route.params;
      try {
        await this.checkChannel(channel);
      } catch (error) {
        this.$router.push({ name: "invite_404" });
        return;
      }
    }
  }
};
</script>
