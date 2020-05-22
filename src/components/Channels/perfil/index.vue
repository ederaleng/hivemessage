<template>
  <div class="flex min-h-screen relative bg-black-300 w-full text-center">
    <Navigations />
    <div class="relative w-full md:w-5/6">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navigations from "./components/navigations"
export default {
  name: "perfil",
  components: {
    Navigations
  }
};
</script>
