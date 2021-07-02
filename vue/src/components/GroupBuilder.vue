<template>
  <div>
    <group-component v-if="ready" :root="true" :namespace="namespace"/>
    <div class="inputs">
      <input type="file" @change="upload" ref="uploader"/>
      <button class="export-button" @click="exportFile">Export JSON</button>
    </div>
  </div>
</template>

<script>
  import GroupComponent from './Group';

  import module from '../store/queryBuilder/module'
  import {INIT_QUERY_BUILDER, GET_QUERY} from '../store/queryBuilder/actions';

  export default {
    props: ['namespace'],
    components: {
      GroupComponent
    },
    data: () => ({
      ready: false
    }),
    methods: {
      upload () {
        const [file] = this.$refs.uploader.files;
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onloadend = () => this.init( {namespace: this.namespace, query: JSON.parse(fileReader.result)})
      },
      exportFile() {
        const query = this.$store.getters[`${this.namespace}/${GET_QUERY}`];
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(query)], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = 'query.json';
        a.click();
      },
      init(data) {
        this.$store.dispatch(`${this.namespace}/${INIT_QUERY_BUILDER}`, data)
      }
    },
    mounted() {
      this.$store.registerModule(this.namespace, module);
      this.init({namespace: this.namespace});
      this.ready = true;
    }
  }
</script>

<style lang="scss" scoped>
  .inputs {
    margin-top: 20px;
  }
</style>
