import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";

import store from "./store";
import { restoreCSRF } from "./utils/csrf";

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
}

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
