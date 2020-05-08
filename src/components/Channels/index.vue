<template>
  <div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div class="bg-black-200 text-purple-lighter flex-none w-24 py-4 hidden md:block">
      <div class="cursor-pointer mb-4">
        <div class="bg-gray-600 h-16 w-16 flex items-center justify-center rounded-lg mx-auto">
          A
        </div>
      </div>

      <div class="cursor-pointer mb-4">
        <div class="bg-gray-600 h-16 w-16 flex items-center justify-center rounded-lg mx-auto">
          B
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "channels",
  mounted () {
    this.loadChannels()
  },
  computed: {
    ...mapState({
      channels: state => state.channels.channels
    })
  },
  methods: {
    ...mapActions({
      loadChannels: "channels/loadChannels"
    })
  }
};
</script>
