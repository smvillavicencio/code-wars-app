/* eslint-disable */ 
import { useState } from 'react';
import {
  Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';


/*
 * Purpose: Displays a dropdown select component.
 * Params:
 *    <Boolean> isDisabled - tells whether the component should be disabled or not.
 *    <String>  label - label for the select component.
 *    <String>  minWidth - minimum width of the select component.
 *    <Array>   options - options to display in the component's menu.
 */
const DropdownSelect = ({
  isDisabled,
  label,
  minWidth,
  options
}) => {

  // state for the selected option
  const [selected, setSelected] = useState('');

  /*
  * Purpose: Updates the state for easier retrieval of the value of selected option.
  * Params:
  *    <Event> e - triggers when an option is selected from the dropdown menu.
  */
  const handleChange = (e) => {
    setSelected(e.target.value);
	};

  
  return (
    <Box sx={{ minWidth:`${minWidth}` }}>
      <FormControl
        fullWidth
        variant="filled"
        disabled={isDisabled}
      >
        {/* Label */}
        <InputLabel sx={{ '.MuiInputLabel-root': { color: '#fff' } }}>
          {label}
        </InputLabel>
        
        {/* Actual Component */}
        <Select
          // this function is for blurOnSelect
          onClose={() => {
            setTimeout(() => {
              document.activeElement.blur();
            }, 0);
          }}
          value={selected}
          label={label}
          onChange={handleChange}
          style={{ backgroundColor: '#fff' }}
        >
          {/* Menu popover options */}
          {options.map((option, idx) => 
            <MenuItem id={idx} value={option}>{option}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>  
  )
};

export default DropdownSelect;