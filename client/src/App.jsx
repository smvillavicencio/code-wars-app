import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";

import { theme } from "./theme.js";
import bg1 from "./assets/bg1.png";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        class="bg1"
        style={{
          backgroundImage: `url(${bg1})`,
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
