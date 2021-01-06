import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, fetch } from "./utils/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
