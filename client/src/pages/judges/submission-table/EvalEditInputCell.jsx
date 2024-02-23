/* eslint-disable */ 
import { useState, useEffect, useRef } from "react";
import { useGridApiContext } from "@mui/x-data-grid";
import { socketClient } from "socket/socket";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";
import { MenuItem } from "@mui/material";



const EvalEditInputCell = (props) => {
	const [currVal, setCurrVal] = useState('Default');

	const { id, formattedValue, field, hasFocus } = props;
	const apiRef = useGridApiContext();
	const ref = useRef();

	const handleChange = (event, newValue) => {
		setCurrVal(event.target.value);
    apiRef.current.setEditCellValue({ id, field, formattedValue: event.target.value });
    console.log("hereee") 

    // websocket
    socketClient.emit("submittedEval", (event.target.value))
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
			isDisabled={props.props.row?.hasFileDownloaded ? false : true}
			minWidth="100%"
			options={optionsEval}
			handleChange={handleChange}
			value={currVal}
		> 
			<MenuItem value="">Default</MenuItem>
		</DropdownSelect>
	)
};


export default EvalEditInputCell;