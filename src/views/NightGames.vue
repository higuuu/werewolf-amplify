<template>
  <div class="night">
    <h5>夜のアクションを選択してください</h5>
    <b-container fluid class="mb-2">
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-select v-model="target" :options="nameList" />
          <b-button-group class="mt-2">
            <b-button
              v-if="player.positioin === 'diviner'"
              variant="success"
              @click="startDiviner()"
            >占う</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
    <h5>残り{{ waitingTime }}秒</h5>
    <b-container fluid>
      <b-row>
        <b-col cols="10" offset="1">
          <b-alert :show="isDoneAction" variant="success">あなたのアクション選択は完了しました</b-alert>
          <b-alert :show="isExpiredTime" variant="danger">
            時間切れです。
            <br />全員のアクションを完了させて下さい。
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
    <b-button-group class="mt-2">
      <b-button variant="success">選択</b-button>
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
import { getPlayersInfo, getPlayerByRoomId } from "./../graphql/queries";
import { onUpdatePlayerByRoomId } from "./../graphql/subscriptions";

export default {
  name: "daytime",
  components: {
    DaytimeGameList
  },
  data() {
    return {
      player: this.$store.state.player,
      players: this.$store.state.gameInfo.players,
      playersInfo: this.$store.state.playersInfo,
      // gameInfo: this.$store.state.gameInfo,
      nameList: "",
      target: "",
      startTime: "",
      waitingTime: null,
      isDoneAction: false,
      isExpiredTime: false,
      canAction: false
    };
  },
  computed: {},
  created() {
    console.log(this.playersInfo);
    this.nameList = this.players.map(player => {
      if (this.playersInfo.alives.includes(player.userId)) {
        return player.userName;
      }
    });
    this.checkDisplayPosition();
    this.countDown();
  },
  mounted() {
    setInterval(() => {
      this.calWaitingTime();
    }, 1000);
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
    countDown: async function() {
      const result = await API.graphql(
        graphqlOperation(getPlayersInfo, {
          id: this.playersInfo.id
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
      // 自分の役職を表示
      index = 0;
      this.players.forEach(player => {
        if (player.userId === this.player.userId) {
          this.players[index].displayPosition = this.player.position;
        }
        index++;
      });
      console.log(this.players);
      // players.times / 2 の数だけ占い師は表示できる
      if (this.player.positioin === "diviner") {
        if (this.player.actions.length < this.players.times) {
          this.canAction = true;
          // this.player.actions.forEach(playerId => {
          //   console.log(playerId);
          // });
        }
      }
    },
    startDiviner: function() {
      if (this.canAction) {
        this.playersInfo.alives.forEach(playerId => {
          console.log(playerId);
          console.log();
          console.log(this.player.actions);
        });
      } else {
        alert("今晩はアクション済みです");
      }
    },
    checkState: function() {
      // times%2=1 の場合パスを変える、あとからログイン用
      if (this.player.state === "night") {
        // nigth action のページ
      }
    },
    checkGameEnd: function() {
      // 人狼過半数 or 0 になったらゲームを終了させる
      // 結果表示 のページ
    }
  }
};
</script>
