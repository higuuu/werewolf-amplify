<template>
  <div class="waitingroom">
    <h4>あなたは{{ this.isOwner ? "主催者" : "参加者" }}です。</h4>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

export default {
  name: "WaitingRoom",
  data() {
    return {
      isOwner: true,
      gameRole: null,
      loginData: this.$store.state.loginData
    };
  },
  created() {
    this.isOwner = this.loginData.userID === this.loginData.ownerId;
    console.log("owner", this.isOwner);
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
