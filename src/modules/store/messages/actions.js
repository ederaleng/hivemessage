/* eslint-disable */
import { get as _get, cloneDeep, concat } from 'lodash'
import { messages } from "@/bakend/messages"
import { sendJSON } from "@/helpers/Keychain";
import { tryParse } from "@/utils/parsing";

let interval = null

export default {
  async loadMessages ({ commit, state }, objDT) {
    let { room, offset } = objDT
    let { data } = await messages.get(`/room/${room}${offset?`?offset=${offset}`:''}`);
    let finalMessages = [];
    
    for (let singleMessage of _get(data, "data", [])) {
      let found = state.messages.find(msg => msg.id == singleMessage.id)
      if(!found) {
        let meta_data = tryParse(_get(singleMessage, "meta_data"));
        finalMessages.push(Object.assign(singleMessage, { meta_data }));
      }
    }

    if(finalMessages.length > 0) {
      let cloneMessages = cloneDeep(state.messages)
      let concatMessages = concat(cloneMessages, finalMessages)
      commit("setState", { key: "messages", value: concatMessages });
    }
  },

  clearMessages ({ commit }) {
    commit("setState", { key: "messages", value: [] });
  },

  async sendMessageToRoom ({ commit, rootState }, custom_json){
    let { username } = rootState.app;
    let jsonSendMessage = JSON.stringify(["messageRoom", custom_json])
    let resultCreate = await sendJSON(
      username,
      "hivemessage",
      "Posting",
      jsonSendMessage,
      "send message"
    );
  },
  
  startPooling ({ dispatch }, objDT) {
    interval = setInterval(() => {
      dispatch('loadMessages', objDT)
    }, 3000)
  },
  // eslint-disable-next-line
  stopPooling ({}) {
    if(interval) {
      clearInterval(interval)
      interval = null
    }
  },
};
