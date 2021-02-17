import { csrfFetch } from "../utils/csrf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users", {});
const tweet = new schema.Entity("tweets", { User: user });

export const fetchTweets = createAsyncThunk("tweets/fetchAll", async () => {
  const res = await csrfFetch("/api/tweets");
  const { tweets } = await res.json();
  const normalized = normalize(tweets, [tweet]);
  return normalized.entities;
});

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTweets.fulfilled, (state, action) => {
      console.log(action);
      state.entities = action.payload;
      state.ids = Object.keys(action.payload.tweets);
    });
  },
});

const { addTweet } = tweetsSlice.actions;

export const postTweet = (body) => async (dispatch) => {
  const res = await csrfFetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const { tweet } = await res.json();
  dispatch(addTweet(tweet));
};

export default tweetsSlice.reducer;
