
/* eslint-disable */ 
import { useState, useEffect } from 'react';
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

import {
	FreezeOverlay,
	TimerOverlay
} from 'components';


const BaseURL = "http://localhost:5000";

function App() {	
	const [freezeOverlay, setFreezeOverlay] = useState(false);

	useEffect(() => {
		const eventSource = new EventSource(`${BaseURL}/admincommand`);
		eventSource.onmessage = (e) => {
			if (localStorage.getItem("usertype") == "team") {
			if (e.data == "freeze") {
					setFreezeOverlay(true);
					console.log("Should freeze");
					// try {
					// 	document.getElementById("overlayFreeze").style.display = "block";
					// } catch (error) {
					// 	let newdiv = document.createElement("div");
					// 	newdiv.id = "overlayFreeze";

					// 	document.getElementById("root").appendChild(newdiv);
					// 	document.getElementById("overlayFreeze").style.display = "block";
					// }
			} else {
				setFreezeOverlay(false);
				// try {
				// 	document.getElementById("overlayFreeze").style.display = "none";	
				// } catch (error) {
				// 	let newdiv = document.createElement("div");
				// 	newdiv.id = "overlayFreeze";

				// 	document.getElementById("root").appendChild(newdiv);
				// 	document.getElementById("overlayFreeze").style.display = "none";	
				// }	
			}
			}
		}
	}, []);

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
				{freezeOverlay ? <FreezeOverlay /> : null}
				<Outlet />
			</Box>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<UserDetailsProvider>
				{/* <div id='overlayFreeze'></div> */}
				<Router>
					<Routes>
						{/* Login page */}
						<Route index element={<LoginPage />} />

						{/* Pages with same backgrounds */}
						<Route path="/" element={<Layout />}>
							<Route path="participant/view-all-problems" element={<ViewAllProblemsPage />} />
							<Route path="participant/view-specific-problem" element={<ViewSpecificProblemPage />} />
							<Route path="judge/submissions" element={<ViewSubmissionsPage />} />
							<Route path="admin/general" element={<GeneralOptionsPage />} />
							<Route path="admin/logs" element={<PowerUpLogs />} />
							<Route path="admin/podium" element={<TopTeamsPage />} />

							
						</Route>
					</Routes>
				</Router>
			</UserDetailsProvider>
		</ThemeProvider>
	);
}

export default App;