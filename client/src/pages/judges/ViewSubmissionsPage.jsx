/* eslint-disable */ 
import { useState } from 'react';

import ViewListIcon from '@mui/icons-material/ViewList';
import {
	Box,
	Stack,
	Typography
} from '@mui/material';

import seal from 'assets/UPLB COSS.png';
import {
	CustomModal,
	DropdownSelect,
	Table,
	TopBar
} from 'components/';

import {
	columnsSubmissions,
	columnsLeaderboard,
	optionsEval,
	optionsTeam,
	optionsProblems,
	rowsSubmissions,
	rowsLeaderboard
} from 'utils/dummyData';


// Styling for Leaderboard table
const additionalStylesLeaderboard = {
	// modify column header typography
	'& .MuiDataGrid-columnHeader': {
		bgcolor: "rgba(0, 0, 0, 0.1)",
	},
	bgcolor: 'transparent',
	border: 'none',
	padding: 2,
}

// Styling for Submissions table
const additionalStylesSubmissions = {
	backgroundColor: '#fff',
	paddingX: 2,
}



/**
 * Purpose: Displays the View Submissions Page for judges.
 * Params: None
 */
const ViewSubmissionsPage = () => {
	// state handler for overall leaderboard modal
	const [open, setOpen] = useState(false);

	// default values are given to make the component a controlled component
	// state handler for team dropdown select
	const [selectedTeam, setSelectedTeam] = useState('');
	// state handler for problem dropdown select
	const [selectedProblem, setSelectedProblem] = useState('');
	// state handler for evaluation dropdown select
	const [evaluation, setEvaluation] = useState('');


	// adding dropdown selects for evaluation column of submission table
	const modifiedSubmissionColumns = columnsSubmissions.map((obj) => {
    if (obj.field === 'evaluation') {
			return {
				...obj,
				renderCell: (params) => {
					return (
						<DropdownSelect
							isDisabled={true}
							minWidth="100%"
							label="Evaluation"
							options={optionsEval}
							handleChange={handleEvaluation}
							value={evaluation}
							// style={{paddingY: 2}}
						/>
					);
				}
			};
    }
    return obj;
	});

	/**
	* Purpose: Handles opening of modal window for overall leaderboard.
	*/
	const handleButton = () => {
		setOpen(true);
	}

	/**
	* Purpose: Sets state of selectedTeam for filtering.
	*/
	const handleTeams = (e) => {
		setSelectedTeam(e.target.value);
	}

	/**
	* Purpose: Sets state of selectedProblem for filtering.
	*/
	const handleProblems = (e) => {
		setSelectedProblem(e.target.value);
	}
	
	/**
	* Purpose: Sets state of selectedEvaluation.
	*/
	const handleEvaluation = (e) => {
		setEvaluation(e.target.value);
	}

	/**
	* Purpose: Client-side filtering based on values from the dropdown selects.
  * will be replaced if magkakaron ng server-side filtering
	*/
	const getFilteredRows = (rowsSubmissions) => {
		// will hold the filtered rows
		let temp = [];
		let temp2 = [];

		if (selectedTeam === '' & selectedProblem === '') return rowsSubmissions;

		// Filter out rows based on selectedTeam
		if (selectedTeam != '') {
			rowsSubmissions.filter((row) => {
				// if entry is submitted by selectedTeam
				if (row.teamName === selectedTeam) {
					// If matched row is not yet in temp, push to temp
					if (!temp.find(obj => obj.id === row.id)) {
						temp.push(row);
					};
				}
			})
		}
		
		if (selectedProblem != '') {
			// if there is a selectedTeam, filter based on temp, not on rowsSubmissions
			if (temp.length > 0) {
				temp.filter((row) => {
					// if problemTitle matches selectedProblem
					if (row.problemTitle === selectedProblem) {
						// If matched row is not yet in temp2, push to temp
						if (!temp2.find(obj => obj.id === row.id)) {
							temp2.push(row);
						};
					}
				})
				return temp2;
			
			// if there is no selected team
			} else {
				rowsSubmissions.filter((row) => {
					// if problemTitle matches selectedProblem
					if (row.problemTitle === selectedProblem) {
						// If matched row is not yet in temp2, push to temp
						if (!temp.find(obj => obj.id === row.id)) {
							temp.push(row);
						};
					}
				})
				return temp;
			}
		}
		return temp;
	}


	return (
		<Box>
			<TopBar
				isImg={true}
				icon={seal}
				title="Code Wars"
				subtitle="UPLB Computer Science Society"
				buttonText="VIEW LEADERBOARD"
				startIcon={<ViewListIcon />}
				handleButton={handleButton}
			/>
			
			<Stack spacing={5} sx={{ mt: 5, mx: 15 }} >
				
				{/* Dropdown selects for team name and problem title */}
				<Box sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 5,
				}}>
					<DropdownSelect
						isDisabled={false}
						label="Team Name"
						minWidth="20%"
						options={optionsTeam}
						handleChange={handleTeams}
						value={selectedTeam}
					/>
					<DropdownSelect
						isDisabled={false}
						minWidth="35%"
						label="Problem Title"
						options={optionsProblems}
						handleChange={handleProblems}
						value={selectedProblem}
					/>
				</Box>

				{/* Submission Entry Table */}
				<Table
					rows={getFilteredRows(rowsSubmissions)}
					columns={modifiedSubmissionColumns}
					hideFields={[]}
					additionalStyles={additionalStylesSubmissions}
					density={"comfortable"}
					columnHeaderHeight={45}
					pageSizeOptions={[5, 8]}
					autoHeight
					initialState={{
						pagination: { paginationModel: { pageSize: 8 } },
					}}
					// if there are no submission entries yet
					slots={{
						noRowsOverlay: () => (
							<Stack height="100%" alignItems="center" justifyContent="center">
								<Typography><em>No records to display.</em></Typography>
							</Stack>
						)
					}}
				/>
			</Stack>

			{/* Overall Leaderboard Modal Window */}
			<CustomModal isOpen={open} setOpen={setOpen} windowTitle="Leaderboard">
				<Table
					rows={rowsLeaderboard}
					columns={columnsLeaderboard}
					hideFields={['id', 'totalSpent']}
					additionalStyles={additionalStylesLeaderboard}
					pageSize={5}
					initialState={{
						pagination: { paginationModel: { pageSize: 5 } },
					}}
				/>
			</CustomModal>
		</Box>
	);
};

export default ViewSubmissionsPage;