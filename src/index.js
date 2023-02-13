import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

ReactDOM.render(
  <Router>
    <App />
    <p>index js is running</p>
  </Router>,
  document.getElementById("root")
);