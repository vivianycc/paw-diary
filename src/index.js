import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GeistProvider, CssBaseline, Themes } from "@geist-ui/core";
import "./index.css";
import App from "./App";

const theme = Themes.createFromLight({
  type: "taleTheme",
  palette: {
    success: "pink",
  },
  layout: {
    radius: "16px",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeistProvider themes={[theme]} themeType="taleTheme">
        <App />
        {/* <CssBaseline /> */}
      </GeistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
