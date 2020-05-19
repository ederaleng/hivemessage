<template>
  <div class="min-h-screen max-h-screen font-sans antialiased flex overflow-hidden">
    <Navigations />
    <router-view></router-view>
    <Modals v-if="appModals" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Modals from "./modals";
import Navigations from "./components/navigations"

export default {
  name: "channels",
  created() {
    if (!this.username) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.loadChannels();
  },
  components: { Modals, Navigations },
  computed: {
    ...mapState({
      username: state => state.app.username,
      appModals: state => state.modals.modal
    })
  },
  methods: {
    ...mapActions({
      loadChannels: "channels/loadChannels"
    })
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  background-color: rgba(71, 71, 71, 0.808);
  border-radius: 4px;
  height: 8px;
  width: 8px;
  margin-left: 12px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(41, 41, 41, 0.986);
  border-radius: 4px;
}
</style>
