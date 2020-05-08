<template>
  <div
    class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
    style="background: rgba(0,0,0,.7);"
  >
    <createRoom v-if="modalsPanel == 'createroom'" />
    <createChannel v-if="modalsPanel == 'createchannel'" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import createRoom from "./components/createRoom";
import createChannel from "./components/createChannel";

export default {
  name: "modals",
  components: {
    createRoom,
    createChannel
  },
  computed: {
    ...mapState({
      modalsPanel: state => state.modals.panel
    })
  }
};
</script>
