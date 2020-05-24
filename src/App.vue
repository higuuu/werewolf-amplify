<template>
  <div id="app">
    <b-container>
      <b-row class="mt-3 mb-5">
        <b-col cols="6" />
        <b-col cols="6">
          <b-button size="sm" @click="finishGame">ゲームを終了</b-button>
        </b-col>
      </b-row>
    </b-container>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "./router";
import store from "./store";
import { API, graphqlOperation } from "aws-amplify";
import {
  deleteGameInfo,
  deletePlayer,
  deletePlayersInfo
} from "./graphql/mutations";

interface Player {
  id: string;
  userId: string;
  roomId: string;
  userName: string;
  position: string;
  state: string;
  actions: [string];
  vote: string;
}

export default class App extends Vue {
  async finishGame() {
    const checked = window.confirm(
      "進行中の場合ゲームの内容も消えてしまいますが、よろしいですか？"
    );
    if (!checked) {
      return;
    }
    console.log(store.state);
    store.state.gameInfo.players.forEach((element: Player) => {
      API.graphql(
        graphqlOperation(deletePlayer, {
          input: { id: element.id }
        })
      );
    });
    await API.graphql(
      graphqlOperation(deleteGameInfo, {
        input: { id: store.state.gameInfo.id }
      })
    );
    await API.graphql(
      graphqlOperation(deletePlayersInfo, {
        input: { id: store.state.gameInfo.id }
      })
    );
    router.push("/");
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
