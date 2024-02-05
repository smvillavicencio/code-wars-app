/* eslint-disable */ 

import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
	Box,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
	Modal,
	ParticipantsLeaderboard,
	SponsorCarousel,
	Timer,
	TopBar
} from 'components/';


// dummy data for leaderboard
const columns = [
	{
		field: 'id',
		headerName: 'ID',
	},
	{
		field: 'rank',
		headerName: 'Rank',
		minWidth: 60,
		maxWidth: 100,
		headerAlign: 'center',
		align: 'center',
		flex: 1,
	},
	{
		field: 'teamName',
		headerName: 'Team Name',
		minWidth: 400,
		// maxWidth: 500,
		flex: 1,
	},
	{
		field: 'score',
		headerName: 'Score',
		minWidth: 150,
		// maxWidth: 200,
		flex: 1,
	},
	{
		field: 'totalSpent',
		headerName: 'Total Spent',
		minWidth: 100,
		maxWidth: 200,
		headerAlign: 'left',
		align: 'left',
		flex: 1,
	},
];

// dummy data for leaderboard
const rows = [
	{ id: 1, rank: 1, teamName: 'Team One', score: 0/200, totalSpent: 1500},
	{ id: 2, rank: 2, teamName: 'Team Two', score: 0/400, totalSpent: 1300},
	{ id: 3, rank: 3, teamName: 'Team Three', score: 0/400, totalSpent: 1800},
	{ id: 4, rank: 4, teamName: 'Team Four', score: 500/500, totalSpent: 1000},
	{ id: 5, rank: 5, teamName: 'Team Five', score: 300/700, totalSpent: 650},
	{ id: 6, rank: 6, teamName: 'Team Six', score: 0/1000, totalSpent: 800},
	{ id: 7, rank: 7, teamName: 'Team Seven', score: 0/2800, totalSpent: 750},
];

// dummy data
const problemTitle = 'Hamming distance, interleavings, and isomorphic';
const problemSubtitle = 'UPLB Computer Science Society';
const problemDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris dolor, euismod nec commodo aliquam, porta vitae ante. Vivamus tincidunt egestas erat nec condimentum. Sed nec ex quis arcu lacinia laoreet. In interdum ipsum orci, ac gravida urna pharetra non. Etiam pretium, ipsum sed volutpat mollis, eros est hendrerit turpis, eget hendrerit libero dui ut eros. Donec sit amet dui sapien. Aliquam nec mi nec mauris placerat gravida. Cras egestas nisl semper semper mollis. Sed dictum augue congue porttitor ultricies. In accumsan, libero at suscipit aliquam, neque lorem eleifend velit, a vulputate lectus lorem in ante.\nMorbi non felis et lorem ultrices porttitor sit amet vitae est. Pellentesque magna urna, posuere a tincidunt a, vehicula sit amet ex. Vestibulum vehicula lectus eget consectetur imperdiet. Aenean interdum ante vel massa ultricies, a aliquet libero tempor. Mauris laoreet ipsum lacus, in iaculis nibh pharetra eget. Nunc eget purus egestas, elementum nulla eget, tincidunt nunc.';


/*
 * Purpose: Displays the Specific Problem Page for participants.
 * Params: None
 */
const ViewSpecificProblemPage = ({
	// problemTitle,
	// problemSubtitle,
	// problemDescription,
}) => {
	// state for the opening and closing of submit modal window
	const [open, setOpen] = useState(false);

	// used for client-side routing to other pages
	const navigate = useNavigate();

	/*
   * Purpose: Handles opening of the submit modal window
   * Params: None
   */ 
	const handleOpen = () => setOpen(true);

	/*
   * Purpose: Handles closing of the submit modal window
   * Params: None
   */ 
	const handleClose = () => setOpen(false);
  
	/*
   * Purpose: Handles on click event of return button and navigates to View All Problems Page
   * Params: None
   */ 
	const handleReturn = () => {
		navigate('/participant/view-all-problems');
	};


	return (
		<Stack>
			{/* Topbar */}
			<TopBar
				isImg={false}
				icon={
					<IconButton sx={{ color: '#fff' }} onClick={handleReturn}>
						<ArrowBackIcon
							sx={{
								cursor: 'pointer',
								borderRadius: 2,
								'&:hover': {
									backgroundColor: 'rgba(201, 209, 231, 0.1)',
									color: 'major.main',
								}
							}}
						/>
					</IconButton>
				}
				title={problemTitle}
				subtitle={problemSubtitle}
				buttonText="UPLOAD FILE"
				startIcon={<FileUploadIcon />}
				// handleButton={}
			/>

			{/* Other components */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 4,
				}}
			>
				{/* Left column is for timer, leaderboard, sponsors' carousel */}
				<Stack
					spacing={3}
					sx={{
						mt: 4,
						mx: 8,
						minWidth: 325,
					}}
				>
					<Timer />
					<ParticipantsLeaderboard rows={rows} columns={columns} />
					<SponsorCarousel />
				</Stack>

				{/* Right column is for the problem description and sample inputs/outputs */}
				<Typography variant="body1">
					<Stack
						spacing={5}
						sx={{
							mt: 8,
							width: '95%',
						}}
					>
						{/* Problem Description */}
						<Box
							sx={{
								backgroundColor: '#fff',
								padding: 3,
								borderRadius: 4,
							}}
						>
							{problemDescription}
						</Box>
            
						{/* Sample Inputs and Outputs */}
						<Box
							sx={{
								display: 'flex',
								backgroundColor: '#fff',
								minHeight: 200,
								borderRadius: 4,
							}}
						>
							<Box sx={{ width: '50%', borderRight: 2,}}>
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
								</Typography>

								{/* Sample inputs here */}
								<div></div>
							</Box>

							<Box sx={{ width: '50%' }}>
								<Typography
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
								</Typography>

								{/* Sample outputs here */}
								<div></div>
							</Box>
						</Box>
					</Stack>
				</Typography>
			</Box>
		</Stack>
	);
};

export default ViewSpecificProblemPage;