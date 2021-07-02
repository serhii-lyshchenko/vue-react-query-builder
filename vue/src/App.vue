<template>
  <div id="app">
    <group-builder class="group-builder" namespace="tree"></group-builder>
    <group-builder class="group-builder" namespace="path"></group-builder>
  </div>
</template>

<script>
  import GroupBuilder from './components/GroupBuilder';

  export default {
    components: {
      GroupBuilder
    }
  }
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: row;
    width: 100%;

    .group-builder {
      flex: 1;
    }

    .ml- {
      &-5 {
        margin-left: 5px;
      }
      &-10 {
        margin-left: 10px;
      }
    }

    button, select {
      height: 20px;
      width: 80px;
    }

    .remove-button {
      width: 25px;
    }

    .export-button {
      width: 120px;
    }
  }
</style>