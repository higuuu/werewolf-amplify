<template>
  <div class="home">
    <h2>人狼ゲーム</h2>
    <img class="icon_wolf" alt="icon_wolf logo" src="../assets/icon_wolf.png" />
    <template v-if="runGame()">
      <h5>ゲームは未設定です</h5>
      <b-container fluid>
        <b-row class="mt-3">
          <b-col cols="8" offset="2"></b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <b-row class="mt-3">
          <b-col cols="8" offset="2">
            <b-form-group label="あなた（ホスト）の名前を入力してください">
              <b-form-input v-model="owner" required placeholder="Enter name"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="2" />
          <b-col cols="4">
            <b-form-text>
              <p style="font-size: 28px">人狼</p>
            </b-form-text>
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="werewolf" :options="number_selection" />
          </b-col>
          <b-col cols="2" />
        </b-row>
        <b-row class="mt-3">
          <b-col cols="2" />
          <b-col cols="4">
            <b-form-text>
              <p style="font-size: 28px">村人</p>
            </b-form-text>
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="villager" :options="number_selection" />
          </b-col>
          <b-col cols="2" />
        </b-row>
        <b-row class="mt-3">
          <b-col cols="2" />
          <b-col cols="4">
            <b-form-text>
              <p style="font-size: 28px">占い師</p>
            </b-form-text>
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="diviner" :options="number_selection" />
          </b-col>
          <b-col cols="2" />
        </b-row>
        <b-row class="mt-3">
          <b-col cols="2" />
          <b-col cols="4">
            <b-form-text>
              <p style="font-size: 28px">勇者</p>
            </b-form-text>
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="brave" :options="number_selection" />
          </b-col>
          <b-col cols="2" />
        </b-row>
        <b-row class="mt-3">
          <b-col cols="8" offset="2">
            <b-form-text>
              <p style="font-size: 28px">合計:{{sumPeople}}人</p>
            </b-form-text>
          </b-col>
        </b-row>
      </b-container>
    </template>
    <b-container fluid>
      <b-row class="mt-3">
        <b-col cols="8" offset="2">
          <b-button-group>
            <b-button variant="success" v-on:click="participate()">
              <b-icon icon="clipboard" aria-hidden="true" />ゲームに参加する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
    <amplify-connect :mutation="createGameInfoMutation" @done="goWaiting">
      <template slot-scope="{ loading, errors, mutate }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="errors.length > 0">
          エラーが発生しました.
          <br />既にルームがある可能性があります.
          <br />参加を押してみてください
        </div>
        <b-button variant="outline-primary" @click="mutate" class="mt-2">
          <b-icon icon="clipboard" aria-hidden="true" />ゲームを開催する
        </b-button>
      </template>
    </amplify-connect>
  </div>
</template>

<script
  charset="utf-8"
  src="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
></script>

<script>
import { API, graphqlOperation } from "aws-amplify";

const getGameInfoQuery = /* GraphQL */ `
  query GetGameInfo($id: ID!) {
    getGameInfo(id: $id) {
      id
      type
      owner
      ownerId
      werewolf
      villager
      diviner
      brave
      people
      players
      state
    }
  }
`;

const OnCreateGameInfoSubscription = `subscription OnCreateGameInfo {
      onCreateGameInfo {
      id
      type
      owner
      ownerId
      werewolf
      villager
      diviner
      brave
      people
      players
      state
      }
    }`;

const CreateGameInfoMutation = `mutation CreateGameInfo(
    $id: ID!,
    $type: String!,
    $owner: String!,
    $ownerId: String!,
    $werewolf: Int!,
    $villager: Int!,
    $diviner: Int!,
    $brave: Int!,
    $people: Int!,
    $players: [String],
    $state: String
    ){
    createGameInfo(input: {     
        id: $id,
        type:$type,
        owner:$owner,
        ownerId:$ownerId,
        werewolf:$werewolf,
        villager:$villager,
        diviner:$diviner,
        brave:$brave,
        people:$people,
        players:$players,
        state:$state
  }){
    id
    type
    owner
    ownerId
    werewolf
    villager
    diviner
    brave
    people
    players
    state
  }
}
`;
export default {
  name: "Home",
  data() {
    return {
      number_selection: [
        { value: null, text: "選択" },
        { value: 0, text: "0" },
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
        { value: 7, text: "7" },
        { value: 8, text: "8" },
        { value: 9, text: "9" }
      ],
      paticipatant: false,
      roomId: "",
      type: "",
      owner: "",
      ownerId: "",
      werewolf: 2,
      villager: 2,
      diviner: 1,
      brave: 1,
      people: 6,
      players: [],
      state: ""
    };
  },
  created() {
    this.initializeLiff();
    this.participate();
  },
  computed: {
    sumPeople() {
      this.people = this.werewolf + this.villager + this.diviner + this.brave;
      return this.people;
    },
    getGameInfo() {
      return this.$Amplify.graphqlOperation(getGameInfoQuery, {
        id: this.roomId
      });
    },
    createGameInfoSubscription() {
      return this.$Amplify.graphqlOperation(OnCreateGameInfoSubscription);
    },
    createGameInfoMutation() {
      return this.$Amplify.graphqlOperation(CreateGameInfoMutation, {
        id: this.roomId,
        type: this.type,
        owner: this.owner,
        ownerId: this.ownerId,
        werewolf: this.werewolf,
        villager: this.villager,
        diviner: this.diviner,
        brave: this.brave,
        people: this.people,
        players: this.players,
        state: this.state
      });
    }
  },
  methods: {
    initializeLiff: function() {
      console.log(process.env.development);
      liff.init(
        {
          liffId: process.env.VUE_APP_LIFF_ID
        },
        async () => {
          const idToken = liff.getContext();
          this.$store.dispatch("setLoginData", idToken);
          await this.checkRoomid();
          const checker = await this.getGameInfoOnce();
          if (checker !== null) {
            // !== の時が本来の動き
            this.$router.push("/waitingroom");
          }
        }
      );
    },
    checkRoomid: function() {
      if (this.$store.state.loginData === null) {
        // ブラウザからログインしたときに代わりに入れてあげる
        this.roomId = "test";
        this.type = "test";
        this.ownerId = "test";
        console.log("type", this.type);
        console.log(this.roomId);
        this.players.push(this.ownerId);
        this.state = "waitng";
        return;
      } else {
        this.type = this.$store.state.loginData.type;
        this.owner = this.$store.state.loginData.owner;
        this.ownerId = this.$store.state.loginData.userId;
        this.players.push(this.ownerId);
        this.state = "waitng";
      }
      if (this.type === "group") {
        this.roomId = this.$store.state.loginData.groupId;
      } else if (this.type === "room") {
        this.roomId = this.$store.state.loginData.roomId;
      }
      return;
    },
    participate: async function() {
      console.log("participate");
      this.paticipatant = true;
      const checker = await this.getGameInfoOnce();
      if (checker !== null) {
        // !== の時が本来の動き
        this.$router.push("/waitingroom");
      } else {
        alert("ゲームが設定されていません");
      }
    },
    getGameInfoOnce: async function() {
      const room = await API.graphql(
        graphqlOperation(getGameInfoQuery, { id: this.roomId })
      );
      this.$store.dispatch("setGameInfo", room.data.getGameInfo);
      console.log(this.$store.state.gameInfo);
      return room.data.getGameInfo.id || null;
    },
    runGame: function() {
      //ゲーム作成済みなら作成画面を表示しない
      if (this.roomId === "test") {
        return true;
      } else {
        return true;
      }
    },
    goWaiting() {
      alert("送信しました");
      this.$router.push("/waitingroom");
    },
    organize: function() {
      console.log("organize");
    },
    onCreatedFinished: function() {
      console.log("Finish Create");
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
