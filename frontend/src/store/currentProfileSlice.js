import { csrfFetch } from "../utils/csrf";
import { createSlice } from "@reduxjs/toolkit";

const currentProfileSlice = createSlice({
  name: "currentProfile",
  initialState: { follows: [], followers: [] },
  reducers: {
    changeProfile(state, action) {
      return action.payload;
    },
    addFollow(state, action) {
      state.followers.push(action.payload);
    },
    removeFollow(state, action) {
      state.followers = state.followers.filter(
        (follower) => follower.userId !== action.payload.userId
      );
    },
  },
});

const { changeProfile, addFollow, removeFollow } = currentProfileSlice.actions;

export const getProfileData = (username) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${username}`);
  const { user } = await res.json();
  dispatch(changeProfile(user));
};

export const postFollowUser = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/follows/${id}`, {
    method: "POST",
  });

  const { follow } = await res.json();
  dispatch(addFollow(follow));
};

export const deleteFollow = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/follows/${id}`, {
    method: "DELETE",
  });
  const { follow } = await res.json();
  dispatch(removeFollow(follow));
};

export default currentProfileSlice.reducer;
