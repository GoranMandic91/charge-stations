import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./app";
import store from "./store";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  throw new Error("Could not find root element");
}
