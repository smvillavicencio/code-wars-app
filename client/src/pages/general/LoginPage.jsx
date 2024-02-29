/* eslint-disable */ 
import { useContext, useState } from 'react';

import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import {
	Box,
	TextField,
	Button,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LoginBackground from 'assets/LoginBackground.png';
import { SponsorCarousel } from 'components/index.js';
import { baseURL } from 'utils/constants';
import { postFetch } from 'utils/apiRequest';
import Cookies from "universal-cookie";

/*
 * Purpose: Displays the login page for all users.
 * Params: None
 */
const LoginPage = () => {
	// state for the username textfield
	const [username, SetUsername] = useState('');
	// state for the password textfield
	const [password, SetPassword] = useState('');

	// used for client-side routing to other pages
	const navigate = useNavigate();

	/**
	 * Purpose: Handles click event on login button, sets user role based on username, and navigates to index page of user role.
	 * Params: <String> username - receives username input.
	 */
	const handleLogin = async (username, password) => {
		const loginResponse = await postFetch(`${baseURL}/login`, {
			username: username,
			password: password
		});

		if (!loginResponse.success) {
			alert(loginResponse.results);
		} else {
			let user = loginResponse.results;
			//console.log(loginResponse);
			localStorage.setItem("user", JSON.stringify(user));

			const cookies = new Cookies();
			cookies.set(
				"authToken",
				loginResponse.token,
				{
					secure: true,
					path: "/",
					age: 60*60*24,
					sameSite: "none"
				}
			);
			if (user.usertype == "team") {
				user["username"] = user["team_name"];
				delete user["team_name"];
				user["usertype"] = "participant";

				navigate('/participant/view-all-problems');
			} 
			else if (user.usertype == "judge") {
				user["username"] = user["judge_name"];
				delete user["judge_name"];

				navigate('/judge/submissions');
			}
			else if (user.usertype == "admin") {
				user["username"] = user["admin_name"];
				delete user["admin_name"];

				navigate('/admin/general');
			}
		}
	};


	return (
		// The login page has a background image that is different from all other pages.
		<Box
			style = {{
				backgroundImage: `url(${LoginBackground})`,
				backgroundSize: 'cover',
				height: '100vh',
				color: '#f5f5f5'
			}}
		>
			{/* Login form */}
			<Box
				sx = {{
					position: 'absolute',
					top: 0,
					right: 0,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					marginRight: '16%',
					marginTop: '80px',
					zIndex: 1,
				}}
			> 
				<Box
					sx = {{ 
						padding: 2,
						width: 450, 
						height: 450, 
						borderRadius: '20px',
						'& .MuiTextField-root': {
							marginBottom: '20px',
							width: '260px'
						},
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '35px',
						bgcolor: 'rgba(255, 255, 255, 0.1)',                // White with opacity
						backdropFilter: 'blur(10px)',
						WebkitBackdropFilter: 'blur(10px)',                 // For Safari support
						boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',   // Black shadow
					}}
				>
					{/* Login Title */}
					<Typography
						variant="h4"
						component="h4"
						sx={{ marginBottom: '60px', color: 'major.light' }}
					>
						Log In
					</Typography>

					<form 
						// onSubmit={handleSubmit}
					>
						{/* Username */}
						<Box>
							<PersonIcon
								sx={{
									padding: 2,
									width: '25px',
									height: '25px',
									marginRight: '10px',
									borderRadius: '5px',
									bgcolor: 'rgba(255, 255, 255, 0.15)',
								}}
							/>

							<TextField
								label="Username"
								variant="filled"
								onChange={e => {
									SetUsername(e.target.value);
								}}
								sx={{
									bgcolor: 'rgba(255, 255, 255, 0.15)',
									borderTopLeftRadius: '5px',
									borderTopRightRadius: '5px',
									'& .MuiFormLabel-root': {
										color: 'white.main',
									},
									'& .MuiFilledInput-root': {
										color: 'rgba(255, 255, 255, 0.8)',                      // White with reduced opacity
										'&::placeholder': {
											color: 'rgba(255, 255, 255, 0.5)',                  // Placeholder color with reduced opacity
										},
										'&:focus::placeholder': {
											color: 'rgba(255, 255, 255, 1)',      
										},
										'&:before': {
											borderBottom: '1px solid rgba(255, 255, 255, )', // Underline color with reduced opacity
										},
										'&:hover:before': {
											borderBottom: '2px solid rgba(255, 255, 255, 1)', // Underline on hover
										},
										'&.Mui-focused:before': {
											borderBottomColor: 'white',                         // White color for the underline when focused
										},
										'&.Mui-focused:after': {
											borderBottomColor: 'major.main',                    // Border color when focused and input is not empty
										},
									},
								}}
							/>
						</Box>
						
						{/* Password */}
						<Box>
							<KeyIcon
								sx = {{
									padding: 2,
									width: '25px',
									height: '25px',
									marginRight: '10px',
									borderRadius: '5px',
									bgcolor: 'rgba(255, 255, 255, 0.15)',
								}}
							/>
							
							<TextField
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="filled"
								onChange={e => {
									SetPassword(e.target.value);
								}}
								onKeyDown={
									(e)=>{if (e.key === "Enter") {handleLogin(username, password);}}
								}
								sx = {{
									bgcolor: 'rgba(255, 255, 255, 0.15)',
									borderTopLeftRadius: '5px',
									borderTopRightRadius: '5px',
									'& .MuiFormLabel-root': {
										color: 'white.main',
									},
									'& .MuiFilledInput-root': {
										color: 'rgba(255, 255, 255, 0.8)',                      // White with reduced opacity
										'&::placeholder': {
											color: 'rgba(255, 255, 255, 0.5)',                  // Placeholder color with reduced opacity
										},
										'&:focus::placeholder': {
											color: 'rgba(255, 255, 255, 1)',      
										},
										'&:before': {
											borderBottom: '1px solid rgba(255, 255, 255, )', // Underline color with reduced opacity
										},
										'&:hover:before': {
											borderBottom: '2px solid rgba(255, 255, 255, 1)', // Underline on hover
										},
										'&.Mui-focused:before': {
											borderBottomColor: 'white',                         // White color for the underline when focused
										},
										'&.Mui-focused:after': {
											borderBottomColor: 'major.main',                    // Border color when focused and input is not empty
										},
									},
								}}
							/>
						</Box>

						{/* Sign In Button */}
						<Button 
							//type="submit"
							onClick={() => { handleLogin(username, password); }}
							variant="contained" 
							sx={{
								width: '320px',
								height: '50px',
								marginTop: '20px',
								bgcolor: 'major.main',          // Initial background color
								'&:hover': {
									bgcolor: 'major.light',     // Background color on hover
									color: 'general.main',
								}
							}}
						>
							Sign In
						</Button>
					</form>
				</Box>
                
				{/* Sponsor carousel in LogIn Page */}
				<Box sx={{ width: 480, }}>
					<SponsorCarousel />
				</Box>
			</Box>
		</Box>
	);
};

export default LoginPage;