import { channels } from "@/bakend/channels";
import { directory } from "@/bakend/directory";
import { get as _get, cloneDeep } from "lodash";
import { tryParse } from "@/utils/parsing";
import { sendJSON } from "@/helpers/Keychain";

export default {
  async loadChannels({ commit, rootState }) {
    let { username } = rootState.app;
    let { data } = await directory.get(`/user/${username}`);
    let finalChannels = [];
    for (let singleChannel of _get(data, "data", [])) {
      let { data: dtChannel } = await channels.get(
        `/${_get(singleChannel, "channel")}`
      );
      let meta_data = tryParse(_get(dtChannel, "data.meta_data"));
      let channel = _get(dtChannel, "data");
      finalChannels.push(Object.assign(channel, { meta_data }));
    }
    commit("setState", { key: "channels", value: finalChannels });
  },
  async createChannel({ rootState, state, commit }, custom_json) {
    let { username } = rootState.app;
    // create channel
    let jsonCreateChannel = JSON.stringify(["createChannel", custom_json]);
    let resultCreate = await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonCreateChannel,
      "create channel"
    );
    let cloneChannels = cloneDeep(state.channels);
    cloneChannels.push({
      block_num: _get(resultCreate, "result.block_num"),
      id: _get(resultCreate, "result.id"),
      last_update: null,
      meta_data: custom_json,
      updated_at: null,
      created_at: null,
      username
    });
    // join channel
    let jsonJoinChannel = JSON.stringify([
      "joinChannel",
      { channel: _get(resultCreate, "result.id") }
    ]);
    await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonJoinChannel,
      "join channel"
    );
    // update channels
    commit("setState", { key: "channels", value: cloneChannels });
  },
  // eslint-disable-next-line
  async checkChannel({ commit }, channel_id) {
    console.log(channel_id)
    let { data } = await channels.get(`/${channel_id}`);
    if(_get(data, 'data', null) === null) {
      throw 'Channel not found'
    }
    let channel_dt = _get(data, 'data', null)
    let meta_data = tryParse(_get(channel_dt, "meta_data"));
    let finalDt = Object.assign(channel_dt, { meta_data })
    commit("setState", { key: "invitate", value: finalDt });
  }
};
