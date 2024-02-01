import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { theme } from "./theme.js";
import GeneralBackground from "./assets/GeneralBackground.png";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          backgroundImage: `url(${GeneralBackground})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}>
        {/* insert component being tested here */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
