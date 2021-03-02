<template>
  <base-section>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <header class="d-flex justify-content-between py-4">
      <h1>Process file</h1>
      <button
        class="btn btn-danger"
        @click="close('You closed file procession.')"
      >
        X
      </button>
    </header>
    <div>
      <p>
        This is sample of file You uploaded. Pick a column You want to test.
      </p>
    </div>
    <table v-if="fileProcessed" class="table table-bordered">
      <tbody>
        <td v-for="(col, index) in sampleFile" :key="index" :id="index">
          <div class="form-group pl-4">
            <input
              type="radio"
              class="form-check-input"
              :id="index"
              name="columnPicked"
              v-model="columnPicked"
              :value="index"
            />
            <label for="index" class="form-check-label"
              >Col-{{ index + 1 }}</label
            >
          </div>
          <tr v-for="(el, index) in col" :key="index">
            {{
              el
            }}
          </tr>
        </td>
      </tbody>
    </table>
    <div>
      <p>
        Note that all the <em>NaN</em> values will be dropped during filtering
        data process!
      </p>
      <button class="btn btn-primary" @click="drawChart">Draw chart!</button>
    </div>
  </base-section>
  <chart v-if="showChart" @close-chart="closeChart" :column="columnData">
  </chart>
</template>

<script>
import Chart from "../chart/Chart";
export default {
  props: ["file", "options"],
  emits: ["clear-file"],
  components: { Chart },
  data() {
    return {
      readFile: null,
      isLoading: false,
      processedFile: null,
      fileProcessed: false,
      columnPicked: 0,
      showChart: false,
      columnData: [],
      message: "",
    };
  },
  computed: {
    sampleFile() {
      const newArray = [];
      for (let i = 0; i < this.processedFile.length; i++) {
        newArray.push(this.processedFile[i].slice(0, 15));
      }
      return newArray;
    },
    delimeter() {
      if (this.options.delimeter === "space") {
        return " ";
      }
      if (this.options.delimeter === "coma") {
        return ",";
      }
      if (this.options.delimeter === "semicolon") {
        return ";";
      }
      return "\t";
    },
  },
  methods: {
    drawChart() {
      this.columnData = this.processedFile[this.columnPicked];
      this.showChart = true;
    },
    closeChart() {
      this.showChart = false;
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    },
    async processFile(file) {
      try {
        this.isLoading = true;
        this.readFile = await this.readFileAsync(file);
        this.processedFile = this.splitFile().slice();
        if (this.processedFile.length === 0) {
          this.close(
            "Seems like delimeter You chose is not the one that splits the data in Your file. Check again!"
          );
        }
        this.isLoading = false;
        this.fileProcessed = true;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        this.close(
          "There was en error during file procession. Please read the instructions and try again."
        );
      }
    },
    splitFile() {
      const reg = new RegExp(this.delimeter, "g");
      const lines = (this.readFile.match(/\n/g) || []).length;
      const columns = (this.readFile.split("\n")[0].match(reg) || []).length;
      const fileByColumns = [];
      for (let col = 0; col < columns; col++) {
        let tempArray = [];
        for (let line = 0; line < lines; line++) {
          let tempColumns = this.readFile.split("\n")[line];
          let tempElement = tempColumns.split(reg)[col];
          tempArray.push(tempElement);
        }
        fileByColumns.push(tempArray);
      }
      return fileByColumns;
    },
    close(message) {
      this.fileProcessed = false;
      this.showChart = false;
      this.$emit("clear-file", message);
    },
  },
  updated() {
    this.processFile(this.file);
  },
};
</script>