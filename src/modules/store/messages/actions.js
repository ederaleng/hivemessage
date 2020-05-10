/* eslint-disable */
import { get as _get } from 'lodash'
import { messages } from "@/bakend/messages"
import { sendJSON } from "@/helpers/Keychain";
import { tryParse } from "@/utils/parsing";

export default {
  async loadMessages ({}, objDT) {
    let { room, offset } = objDT
    let { data } = await messages.get(`/room/${room}${offset?`?offset=${offset}`:''}`);
    let finalMessages = [];
    for (let singleMessage of _get(data, "data", [])) {
      let meta_data = tryParse(_get(singleMessage, "meta_data"));
      finalMessages.push(Object.assign(singleMessage, { meta_data }));
    }
    commit("setState", { key: "messages", value: finalMessages });
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
    console.log(resultCreate)
  }
};
