
/* eslint-disable */ 

import React, { useState, useEffect, useRef } from 'react';
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

import {
	FreezeOverlay,
	TimerOverlay
} from 'components';


var immortalHTML = '<div class="MuiBox-root css-1ato3wx"><div class="MuiBox-root css-1xpmd5v"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium fOverlay css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HourglassFullTwoToneIcon" style="font-size: 10rem; align-self: center;"><path d="m8 7.5 4 4 4-4V4H8zm0 9V20h8v-3.5l-4-4z" opacity=".3"></path><path d="M18 2H6v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18zm-2 14.5V20H8v-3.5l4-4zm0-9-4 4-4-4V4h8z"></path></svg><br><h4 class="MuiTypography-root MuiTypography-h4 fOverlay css-1cvibvw-MuiTypography-root">Your screen has been frozen. <br>Please Wait.</h4></div></div>';

function App() {

	const [freezeOverlay, setFreezeOverlay] = useState(false);
	const overlayLoad = useRef(false);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkIfLoggedIn = async () => {
		let response = await postFetch(`${baseURL}/checkifloggedin`, {});
		
		// IMPORTANT: Remove this timeout in the future
		//setTimeout(()=>{
			setIsLoggedIn(response.isLoggedIn);
		//}, 1000);
	}

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
				{freezeOverlay ? <div className='fOverlayScreen' style={{zIndex: "10000"}}><FreezeOverlay /></div> : null}
				<Outlet />
			</Box>
		);
	}

	useEffect(() => {
		const eventSource = new EventSource(`${baseURL}/admincommand`);
		eventSource.onmessage = (e) => {
			//console.log("Received message");
			if (JSON.parse(localStorage?.getItem("user"))?.usertype == "participant") {
			if (e.data == "freeze") {
				setFreezeOverlay(true);

						if (document.querySelectorAll(".fOverlayScreen")[0] != null && overlayLoad.current == false) {
							overlayLoad.current = true;
						}

						let checker = document.getElementsByClassName("fOverlay").length;

						setTimeout(()=>{
							if (checker < 2 && overlayLoad.current == true) {

								try {
									document.getElementsByClassName("fOverlayScreen")[0].remove();
								} catch (error) {
									
								}

								const immortalDiv = document.createElement('div');
								immortalDiv.className = "fOverlayScreen";
								immortalDiv.style.zIndex = "10000";
								immortalDiv.innerHTML = immortalHTML;

								let commonBox = document.getElementById("commonBox");
								commonBox.insertBefore(immortalDiv, commonBox.firstChild);
							}
						},1000);
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