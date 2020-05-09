<template>
  <div class="relative bg-black-300 w-full px-12 py-10 text-center">
    <p class=" text-white text-3xl my-4"> Welcome {{ username }} </p>
    <img class="w-32 rounded-full mx-auto" :src="`https://images.hive.blog/u/${username}/avatar`" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "perfil",
  computed: {
    ...mapState({
      username: state => state.app.username
    })
  }
};
</script>
