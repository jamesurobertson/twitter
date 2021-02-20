import { csrfFetch } from "../utils/csrf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { schemas } from "./schemas";
import { normalize } from "normalizr";
const { user } = schemas;

export const login = createAsyncThunk("session/login", async (session) => {
  const { credential, password } = session;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  const normalized = normalize(data, user);
  return normalized;
});

export const restoreUser = createAsyncThunk("session/restore", async () => {
  const res = await csrfFetch("/api/session");
  const data = await res.json();
  const normalized = normalize(data.user, user);
  return normalized;
});

const sessionSlice = createSlice({
  name: "session",
  initialState: { userId: null },
  reducers: {
    setUser(state, { payload }) {
      console.log(payload);
      state.user = payload.result;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
  extraReducers: {
    [restoreUser.fulfilled]: (state, { payload }) => {
      state.userId = payload.result;
    },
  },
});

const { setUser, removeUser } = sessionSlice.actions;

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return res;
};

export const selectSessionUser = (state) =>
  state.entities.users[state.session.userId];

export default sessionSlice.reducer;
