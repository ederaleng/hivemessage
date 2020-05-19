import { rooms } from "@/bakend/rooms";
import { get as _get, cloneDeep } from "lodash";
import { tryParse } from "@/utils/parsing";
import { sendJSON } from "@/helpers/Keychain";
import moment from "moment";
import { Object } from "core-js";

export default {
  async loadRooms({ commit }, id) {
    let { data } = await rooms.get(`/channel/${id}`);
    let finalRooms = [];
    for (let singleRoom of _get(data, "data", [])) {
      let meta_data = tryParse(_get(singleRoom, "meta_data"));
      finalRooms.push(Object.assign(singleRoom, { meta_data }));
    }
    commit("setState", { key: "rooms", value: finalRooms });
  },
  async createRoom({ rootState, state, commit }, custom_json) {
    let { username } = rootState.app;
    // create room
    let jsonCreateRoom = JSON.stringify(["createRoom", custom_json]);
    let resultCreate = await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonCreateRoom,
      "create room"
    );
    let cloneRooms = cloneDeep(state.rooms);
    let newRoom = {
      channel: _get(custom_json, "channel"),
      created_at: moment.utc().unix(),
      id: _get(resultCreate, "result.id", "Not hace id"),
      last_update: null,
      locked: false,
      meta_data: _get(custom_json, "data", {}),
      updated_at: moment.utc().unix()
    };
    cloneRooms.push(newRoom);
    commit("setState", { key: "rooms", value: cloneRooms });
  },

  navigationRoomStatus({ commit, state }) {
    let currentStatus = cloneDeep(state.app);
    let newStatus = Object.assign(currentStatus, {
      navigation: !_get(currentStatus, "navigation", false)
    });
    commit("setState", { key: "app", value: newStatus });
  }
};
