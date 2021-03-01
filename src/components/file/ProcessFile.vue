<template>
  <base-section>
    <h1>Process file</h1>
  </base-section>
</template>

<script>
export default {
  props: ["file", "options"],
  data() {
    return {
      processedFile: null,
    };
  },
  methods: {
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
        this.processedFile = await this.readFileAsync(file);
        console.log(this.getDelimeter === "\t");
        const toArray = this.splitFile();
        console.log("processed", toArray);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    splitFile() {
      if (this.options.delimeter === "tab") {
        return this.processedFile.split("\t").filter((el) => {
          return !isNaN(parseFloat(el));
        });
      }
      return "\t";
    },
  },
  updated() {
    console.log("processing", this.file);
    this.processFile(this.file);
  },
};
</script>