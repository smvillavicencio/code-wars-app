import { useState } from 'react';
import {
  Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';


const DropdownSelect = ({
  isDisabled,
  label,
  minWidth,
  options
}) => {
  const [selected, setSelected] = useState('');

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
        <InputLabel id="demo-simple-select-label" sx={{
          '.MuiInputLabel-root': {
            color: '#fff',
          }
        }}>{label}</InputLabel>
        <Select
          // blurOnSelect
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
          {options.map((option, idx) => 
            <MenuItem id={idx} value={option}>{option}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>  
  )
};

export default DropdownSelect;