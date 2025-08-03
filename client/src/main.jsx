import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getDesignTokens from "./theme";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

function Root() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getDesignTokens(mode), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App mode={mode} setMode={setMode} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);





