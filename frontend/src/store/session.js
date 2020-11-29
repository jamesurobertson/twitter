import { fetch } from "../utils/csrf";

const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
  return res;
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
