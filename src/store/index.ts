import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      userId: "test01",
      type: "group",
      utouId: "",
      roomId: "",
      groupId: "test"
    }
  },
  mutations: {
    setLoginData(state, info) {
      state.loginData.userId = info.userId
      state.loginData.type = info.type
      state.loginData.utouId = info.utouId
      state.loginData.roomId = info.roomId
      state.loginData.groupId = info.groupId
    }
  },
  actions: {
    setLoginData(context, info) {
      context.commit('setLoginData', info)
    }
  },
  getters: {
    getLoginData(state) {
      return state.loginData
    }
  },
  modules: {}
});
