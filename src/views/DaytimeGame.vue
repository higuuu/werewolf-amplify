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
      vote: "",
      startTime: "",
      waitingTime: null,
      isDoneVote: false,
      isExpiredTime: false
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
    this.checkVote();
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
          id: this.playersInfo.id
        })
      );
      this.startTime = result.data.getPlayersInfo.startTime;
    },
    checkDisplayPosition: function() {
      // players.displayPosition に全部に不明と記入する
      let index = 0;
      this.players.forEach(() => {
        if (this.player.position === "werewolf") {
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
      // TODO
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
        this.player.actions.forEach(playerId => {
          console.log(playerId);
        });
      }
    },
    checkState: function() {
      // times%2=1 の場合パスを変える、あとからログイン用
      if (this.player.state === "night") {
        // nigth action のページ
        console.log("night");
      }
    },
    checkVote: async function() {
      console.log(this.playersInfo.id);
      // update を監視して投票数が定員通りになったのならtimesを変更しパスを渡す
      const voteResults = [];
      const initVoteResults = await API.graphql(
        graphqlOperation(getPlayerByRoomId, { roomId: this.playersInfo.id })
      );
      console.log(initVoteResults);
      initVoteResults.data.getPlayerByRoomId.items.forEach(item => {
        if (item.vote !== "" && item.vote !== "test") {
          const voteId = item.userId;
          voteResults[voteId] = item.vote;
        }
      });
      this.judge(voteResults);
      console.log(voteResults);
      console.log("aaa", this.playersInfo);
      await API.graphql(
        graphqlOperation(onUpdatePlayerByRoomId, {
          roomId: this.playersInfo.id
        })
      ).subscribe({
        next: res => {
          // voteResults.push(res.value.data.onUpdatePlayerByRoomId.vote);
          const voteId = res.value.data.onUpdatePlayerByRoomId.userId;
          voteResults[voteId] = res.value.data.onUpdatePlayerByRoomId.vote;
          if (res.value.data.onUpdatePlayerByRoomId.vote !== "") {
            this.judge(voteResults);
          }
        }
      });
    },
    judge: async function(voteResults) {
      console.log(this.playersInfo.alives.length);
      console.log(voteResults.length);
      const votes = [];
      this.playersInfo.alives.forEach(id => {
        votes.push(voteResults[id]);
      });
      if (this.playersInfo.alives.length !== votes.length) {
        console.log("未投票");
        return;
      }
      const accumurate = [];
      const userIdList = [];
      let displayResult = "";
      this.playersInfo.alives.forEach(id => {
        userIdList.push(voteResults[id]);
        accumurate[voteResults[id]] =
          accumurate[voteResults[id]] === undefined
            ? 1
            : accumurate[voteResults[id]] + 1;
      });
      console.log(userIdList);
      const userIdSet = new Set(userIdList);
      const newUserNameList = Array.from(userIdSet);
      const accumurateNum = [];
      const accumurateNumUserId = [];
      const accumurateNumUser = [];
      console.log("accum", accumurate);
      newUserNameList.forEach(name => {
        const user = this.players.filter(player => {
          console.log("player", player);
          return player.userName === name;
        });
        console.log("user", user);
        if (user.length !== 0) {
          accumurateNum.push(accumurate[name]);
          // [id] が誰に投票されたかを意味するので voteResults で該当者がでる
          accumurateNumUserId.push(voteResults[name]);
          console.log(voteResults[name]);
          user[0].getVotes = accumurate[name];
          accumurateNumUser.push(user[0]);
          displayResult +=
            user[0].userName + "さん : " + accumurate[name] + "票" + "\n";
        }
      });
      console.log("accumuNUM", accumurateNum);
      console.log(accumurateNumUser);
      alert(`投票結果\n${displayResult}`);
      // 再投票の処理
      const maxNum = Math.max.apply(null, accumurateNum);
      const maxCount = accumurateNum.filter(num => {
        return num == maxNum;
      }).length;
      if (maxCount > 1) {
        console.log("再投票", maxCount);
        alert("再投票になります");
        this.$store.state.player.vote = "";
        await API.graphql(
          graphqlOperation(updatePlayer, { input: this.$store.state.player })
        );
      } else {
        const deadPerson = accumurateNumUser.filter(player => {
          console.log(player);
          return player.getVotes === maxNum;
        });
        console.log("dead", deadPerson);
        deadPerson[0].state = "dead";
        // 死んだ人が自分で全体と自分のDBを書き換える
        this.checkMyDead(deadPerson[0]);
        this.checkGameEnd();
        // 死んだ人に全体に必要な書き込みをしてもらうことで
        this.routinUpdateInfo();
        // nigth action のページへ
        this.goNight();
      }
    },
    checkMyDead: async function(deadPerson) {
      if (deadPerson.userId === this.player.userId) {
        this.playersInfo.deads.push(deadPerson.userId);
        this.$store.state.playersInfo = this.playersInfo;
        this.$store.state.player.state = deadPerson.state;
        await API.graphql(
          graphqlOperation(updatePlayer, { input: this.$store.state.player })
        );
        const result = await API.graphql(
          graphqlOperation(updatePlayersInfo, {
            input: this.$store.state.playersInfo
          })
        );
        console.log(result);
      }
    },
    goNight: async function() {
      this.$store.state.player.vote = "";
      this.$store.state.player.state = "night";
      await API.graphql(
        graphqlOperation(updatePlayer, { input: this.$store.state.player })
      );
      this.$router.push("/night");
    },
    checkGameEnd: function() {
      // 人狼過半数 or 0 になったらゲームを終了させる
      // 結果表示 のページ
    },
    routinUpdateInfo: function() {
      this.playersInfo.times += 1;
    }
  }
};
</script>
