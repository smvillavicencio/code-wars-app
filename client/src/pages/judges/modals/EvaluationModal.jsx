/* eslint-disable */ 
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { CustomModal } from 'components';


/**
 * Purpose: Displays a modal window that takes in the number of test cases passed for a particular submission entry.
 * Params:
 * 		<Boolean>		open - tells whether to open the modal
 *    <Function>  setOpen - function to control modal opening/closing
 */
const EvaluationModal = ({ open, setOpen }) => {
	// state handler for input field value
	const [value, setValue] = useState('');
	// state handler for first-time focusing on input field
	const [firstClick, setFirstClick] = useState(true);
	
	/**
	 * Purpose: Closes the modal window
	 */
	const handleCancel = () => {
		setOpen(false);
	}

	/**
	 * Purpose: Submits the value.
	 */
	const handleSubmit = () => { 
		// pass value to parent component? to edit row value
		console.log(value);
	}

	/**
	 * Purpose: Handles change in input field
	 */
	const handleChange = (e) => {
		setValue(e.target.value);
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
					error={value === ''}
					value={value}
					onChange={handleChange}
					onFocus={() => setFirstClick(false)}
					InputLabelProps={{ shrink: true }}
					
					type="number"
					defaultValue="0"
					variant="standard"
					label="# of Test Cases Passed:"
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
						type='submit'
						size="large"
						disabled={value === ''}
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