<template>
  <select v-model="value" @change="changeCombinator">
    <option>AND</option>
    <option>OR</option>
  </select>
</template>

<script>
  export default {
    props: ['combinator'],
    data: () => ({
      value: ''
    }),
    methods: {
      changeCombinator(event) {
        this.$emit('update', event.target.value);
      }
    },
    mounted() {
      this.value = this.combinator;
    }
  }
</script>
