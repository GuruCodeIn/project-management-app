import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

import axios from "axios";

// 🔥 ADD THIS
axios.defaults.baseURL = "http://localhost:5005";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
