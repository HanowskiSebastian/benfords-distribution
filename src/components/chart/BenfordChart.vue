<script>
import { Bar } from "vue3-chart-v2";

export default {
  name: "BenfordChart",
  extends: Bar,
  props: ["arrayData"],
  computed: {
    mapFirstDigits() {
      const mapOccurence = new Map();
      for (let i = 1; i < 10; i++) {
        mapOccurence.set(i.toString(), 0);
      }
      for (const el of this.arrayData) {
        for (const key of mapOccurence.keys()) {
          if (key === el[0]) {
            mapOccurence.set(key, mapOccurence.get(key) + 1);
          }
        }
      }
      return mapOccurence;
    },
    getKeys() {
      const arr = [];
      for (const key of this.mapFirstDigits.keys()) {
        arr.push(key);
      }
      return arr;
    },
    getValues() {
      const arr = [];
      for (const value of this.mapFirstDigits.values()) {
        arr.push(value);
      }
      return arr;
    },
    getSum() {
      return this.getValues.reduce((prev, next) => {
        return prev + next;
      }, 0);
    },
    normalized() {
      const arr = [];
      for (const value of this.getValues) {
        arr.push(
          ((parseInt(value) - Math.min(...this.getValues)) /
            (Math.max(...this.getValues) - Math.min(...this.getValues))) *
            100
        );
      }
      return arr;
    },
    getAverages() {
      const arr = [];
      const sum = this.getSum;
      for (const value of this.mapFirstDigits.values()) {
        arr.push(((value / sum) * 100).toString());
      }
      return arr;
    },
    chartData() {
      return {
        labels: this.getKeys,
        datasets: [
          {
            label: "Number of first digits",
            backgroundColor: "#f87979",
            data: this.normalized,
          },
          {
            label: "Benfords distribution",
            backgroundColor: "blue",
            data: this.getAverages,
          },
        ],
      };
    },
  },
  updated() {
    this.renderChart(this.chartData);
  },
  mounted() {
    this.renderChart(this.chartData);
  },
};
</script>