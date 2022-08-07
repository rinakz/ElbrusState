import { DELETE_BOOKING, GET_ALL_BOOKS } from "../type"

export const bookingReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_BOOKS:
      return payload  
    case DELETE_BOOKING:
      return state.filter(el => el.id != payload)   
      default:
          return state
  }
}

