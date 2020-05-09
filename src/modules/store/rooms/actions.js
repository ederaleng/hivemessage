import { rooms } from "@/bakend/rooms";
import { get as _get } from "lodash";
import { tryParse } from "@/utils/parsing";
import { sendJSON } from "@/helpers/Keychain";

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
  /* eslint-disable */
  async createRoom ({ rootState }, json) {
    let { username } = rootState.app;
    // create room
    let jsonCreateRoom = JSON.stringify(["createRoom", json])
    let resultCreate = await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonCreateRoom,
      "create room"
    );
    console.log(resultCreate)
  }
};
