import { LOGIN, LOGOUT } from "../actions/types";

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGOUT:
            return INITIAL_STATE;
        case LOGIN:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
