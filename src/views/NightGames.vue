<template>
  <div class="night">
    <h5>夜のアクションを選択してください</h5>
    <b-container fluid class="mb-2">
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-select v-model="target" :options="nameList" />
          <b-button-group class="mt-2">
            <b-button
              v-if="player.position === 'diviner'"
              variant="success"
              @click="startDiviner()"
            >占う</b-button>
            <b-button
              v-if="player.position === 'werewolf'"
              variant="success"
              @click="startWerewolf()"
            >襲う</b-button>
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
import { updatePlayer, updatePlayersInfo } from "./../graphql/mutations";
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
      canDiviner: false,
      canWerewolf: false,
      canDefence: false
    };
  },
  computed: {},
  created() {
    console.log("night", this.player);
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
      this.players.forEach(p => {
        if (this.player.position === "werewolf" && p.position === "werewolf") {
          this.players[index].displayPosition = this.player.position;
        } else {
          this.players[index].displayPosition = "不明";
        }
        if (this.player.position === "diviner") {
          this.player.actions.forEach(playerId => {
            console.log(playerId);
            if (playerId === this.players[index].userId) {
              this.players[index].displayPosition = this.players[
                index
              ].position;
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
      if (this.player.position === "diviner") {
        console.log("times", this.playersInfo.times);
        console.log("actions", this.player.actions);
        // 最初はactions に test が入るから+1する必要がある
        if (this.player.actions.length < this.playersInfo.times + 1) {
          this.canDiviner = true;
          // this.player.actions.forEach(playerId => {
          //   console.log(playerId);
          // });
        }
      }
      // 人狼は投票できる
      if (this.player.position === "werewolf") {
        // 最初はactions に test が入るから+1する必要がある
        if (this.player.actions.length < this.playersInfo.times + 1) {
          this.canWerewolf = true;
        }
      }
      // 勇者は守れる
      if (this.player.position === "brave") {
        // 最初はactions に test が入るから+1する必要がある
        if (this.player.actions.length < this.playersInfo.times + 1) {
          this.canDefence = true;
        }
      }
    },
    startDiviner: function() {
      if (this.canDiviner) {
        const alivePlayers = [];
        console.log(this.players);
        this.players.forEach(player => {
          alivePlayers[player.userId] = player;
        });
        this.playersInfo.alives.forEach((playerId, i) => {
          console.log(i);
          console.log(playerId);
          console.log(this.target);
          console.log(alivePlayers[playerId].userName);
          if (this.target === alivePlayers[playerId].userName) {
            console.log("ac", this.player.actions);
            this.player.actions.push(playerId);
            alert(
              `${alivePlayers[playerId].userName}は${alivePlayers[playerId].position}`
            );
            API.graphql(graphqlOperation(updatePlayer, { input: this.player }));
            this.checkDisplayPosition();
            this.canDiviner = false;
            return;
          }
        });
      } else {
        alert("今晩はアクション済みです");
      }
    },
    startWerewolf: async function() {
      if (this.canWerewolf) {
        const alivePlayers = [];
        console.log(this.players);
        this.players.forEach(player => {
          alivePlayers[player.userId] = player;
        });
        await this.playersInfo.alives.forEach((playerId, i) => {
          console.log(i);
          console.log(playerId);
          console.log(this.target);
          console.log(alivePlayers[playerId].userName);
          if (this.target === alivePlayers[playerId].userName) {
            console.log("ac", this.player.actions);
            this.player.actions.push(playerId);
            this.canWerewolf = false;
            return;
          }
        });
        await API.graphql(
          graphqlOperation(updatePlayer, { input: this.player })
        );
        const resPlayers = await API.graphql(
          graphqlOperation(getPlayerByRoomId, { roomId: this.playersInfo.id })
        );
        const players = resPlayers.data.getPlayerByRoomId.items;
        const werewolfActionList = [];
        const defenceList = [];
        console.log(players);
        players.forEach((player, i) => {
          console.log(player.actions.length);
          console.log(i);
          if (player.position == "werewolf" && player.actions != null) {
            if (player.actions.length > 1) {
              player.actions.forEach(action => {
                if (action != "test") {
                  werewolfActionList.push(action);
                }
              });
            }
          } else if (player.position == "brave") {
            if (player.actions[0] != "test") {
              defenceList.push(player.actions[0]);
          }
        });
        console.log(werewolfList);
      } else {
        alert("今晩はアクション済みです");
        return;
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
