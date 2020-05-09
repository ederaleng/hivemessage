import LS from "@/helpers/storage";
import { tryParse } from "@/utils/parsing"
import { remove } from 'lodash'

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
          let list = tryParse(LS.getItem('listUsers'))
          let listUsers = (Array.isArray(list) ? list : [])
          if(listUsers.indexOf(keychain_username) === -1) {
            listUsers.push(keychain_username)
            LS.setItem('listUsers', JSON.stringify(listUsers))
          }
          resolve(response)
          
        }
        else {
          reject(response)
        }
      });
    })
  },
  logout({ commit }, username) {
    commit("setState", { key: "username", value: null });
    commit("setState", { key: "userType", value: null });
    let list = tryParse(LS.getItem('listUsers'))
    let listUsers = (Array.isArray(list) ? list : [])
    listUsers = remove(listUsers, (u) => u !== username)
    LS.setItem('listUsers', JSON.stringify(listUsers))
  },
  have_keychain({ commit }) {
    let countime = Date.now();
    let intertal = setInterval(() => {
      if(window.hive_keychain) {
        commit("setState", { key: "have_keychain", value: true })
        clearInterval(intertal)
        return;
      }
      let end = Date.now() - countime
      if(end > 3000) clearInterval(intertal)
    }, 100)
  }
};
