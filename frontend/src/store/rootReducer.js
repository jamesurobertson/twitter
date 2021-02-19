import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import entitiesReducer from "./entitiesSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
});

export default rootReducer;
