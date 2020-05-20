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
import Vue from 'vue'
import router from "./router";

export default class App extends Vue {
  finishGame() {
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
