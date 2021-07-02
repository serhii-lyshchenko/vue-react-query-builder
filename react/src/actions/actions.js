import actionTypes from '../constants/actionTypes';

const queryActions = {
  updateQuery1,
  updateQuery2
};

function updateQuery1(query) {
  return { type: actionTypes.UPDATE_QUERY_1, query: query }
}

function updateQuery2(query) {
  return { type: actionTypes.UPDATE_QUERY_2, query: query }
}

export default queryActions;