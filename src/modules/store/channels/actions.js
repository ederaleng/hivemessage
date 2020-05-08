import { channels } from "@/bakend/channels"
import { directory } from "@/bakend/directory"
import { get as _get } from 'lodash'
import { tryParse } from '@/utils/parsing'

export default {
  async loadChannels ({ commit, rootState }) {
    let { username } = rootState.app
    let { data } = await directory.get(`/user/${username}`)
    let finalChannels = []
    for (let singleChannel of _get(data, 'data', [])) {
      let { data: dtChannel } = await channels.get(`/${_get(singleChannel, 'channel')}`)
      let meta_data = tryParse(_get(dtChannel, 'data.meta_data'))
      let channel = _get(dtChannel, 'data')
      finalChannels.push(Object.assign(channel, { meta_data }))
    }
    commit("setState", { key: "channels", value: finalChannels });
  }
};
