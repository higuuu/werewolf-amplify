<template>
  <div class="waitingroom">
    <!-- <h4>あなたは{{ this.isOwner ? "主催者" : "参加者" }}です。</h4> -->
    <h4 v-show="this.isOwner">あなたは主催者です。</h4>
    <h4 v-show="!this.isOwner">
      {{ this.$store.state.gameInfo.owner }}さんが
      <br />ゲームを作成しました。
    </h4>
    <b-container fluid class="mt-4">
      <b-row class="mt-3">
        <b-col cols="8" offset="2">
          <h5>参加者一覧</h5>
          <ul>
            <li>{{ this.$store.state.gameInfo.owner }}さん</li>
          </ul>
          <b-button-group class="mt-4" v-show="!this.isOwner">
            <b-button variant="success">
              <b-icon icon="clipboard" aria-hidden="true" />ゲームに参加する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

export default {
  name: "WaitingRoom",
  data() {
    return {
      isOwner: false, // ローカルで参加者としてはいるためにはfalse
      gameRole: null,
      loginData: this.$store.state.loginData,
      gameInfo: this.$store.state.gameInfo
    };
  },
  created() {
    this.isOwner = this.loginData.userID === this.gameInfo.ownerId;
    // アカウント作成APIを用意する
  },
  computed: {},
  methods: {}
};
</script>

<style>
.icon_wolf {
  height: 100px;
  width: 100px;
}
</style>
