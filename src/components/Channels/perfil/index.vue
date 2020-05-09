<template>
  <div class="min-h-screen relative bg-black-300 w-full text-center">
    <div class="relative bg-black-400 flex-none w-1/6 h-full max-h-screen pb-6 hidden md:block overflow-y-auto overflow-x-hidden">
      <div class="px-4 py-2 md:px-0 border-b-2 mx-4">
        <p class=" text-white text-ms text-center my-4">{{ username }}</p>
        <img
          class="w-20 rounded-full mx-auto"
          :src="`https://images.hive.blog/u/${username}/avatar`"
        />
        <button
          @click="logout(username)"
          class="block mx-auto font-semibold w-full text-sm h-8 my-6 rounded-sm bg-white cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div class="my-2 px-4 py-2 h-100">

      </div>
    </div>
    <div class="w-5/6">

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "perfil",
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
        await this.logoutApp(username)
      } catch (error) {
        console.log(error)
      }
      this.$router.push({ name: "login" });
    }
  }
};
</script>
