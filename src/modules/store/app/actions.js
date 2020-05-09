import LS from "@/helpers/storage";
import moment from 'moment'

/* eslint-disable */ 
export default {
  login({ commit }, keychain_username) {
    let message = `hivemessage_${Math.round(99999999999*Math.random())}`
    let username = keychain_username.replace('@','')
    return new Promise((resolve, reject) => {
      hive_keychain.requestSignBuffer(username, message, 'Posting', function(response) {
        if(response.success) {
          commit("setState", { key: "username", value: username });
          commit("setState", { key: "userType", value: 'hive_keychain' });
          LS.setItem('userActive', username)
          LS.setItem('timeActive', (moment().unix() + 259200))
          resolve(response)
        }
        else {
          reject(response)
        }
      });
    })
  },
  logout() {}
};
