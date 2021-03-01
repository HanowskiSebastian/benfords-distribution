<template>
  <base-section>
    <header>
      <h1>Upload file</h1>
    </header>
    <div>
      <h3>What can You upload?</h3>
      <ul>
        <li>
          You are allowed to upload files with extension <em>.txt</em> or
          <em>.csv</em>.
        </li>
        <li>
          You should be aware of a delimeter type that separates data in Your
          file. Same for the end line character.
        </li>
        <li>
          In case You are not sure how is Your data file constructed - do not
          worry. File would be processed with default settings and the data
          sample will be presented to You. <em>Notice</em> that in this case the
          results could not be accurate.
        </li>
        <li>
          Assumption is that data could contain some letter or special
          characters. In order to present the most accurate results all
          non-digit characters will be removed.
        </li>
        <li>
          Finally You should pick a column of data that You want to test. After
          this You will see the chart presenting the frequency distribution of
          leading digits in column You picked.
        </li>
      </ul>
    </div>
    <form @submit.prevent="submit" class="mt-4">
      <h4>Choose file</h4>
      <div class="form-group">
        <input
          type="file"
          class="form-control-file"
          id="benford"
          @change="setFile"
        />
      </div>
      <h4>Pick delimeter</h4>
      <div class="form-group">
        <input
          type="radio"
          class="form-check-input"
          id="space"
          name="delimeter"
          v-model="delimeter"
          value="space"
        />
        <label for="space" class="form-check-label">Space</label>
      </div>
      <div class="form-group">
        <input
          type="radio"
          class="form-check-input"
          id="coma"
          name="delimeter"
          v-model="delimeter"
          value="coma"
        />
        <label for="coma" class="form-check-label">Coma</label>
      </div>
      <div class="form-group">
        <input
          type="radio"
          class="form-check-input"
          id="semicolon"
          name="delimeter"
          v-model="delimeter"
          value="semicolon"
        />
        <label for="semicolon" class="form-check-label">Semicolon</label>
      </div>
      <div class="form-group">
        <input
          type="radio"
          class="form-check-input"
          id="tab"
          name="delimeter"
          checked
          v-model="delimeter"
          value="tab"
        />
        <label for="tab" class="form-check-label">Tabulator</label>
      </div>
      <button type="submit" class="btn btn-primary" @click="submit">
        Submit
      </button>
    </form>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
  </base-section>
  <process-file
    v-if="hasFile && optionsSet"
    :file="file"
    :options="options"
  ></process-file>
</template>

<script>
import ProcessFile from "../components/file/ProcessFile.vue";
export default {
  components: { ProcessFile },
  data() {
    return {
      file: null,
      isLoading: false,
      hasFile: false,
      options: null,
      optionsSet: false,
      delimeter: "tab",
    };
  },
  methods: {
    setFile(event) {
      this.file = event.target.files[0];
    },
    setOptions() {
      console.log("Delimeter: ", this.delimeter);
      this.options = {
        delimeter: this.delimeter,
      };
    },
    submit() {
      this.hasFile = true;
      this.setOptions();
      this.optionsSet = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  padding-left: 2rem;
}
</style>