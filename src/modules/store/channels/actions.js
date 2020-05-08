import { channels } from "@/bakend/channels"
import { directory } from "@/bakend/directory"
import { get as _get } from 'lodash'
import { tryParse } from '@/utils/parsing'
import { client } from '@/helpers/Client'

export default {
  async loadChannels ({ commit, rootState }) {
    let { username } = rootState.app
    let { data } = await directory.get(`/user/${username}`)
    let finalChannels = []
    for (let singleChannel of _get(data, 'data', [])) {
      let { data: dtChannel } = await channels.get(`/${_get(singleChannel, 'channel')}`)
      let meta_data = tryParse(_get(dtChannel, 'data.meta_data'))
      let channel = _get(dtChannel, 'data')
      let trxData = await client.database.call("get_transaction", [ _get(dtChannel, 'data.id') ])
      channel['owner'] = _get(trxData, 'operations[0][1].required_posting_auths[0]')
      finalChannels.push(Object.assign(channel, { meta_data }))
    }
    commit("setState", { key: "channels", value: finalChannels });
  }
};
