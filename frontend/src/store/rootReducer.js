import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import tweetsReducer from "./tweetsSlice";
import usersReducer from "./usersSlice";
import entitiesReducer from "./entitiesSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  //   tweets: tweetsReducer,
  //   users: usersReducer,
  entities: entitiesReducer,
});

export default rootReducer;
