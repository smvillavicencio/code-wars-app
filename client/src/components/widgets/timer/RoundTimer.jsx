/* eslint-disable */ 
import {
	Box,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { socketClient } from 'socket/socket';


/**
 * Purpose: Displays the round timer.
 * Params: None
 */
const RoundTimer = ({
}) => {

	const [seconds, setSec] = useState("loading...");

	// useEffect(()=>{
	// 	setSec(new Date(seconds * 1000).toISOString().slice(11, 19));
	// },[])

	// console.log(seconds);
	useEffect(()=>{
		socketClient.on("update",(arg)=>{
			var formattedSec = new Date(arg.remainingTime * 1000).toISOString().slice(14, 19);

			setSec(formattedSec);
		})

		return () => {
			socketClient.off("update");
		}
	  },[]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: '325px',
				alignItems: 'center',
			}}
		>
			<Typography
				noWrap
				color="primary.contrastText"
				sx={{
					fontFamily: 'Poppins',
					fontWeight: 600,
					fontSize: '1.4rem',
					alignItems: 'center',
					alignContent: 'center',
					justifyContent: 'center',
				}}
			>
				<span>ROUND TIMER</span>
			</Typography>

			<Typography noWrap variant="h3"
				sx={{
				}}
			>
				{seconds}
			</Typography>
		</Box>
	);
};

export default RoundTimer;