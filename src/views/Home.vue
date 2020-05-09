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
    <!-- <amplify-connect :query="getGameInfo" :subscription="createGameInfoSubscription">
      <template slot-scope="{loading, data}">
        <div v-if="loading">Loading...</div>

        <div v-else-if="data">{{data.getGameInfo.id}}</div>
      </template>
    </amplify-connect>-->
    <amplify-connect :mutation="createGameInfoMutation" @done="goWaiting">
      <template slot-scope="{ loading, errors, mutate }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="errors.length > 0">error</div>
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
      werewolf
      villager
      diviner
      brave
      people
    }
  }
`;

const OnCreateGameInfoSubscription = `subscription OnCreateGameInfo {
      onCreateGameInfo {
      id
      type
      owner
      werewolf
      villager
      diviner
      brave
      people
      }
    }`;

const CreateGameInfoMutation = `mutation CreateGameInfo(
    $id: ID!,
    $type: String!,
    $owner: String!,
    $werewolf: Int!,
    $villager: Int!,
    $diviner: Int!,
    $brave: Int!,
    $people: Int!
    ){
    createGameInfo(input: {     
        id: $id,
        type:$type,
        owner:$owner,
        werewolf:$werewolf,
        villager:$villager,
        diviner:$diviner,
        brave:$brave,
        people:$people
  }){
    id
    type
    owner
    werewolf
    villager
    diviner
    brave
    people
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
        { value: 8, text: "9" }
      ],
      paticipatant: false,
      roomid: "test",
      type: "test",
      owner: "",
      werewolf: 2,
      villager: 2,
      diviner: 1,
      brave: 1,
      people: 6,
      loginData: {
        userId: "",
        type: "",
        owner: "",
        utouId: "",
        roomId: "test",
        groupId: ""
      }
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
        id: this.roomid
      });
    },
    createGameInfoSubscription() {
      return this.$Amplify.graphqlOperation(OnCreateGameInfoSubscription);
    },
    createGameInfoMutation() {
      return this.$Amplify.graphqlOperation(CreateGameInfoMutation, {
        id: this.roomid,
        type: this.type,
        owner: this.owner,
        werewolf: this.werewolf,
        villager: this.villager,
        diviner: this.diviner,
        brave: this.brave,
        people: this.people
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
        async function() {
          const idToken = await liff.getContext();
          await this.$store.dispatch("setLoginData", idToken);
          this.type = idToken.type || "test";
          this.roomid = getRoom(idToken.type, idToken.groupId, idToken.roomId);
          console.log(this.loginData);
          await this.checkRoomid();
        }
      );
    },
    getRoom: function(type, groupId, roomId) {
      if (type == "group") {
        return groupId;
      } else if (type == "room") {
        return roomId;
      } else {
        return "test";
      }
    },
    // 今度type をみてそれでroomId を決定する
    checkRoomid: function() {
      if (this.type == "group") {
        this.roomid = this.$store.state.loginData.groupId;
      } else if (this.type == "room") {
        this.roomid = this.$store.state.loginData.roomId;
      } else {
        this.roomid = this.$store.state.loginData.groupId; //試験的に
      }
      console.log("type", this.type);
      return;
    },
    participate: function() {
      console.log("participate");
      this.paticipatant = true;
    },
    runGame: function() {
      console.log(this.roomid);
      if (this.roomid === "test") {
        return true;
      } else {
        return false;
      }
    },
    goWaiting() {
      alert("送信しました");
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
