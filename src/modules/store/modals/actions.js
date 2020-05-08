export default {
  // open and close modal
  openModal({ commit }, panel) {
    commit("setState", { key: "panel", value: panel });
    commit("setState", { key: "modal", value: true });
  },
  closeModal({ commit }) {
    commit("setState", { key: "panel", value: null });
    commit("setState", { key: "modal", value: false });
  },

  // set data of modal
  setData({ commit }, payload) {
    commit("setState", { key: "datas", value: payload });
  },

  // set state to default valur
  setToDefaultValue({ commit }, { key, value }) {
    commit("setState", { key, value });
  }
};
