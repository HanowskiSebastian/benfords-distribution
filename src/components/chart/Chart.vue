<template>
  <base-section>
    <header class="d-flex justify-content-between py-4">
      <h1>Chart</h1>
      <button
        class="btn btn-danger"
        @click="close('You closed file procession.')"
      >
        X
      </button>
    </header>
    <div>
      <benford-chart :arrayData="filteredData"></benford-chart>
    </div>
  </base-section>
</template>

<script>
import BenfordChart from "./BenfordChart.vue";
export default {
  components: { BenfordChart },
  emits: ["close-chart"],
  props: ["column"],
  data() {
    return {
      datacollection: null,
      vueCanvas: null,
    };
  },
  computed: {
    filteredData() {
      return this.distribution();
    },
  },

  methods: {
    close() {
      this.$emit("close-chart");
    },
    distribution() {
      const filteredArray = this.column.filter((el) => {
        return !isNaN(el);
      });
      //console.log("filtered", filteredArray);
      return filteredArray;
    },
  },
};
</script>