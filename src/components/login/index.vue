<template>
  <div class="min-h-screen bg-black-400 flex justify-center items-center">
    <div class="relative container mx-auto h-200px">
      <div class="flex justify-center px-6">
        <!-- Row -->
        <div class="w-full xl:w-3/4/ lg:w-11/12 flex h-full">
          <!-- Col -->
          <div
            class="w-full h-100 bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg px-12 overflow-y-auto"
          >
            <div v-if="listUsers.length>0" style="max-height: 508px;" class="py-4 relative w-full h-full flex flex-col">
              <div
                v-for="(user, key) in listUsers"
                :key="key"
                @click="userLogin(user)"
                class="h-16 my-2 rounded-md px-2 flex items-center bg-white cursor-pointer"
              >
                <img class="w-12 mr-2 rounded-full" :src="`https://images.hive.blog/u/${user}/avatar`" />
                <p class=" text-2xl font-semibold items-center"> {{ user }} </p>
              </div>
            </div>
            <div v-else class="relative w-full h-full flex items-center">
              <img :src="communication" class="block my-auto" />
            </div>
          </div>
          <!-- Col -->
          <div
            class="w-full lg:w-1/2 bg-white px-5 py-10 rounded-lg lg:rounded-l-none"
          >
            <div class="px-8 text-sm text-gray-700 font-sans">
              <p
                class="text-2xl block mb-4 text-sm font-bold text-gray-700 text-center"
              >
                Login Using Hive Keychain
              </p>
              <img class="mx-auto w-20 my-4" :src="keychain" />
              <div v-if="have_keychain">
                <input
                  class="h-10 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none outline-none"
                  type="text"
                  placeholder="Enter username"
                  v-model="username"
                />
                <button
                  @click="singIn()"
                  class="bg-hive-red w-full h-10 my-3 lg:my-2 text-white font-bold py-2 px-4 rounded outline-none"
                >
                  Login
                </button>
              </div>
            </div>
            <div
              class="flex flex-col lg:flex-row justify-around items-center px-8 py-0 lg:py-3 text-sm text-gray-700 font-sans"
            >
              <a
                href="https://addons.mozilla.org/en-US/firefox/addon/hive-keychain/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="bg-hive-red hover:bg-hive-red text-white font-bold py-2 px-4 my-1 lg:my-auto w-full lg:w-auto rounded inline-flex items-center"
              >
                <img class="w-4 h-4 mr-2" :src="mozilla" />
                <span> Intall for Mozilla </span>
              </a>
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep"
                class="bg-hive-red hover:bg-hive-red text-white font-bold py-2 px-4 my-2 lg:my-auto w-full lg:w-auto rounded inline-flex items-center"
              >
                <img class="w-4 h-4 mr-2" :src="chrome" />
                <span> Intall for Chrome </span>
              </a>
            </div>
            <div class="separator px-8 my-3 font-semibold text-black-400">
              Other login methods
            </div>
            <div
              class="flex justify-around items-center px-8 py-3 text-sm text-gray-700 font-sans"
            >
              <button
                class="cursor-not-allowed border-2 bg-gray-400 w-full text-gray-800 font-bold py-2 px-4 rounded flex justify-center items-center"
              >
                <img class="w-1/2 opacity-25" :src="hivesigner" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notifications class="my-3 mx-2" position="bottom right" group="login">
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
import keychain from "@/assets/img/keychain.png";
import chrome from "@/assets/img/chrome.svg";
import mozilla from "@/assets/img/mozilla.svg";
import hivesigner from "@/assets/img/hivesigner.svg";
import communication from "@/assets/img/communication.svg";
import LS from "@/helpers/storage";
import { tryParse } from "@/utils/parsing"
import { mapActions, mapState } from "vuex";

export default {
  name: "login",
  data: () => ({
    keychain,
    chrome,
    mozilla,
    hivesigner,
    communication,
    username: "",
    listUsers: []
  }),
  created() {
    if (this.userApp) {
      this.$router.push({ name: "channels" });
    }
  },
  mounted() {
    this.loadUsers()
  },
  computed: {
    ...mapState({
      have_keychain: state => state.app.have_keychain,
      userApp: state => state.app.username
    })
  },
  methods: {
    ...mapActions({
      login: "app/login"
    }),
    loadUsers () {
      let list = tryParse(LS.getItem('listUsers'))
      this.listUsers = (Array.isArray(list) ? list : [])      
    },
    userLogin(user) {
      this.username = user;
      this.singIn()
    },
    async singIn() {
      try {
        await this.login(this.username);
      } catch (error) {
        console.log(error);
        this.$notify({
          group: "login",
          type: "error",
          title: "Error",
          text: "Error in login"
        });
        return;
      }
      this.$router.push({ name: "channels" });
    }
  }
};
</script>

<style scoped>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}
.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #343637;
}
.separator::before {
  margin-right: 1em;
}
.separator::after {
  margin-left: 1em;
}
</style>
