<template>
  <select v-model="value" @change="changeOperator">
    <option>=</option>
    <option><</option>
    <option>></option>
    <option>!=</option>
  </select>
</template>

<script>
  export default {
    props: ['operator'],
    data: () => ({
      value: ''
    }),
    methods: {
      changeOperator(event) {
        this.$emit('update', event.target.value);
      }
    },
    mounted() {
      this.value = this.operator;
    }
  }
</script>
