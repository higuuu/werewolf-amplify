<template>
  <div class="makeroom">
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
    <amplify-connect :mutation="createGameInfoMutation" @done="onCreatedFinished">
      <template slot-scope="{ loading, mutate }">
        <div v-if="loading">Loading...</div>
        <!-- <div v-else-if="errors.length > 0">error</div> -->
        <b-button variant="outline-primary" @click="mutate" class="mt-2">create</b-button>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { API } from "aws-amplify";

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
  name: "MakeRoom",
  data() {
    return {
      paticipatant: false,
      roomid: "test",
      type: "test",
      owner: "test",
      werewolf: 2,
      people: 6
    };
  },
  created() {
    this.participate();
    this.checkRoomid();
  },
  computed: {
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
  // "Validation error of type FieldUndefined: Field 'CreateGameInfo' in type 'Mutation' is undefined @ 'CreateGameInfo'"
  //"Validation error of type VariableTypeMismatch: Variable type 'String!' doesn't match expected type 'ID' @ 'createGameInfo'"
  methods: {
    // 今度type をみてそれでroomId を決定する
    checkRoomid: function() {
      this.roomid = this.$store.state.loginData.groupId;
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
