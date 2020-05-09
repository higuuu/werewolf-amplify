import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      userId: "",
      type: "",
      owner: "",
      utouId: "",
      roomId: "",
      groupId: ""
    }
  },
  mutations: {
    setLoginData(state, info) {
      state.loginData = info
    }
  },
  actions: {
    setLoginData(context, info) {
      context.commit('setLoginData', info)
    }
  },
  getters: {
    getLoginData(state) {
      return state.loginData;
    }
  },
  modules: {}
});
