import actionTypes from '../constants/actionTypes';

const initialState = {
  query: {},
  query2: {}
};

function builderReducer(state = initialState, action) {
  const { query } = action;
  switch (action.type) {
    case actionTypes.UPDATE_QUERY_1:
      return { ...state, query: { ...query }};
    case actionTypes.UPDATE_QUERY_2:
      return { ...state, query2: { ...query }};
    default:
      return state
  }
}

export default builderReducer;