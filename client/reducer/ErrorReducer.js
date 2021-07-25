import { BACKEND_ERROR, RESET_ERRORS } from "../actions/types";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BACKEND_ERROR:
      return action.payload;
    case RESET_ERRORS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
