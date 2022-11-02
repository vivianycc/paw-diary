import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GeistProvider, Themes } from "@geist-ui/core";
import { ThemeProvider } from "styled-components";
import "./index.css";
import App from "./App";

const geistTheme = Themes.createFromLight({
  type: "taleTheme",
  palette: {
    success: "pink",
  },
  layout: {
    radius: "16px",
  },
});
const theme = {
  colors: {
    primary: "var(--neutral-700)",
    onPrimary: "#fff",
    secondary: "var(--neutral-200)",
    onSecondary: "var(--neutral-700)",
    warning: "red",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GeistProvider themes={[geistTheme]} themeType="taleTheme">
          <App />
          {/* <CssBaseline /> */}
        </GeistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
