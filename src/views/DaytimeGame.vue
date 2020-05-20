<template>
  <div class="daytimenoon">
    <h1>This is an about page</h1>
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
      players: this.$store.state.gameInfo.players
    }
  }
}
</script>
