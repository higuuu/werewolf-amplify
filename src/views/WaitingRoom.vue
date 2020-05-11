<template>
  <div class="waitingroom">
    <h4>あなたは{{ this.gameRole }}です。</h4>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

export default {
  name: "WaitingRoom",
  data() {
    return {
      isOwner: null,
      gameRole: null,
      loginData: this.$store.state.loginData
    };
  },
  created() {
    this.isOwner = this.loginData.userID === this.loginData.ownerId; //todo
    if (this.isOwner) {
      this.gameRole = "主催者";
    } else {
      this.gameRole = "参加者";
    }
    console.log(this.isOwner);
  },
  computed: {},
  methods: {}
};
</script>

<style>
.icon_wolf {
  height: 100px;
  width: 100px;
}
</style>

