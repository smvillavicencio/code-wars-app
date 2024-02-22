/* eslint-disable */ 
import { useState, useEffect } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
	Button,
	Box,
	Stack,
	Tooltip,
	Typography
} from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';

import seal from 'assets/UPLB COSS.png';
import {
	BuyPowerUpsPopover,
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
import Loading from 'components/widgets/screen-overlays/Loading';

import { baseURL } from 'utils/constants';
import { postFetch } from 'utils/apiRequest';

/*
 * Purpose: Displays the View All Problems Page for participants.
 * Params: None
 */
const ViewAllProblemsPage = ({
	isLoggedIn,
	setIsLoggedIn,
	checkIfLoggedIn
}) => {

	// State handler for current round
	const [currRound, setCurrRound] = useState('EASY');
	// State handler for viewing buy power-up popover
	const [open, setOpen] = useState(false);
	
	const rounds = ['EASY', 'MEDIUM', 'WAGER', 'HARD'];

	const [showBuffs, setShowBuffs] = useState(false);
	const [showDebuffs, setShowDebuffs] = useState(false);
	const [seeDetails, setSeeDetails] = useState(false);
	const [selectedPowerUp, setSelectedPowerUp] = useState(null);

	useEffect(() => {
		setIsLoggedIn(false);
		setSeeDetails(false);
		setShowBuffs(false);
		setShowDebuffs(false);
		setSelectedPowerUp(null);
		checkIfLoggedIn();
	}, []);

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
	const handleRowClick = (params) => {
		navigate({
			pathname: '/participant/view-specific-problem',
			search: createSearchParams(params.row).toString()
		});
	};

	/**
	 * Purpose: Handles opening of power-up popover.
	 */
	const handleViewPowerUps = (e) => {
		e.stopPropagation();
		setOpen(!open);
	};

	/**
	 * Purpose: Closes Buy Power-up Modal if user clicked outside the component.
	 */
	const handleClickAway = () => {
		setSeeDetails(false);
		setShowBuffs(false);
		setShowDebuffs(false);
		setSelectedPowerUp(null);
		setOpen(false);
	};

	return (
		<>
			{
				isLoggedIn ?
				<>
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
								height: '100%'
							}}
						>
							
							{/* Container for round buttons */}
							<Box sx={{ display: 'flex', gap: 3 }}>
								{rounds.map((round, idx) => 
									<Button
										key={idx}
										variant="contained"
										startIcon={currRound === round ? <LockOpenIcon/> : <LockIcon />}
										disabled={currRound === round ? false : true}
										size="large"
										sx={{
											fontFamily: 'Poppins',
											fontWeight: '600',
											minWidth: 125,
											gap: 0.5,
											bgcolor: 'major.main',
											'&:hover': {
												bgcolor: 'major.light',
												color: 'general.main',
											},
											'&:disabled': {
												bgcolor: 'major.light',
												color: '#fff'
											}
										}}
									>
										{round}
									</Button>
								)}
							</Box>

							{/* Problem List Table for the round */}
							<Table
								rows={rowsProblems}
								columns={columnsProblems}
								hideFields={[]}
								additionalStyles={additionalStyles}
								onRowClick={handleRowClick}
								pageSizeOptions={[5, 10]}
								autoHeight={true}
								pageSize={10}
								initialState={{
									pagination: { paginationModel: { pageSize: 10 } },
								}}
							/>
						</Stack>
					</Box>
					</Stack>
				
					{/* Buy Power-ups Popover */}
					<ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleClickAway}>
						{/* Wrapping button and popover in Box for clickaway ref */}
						<Box>
							<BuyPowerUpsPopover
								isOpen={open}
								setOpen={setOpen}
								buffsState={[showBuffs, setShowBuffs]}
								debuffsState={[showDebuffs, setShowDebuffs]}
								detailsState={[seeDetails, setSeeDetails]}
								powerUpState={[selectedPowerUp, setSelectedPowerUp]}
							/>
						</Box>
					</ClickAwayListener>
				</> : <Loading />
			}
		</>
	);
};

export default ViewAllProblemsPage;