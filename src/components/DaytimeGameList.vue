<template>
  <div class="daytimegamelist">
    <b-table fixed striped hover :items="players" :fields="fields"> </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DaytimeGameList extends Vue {
  @Prop() private players!: [];
  private fields = [
    {
      key: "userName",
      label: "名前"
    },
    {
      key: "state",
      label: "状態"
    },
    {
      key: "position",
      label: "役職"
    }
  ];
}
</script>
