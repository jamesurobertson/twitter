import { csrfFetch } from "../utils/csrf";

const ADD_TWEET = "tweets/ADD_TWEET";
const GET_TWEETS = "tweets/GET_TWEETS";

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  payload: tweet,
});

const addTweets = (tweets) => ({
  type: GET_TWEETS,
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

export const getTweets = () => async (dispatch) => {
  const res = await csrfFetch("/api/tweets");
  const { tweets } = await res.json();
  dispatch(addTweets(tweets));
};

const tweetsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case ADD_TWEET:
      return [action.payload, ...state];
    case GET_TWEETS:
      console.log(action.payload);
      newState = {};
      action.payload.forEach((tweet) => (newState[tweet.id] = tweet));
      return action.payload;
    default:
      return state;
  }
};

export default tweetsReducer;
