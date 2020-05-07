<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script
  charset="utf-8"
  src="https://static.line-scdn.net/liff/edge/2.1/sdk.js"
></script>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    this.initializeLiff();
  },
  methods: {
    initializeLiff: function() {
      liff.init(
        {
          liffId: "1654168221-5V2krjnb"
        },
        () => {
          const idToken = liff.getContext();
          this.$store.dispatch("setLoginData", idToken);
        }
      );
    }
  }
};
</script>
