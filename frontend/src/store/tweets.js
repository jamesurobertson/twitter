import { csrfFetch } from "../utils/csrf";

const ADD_TWEET = "tweets/ADD_TWEET";
const GET_FEED_TWEETS = "tweets/GET_FEED_TWEETS";
const GET_PROFILE_TWEETS = "tweets/GET_PROFILE_TWEETS";

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  payload: tweet,
});

const addFeedTweets = (tweets) => ({
  type: GET_FEED_TWEETS,
  payload: tweets,
});

const addProfileTweets = (tweets) => ({
  type: GET_PROFILE_TWEETS,
  payload: tweets,
});

export const postTweet = (body) => async (dispatch) => {
  const res = await csrfFetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const { tweet } = await res.json();
  dispatch(addTweet(tweet));
};

export const getProfileTweets = (username) => async (dispatch) => {
  const res = await csrfFetch(`/api/tweets/${username}`);
  const { tweets } = await res.json();
  dispatch(addProfileTweets(tweets));
};

export const getFeedTweets = () => async (dispatch) => {
  const res = await csrfFetch("/api/tweets");
  const { tweets } = await res.json();
  dispatch(addFeedTweets(tweets));
};

const tweetsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case ADD_TWEET:
      return [action.payload, ...state];
    case GET_FEED_TWEETS:
      console.log(action.payload);
      return action.payload;
    case GET_PROFILE_TWEETS:
      return action.payload;
    default:
      return state;
  }
};

export default tweetsReducer;
