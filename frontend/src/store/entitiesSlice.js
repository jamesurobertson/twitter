import { csrfFetch } from "../utils/csrf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

const follow = new schema.Entity("follows", {});
const user = new schema.Entity("users", { follows: follow });
const tweet = new schema.Entity("tweets", { User: user });

export const fetchTweets = createAsyncThunk("tweets/fetchAll", async () => {
  const res = await csrfFetch("/api/tweets");
  const { tweets } = await res.json();
  const normalized = normalize(tweets, [tweet]);
  return normalized.entities;
});

export const postTweet = createAsyncThunk("tweets/postTweet", async (body) => {
  const res = await csrfFetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const normalized = normalize(data.tweet, tweet);
  return normalized.entities;
});

const entitiesSlice = createSlice({
  name: "entities",
  initialState: {
    tweets: {
      ids: [],
      entities: {},
    },
    users: {
      entities: {},
    },
  },
  reducers: {},
  extraReducers: {
    [fetchTweets.fulfilled]: (state, { payload }) => {
      state.tweets.entities = payload.tweets;
      state.users.entities = payload.users;
      state.tweets.ids = Object.keys(payload.tweets).reverse();
    },
    [postTweet.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.tweets.entities = { ...state.tweets.entities, ...payload.tweets };
      state.users.entities = { ...state.users.entities, ...payload.users };
      state.tweets.ids.unshift(Object.keys(payload.tweets)[0]);
    },
  },
});

export default entitiesSlice.reducer;
