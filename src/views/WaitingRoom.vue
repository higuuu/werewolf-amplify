<template>
  <div class="waitingroom">
    <h1>This is an WaitingRoom page</h1>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

export default {
  name: "WaitingRoom",
  data() {
    return {
      isOwner: null,
      loginData: this.$store.state.loginData
    };
  },
  created() {
    this.isOwner = () => {
      return this.loginData.userID === null; //todo
    };
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

