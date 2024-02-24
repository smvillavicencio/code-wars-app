/* eslint-disable */ 
import {
	useMemo,
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
	optionsTeam,
	optionsProblems,
	// rowsSubmissions,
	rowsLeaderboard
} from 'utils/dummyData';

import renderEval from './submission-entries/EvalViewInputCell';
import EvalEditInputCell from './submission-entries/EvalEditInputCell';
import Loading from 'components/widgets/screen-overlays/Loading';
import { socketClient } from 'socket/socket';

import { baseURL } from 'utils/constants';
import { getFetch } from 'utils/apiRequest';

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

	const [fetchAllPrevious, setFetchAllPrevious] = useState(false);
	const [submissionsList, setSubmissionsList] = useState([]);

	// default values are given to make the component a controlled component
	// state handler for team dropdown select
	const [selectedTeam, setSelectedTeam] = useState('');
	// state handler for problem dropdown select
	const [selectedProblem, setSelectedProblem] = useState('');

	const handleDownload = (e, params) => {
		e.preventDefault();
		console.log(params);
		downloadFile(params.row.uploadedFile, params.row.content);

		params.row.hasFileDownloaded = true;
	}

	const downloadFile = (filename, data) => {
		const blob = new Blob([data]);
		// if(window.navigator.msSaveOrOpenBlob) {
		// 	window.navigator.msSaveBlob(blob, filename);
		// }
		// else{
			const elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = filename;      
			elem.style.display = 'none';  
			document.body.appendChild(elem);
			elem.click();        
			document.body.removeChild(elem);
			window.URL.revokeObjectURL(elem.href);
		//}
	}

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
							onClick={(e) => {handleDownload(e, params)}}
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

	const handleSocket = () => {
		
		if (!socketClient) {
			console.log("There is a problem with the socketClient")
			return;
		} else {
			console.log("socketClient is present")
		}

		socketClient.on('newitemtojudge', (arg)=>{
			// console.log("NEW SUBMISSION");
			console.log(arg);

			let newsubmission = {};
			newsubmission.id = arg._id;
			newsubmission.teamName = arg.team_name;
			newsubmission.problemTitle = arg.problem_title;
			newsubmission.submittedAt = new Date(arg.timestamp).toLocaleString();
			newsubmission.uploadedFile = arg.filename;
			newsubmission.evaluation = arg.evaluation;
			newsubmission.checkedBy = arg.judge_name;
			newsubmission.content = arg.content;

			let newSubmissionsList = [];

			let present = false;
			submissionsList?.map((submission)=>{
				if (submission.id == newsubmission.id) {
					present = true;
				} else {
					newSubmissionsList.push(submission);
				}
			});
			newSubmissionsList.push(newsubmission);

			if (!present) {
				setSubmissionsList(newSubmissionsList);
			}
		});   
  
		return () => {
			socketClient.off('newitemtojudge');
		};

    }; 

	const getSubmissions = async () => {
		const submissions = await getFetch(`${baseURL}/getallsubmissions`,);

		let allSubmissionsList = [];

		submissions.results?.map((arg) => {
			let newsubmission = {};

			newsubmission.id = arg._id;
			newsubmission.teamName = arg.team_name;
			newsubmission.problemTitle = arg.problem_title;
			newsubmission.submittedAt = new Date(arg.timestamp).toLocaleString();
			newsubmission.uploadedFile = arg.filename;
			newsubmission.evaluation = arg.evaluation;
			newsubmission.checkedBy = arg.judge_name;
			newsubmission.content = arg.content;
			newsubmission.possible_points = arg.possible_points;


			allSubmissionsList.push(newsubmission);
		});

		setSubmissionsList(allSubmissionsList);
		setFetchAllPrevious(true);
	}

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


		if (fetchAllPrevious) {
			handleSocket();
		} else {
			getSubmissions();
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
					rows={getFilteredRows(submissionsList)}// useMemo(() => {return getFilteredRows(rowsSubmissions)}, [selectedTeam, selectedProblem] ) // Replaced original for now due to error happening when # of hooks used change between renders
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
					initialState={{
						pagination: { paginationModel: { pageSize: 5 } },
						sorting: {
							sortModel: [{ field: 'score', sort: 'desc' }],
						},
					}}
				/>
			</CustomModal>
		</Box> : <Loading />
		}
		</>
	);
};

export default ViewSubmissionsPage;