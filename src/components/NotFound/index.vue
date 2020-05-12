<template>
  <div class="min-h-screen bg-black-400 flex justify-center items-center">
    <div
      class="relative w-8/12 md:w-6/12 lg:w-4/12 bg-white rounded-md px-6 py-4 text-center"
    >
      <img :src="Icon404" class="w-4/12 mx-auto" />
      <p class="text-xl font-semibold my-2 text-center">
        page not found
      </p>
      <router-link
        class="px-4 py-1 bg-hive-red h-8 text-white font-bold rounded outline-none"
        :to="{ name: 'login' }"
      >
        Go to login
      </router-link>
    </div>
  </div>
</template>
<script>
import Icon404 from "@/assets/img/404.svg";

export default {
  name: "invite_404",
  data: () => ({
    Icon404
  })
};
</script>
