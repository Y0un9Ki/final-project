import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <Reset />
    <Router />
  </ThemeProvider>
);
