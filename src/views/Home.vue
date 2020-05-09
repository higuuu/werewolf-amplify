<template>
  <div class="home">
    <h2>人狼ゲーム</h2>
    <img class="icon_wolf" alt="icon_wolf logo" src="../assets/icon_wolf.png" />
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
      <b-row class="mt-3">
        <b-col cols="8" offset="2">
          <b-button-group>
            <b-button variant="success" v-on:click="organize()">
              <b-icon icon="clipboard" aria-hidden="true" />ゲームを開催する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
    <amplify-connect :query="getGameInfo" :subscription="createGameInfoSubscription">
      <template slot-scope="{loading, data}">
        <div v-if="loading">Loading...</div>

        <div v-else-if="data">{{data.getGameInfo.id}}</div>
      </template>
    </amplify-connect>
    <amplify-connect :mutation="createGameInfoMutation" @done="onCreatedFinished">
      <template slot-scope="{ loading, errors, mutate }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="errors.length > 0">error</div>
        <b-button variant="outline-primary" @click="mutate" class="mt-2">create</b-button>
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
      people
      }
    }`;

const CreateGameInfoMutation = `mutation CreateGameInfo(
    $id: ID!,
    $type: String!,
    $owner: String!,
    $werewolf: Int!,
    $people: Int!
    ){
    createGameInfo(input: {     
        id: $id,
        type:$type,
        owner:$owner,
        werewolf:$werewolf,
        people:$people
  }){
    id
    type
    owner
    werewolf
    people
  }
}
`;
export default {
  name: "Home",
  data() {
    return {
      paticipatant: false,
      roomid: "test",
      type: "test",
      owner: "test",
      werewolf: 2,
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
    this.checkRoomid();
  },
  computed: {
    getGameInfo() {
      return this.$Amplify.graphqlOperation(getGameInfoQuery, {
        id: this.loginData.roomid
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
        () => {
          const idToken = liff.getContext();
          this.$store.dispatch("setLoginData", idToken);
          this.loginData = idToken;
          console.log(this.loginData);
        }
      );
    },
    // getGameInfo: async function() {
    //   const room = await API.graphql(
    //     graphqlOperation(getGameInfoQuery, { id: this.roomid })
    //   );
    //   console.log(room);
    //   return room;
    // },
    // 今度type をみてそれでroomId を決定する
    checkRoomid: function() {
      this.type = this.$store.state.loginData.type;
      this.roomid = this.$store.state.loginData.groupId;
      this.owner = this.$store.state.loginData.owner;
      console.log("type", this.type);
    },
    participate: function() {
      console.log("participate");
      this.paticipatant = true;
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
