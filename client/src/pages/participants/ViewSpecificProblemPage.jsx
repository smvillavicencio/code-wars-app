/* eslint-disable */ 
import { useState, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
	Box,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	CustomModal,
	ParticipantsLeaderboard,
	SponsorCarousel,
	RoundTimer,
	TopBar
} from 'components/';
import {
	columnsLeaderboard,
	rowsLeaderboard
} from 'utils/dummyData';

import SubmitModal from './modals/SubmitModal';
import Loading from 'components/widgets/screen-overlays/Loading';


/*
 * Purpose: Displays the Specific Problem Page for participants.
 * Params: None
 */
const ViewSpecificProblemPage = ({
	isLoggedIn,
	setIsLoggedIn,
	checkIfLoggedIn
}) => {
	// state for the opening and closing of submit modal window
	const [open, setOpen] = useState(false);

	// used for client-side routing to other pages
	const navigate = useNavigate();
	// used for client-side routing from view all problems page
	const location = useLocation();
	// used to retrieve values of datagrid row
	let params = new URLSearchParams(location.search);
	// page values
	const problemTitle = params.get('problemTitle');
	// dummy values
	const problemSubtitle = 'UPLB Computer Science Society';
	const problemDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris dolor, euismod nec commodo aliquam, porta vitae ante. Vivamus tincidunt egestas erat nec condimentum. Sed nec ex quis arcu lacinia laoreet. In interdum ipsum orci, ac gravida urna pharetra non. Etiam pretium, ipsum sed volutpat mollis, eros est hendrerit turpis, eget hendrerit libero dui ut eros. Donec sit amet dui sapien. Aliquam nec mi nec mauris placerat gravida. Cras egestas nisl semper semper mollis. Sed dictum augue congue porttitor ultricies. In accumsan, libero at suscipit aliquam, neque lorem eleifend velit, a vulputate lectus lorem in ante.\nMorbi non felis et lorem ultrices porttitor sit amet vitae est. Pellentesque magna urna, posuere a tincidunt a, vehicula sit amet ex. Vestibulum vehicula lectus eget consectetur imperdiet. Aenean interdum ante vel massa ultricies, a aliquet libero tempor. Mauris laoreet ipsum lacus, in iaculis nibh pharetra eget. Nunc eget purus egestas, elementum nulla eget, tincidunt nunc.';
	
	const tempId = "65d5388fa3fd7658a9c15971";
	const tempPossiblePoints = 500;
	const tempTitle = "37 PATTERN";
	const tempTotalCases = 5;
	
	/*
   * Purpose: Handles opening of the submit modal window
   * Params: None
   */ 
	const handleButton = () => {
		setOpen(true);
	};

	/*
   * Purpose: Handles on click event of return button and navigates to View All Problems Page
   * Params: None
   */ 
	const handleReturn = () => {
		navigate('/participant/view-all-problems');
	};

	useEffect(() => {
		let usertype = JSON.parse(localStorage?.getItem("user"))?.usertype;
		if (usertype == "judge") {
			navigate('/judge/submissions');
		}
		else if (usertype == "admin") {
			navigate('/admin/general');
		}
		else if (usertype == "participant") {
			checkIfLoggedIn();	
		}
		else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<>
		{
			isLoggedIn ? 
		<Stack>
			{/* Topbar */}
			<TopBar
				isImg={false}
				icon={
					<IconButton sx={{ color: '#fff' }} onClick={handleReturn}>
						<ArrowBackIcon
							sx={{
								fontSize: '2rem',
								cursor: 'pointer',
								padding: 1.5,
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
				buttonText="UPLOAD SUBMISSION"
				startIcon={<FileUploadIcon />}
				handleButton={handleButton}
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
					<RoundTimer />
					<ParticipantsLeaderboard rows={rowsLeaderboard} columns={columnsLeaderboard} />
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
							<Typography paragraph>{problemDescription}</Typography>
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
			
			{/* Submit Modal Window */}
			<CustomModal isOpen={open} setOpen={setOpen} windowTitle="Upload your answer">
				<SubmitModal 
					setOpen={setOpen} 
					problemId={tempId} 
					problemTitle={tempTitle} 
					possiblePoints={tempPossiblePoints} 
					totalCases={tempTotalCases}
				/>
			</CustomModal>

		</Stack>
		: <Loading /> }
		</>
	);
};

export default ViewSpecificProblemPage;