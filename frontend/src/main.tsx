import React from "react";
import ReactDOM from "react-dom/client";
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme} style={{ height: "100%", width: "100%" }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FluentProvider>
  </React.StrictMode>
);