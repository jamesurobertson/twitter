import { csrfFetch } from "../utils/csrf";

const CHANGE_PROFILE = "currentProfile/CHANGE_PROFILE";
const ADD_FOLLOW = "currentProfile/ADD_FOLLOW";
const REMOVE_FOLLOW = "currentProfile/REMOVE_FOLLOW";

const setProfile = (user) => ({
  type: CHANGE_PROFILE,
  payload: user,
});

const setFollow = (follow) => ({
  type: ADD_FOLLOW,
  payload: follow,
});

const removeFollow = (follow) => ({
  type: REMOVE_FOLLOW,
  payload: follow,
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
