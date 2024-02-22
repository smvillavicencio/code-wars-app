/* eslint-disable */ 
import {
	useMemo,
	useRef,
	useState,
	useEffect
} from 'react';

import ViewListIcon from '@mui/icons-material/ViewList';
import {
	Box,
	MenuItem,
	Stack,
	Typography
} from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { Link, useNavigate } from 'react-router-dom';

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

import Loading from 'components/widgets/screen-overlays/Loading';


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


function renderEval(props) {
	// console.log(props)
	return (
		<DropdownSelect
			readOnly
			variant="standard"
			minWidth="100%"
			options={optionsEval}
			// isDisabled={true}
			value={props.formattedValue}
		/>
	);
}

function EvalEditInputCell(props) {
	const [currVal, setCurrVal] = useState('Default');

	const { id, formattedValue, field, hasFocus } = props;
	const apiRef = useGridApiContext();
	const ref = useRef();

	const handleChange = (event, newValue) => {
		setCurrVal(event.target.value);
    apiRef.current.setEditCellValue({ id, field, formattedValue: currVal });
	};
	
	useEnhancedEffect(() => {
		if (hasFocus && ref.current) {
      const input = ref.current.querySelector(`input[value="${currVal}"]`);
      input?.focus();
    }
	}, [hasFocus, currVal]);
	
	
	return (
		<DropdownSelect
			innerRef={ref} 
			displayEmpty
			variant="standard"
			// isDisabled={true}
			minWidth="100%"
			options={optionsEval}
			handleChange={handleChange}
			value={currVal}
		> 
			<MenuItem value="">Default</MenuItem>
		</DropdownSelect>
	)
};

const renderEvalEditInputCell = (params) => {
  return <EvalEditInputCell props={params} />;
};

/**
 * Purpose: Displays the View Submissions Page for judges.
 * Params: None
 */
const ViewSubmissionsPage = ({
	isLoggedIn,
	setIsLoggedIn,
	checkIfLoggedIn
}) => {
	// state handler for overall leaderboard modal
	const [open, setOpen] = useState(false);

	// default values are given to make the component a controlled component
	// state handler for team dropdown select
	const [selectedTeam, setSelectedTeam] = useState('');
	// state handler for problem dropdown select
	const [selectedProblem, setSelectedProblem] = useState('');


	// adding dropdown selects for evaluation column of submission table
	const modifiedSubmissionColumns = columnsSubmissions.map((obj) => {
		if (obj.field === 'evaluation') {
			return {
				...obj,
				renderEditCell: renderEvalEditInputCell,
				renderCell: renderEval,
				// console.log(params.row.uploadedFile)
			};
		}
		if (obj.field === 'uploadedFile') {
			return {
				...obj,
				renderCell: (params) => {
					return (
						<Link
							target="_blank"
							download
							// onClick={handleDownload}
							// to={'/'}
						>
							{params.value}
						</Link>
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

	// used for client-side routing to other pages
	const navigate = useNavigate();

	useEffect(() => { 
		let usertype = JSON.parse(localStorage?.getItem("user"))?.usertype;
		if (usertype == "participant") {
			navigate('/participant/view-all-problems');
		}
		else if (usertype == "admin") {
			navigate('/admin/general');
		}
		else if (usertype == "judge") {
			checkIfLoggedIn();	
		}
		else {
			setIsLoggedIn(false);
		}
		
	}, []);

	return (
		<>
		{ isLoggedIn ?
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
						variant="filled"
						options={optionsTeam}
						handleChange={handleTeams}
						value={selectedTeam}
					>
						{/* Empty Value */}
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
					</DropdownSelect>
					<DropdownSelect
						isDisabled={false}
						minWidth="35%"
						variant="filled"
						label="Problem Title"
						options={optionsProblems}
						handleChange={handleProblems}
						value={selectedProblem}
					>
						{/* Empty Value */}
						<MenuItem value="">
							<em>All</em>
						</MenuItem>
					</DropdownSelect>
				</Box>

				{/* Submission Entry Table */}
				<Table
					rows={getFilteredRows(rowsSubmissions)}// useMemo(() => {return getFilteredRows(rowsSubmissions)}, [selectedTeam, selectedProblem] ) // Replaced original for now due to error happening when # of hooks used change between renders
					columns={modifiedSubmissionColumns}// useMemo(() => {return modifiedSubmissionColumns}, [] )
					hideFields={[]}
					additionalStyles={additionalStylesSubmissions}
					density={"comfortable"}
					columnHeaderHeight={45}
					pageSizeOptions={[5, 8]}
					autoHeight
					initialState={{
						pagination: { paginationModel: { pageSize: 8 } },
					}}
					// processRowUpdate={processRowUpdate}

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
					editMode="row" 
					rows={rowsLeaderboard}
					columns={columnsLeaderboard}
					hideFields={['id', 'totalSpent']}
					additionalStyles={additionalStylesLeaderboard}
					pageSize={5}
					// processRowUpdate={(updatedRow, originalRow) =>
					// 	mySaveOnServerFunction(updatedRow);
					// }
					// onProcessRowUpdateError={handleProcessRowUpdateError}
					// isCellEditable={(params) => console.log(params)}
					initialState={{
						pagination: { paginationModel: { pageSize: 5 } },
					}}
				/>
			</CustomModal>
		</Box> : <Loading />
		}
		</>
	);
};

export default ViewSubmissionsPage;