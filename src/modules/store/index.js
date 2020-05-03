import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import state from "./states";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Modules
export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
