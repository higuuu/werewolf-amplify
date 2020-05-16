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
          <b-button-group class="mt-2 mr-2 ml-2" v-show="!this.isOwner">
            <b-button variant="success" @click="participate">
              <b-icon icon="person-check-fill" class="mr-2" aria-hidden="true" />参加する
            </b-button>
          </b-button-group>
          <b-button-group class="mt-2 mr-2 ml-2" v-show="!this.isOwner">
            <b-button variant="danger" @click="leave">
              <b-icon icon="box-arrow-left" class="mr-2" aria-hidden="true" />退場する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="8" offset="2">
          <h5>参加者一覧</h5>
          <ul>
            <li v-for="item in players" :key="item">{{ item }}さん</li>
          </ul>
          <div>{{ player.userName }}</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { getPlayer } from "./../graphql/queries";
import * as subscriptions from "./../graphql/subscriptions";
import { createPlayer, deletePlayer } from "./../graphql/mutations";

export default {
  name: "WaitingRoom",
  data() {
    return {
      players: [],
      participateName: "",
      isOwner: true, // ローカルで参加者としてはいるためにはfalse
      // gameRole: null,
      roomUserId: "",
      position: "test",
      actions: ["test"],
      vote: "test",
      loginData: null,
      gameInfo: null,
      player: { userName: "" }
    };
  },
  async created() {
    this.loginData = this.$store.state.loginData;
    this.gameInfo = this.$store.state.gameInfo;

    this.isOwner = this.loginData.userId === this.gameInfo.ownerId;
    if (this.isOwner) {
      this.participateName = this.$store.state.gameInfo.owner || "test";
      this.participate();
    }
    // アカウント作成APIを用意する
  },
  async mounted() {
    // Subscribe to creation of Todo

    const subscription = await API.graphql(
      graphqlOperation(subscriptions.onCreatePlayer)
    ).subscribe({
      next: data => {
        console.log("online", data.value.data.onCreatePlayer.roomId);
        console.log(this.$store.state.gameInfo.roomId);
        if (
          data.value.data.onCreatePlayer.roomId ==
          this.$store.state.gameInfo.roomId
        ) {
          this.players.push(data.value.data.onCreatePlayer);
        }
        console.log("tessst", data.value.data.onCreatePlayer);
        console.log(this.players);
      }
    });
    console.log(subscription);

    const roomId = this.gameInfo.roomId || "test";
    const result = await API.graphql(
      graphqlOperation(getPlayer, { roomId: roomId })
    );
    console.log("mounted", result);
  },
  methods: {
    participate: async function() {
      const participateName = this.participateName;
      const roomId = this.gameInfo.roomId || "test";
      const position = this.position || "test";
      const state = this.gameInfo.state || "test";
      const actions = this.actions || ["test"];
      const vote = this.vote || "test";
      this.roomUserId = roomId + "-" + this.loginData.userId;
      this.player = {
        id: this.roomUserId,
        userId: this.loginData.userId,
        roomId: roomId,
        userName: participateName,
        position: position,
        state: state,
        actions: actions,
        vote: vote
      };
      try {
        // 初回作成時
        const result = await API.graphql(
          graphqlOperation(createPlayer, {
            input: this.player
          })
        );
        console.log("res", result);
      } catch {
        // 二回目以降の作成 消して再作成
        await this.leave();
        const result = await API.graphql(
          graphqlOperation(createPlayer, {
            input: this.player
          })
        );
        console.log("res", result);
      }

      this.$store.dispatch("setPlayer", this.player);
      console.log(this.$store.state.player.userName);
    },
    leave: async function() {
      this.participateName = "";
      const roomId = this.gameInfo.roomId || "test";
      this.roomUserId = roomId + "-" + this.loginData.userId;
      const result = await API.graphql(
        graphqlOperation(deletePlayer, {
          input: { id: this.roomUserId }
        })
      );
      console.log("res", result);
      return;
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
