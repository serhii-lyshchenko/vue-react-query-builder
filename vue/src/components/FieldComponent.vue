<template>
  <select v-model="value" @change="changeField">
    <option>Address</option>
    <option>Twitter</option>
  </select>
</template>

<script>
  export default {
    props: ['field'],
    data: () => ({
      value: ''
    }),
    methods: {
      changeField(event) {
        this.$emit('update', event.target.value);
      }
    },
    mounted() {
      this.value = this.field;
    }
  }
</script>
