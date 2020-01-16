import { GET_LOGS, GET_LOG, ADD_LOG, LOG_ERROR } from '../actions/types';

const initialState = {
  logs: [],
  log: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        loading: false
      };
    case GET_LOG:
      return {
        ...state,
        log: payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [payload, ...state.logs],
        loading: false
      };
    case LOG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
