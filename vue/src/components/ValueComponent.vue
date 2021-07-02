<template>
  <input type="number" v-model="inputValue" @input="changeValue"/>
</template>

<script>
  export default {
    props: ['value'],
    data: () => ({
      inputValue: ''
    }),
    methods: {
      changeValue(event) {
        this.$emit('update', event.target.value);
      }
    },
    mounted() {
      this.inputValue = this.value;
    }
  }
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>