import { combineReducers } from 'redux'
import UsersReducer from './UsersReducer'
import ErrorReducer from './ErrorReducer'

const rootReducer = combineReducers({
  error: ErrorReducer,
  user: UsersReducer,
})

export default rootReducer
