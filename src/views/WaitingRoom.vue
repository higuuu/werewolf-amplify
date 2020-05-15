<template>
  <div class="waitingroom">
    <!-- <h4>あなたは{{ this.isOwner ? "主催者" : "参加者" }}です。</h4> -->
    <h4 v-show="this.isOwner">あなたは主催者です。</h4>
    <h4 v-show="!this.isOwner">
      {{ this.$store.state.gameInfo.owner }}さんが
      <br />ゲームを作成しました。
    </h4>
    <b-container fluid class="mt-4">
      <b-row v-show="!isOwner">
        <b-col cols="8" offset="2">
          <b-form-group
            class="mb-0"
            label="名前を入力してください"
            label-for="input-formatter"
            description="他の人と名前が被らないように入力してください"
          >
            <b-form-input v-model="participateName" placeholder="name"></b-form-input>
          </b-form-group>
          <b-button-group class="mt-2" v-show="!this.isOwner">
            <b-button variant="success" @click="participate">
              <b-icon icon="clipboard" aria-hidden="true" />ゲームに参加する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="8" offset="2">
          <h5>参加者一覧</h5>
          <ul>
            <li>{{ this.$store.state.gameInfo.owner }}さん</li>
          </ul>
          <div>{{ player.userName }}</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./../graphql/queries";
import * as mutations from "./../graphql/mutations";

export default {
  name: "WaitingRoom",
  data() {
    return {
      participateName: "",
      isOwner: false, // ローカルで参加者としてはいるためにはfalse
      // gameRole: null,
      roomUserId: "",
      position: "",
      actions: [""],
      vote: "",
      loginData: null,
      gameInfo: null,
      player: { userName: "" }
    };
  },
  async created() {
    this.loginData = this.$store.state.loginData;
    this.gameInfo = this.$store.state.gameInfo;
    // Simple query 試しにやってみてい
    const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
    console.log(allTodos);

    this.isOwner = this.loginData.userId === this.gameInfo.ownerId;
    // アカウント作成APIを用意する
  },
  computed: {},
  methods: {
    participate: async function() {
      // console.log(this.participateName);
      const participateName = this.participateName || "test";
      const position = this.position || "test";
      const state = this.gameInfo.state || "test";
      const actions = this.actions || "test";
      const vote = this.vote || "test";

      this.roomUserId = this.gameInfo.roomId + this.loginData.userId;
      this.player = await API.graphql(
        graphqlOperation(mutations.createPlayer, {
          id: this.loginData.roomUserId,
          userId: this.loginData.userId,
          userName: participateName,
          position: position,
          state: state,
          actions: actions,
          vote: vote
        })
      );
      this.$store.setPlayer(this.player);
      console.log(this.$store.stae.player.userName);
    }
  }
};
</script>

<style>
.icon_wolf {
  height: 100px;
  width: 100px;
}
</style>
