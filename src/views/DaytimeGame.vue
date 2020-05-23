<template>
  <div class="daytimenoon">
    <h5>投票先を選択してください</h5>
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
      <b-row class="mt-2">
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
      player: this.$store.state.player,
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
    this.checkDisplayPosition();
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
      this.$store.state.player.vote = this.vote;
      const result = await API.graphql(
        graphqlOperation(updatePlayer, { input: this.$store.state.player })
      );
      if (result.data.updatePlayer.vote !== "") {
        this.isDoneVote = true;
      }
    },
    countDown: async function() {
      const result = await API.graphql(
        graphqlOperation(getPlayersInfo, {
          id: this.gameInfo.id
        })
      );
      this.startTime = result.data.getPlayersInfo.startTime;
    },
    checkDisplayPosition: function() {
      // players.displayPosition に全部に不明と記入する
      let index = 0;
      this.players.forEach(() => {
        if (this.player.positioin === "werewolf") {
          this.players[index].displayPosition = this.player.positioin;
        } else {
          this.players[index].displayPosition = "不明";
        }
        if (this.player.positioin === "diviner") {
          this.player.actions.forEach(playerId => {
            console.log(playerId);
            if (playerId === this.players[index].userId) {
              this.players[index].displayPosition = this.players[
                index
              ].positioin;
            }
          });
        }
        index++;
      });
      console.log(this.players);
      // players.times / 2 の数だけ占い師は表示できる
      if (this.player.positioin === "diviner") {
        this.player.actions.forEach(playerId => {
          console.log(playerId);
        });
      }
    },
    checkState() {
      // state が night の場合パスを変える、あとからログイン用
      if (this.player.state === "night") {
        // nigth action のページ
      }
    },
    checkVote() {
      // update を監視して投票数が定員通りになったのならstateを変更しパスを渡す
      // nigth action のページ
    },
    checkGame() {
      // 人狼過半数 or 0 になったらゲームを終了させる
      // 結果表示 のページ
    }
  }
};
</script>
