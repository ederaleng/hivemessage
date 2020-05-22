<template>
  <div class="px-4 py-2 md:px-0 mx-16">
    <p class=" text-white text-ms text-center my-4">{{ username }}</p>
    <!-- <router-link :to="{ name: 'me' }" class="py-1 px-4 md:px-2 text-white flex items-center font-semibold rounded-md text-xs hover:bg-black-200 capitalize" > -->
      <img
        class="w-20 rounded-full mx-auto"
        :src="`https://images.hive.blog/u/${username}/avatar`"
      />
    <!-- </router-link> -->
    <button @click="logout(username)" class="block mx-auto font-semibold w-full text-sm h-8 my-6 rounded-sm bg-white cursor-pointer">
      Logout
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import { client } from "@/helpers/Client"

export default {
  name: "me",
  computed: {
    ...mapState({
      username: state => state.app.username
    })
  },
  methods: {
    ...mapActions({
      logoutApp: "app/logout"
    }),
    async logout(username) {
      try {
        await this.logoutApp(username);
      } catch (error) {
        console.log(error);
      }
      this.$router.push({ name: "login" });
    }
  }
};
</script>
