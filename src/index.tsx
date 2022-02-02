import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./i18n";

ReactDOM.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div style={{ margin: "auto", marginTop: "30%" }}>
          <CircularProgress />
        </div>
      }
    >
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
