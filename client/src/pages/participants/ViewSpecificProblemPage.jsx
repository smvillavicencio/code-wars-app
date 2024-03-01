/* eslint-disable */ 
import { useEffect } from 'react';

import {
	Box,
	Stack,
	Typography,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';


/**
 * Purpose: Displays the Specific Problem Page for participants.
 */
const ViewSpecificProblemPage = () => {
	/**
	 * Consuming context needed for the page
	 */
	const {
		problemDesc,
		samp,
		fetchContent
	} = useOutletContext();


	useEffect(() => {
		fetchContent();
	}, []);


	return (
		<Box
			sx={{
				display: 'flex',
				alignContent: {
					xs: 'center',
					lg: 'none'
				},
				justifyContent: {
					xs: 'center',
					lg: 'none'
				}
		}}>
			{/* Problem description and sample inputs/outputs */}
			<Stack
				spacing={5}
				sx={{
					// mt: { xs: 3, md: 4, lg: 6 },
					mr: { xl: 7 },
					justifySelf: 'center',
					height: '100%',
					width: { xs: '90%', xl: '100%'},
					display: 'flex'
				}}
			>
				{/* Problem Description */}
				<Typography variant="h5" color="white.main" sx={{ fontFamily: 'Inter' }}> Description </Typography>
				<Box
					sx={{
						padding: 3,
						borderRadius: 4,
						backgroundColor: '#fff',
					}}
				>
					<Typography variant="body1" paragraph>{problemDesc}</Typography>
				</Box>
				
				<Typography variant="h5" color="white.main" sx={{ fontFamily: 'Inter' }}> Sample Inputs and Outputs </Typography>
				<Box
					sx={{
						padding: 3,
						borderRadius: 4,
						backgroundColor: '#fff',
					}}
				>
					<a href={samp} target="_blank" rel="noopener noreferrer">
							Click here for sample inputs and outputs
					</a>
				</Box>
				{/* Sample Inputs and Outputs */}
				{/* <Box
					sx={{
						display: 'flex',
						backgroundColor: '#fff',
						minHeight: {xs: 100, xl: 200},
						borderRadius: 4,
					}}
				> */}
				{/* <Box sx={{ width: '50%', borderRight: 2,}}>
						<Typography
							color="primary.contrastText"
							sx={{
								borderTopLeftRadius: 10,
								bgcolor: 'primary.main',
								fontFamily: 'Inter',
								fontWeight: 400,
								fontSize: '1.10rem',
								padding: 1,
							}}
						>
							Sample Inputs
						</Typography> */}

				{/* Sample inputs here */}
				{/* <div style={{padding: "10px"}}>
							{sampleInput}
						</div> */}
				{/* </Box> */}

				{/* <Box sx={{ width: '50%' }}> */}
				{/* <Typography
							color="primary.contrastText"
							sx={{
								borderTopRightRadius: 10,
								bgcolor: 'primary.main',
								fontFamily: 'Inter',
								fontWeight: 400,
								fontSize: '1.10rem',
								padding: 1,
							}}
						>
							Sample Outputs
						</Typography> */}

				{/* Sample outputs here */}
				{/* <div style={{padding: "10px"}}>
							{sampleOutput}
						</div> */}
				{/* </Box> */}
				{/* </Box> */}
			</Stack>
		</Box>
	);
};

export default ViewSpecificProblemPage;