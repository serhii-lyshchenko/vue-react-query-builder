<template>
  <div>
    <FieldComponent class="ml--10" :field="field" @update="updateField"></FieldComponent>
    <OperatorComponent class="ml--10" :operator="operator" @update="updateOperator"></OperatorComponent>
    <ValueComponent class="ml--10" :value="value" @update="updateValue"></ValueComponent>
    <button class="remove-button ml--10" @click="removeRule">X</button>
  </div>
</template>

<script>
  import FieldComponent from './FieldComponent';
  import OperatorComponent from './OperatorComponent';
  import ValueComponent from './ValueComponent';
  import {REMOVE_NODE, UPDATE_NODE} from "../store/queryBuilder/actions";

  export default {
    props: ['rule', 'namespace'],
    components: {
      FieldComponent,
      OperatorComponent,
      ValueComponent
    },
    computed: {
      id() {
        return this.rule.id
      },
      field() {
        return this.rule.field
      },
      operator() {
        return this.rule.operator
      },
      value() {
        return this.rule.value
      }
    },
    methods: {
      namespaceHelper(action) {
        return `${this.namespace}/${action}`
      },
      removeRule() {
        this.$store.commit(this.namespaceHelper(REMOVE_NODE), this.id)
      },
      updateNode(data) {
        this.$store.commit(this.namespaceHelper(UPDATE_NODE), data)
      },
      updateField(val) {
        this.updateNode({id: this.id, field: val})
      },
      updateOperator(val) {
        this.updateNode({id: this.id, operator: val})
      },
      updateValue(val) {
        this.updateNode({id: this.id, value: val})
      }
    }
  }
</script>
