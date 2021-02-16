import { csrfFetch } from "../utils/csrf";

const CHANGE_PROFILE = "currentProfile/CHANGE_PROFILE";
const ADD_FOLLOW = "currentProfile/ADD_FOLLOW";
const REMOVE_FOLLOW = "currentProfile/REMOVE_FOLLOW";

const setProfile = (payload) => ({
  type: CHANGE_PROFILE,
  payload,
});

const setFollow = (payload) => ({
  type: ADD_FOLLOW,
  payload,
});

const removeFollow = (payload) => ({
  type: REMOVE_FOLLOW,
  payload,
});

export const getProfileData = (username) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${username}`);
  const { user } = await res.json();
  dispatch(setProfile(user));
};

export const postFollowUser = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/follows/${id}`, {
    method: "POST",
  });

  const { follow } = await res.json();
  dispatch(setFollow(follow));
};

export const deleteFollow = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/follows/${id}`, {
    method: "DELETE",
  });
  const { follow } = await res.json();
  dispatch(removeFollow(follow));
};
const initialState = { follows: [], followers: [] };
const currentProfileReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CHANGE_PROFILE:
      return action.payload;
    case ADD_FOLLOW:
      newState = JSON.parse(JSON.stringify(state));
      newState.followers.push(action.payload);
      return newState;
    case REMOVE_FOLLOW:
      newState = JSON.parse(JSON.stringify(state));
      newState.followers = newState.followers.filter(
        (follow) => follow.userId !== action.payload.userId
      );
      return newState;
    default:
      return state;
  }
};

export default currentProfileReducer;
