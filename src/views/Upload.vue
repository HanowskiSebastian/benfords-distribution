<template>
  <base-section>
    <header>
      <h1>Upload file</h1>
    </header>
    <form @submit.prevent="submit" class="mt-4">
      <div class="form-group">
        <input
          type="file"
          class="form-control-file"
          id="benford"
          @change="processFile"
        />
        <label for="beford">Input file</label>
      </div>
    </form>
  </base-section>
</template>

<script>
export default {
  data() {
    return {
      file: null,
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
    async processFile(event) {
      try {
        let file = event.target.files[0];
        this.file = await this.readFileAsync(file);
        console.log(this.file);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>