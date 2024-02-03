import { Outlet, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserDetailsProvider } from "./utils/UserDetailsProvider.js";

import GeneralBackground from "./assets/GeneralBackground.png";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { theme } from "./theme.js";

import {
  LoginPage,
  GeneralOptionsPage,
  PowerUpLogs,
  ViewAllProblemsPage,
  ViewSpecificProblemPage,
  ViewSubmissionsPage,
} from "./pages/index.js";


/**
 * This will set the common background for all pages (except login page)
 */
function Layout() {
	return (
		<>
			<Box
        style={{
          backgroundImage: `url(${GeneralBackground})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      />
			<Outlet />
		</>
	);
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserDetailsProvider>
        <Router>
          <Routes>
            {/* Login page has a different background image */}
            <Route index element={<LoginPage />} />

            {/* Pages with same backgrounds */}
            <Route path="/" element={<Layout />}>
              <Route path="participant/view-all-problems" element={<ViewAllProblemsPage />} />
              <Route path="participant/view-specific-problem" element={<ViewSpecificProblemPage />} />
              <Route path="judge/submissions" element={<ViewSubmissionsPage />} />
              <Route path="admin/general" element={<GeneralOptionsPage />} />
              <Route path="admin/logs" element={<PowerUpLogs />} />
            </Route>
          </Routes>
        </Router>
      </UserDetailsProvider>
    </ThemeProvider>
  );
}

export default App;