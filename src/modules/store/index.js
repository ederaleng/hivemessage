import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import state from "./states";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Modules
import rooms from "./rooms";
import channels from "./channels";
import messages from "./messages";
import directory from "./directory";

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    rooms,
    channels,
    messages,
    directory
  }
});
