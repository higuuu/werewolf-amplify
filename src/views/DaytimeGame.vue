<template>
  <div class="daytimenoon">
    <h5>投票者を入力してください</h5>
    <b-container fluid>
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-select v-model="fever_integer_selected" :options="nameList"/>
        </b-col>
      </b-row>
    </b-container>
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
import DaytimeGameList from "@/components/DaytimeGameList.vue";

export default {
  name: "daytime",
  components: {
    DaytimeGameList
  },
  data() {
    return {
      players: this.$store.state.gameInfo.players,
      nameList: ""
    }
  },
  created() {
    this.nameList = this.players.map(player => player.userName);
  }
};
</script>
