/* eslint-disable */ 
import { useState, useEffect } from 'react';

import {
	Box,
	Stack,
	Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { postFetch } from 'utils/apiRequest';
import { baseURL } from 'utils/constants';


/**
 * Purpose: Displays the Specific Problem Page for participants.
 */
const ViewSpecificProblemPage = () => {

	// used for client-side routing from view all problems page
	const location = useLocation();
	
	// used to retrieve values of datagrid row
	let params = new URLSearchParams(location.search);

	
	const [problem, setProblem] = useState();
	const [problemDescription, setProblemDescription] = useState();
	const [sampleInput, setSampleInput] = useState('');
	const [sampleOutput, setSampleOutput] = useState('');

	const [evaluation, setEvaluation] = useState();
	const [samples, setSampleInputOutput] = useState();
	
	
	useEffect(() => {
		getQuestionContent();
	}, []);


	/**
	 * Fetching problem description.
	 */
	const getQuestionContent = async () => {
		const qResponse = await postFetch(`${baseURL}/viewquestioncontent`, {
			problemId: params.get('id'),
			teamId: JSON.parse(localStorage?.getItem('user'))._id
		});

		setProblem(qResponse.question);
		setProblemDescription(qResponse.question.body);
		setEvaluation(qResponse.evaluation);
		// setSampleInput(qResponse.question.sample_input);
		// setSampleOutput(qResponse.question.sample_output);
		setSampleInputOutput(qResponse.question.samples);

		console.log(qResponse);
	};


	return (
		<>
			{/* Problem description and sample inputs/outputs */}
			<Stack
				spacing={5}
				sx={{
					mt: { xl: 8 },
					px: { xs: 7 },
					height: '100%',
					width: '100%',
					display: 'flex'
				}}
			>
				{/* Problem Description */}
				<Box
					sx={{
						backgroundColor: '#fff',
						padding: 3,
						borderRadius: 4,
						// width: '100%'
					}}
				>
					<Typography paragraph>{problemDescription}</Typography>
					<a href={samples} target="_blank" rel="noopener noreferrer">
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
		</>
	);
};

export default ViewSpecificProblemPage;