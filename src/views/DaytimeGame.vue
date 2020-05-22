<template>
  <div class="daytimenoon">
    <h5>投票者を入力してください</h5>
    <b-container fluid class="mb-2">
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-select v-model="vote" :options="nameList" />
        </b-col>
      </b-row>
    </b-container>
    <h5>残り{{ waitingTime }}秒</h5>
    <b-container fluid>
      <b-row>
        <b-col cols="10" offset="1">
          <b-alert :show="isDoneVote" variant="success">あなたの投票は完了しました</b-alert>
          <b-alert :show="isExpiredTime" variant="danger">
            時間切れです。
            <br />全員の投票を完了させて下さい。
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
    <b-button-group class="mt-2">
      <b-button variant="success" @click="startVote()">投票</b-button>
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
import { getPlayersInfo } from "./../graphql/queries";

export default {
  name: "daytime",
  components: {
    DaytimeGameList
  },
  data() {
    return {
      players: this.$store.state.gameInfo.players,
      gameInfo: this.$store.state.gameInfo,
      nameList: "",
      vote: "",
      startTime: "",
      waitingTime: null,
      isDoneVote: false,
      isExpiredTime: false
    };
  },
  computed: {},
  mounted() {
    setInterval(() => {
      this.calWaitingTime();
    }, 1000);
  },
  created() {
    this.nameList = this.players.map(player => player.userName);
    this.countDown();
  },
  methods: {
    calWaitingTime: function() {
      const waitingTimeDouble =
        120 - (new Date().getTime() - this.startTime) / 1000;
      this.waitingTime = parseInt(waitingTimeDouble);
      if (this.waitingTime <= 0) {
        this.isExpiredTime = true;
      }
    },
    startVote: async function() {
      console.log(this.vote);
      this.$store.state.player.vote = this.vote;
      const result = await API.graphql(
        graphqlOperation(updatePlayer, { input: this.$store.state.player })
      );
      if (result.data.updatePlayer.vote !== "") {
        this.isDoneVote = true;
      }
      console.log(result);
    },
    countDown: async function() {
      const result = await API.graphql(
        graphqlOperation(getPlayersInfo, {
          id: this.gameInfo.id
        })
      );
      console.log(result);
      this.startTime = result.data.getPlayersInfo.startTime;
      console.log(this.startTime);
    }
  }
};
</script>
