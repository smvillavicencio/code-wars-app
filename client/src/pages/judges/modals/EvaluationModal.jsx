/* eslint-disable */ 
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { CustomModal } from 'components';
import { socketClient } from 'socket/socket';
import { ConfirmWindow, SuccessWindow, ErrorWindow } from 'components';
import { useGridApiContext } from "@mui/x-data-grid";
import { cloneDeep } from 'lodash';
import { baseURL } from 'utils/constants';
import { postFetch } from 'utils/apiRequest';

/**
 * Purpose: Displays a modal window that takes in the number of test cases passed for a particular submission entry.
 * Params:
 * 		<Boolean>		open - tells whether to open the modal
 *    <Function>  setOpen - function to control modal opening/closing
 */
const EvaluationModal = ({
	open,
	setOpen,
	currEval,
	correctCases,
	rowValues,
	setCorrectCases,
	submissionsList,
	setSubmissionsList,
	subListRef,
	id,
	field,
	setCurrVal,
	totalCases
}) => {
	// state handler for first-time focusing on input field
	const [firstClick, setFirstClick] = useState(true);

	const apiRef = useGridApiContext();
	
	/**
	 * Purpose: Closes the modal window
	 */
	const handleCancel = () => {
		setCurrVal("Pending");

		var copy = cloneDeep(submissionsList);
		setSubmissionsList(copy);
		subListRef.current = copy;

		apiRef.current.setEditCellValue({ id, field, value: "Pending" });

		console.log(rowValues);
		setOpen(false);
	}

	/**
	 * Handles onClick event for submit button
	 */
	const handleSubmit = () => {
		setOpen(false); 

		if (correctCases <= 0 || correctCases >= totalCases) {
			ErrorWindow.fire({
				text: 'There is a problem with the set number of correct cases.'
			});

			setCurrVal("Pending");

			var copy = cloneDeep(submissionsList);
			setSubmissionsList(copy);
			subListRef.current = copy;

			apiRef.current.setEditCellValue({ id, field, value: "Pending" });
		}
		else {
			// ask for confirmation of action
			ConfirmWindow.fire({
				text: 'Are you sure you want to choose Partially Correct (' + `${correctCases} of ${totalCases}` + ') as the evaluation?'
			}).then((res) => {

				// get judge user details
				let judgeID = JSON.parse(localStorage?.getItem("user"))?._id;
				let judgeName = JSON.parse(localStorage?.getItem("user"))?.username;

				if (res['isConfirmed']) {
			
					// websocket emit
					// socketClient.emit("submitEval", {
					// 	submissionId: rowValues.dbId,
					// 	evaluation: currEval,
					// 	judgeId: judgeID,
					// 	judgeName: judgeName,
					// 	correctCases: correctCases,
					// 	possiblePoints: rowValues.possible_points
					// })
					const eResponse = postFetch(`${baseURL}/checksubmission`, {
						submissionId: rowValues.dbId,
						evaluation: currEval,
						judgeId: judgeID,
						judgeName: judgeName,
						correctCases: correctCases,
						possiblePoints: rowValues.possible_points
					})

					var copy = cloneDeep(submissionsList);

					copy.map((submission)=>{
						if (rowValues.dbId == submission.dbId) {
							submission.evaluation = currEval;
							submission.checkedBy = judgeName;
						}
					});

					setSubmissionsList(copy);
					subListRef.current = copy;

					// close modal window
					setOpen(false);

					// show confirmation window
					SuccessWindow.fire({
						text: 'Successfully submitted evaluation!'
					});
				}
				if (res['isDismissed']) {
					setCurrVal("Pending");

					var copy = cloneDeep(submissionsList);
					setSubmissionsList(copy);
					subListRef.current = copy;

					apiRef.current.setEditCellValue({ id, field, value: "Pending" });
				}
			});
		}

		
	}


	return (
		<CustomModal
			isOpen={open}
			setOpen={setOpen}
			windowTitle="Test Case Evaluation"
		>
			{/* Container for modal body */}
			<Box
				component="form"
				noValidate
        autoComplete="off"
        sx={{ maxWidth: '100%', marginTop: '25px' }}
			>
				{/* Instruction text */}
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          Please enter the number of test cases passed for this particular submission entry.
				</Typography>
				
				{/* Input field */}
				<TextField
					required
					fullWidth
					error={correctCases === ''}
					//value={correctCases-1}
					onChange={(e) => {
						let currCorr = e.target.value;
						console.log(currCorr)
						try {
							setCorrectCases(parseInt(e.target.value));
						} catch (error) {
							setCorrectCases(0);
						}
						
					}}
					onFocus={() => setFirstClick(false)}
					InputLabelProps={{ shrink: true }}
					InputProps={{
						inputProps: {
							min: 1,
							max: rowValues.totalCases-1
						}
					}}	
					type="number"
					variant="standard"
					label={"# of Test Cases Passed Out of "+totalCases+" Cases:"}
					helperText="Enter numeric values only."
        />
        
				{/* Buttons */}
				<Box sx={{
					gap: 3,
					float: 'right',
					display: 'flex',
					marginTop: '20px'
				}}>
					{/* Submit button */}
					<Button 
						variant='contained' 
						size="large"
						disabled={correctCases === ''}
						onClick={handleSubmit}
						sx={{
							bgcolor: 'primary',
							'&:disabled': {
								bgcolor: 'primary.light',
								color: '#fff'
							}
						}}
					>
						Submit
					</Button>
					
					{/* Cancel Button */}
					<Button 
						variant='contained'
						onClick={handleCancel}
						size="large"
						sx={{
							bgcolor: '#808080',
							'&:hover': {
								bgcolor: '#646464'
							}
						}}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</CustomModal>
	);
};

export default EvaluationModal;