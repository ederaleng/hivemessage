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
      // let trxData = await client.database.call("get_transaction", [
      //   _get(dtChannel, "data.id")
      // ]);
      // channel["owner"] = _get(
      //   trxData,
      //   "operations[0][1].required_posting_auths[0]"
      // );
      finalChannels.push(Object.assign(channel, { meta_data }));
    }
    commit("setState", { key: "channels", value: finalChannels });
  },
  async createChannel({ rootState, state, commit }, custom_json) {
    let { username } = rootState.app;
    // create channel
    let jsonCrateChannel = JSON.stringify(["createChannel", custom_json]);
    let resultCreate = await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonCrateChannel,
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
  }
};
