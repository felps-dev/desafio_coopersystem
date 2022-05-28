import "./index.css";
import "@fontsource/poppins";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
if (typeof window.global === "undefined") {
  window.global = window;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
