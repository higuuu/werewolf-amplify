<template>
  <div class="waitingroom">
    <!-- <h4>あなたは{{ this.isOwner ? "主催者" : "参加者" }}です。</h4> -->
    <h4 v-show="this.isOwner">あなたは主催者です。</h4>
    <h4 v-show="!this.isOwner">
      {{ this.$store.state.gameInfo.owner }}さんが
      <br />ゲームを作成しました。
    </h4>
    <b-row class="mt-3">
      <b-col cols="8" offset="2">
        <b-form-text>
          <p style="font-size: 28px">{{ actualSumPeople }}/{{ needSumPeople }}</p>
        </b-form-text>
      </b-col>
    </b-row>
    <b-container fluid class="mt-4">
      <b-row v-show="!isOwner">
        <b-col cols="8" offset="2">
          <b-form-group
            class="mb-0"
            label="名前を入力してください"
            label-for="input-formatter"
            description="他の人と名前が被らないように入力してください"
          >
            <b-form-input v-model="participateName" placeholder="name"></b-form-input>
          </b-form-group>
          <b-button-group class="mt-2 mr-2 ml-2" v-show="!this.isOwner">
            <b-button variant="success" @click="participate">
              <b-icon icon="person-check-fill" class="mr-2" aria-hidden="true" />参加する
            </b-button>
          </b-button-group>
          <b-button-group class="mt-2 mr-2 ml-2" v-show="!this.isOwner">
            <b-button variant="danger" @click="leave">
              <b-icon icon="box-arrow-left" class="mr-2" aria-hidden="true" />退場する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="8" offset="2">
          <h5>参加者一覧</h5>
          <ul>
            <li v-for="(item, index) in players" :key="index">{{ item.userName }}さん</li>
          </ul>
        </b-col>
      </b-row>
      <b-button variant="outline-success" @click="goGame">ゲーム開始</b-button>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { getPlayer } from "./../graphql/queries";
import * as subscriptions from "./../graphql/subscriptions";
import { createPlayer, deletePlayer } from "./../graphql/mutations";

const getPlayerByRoomId = `query getPlayerByRoomId($roomId: String!) {
  getPlayerByRoomId(roomId: $roomId) {
    items {
      id
      userId
      roomId
      userName
      position
      state
      actions
      vote
    }
  }
}`;

export default {
  name: "WaitingRoom",
  data() {
    return {
      players: [],
      participateName: "",
      isOwner: true, // ローカルで参加者としてはいるためにはfalse
      // gameRole: null,
      roomUserId: "",
      position: "test",
      actions: ["test"],
      vote: "test",
      loginData: null,
      gameInfo: null,
      player: { userName: "" }
    };
  },
  async created() {
    this.loginData = this.$store.state.loginData;
    this.gameInfo = this.$store.state.gameInfo;

    this.isOwner = this.loginData.userId === this.gameInfo.ownerId;
    if (this.isOwner) {
      this.participateName = this.$store.state.gameInfo.owner || "test";
      // this.players.push(this.participateName);
    }
    this.participate();
    // アカウント作成APIを用意する
  },
  async mounted() {
    // Subscribe onCreate されるたびに取得する 後から追加用
    const subscription = await API.graphql(
      graphqlOperation(subscriptions.onCreatePlayer)
    ).subscribe({
      next: data => {
        if (
          data.value.data.onCreatePlayer.roomId == this.$store.state.gameInfo.id
        ) {
          this.players.push(data.value.data.onCreatePlayer);
          const poolPlayers = this.players;
          const playersMapist = Array.from(
            new Map(poolPlayers.map(player => [player.id, player]))
          );
          this.players = playersMapist.map(player => player[1]);
        }
        console.log("tessst", data.value.data.onCreatePlayer);
        console.log("player", this.players);
      }
    });
    // Delete
    // await API.graphql(graphqlOperation(subscriptions.onDeletePlayer)).subscribe(
    //   {
    //     next: data => {
    //       console.log("!!!!", data);
    //       if (
    //         data.value.data.onDeletePlayer.roomId ===
    //         this.$store.state.gameInfo.id
    //       ) {
    //         const poolPlayers = data.value.data.onDeletePlayer;
    //         console.log("2222", data.value.data.onDeletePlayer.id);
    //         this.players = poolPlayers.filter(
    //           player => player.id !== data.value.data.onDeletePlayer.id
    //         );
    //       }
    //     }
    //   }
    // );
    // 初回にすべて取得しておく
    const roomId = this.gameInfo.roomId || "test";
    console.log("this ??");
    const result = await API.graphql(
      graphqlOperation(getPlayerByRoomId, { roomId: roomId })
    );
    this.players = result.data.getPlayerByRoomId.items;
    console.log(this.players);
  },
  computed: {
    actualSumPeople() {
      const actualSumPeople = this.players.length;
      return actualSumPeople;
    },
    needSumPeople() {
      const sum =
        this.gameInfo.werewolf +
        this.gameInfo.villager +
        this.gameInfo.diviner +
        this.gameInfo.brave;
      return sum;
    }
  },
  methods: {
    participate: async function() {
      console.log("paaaaaaaa")
      const participateName = this.participateName || "test";
      const roomId = this.gameInfo.roomId || "test";
      const position = this.position || "test";
      const state = this.gameInfo.state || "test";
      const actions = this.actions || ["test"];
      const vote = this.vote || "test";
      this.roomUserId = roomId + "-" + this.loginData.userId;
      this.player = {
        id: this.roomUserId,
        userId: this.loginData.userId,
        roomId: roomId,
        userName: participateName,
        position: position,
        state: state,
        actions: actions,
        vote: vote
      };
      // とりまデータ取得してみる
      try {
        const result = await API.graphql(
          graphqlOperation(getPlayer, {
            id: this.roomUserId
          })
        )
      } catch {
        // データなかったらつくる
        await API.graphql(
          graphqlOperation(createPlayer, {
            input: this.player
          })
        );
      }
      this.$store.dispatch("setPlayer", this.player);
      return;
    },
    leave: async function() {
      this.participateName = "";
      const roomId = this.gameInfo.roomId || "test";
      this.roomUserId = roomId + "-" + this.loginData.userId;
      await API.graphql(
        graphqlOperation(deletePlayer, {
          input: { id: this.roomUserId }
        })
      );
      return;
    },
    goGame: function() {
      console.log("go next");
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
