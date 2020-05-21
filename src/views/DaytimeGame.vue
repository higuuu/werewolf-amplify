<template>
  <div class="daytimenoon">
    <h5>投票者を入力してください</h5>
    <b-container fluid>
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-select v-model="vote" :options="nameList"/>
        </b-col>
      </b-row>
    </b-container>
    <b-button-group class="mt-4">
      <b-button variant="success" @click="startVote()">
        投票
      </b-button>
    </b-button-group>
    <b-container fluid>
      <b-row class="mt-3">
        <b-col cols="10" offset="1">
          <DaytimeGameList :players="players" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import DaytimeGameList from "@/components/DaytimeGameList.vue";
import { updatePlayer } from "./../graphql/mutations";

export default {
  name: "daytime",
  components: {
    DaytimeGameList
  },
  data() {
    return {
      players: this.$store.state.gameInfo.players,
      nameList: "",
      vote: ""
    }
  },
  created() {
    this.nameList = this.players.map(player => player.userName);
  },
  methods: {
    startVote: async function() {
      console.log(this.vote);
      this.$store.state.player.vote = this.vote;
      const result = await API.graphql(
        graphqlOperation(updatePlayer, { input: this.$store.state.player })
      );
      console.log(result);
    }
  }
};
</script>
