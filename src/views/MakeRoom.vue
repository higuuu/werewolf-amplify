<template>
  <div class="makeroom">
    <h2>人狼ゲーム</h2>
    <img class="icon_wolf" alt="icon_wolf logo" src="../assets/icon_wolf.png" />
    <b-container fluid>
      <b-row class="mt-3">
        <b-col cols="8" offset="2">
          <b-button-group>
            <b-button variant="success" v-on:click="participate()">
              <b-icon icon="clipboard" aria-hidden="true" />ルームに参加する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="8" offset="2">
          <b-button-group>
            <b-button variant="success" v-on:click="organize()">
              <b-icon icon="clipboard" aria-hidden="true" />ルームを作成する
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "MakeRoom",
  data() {
    return {
      paticipatant: false
    };
  },
  created() {
    this.participate();
  },
  methods: {
    participate: function() {
      console.log("participate");
      this.paticipatant = true;
    },
    organize: function() {
      console.log("organize");
    }
  }
};
</script>
