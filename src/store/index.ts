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
      id: "", // id = roomId, roomId はトークルームに限らず検出されたものを入れる
      type: "",
      owner: "",
      ownerId: "",
      werewolf: 0,
      villager: 0,
      diviner: 0,
      brave: 0,
      people: 0,
      players: []
    },
    player: {
      userId: "",
      userName: "",
      position: "",
      state: "",
      actions: [""],
      vote: ""
    },
    // ゲーム中変化するデータ
    playersInfo: {
      id: "", //room
      times: 0,//昼、毎回更新
      alives: [],
      deads: [],
      startTime: null,
      gameState: "",
      playersVotes: [],
      werewolfVotes: [],
      defenceTargets: [],
      players: [],
      //iran-> state: ""//昼夜、毎回更新
    },
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
    },
    setPlayersInfo(state, info) {
      state.playersInfo = info
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
    },
    setPlayersInfo(context, info) {
      context.commit('setPlayersInfo', info)
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
