/* eslint-disable */ 
export default {
  login({ commit }, keychain_username) {
    let { hive_keychain } = window
    let message = `hivemessage_${Math.round(99999999999*Math.random())}`
    let username = keychain_username.replace('@','')
    return new Promise((resolve, reject) => {
      hive_keychain.requestSignBuffer(username, message, 'Posting', function(response) {
        if(response.success) {
          commit("setState", { key: "username", value: username });
          resolve(response)
        }
        else {
          reject(response)
        }
      });
    })
  }
};
