<template>
  <router-view></router-view>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  mounted() {
    this.have_keychain();
  },
  methods: {
    ...mapActions({
      have_keychain: "app/have_keychain"
    })
  }
};
</script>
