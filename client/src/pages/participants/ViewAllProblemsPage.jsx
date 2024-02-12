/* eslint-disable */ 
import LockIcon from '@mui/icons-material/Lock';
import {
	Button,
	Box,
	Stack,
	Toolbar,
	Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import seal from 'assets/UPLB COSS.png';
import {
	CustomModal,
	ParticipantsLeaderboard,
	SponsorCarousel,
	Table,
	Timer,
	TopBar
} from 'components/';
import {
	columnsLeaderboard,
	columnsProblems,
	rowsLeaderboard,
	rowsProblems
} from 'utils/dummyData';



/*
 * Purpose: Displays the View All Problems Page for participants.
 * Params: None
 */
const ViewAllProblemsPage = () => {

	// Styling for the problem list table
	const additionalStyles = {
		backgroundColor: '#fff',
	};

	// used for client-side routing to other pages
	const navigate = useNavigate();

	/**
   * Purpose: Handles opening of leaderboard modal window upon clicking the ellipsis button.
   * Params: <Object> receives information of selected problem in the Problem List Table.
   */
	const handleRowClick = () => {
		return 0;
		// navigate('/participant/view-specific-problem');
	};

	/**
	 * Purpose: Handles opening of power-up popover.
	 */
	const handleViewPowerUps = () => {
		return 0;
	}

	return (
		<Stack>
			{/* Topbar */}
			<TopBar
				isImg={true}
				icon={seal}
				title="Code Wars"
				subtitle="UPLB Computer Science Society"
				buttonText="BUY POWER-UP"
				handleButton={handleViewPowerUps}
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
					<ParticipantsLeaderboard rows={rowsLeaderboard} columns={columnsLeaderboard} />
					<SponsorCarousel />
				</Stack>

				{/* Right column is for the round buttons and problem list table */}
				<Stack
					spacing={5}
					sx={{
						mt: 8,
						width: '68%',
					}}
				>
          
					{/* Container for round buttons */}
					<Box sx={{ display: 'flex', gap: 3 }}>

						{/* Easy round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              EASY
						</Button>

						{/* Medium round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              MEDIUM
						</Button>

						{/* Wager round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              WAGER
						</Button>

						{/* Hard round */}
						<Button
							variant="contained"
							startIcon={<LockIcon />}
							size="large"
							sx={{
								minWidth: 125,
								gap: 0.5,
								bgcolor: 'major.main',
								'&:hover': {
									bgcolor: 'major.light',
									color: 'general.main',
								}
							}}
						>
              HARD
						</Button>
					</Box>

					{/* Problem List Table for the round */}
					<Table
						rows={rowsProblems}
						columns={columnsProblems}
						hideFields={[]}
						// onRowClick={handleRowClick}
						additionalStyles={additionalStyles}
					/>
					<Toolbar />
				</Stack>
			</Box>
		</Stack>
	);
};

export default ViewAllProblemsPage;