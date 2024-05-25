import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Reset />
    <Router />
  </>
);
