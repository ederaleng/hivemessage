export let sendJSON = (username, id, key, json, display_name) => {
  let { hive_keychain } = window;
  return new Promise((resolve, reject) => {
    hive_keychain.requestCustomJson(
      username,
      id,
      key,
      json,
      display_name,
      function(response) {
        if (response.success) {
          resolve(response);
        } else {
          reject(response);
        }
      }
    );
  });
};
