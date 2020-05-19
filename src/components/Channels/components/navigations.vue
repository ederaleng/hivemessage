<template>
    <div
     :class="{ 'hidden': !navigation, 'block': navigation }"
     class="
     main-modal absolute inset-0 z-50 flex flex-col justify-center items-center animated fadeIn faster
     md:block md:w-16 md:relative" style="background: rgba(0,0,0,.7);"
    >
      <div class="
        w-11/12 h-11/12 rounded-md bg-black-200 text-purple-lighter flex-none py-4 overflow-y-auto overflow-x-hidden
        md:rounded-none md:w-full md:h-full
      ">
        <div class="cursor-pointer mb-4">
          <router-link :to="{ name: 'perfil' }" class="block flex items-center mx-auto w-3/4 md:w-auto md:px-0">
            <img
              :src="`https://images.hive.blog/u/${username}/avatar`"
              class="h-10 w-10 mr-2 md:mx-auto rounded-full my-3"
            />
            <span class="text-white font-sans font-semibold block md:hidden"> {{ username }} </span>
          </router-link>
          <div class=" relative border-black-300 border-b-2 mx-6 h-px"></div>
        </div>
        <div
          v-for="(channel, index) in channels"
          :key="index"
          class="cursor-pointer mb-4"
        >
          <router-link :to="getRouteChannel(channel)">
            <div class="block flex items-center mx-auto w-3/4 md:w-auto md:px-0">
              <img
                class="h-10 w-10 flex items-center justify-center rounded-full mr-2 md:mx-auto"
                :src="getImagenChannel(channel)"
                v-if="getImagenChannel(channel)"
              />
              <div
                class="relative bg-gray-600 h-10 w-10 flex items-center justify-center rounded-full mr-2 md:mx-auto"
                v-else
              >
                {{ getNameChannel(channel) }}
              </div>
              <span class="text-white font-sans font-semibold block md:hidden"> {{ getFullNameChannel(channel) }} </span>
            </div>
          </router-link>
        </div>

        <div class="block flex items-center md:w-auto md:px-0">
          <button
            @click="openModal('createchannel')"
            class=" cursor-pointer mb-4 w-3/4 mx-auto flex items-center rounded-lg"
          >
            <img class="h-10 w-10 mr-2" :src="iconMore" />
            <span class="text-white font-sans font-semibold block md:hidden">
              Create channel
            </span>
          </button>
        </div>
      </div>
      <svg @click="navigationChannelStatus()" class="block md:hidden mt-2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18" > <path style="fill: #fff;" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { get as _get } from "lodash";
import More from "@/assets/img/more.svg";

export default {
  name: "navigation_channels",
  data: () => ({
    iconMore: More
  }),
  computed: {
    ...mapState({
      username: state => state.app.username,
      channels: state => state.channels.channels,
      navigation: state => state.channels.app.navigation
    })
  },
  methods: {
    ...mapActions({
      openModal: "modals/openModal",
      navigationChannelStatus: "channels/navigationChannelStatus"
    }),
    getImagenChannel(data) {
      return _get(data, "meta_data.urlImage", null);
    },
    getNameChannel(data) {
      return _get(data, "meta_data.name", _get(data, "id")).substr(0, 2);
    },
    getFullNameChannel(data) {
      return _get(data, "meta_data.name", _get(data, "id"))
    },
    getRouteChannel(data) {
      return { name: "channel", params: { channel: _get(data, "id") } };
    }
  }
}
</script>
