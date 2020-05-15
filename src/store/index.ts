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
    },
    gameInfo: {
      roomId: "", // roomId はトークルームに限らず検出されたものを入れる
      type: "",
      owner: "",
      ownerId: "",
      werewolf: 0,
      villager: 0,
      diviner: 0,
      brave: 0,
      people: 0,
      players: [],
      state: ""
    },
    player: {
      userId: "",
      userName: "",
      position: "",
      state: "",
      actions: [""],
      vote: ""
    }
  },
  mutations: {
    setLoginData(state, info) {
      state.loginData = info
    },
    setGameInfo(state, info) {
      state.gameInfo = info
    },
    setPlayer(state, info) {
      state.player = info
    }
  },
  actions: {
    setLoginData(context, info) {
      context.commit('setLoginData', info)
    },
    setGameInfo(context, info) {
      context.commit('setGameInfo', info)
    },
    setPlayer(context, info) {
      context.commit('setPlayer', info)
    }
  },
  getters: {
    getLoginData(state) {
      return state.loginData;
    },
    getGameInfo(state) {
      return state.gameInfo
    },
    getPlayer(state) {
      return state.player
    }
  },
  modules: {}
});
