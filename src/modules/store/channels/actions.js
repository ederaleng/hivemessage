import { channels } from "@/bakend/channels"
import { directory } from "@/bakend/directory"
import { get as _get } from 'lodash'

export default {
  async loadChannels ({ commit, rootState }) {
    let { username } = rootState.app
    let { data } = await directory.get(`/user/${username}`)
    let finalChannels = []
    for (let singleChannel of _get(data, 'data', [])) {
      let { data: dtChannel } = await channels.get(`/${_get(singleChannel, 'channel')}`)
      finalChannels.push(_get(dtChannel, 'data'))
    }
    commit("setState", { key: "channels", value: finalChannels });
  }
};
