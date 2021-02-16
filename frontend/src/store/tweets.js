import { csrfFetch } from "../utils/csrf";

const ADD_TWEET = "tweets/ADD_TWEET";
const GET_FEED_TWEETS = "tweets/GET_FEED_TWEETS";

const addTweet = (payload) => ({
  type: ADD_TWEET,
  payload,
});

const addFeedTweets = (payload) => ({
  type: GET_FEED_TWEETS,
  payload,
});

export const postTweet = (body) => async (dispatch) => {
  const res = await csrfFetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const { tweet } = await res.json();
  dispatch(addTweet(tweet));
};

export const getFeedTweets = () => async (dispatch) => {
  const res = await csrfFetch("/api/tweets");
  const { tweets } = await res.json();
  dispatch(addFeedTweets(tweets));
};

const tweetsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TWEET:
      return [action.payload, ...state];
    case GET_FEED_TWEETS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default tweetsReducer;
