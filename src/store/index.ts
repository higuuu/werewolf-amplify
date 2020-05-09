import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      userId: "test",
      type: "test",
      utouId: "test",
      roomId: "test",
      groupId: "test"
    }
  },
  mutations: {
    setLoginData(state, info) {
      state.loginData.userId = info.userId || "test",
        state.loginData.type = info.type || "test",
        state.loginData.utouId = info.utouId || "test",
        state.loginData.roomId = info.roomId || "test",
        state.loginData.groupId = info.groupId || "test"
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
