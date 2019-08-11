import React from "react";
import ReactDOM from "react-dom";
import Button from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Main from "./components/Main";
import Info from "./components/Info";
import CodeBlocks from "./components/CodeBlocks";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/CodeBlocks" component={CodeBlocks} />
      <Route path="/Info" component={Info} />
    </div>
  </Router>,
  document.getElementById("root")
);
