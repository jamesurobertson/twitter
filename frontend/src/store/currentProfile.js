import { csrfFetch } from "../utils/csrf";

const CHANGE_PROFILE = "currentProfile/CHANGE_PROFILE";

const setProfile = (user) => ({
  type: CHANGE_PROFILE,
  payload: user,
});

export const getProfileData = (username) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${username}`);
  const { user } = await res.json();
  dispatch(setProfile(user));
};

export const unfollowUser = (username) => async (dispatch) => {
    const res = await csrfFetch('/api/')
}
const initialState = { Follows: [] };
const currentProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

export default currentProfileReducer;
