<template>
  <div class="min-h-screen bg-black-400 flex justify-center items-center">
    <img v-if="invitate===null" class="w-12" :src="loadingIcon" />
    <div v-else class=" w-8/12 md:w-6/12 lg:w-4/12 bg-white rounded-md px-6 py-4">
      <p class="w-full my-2 text-center text-xl font-semibold font-sans">
        You have been invited to join the server:
      </p>
      <div class="py-4 bg-gray-500 rounded-md">
        <h3 class="my-2 text-center text-sm font-semibold font-sans"> {{ nameChannel }} </h3>
        <img v-if="imgChannel" :src="imgChannel" class="rounded-full w-3/12 mx-auto" />
        <img v-else :src="communityIcon" class="rounded-full w-3/12 mx-auto" />
      </div>
      <button class="block my-2 mx-auto px-4 bg-hive-red h-8 text-white font-bold rounded outline-none">
        Accept invitation
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import _get from 'lodash/get'
import loadingIcon from "@/assets/img/loading.svg";
import communityIcon  from "@/assets/img/channel.svg";

export default {
  name: 'invite',
  data: () => ({
    loadingIcon,
    communityIcon
  }),
  mounted () { this.checkInvite() },
  computed: {
    ...mapState({
      invitate: state => state.channels.invitate
    }),
    imgChannel () {
      return _get(this.invitate, 'meta_data.urlImage', null)
    },
    nameChannel () {
      return _get(this.invitate, 'meta_data.name', 'Name not defined')
    },
    descriptionChannel () {
      return _get(this.invitate, 'meta_data.description', 'Description not defined')
    }
  },
  methods: {
    ...mapActions({
      checkChannel: "channels/checkChannel"
    }),
    async checkInvite () {
      let { channel } = this.$route.params
      try {
        await this.checkChannel(channel)
      } catch (error) {
        this.$router.push({ name: 'invite_404' });
        return;
      }
    }
  }
}
</script>