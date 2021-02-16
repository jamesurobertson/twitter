import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import tweetsReducer from "./tweetsSlice";
import currentProfileReducer from "./currentProfileSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  tweets: tweetsReducer,
  currentProfile: currentProfileReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
