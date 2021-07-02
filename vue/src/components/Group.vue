<template>
  <div class="group" :class="{ root }">
    <CombinatorComponent class="ml--10" :combinator="combinator" @update="updateCombinator"></CombinatorComponent>
    <button class="ml--10" @click="addRule">+Rule</button>
    <button class="ml--10" @click="addGroup">+Group</button>
    <button class="ml--10 remove-button" @click="removeGroup" v-if="!root">X</button>
    <div v-for="rule in rules" :key="rule.id">
      <Rule v-if="!rule.rules" class="ml--5 rule" :rule="rule" :namespace="namespace"></Rule>
      <GroupComponent v-if="rule.rules" class="ml--10 group" :rule="rule" :namespace="namespace"></GroupComponent>
    </div>
  </div>
</template>

<script>
  import Rule from './Rule'
  import GroupComponent from './Group'
  import CombinatorComponent from './Combinator'

  import {
    GET_QUERY,
    ADD_NODE,
    REMOVE_NODE,
    UPDATE_NODE,
  } from "../store/queryBuilder/actions";

  export default {
    name: 'GroupComponent',
    props: ['root', 'namespace', 'rule'],
    components: {
      Rule,
      GroupComponent,
      CombinatorComponent
    },
    computed: {
      id() {
        return this.query.id;
      },
      rules() {
        return this.query.rules;
      },
      combinator() {
        return this.query.combinator;
      },
      query() {
        return this.rule || this.$store.getters[this.namespaceHelper(GET_QUERY)];
      }
    },
    methods: {
      namespaceHelper(action) {
        return `${this.namespace}/${action}`
      },
      addNode(data) {
        this.$store.commit(this.namespaceHelper(ADD_NODE), data)
      },
      removeNode(data) {
        this.$store.commit(this.namespaceHelper(REMOVE_NODE), data)
      },
      updateNode(data) {
        this.$store.commit(this.namespaceHelper(UPDATE_NODE), data)
      },
      addRule() {
        this.addNode({id: this.id, rule: {field: '', value: '', operator: ''}});
      },
      addGroup() {
        this.addNode({id: this.id, rule: {rules: [], combinator: ''}});
      },
      removeGroup() {
        this.removeNode(this.id);
      },
      updateCombinator(val) {
        this.updateNode({id: this.id, combinator: val})
      }
    }
  }
</script>

<style lang="scss">
  .group {
    border: 1px solid navajowhite;
    background: antiquewhite;
    padding: 10px 0;
    margin: 5px 5px 0 0;

    &.root {
      height: 700px;
      overflow-y: auto;
    }
  }
  .rule {
    margin-top: 5px;
  }
</style>
