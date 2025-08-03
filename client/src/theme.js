import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: "#1976d2" },
    ...(mode === "dark"
      ? {
          background: {
            default: "#181e2a",
            paper: "#23293b"
          },
          text: { primary: "#edf6ff" }
        }
      : {
          background: {
            default: "#f5f8fa",
            paper: "#fff"
          },
          text: { primary: "#212121" }
        }),
  },
  typography: {
    fontFamily: "'Roboto', 'Montserrat', 'Arial', sans-serif"
  }
});

export default getDesignTokens;


