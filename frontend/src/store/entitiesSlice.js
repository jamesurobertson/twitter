import { csrfFetch } from "../utils/csrf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { schemas } from "./schemas";

const { user, tweet } = schemas;

export const fetchTweets = createAsyncThunk("tweets/fetchAll", async () => {
  const res = await csrfFetch("/api/tweets");
  const data = await res.json();
  const normalized = normalize(data, {
    tweets: [tweet],
    users: [user],
  });

  // getting everything but follows, and followers from entities. We don't care
  // about those objects in our entities slice of state
  const {
    entities: { tweets, users },
    result,
  } = normalized;

  return { entities: { tweets, users }, result };
});

export const getHashTweets = createAsyncThunk(
  "tweets/getHashTweets",
  async (tag) => {
    const res = await csrfFetch(`/api/tweets/hashtag/${tag}`);
    const data = await res.json();

    const normalized = normalize(data, {
      tweets: [tweet],
      users: [user],
    });
    return normalized;
  }
);

export const postTweet = createAsyncThunk("tweets/postTweet", async (body) => {
  const res = await csrfFetch("/api/tweets", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const normalized = normalize(data, { tweet, user });

  return normalized;
});

export const getUser = createAsyncThunk("users/getUser", async (userId) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  const normalized = normalize(data.user, user);
  return normalized.entities;
});

export const postFollow = createAsyncThunk("users/postFollow", async (id) => {
  const res = await csrfFetch(`/api/follows/${id}`, {
    method: "POST",
  });

  const { follow } = await res.json();
  return follow;
});

export const deleteFollow = createAsyncThunk(
  "users/deleteFollow",
  async (id) => {
    const res = await csrfFetch(`/api/follows/${id}`, {
      method: "DELETE",
    });
    const { follow } = await res.json();
    return follow;
  }
);

export const postLike = createAsyncThunk("tweets/postLike", async (id) => {
  const res = await csrfFetch(`/api/tweets/like/${id}`, {
    method: "POST",
  });
  const { like } = await res.json();
  return like;
});

export const deleteLike = createAsyncThunk("tweets/deleteLike", async (id) => {
  const res = await csrfFetch(`/api/tweets/like/${id}`, {
    method: "Delete",
  });
  const { like } = await res.json();
  return like;
});
const entitiesSlice = createSlice({
  name: "entities",
  initialState: {
    tweets: {},
    users: {},
    feed: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.users = { ...state.users, ...payload.entities.users };
    },
  },
  extraReducers: {
    [fetchTweets.fulfilled]: (state, { payload }) => {
      state.feed = payload.result.tweets;
      state.users = { ...state.users, ...payload.entities.users };
      state.tweets = { ...state.tweets, ...payload.entities.tweets };
    },
    [getHashTweets.fulfilled]: (state, { payload }) => {
      state.tweets = { ...state.tweets, ...payload.entities.tweets };
      state.users = { ...state.users, ...payload.entities.users };
      state.feed = payload.result.tweets;
    },
    [postTweet.fulfilled]: (state, { payload }) => {
      state.tweets = { ...state.tweets, ...payload.entities.tweets };
      state.users = { ...state.users, ...payload.entities.users };
      state.feed.unshift(payload.result.tweet);
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.users = { ...state.users, ...payload.users };
      state.tweets = { ...state.tweets, ...payload.tweets };
    },
    [postFollow.fulfilled]: (state, { payload }) => {
      state.users[payload.userFollowedId].followers.push(payload.userId);
      state.users[payload.userId].follows.push(payload.userFollowedId);
    },
    [deleteFollow.fulfilled]: (state, { payload }) => {
      state.users[payload.userFollowedId].followers = state.users[
        payload.userFollowedId
      ].followers.filter((follower) => follower !== payload.userId);
      state.users[payload.userId].follows = state.users[
        payload.userId
      ].follows.filter((follow) => follow !== payload.userFollowedId);
    },
    [postLike.fulfilled]: (state, { payload }) => {
      state.tweets[payload.tweetId].likes.push(payload.userId);
    },
    [deleteLike.fulfilled]: (state, { payload }) => {
      state.tweets[payload.tweetId].likes = state.tweets[
        payload.tweetId
      ].likes.filter((like) => like !== payload.userId);
    },
  },
});

export const setUser = entitiesSlice.actions.setUser;

export default entitiesSlice.reducer;
