/* eslint-disable */
import Looks3Icon from '@mui/icons-material/Looks3';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { Box } from '@mui/material';
import getLeaderboard from 'components/widgets/leaderboard/getLeaderboard';
import { useEffect, useState } from 'react';


/**
 * @returns component for admin - podium page
 */
const TopTeamsPage = () => {
	const [leaderboard, setLeaderboard] = useState([]);
	
	// websocket.on for leaderboard update then get top 3 teams
  useEffect(() => {
		fetchData();
	}, [leaderboard]);

	const fetchData = async () => {
		let currLeaderboard = await getLeaderboard();

		setLeaderboard(currLeaderboard);
	}
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				padding: 2,
				width: 450,
				height: 600,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: '35px',
				bgcolor: 'rgba(255, 255, 255, 0.1)', // White with opacity
				backdropFilter: 'blur(1px)',
				WebkitBackdropFilter: 'blur(10px)', // For Safari support
				boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)', // Black shadow
			}}
		>
			{/* TEXTS */}
			<p //1st
				style={{
					position: 'absolute',
					top: '115px',
					left: '192px',
					color: 'white',
					fontFamily: 'Poppins, sans-serif',
					width: 100,
					textAlign:'center',
				}}
			>
        {leaderboard[0] !== undefined ? leaderboard[0].team_name : ''}
			</p>
			<p //2nd
				style={{
					position: 'absolute',
					top: '225px',
					left: '83px',
					color: 'white',
					fontFamily: 'Poppins, sans-serif',
					width: 100,
					textAlign: 'center',
				}}
			>
        {leaderboard[1] !== undefined ? leaderboard[1].team_name : ''}
			</p>
			<p //3rd
				style={{
					position: 'absolute',
					top: '315px',
					left: '300px',
					color: 'white',
					fontFamily: 'Poppins, sans-serif',
					width: 100,
					textAlign:'center',
				}}
			>
        {leaderboard[2] !== undefined ? leaderboard[2].team_name : ''}
			</p>
			{/* BOXES */}

			<Box //1st
				sx={{
					position: 'absolute',
					top: '385px',
					left: '243px',
					transform: 'translate(-50%, -50%)',
					width: 100,
					height: 450,
					borderRadius: '5px',
					bgcolor: 'rgb(239, 85, 85)',
					zIndex: 1,
				}}
			></Box>
			<Box //2nd
				sx={{
					position: 'absolute',
					top: '440px',
					left: '135px',
					transform: 'translate(-50%, -50%)',
					width: 100,
					height: 340,
					borderRadius: '5px',
					bgcolor: 'rgb(74, 129, 194)',
					zIndex: 1,
				}}
			></Box>
			<Box //3rd
				sx={{
					position: 'absolute',
					top: '485px',
					left: '350px',
					transform: 'translate(-50%, -50%)',
					width: 100,
					height: 250,
					borderRadius: '5px',
					bgcolor: 'rgb(68, 184, 109)',
					zIndex: 1,
				}}
			></Box>
			{/* RANKS */}
			<LooksOneIcon //1st
				sx={{
					color: 'rgb(253, 213, 81)',
					position: 'absolute',
					top: '220px',
					left: '243px',
					transform: 'translate(-50%, -50%)',
					width: 75,
					height: 75,
					zIndex: 3,
				}}
			/>
			<LooksTwoIcon //2nd
				sx={{
					color: 'rgb(253, 213, 81)',
					position: 'absolute',
					top: '333px',
					left: '135px',
					transform: 'translate(-50%, -50%)',
					width: 75,
					height: 75,
					zIndex: 3,
				}}
			/>
			<Looks3Icon //3rd
				sx={{
					color: 'rgb(253, 213, 81)',
					position: 'absolute',
					top: '420px',
					left: '350px',
					transform: 'translate(-50%, -50%)',
					width: 75,
					height: 75,
					zIndex: 3,
				}}
			/>
		</Box>
	);
};

export default TopTeamsPage;
