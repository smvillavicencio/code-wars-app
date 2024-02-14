/* eslint-disable */ 
import { useState } from 'react';
import {
  Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';


/**
 * Purpose: Displays a dropdown select component.
 * Params:
 *    <Boolean>   isDisabled - tells whether the component should be disabled or not.
 *    <String>    label - label for the select component.
 *    <String>    minWidth - minimum width of the select component.
 *    <Array>     options - options to display in the component's menu.
 *    <String>    initial - sets default value for the select component
 *    <Function>  handleChange - handles change event for the component
 *    <String>    value - holds current selected value
 */
const DropdownSelect = ({
  isDisabled,
  label,
  minWidth,
  options,
  handleChange,
  value,
  variant,
  innerRef,
  ...props
}) => {

  return (
    <Box sx={{ minWidth:`${minWidth}` }}>
      <FormControl
        ref={innerRef}
        fullWidth
        variant={variant}
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
          value={value}
          label={label}
          onChange={handleChange}
          style={{ backgroundColor: '#fff' }}
          {...props}
        >
          {props.children}

          {/* Menu popover options */}
          {options.map((option, idx) => 
            <MenuItem key={idx} value={option}>{option}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>  
  )
};

export default DropdownSelect;