import { rooms } from "@/bakend/rooms";
import { get as _get } from "lodash";
import { tryParse } from "@/utils/parsing";

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
  async createRoom ({}, json) {
    
    JSON.stringify(["createRoom", {"channel": " id_trx_room " ,"name": "general"}])
  }
};
