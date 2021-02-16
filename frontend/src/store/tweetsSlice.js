import { csrfFetch } from "../utils/csrf";
import { createSlice } from "@reduxjs/toolkit";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: [],
  reducers: {
    addTweet(state, action) {
      state.unshift(action.payload);
    },
    addFeedTweets(state, action) {
      return action.payload;
    },
  },
});

const { addTweet, addFeedTweets } = tweetsSlice.actions;

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

export default tweetsSlice.reducer;
