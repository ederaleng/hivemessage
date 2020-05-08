<template>
  <div class="font-sans antialiased h-screen flex">
    <!-- Sidebar / channel list -->
    <div class="bg-black-200 text-purple-lighter flex-none w-24 py-4 hidden md:block">

      <div v-for="(channel, index) in channels" :key="index" class="cursor-pointer mb-4">
        <router-link :to="getRouteChannel(channel)" class="bg-gray-600 h-16 w-16 flex items-center justify-center rounded-lg mx-auto">
          {{ getNameChannel(channel) }}
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { get as _get } from 'lodash'

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
    }),
    getNameChannel(data) {
      return _get(data, 'meta_data.name', _get(data, 'id')).substr(0, 2)
    },
    getRouteChannel (data) {
      return { name: 'channel', params: { channel: _get(data, 'id') } }
    }
  }
};
</script>
