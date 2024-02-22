
/* eslint-disable */ 

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GeneralBackground from 'assets/GeneralBackground.png';
import {
	LoginPage,
	GeneralOptionsPage,
	PowerUpLogs,
	TopTeamsPage,
	ViewAllProblemsPage,
	ViewSpecificProblemPage,
	ViewSubmissionsPage,
} from 'pages/';
import { theme } from 'theme.js';
import { UserDetailsProvider } from 'utils/UserDetailsProvider.js';

import { baseURL } from 'utils/constants';
import { postFetch } from 'utils/apiRequest';

/**
 * This will set the common background for all pages (except login page)
 */
function Layout() {
	return (
		<Box
			style={{
				backgroundImage: `url(${GeneralBackground})`,
				backgroundSize: 'cover',
				height: '100vh',
				overflow: 'hidden',
			}}
    >
      {/* Children will be displayed through outlet */}
			<Outlet />
		</Box>
	);
}

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkIfLoggedIn = async () => {
		let response = await postFetch(`${baseURL}/checkifloggedin`, {});
		
		// IMPORTANT: Remove this timeout in the future
		setTimeout(()=>{
			setIsLoggedIn(response.isLoggedIn);
		}, 1000);
	}

	useEffect(() => {
		const eventSource = new EventSource(`${baseURL}/admincommand`);
		eventSource.onmessage = (e) => {
			if (JSON.parse(localStorage?.getItem("user"))?.usertype == "participant") {
			if (e.data == "freeze") {
				try {
					document.getElementById("overlayFreeze").style.display = "block";	
				} catch (error) {
					let newdiv = document.createElement("div");
					newdiv.id = "overlayFreeze";

					document.getElementById("root").appendChild(newdiv);
					document.getElementById("overlayFreeze").style.display = "block";	
				}	
			} else {
				try {
					document.getElementById("overlayFreeze").style.display = "none";	
				} catch (error) {
					let newdiv = document.createElement("div");
					newdiv.id = "overlayFreeze";

					document.getElementById("root").appendChild(newdiv);
					document.getElementById("overlayFreeze").style.display = "none";	
				}	
			}
			}
		}
	  }, []);

	return (
		<ThemeProvider theme={theme}>
			<UserDetailsProvider>
				<div id='overlayFreeze'></div>
				<Router>
					<Routes>
						{/* Login page */}
						<Route index element={<LoginPage />} />

						{/* Pages with same backgrounds */}
						<Route path="/" element={<Layout />}>
							<Route path="participant/view-all-problems" element={<ViewAllProblemsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
							<Route path="participant/view-specific-problem" element={<ViewSpecificProblemPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
							<Route path="judge/submissions" element={<ViewSubmissionsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
							<Route path="admin/general" element={<GeneralOptionsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
							<Route path="admin/logs" element={<PowerUpLogs isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
							<Route path="admin/podium" element={<TopTeamsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} checkIfLoggedIn={checkIfLoggedIn} />} />
						</Route>
					</Routes>
				</Router>
			</UserDetailsProvider>
		</ThemeProvider>
	);
}

export default App;