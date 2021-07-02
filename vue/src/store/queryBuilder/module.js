import Vue from 'vue';
import {
  GET_QUERY,
  SET_BUILDER,
  ADD_NODE,
  REMOVE_NODE,
  INIT_QUERY_BUILDER,
  UPDATE_NODE
} from './actions'

import initQuery from './default';

import TreeQueryBuilder from 'tree-query-builder';
import PathQueryBuilder from 'path-query-builder';

const buildersNamespaces = {
  tree: TreeQueryBuilder,
  path: PathQueryBuilder
};

const state = () => ({ builder: null, query: null });

const getters = {
  [GET_QUERY]: (state) => state.query
};

const mutations = {
  [SET_BUILDER]: (state, builder) => {
    state.builder = builder;
    state.builder.subscribe((query) => Vue.set(state, 'query', {...query}));
  },
  [ADD_NODE]: (state, {id, rule}) => state.builder.add(id, rule),
  [REMOVE_NODE]: (state, id) => state.builder.delete(id),
  [UPDATE_NODE]: (state, node) => state.builder.update(node)
};

const actions = {
  [INIT_QUERY_BUILDER]: ({commit}, { namespace, query }) =>
    commit(SET_BUILDER, new buildersNamespaces[namespace](query || initQuery))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
