import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF } from "./utils/csrf";

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
