import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeistProvider>
        <CssBaseline />
        <App />
      </GeistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
