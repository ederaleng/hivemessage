<template>
  <div class="relative bg-black-300 w-full px-12 py-10 text-center">
    <p class=" text-white text-3xl my-4">Welcome {{ username }}</p>
    <img
      class="w-32 rounded-full mx-auto"
      :src="`https://images.hive.blog/u/${username}/avatar`"
    />
    <button
      @click="logout(username)"
      class="block mx-auto font-semibold w-64 text-2xl h-16 my-4 rounded-md bg-white cursor-pointer"
    >
      Logout
    </button>
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
