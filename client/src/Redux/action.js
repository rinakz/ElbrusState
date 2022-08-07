import axios from "axios";
import { LOGIN, LOGOUT,GET_ALL_USERS, GET_ALL_BOOKS, DELETE_BOOKING} from "./type";

export const actionLogin = (data) => ({
  type: LOGIN, payload: data
})
export const actionLogout = () => ({
  type: LOGOUT
})

export const showAllUsers = (data) => ({
  type: GET_ALL_USERS,
  payload: data,
});

export const getAllUsersThunk = () => async (dispatch) => {
  const response = await axios(
    '/admin/allusers',
  );
  dispatch(showAllUsers(response.data));
};

export const getAllBooks = () => async (dispatch) => {
  const response = await axios('/booking')
  const slaves = response.data.sort((a, b) => (+a.time_start.split(':')[0]*60 + +a.time_start.split(':')[1]) - (+b.time_start.split(':')[0]*60 + +b.time_start.split(':')[1]))
  dispatch({type: GET_ALL_BOOKS, payload: slaves});
}

export const deleteBookingThunk = (id) => async (dispatch) => {
  const response = await axios.delete(`/booking/${id}`)
  dispatch({type: DELETE_BOOKING, payload: id})
}

