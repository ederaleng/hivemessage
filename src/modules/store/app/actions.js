export default {
  login({ commit }, username) {
    commit("setState", { key: "username", value: username });
  }
};
