import { combineReducers } from 'redux'
import { authuserReducer } from './authuserReducer'
import { bookingReducer } from './bookingReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  booking: bookingReducer,
  user: userReducer,
  authuser: authuserReducer
})
