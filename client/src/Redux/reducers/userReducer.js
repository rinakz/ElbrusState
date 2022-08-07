import { GET_ALL_USERS } from '../type';

export const userReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS:
      return payload;
    default:
      return state;
  }
};
