import { useState, useRef } from "react";
import { useGridApiContext } from "@mui/x-data-grid";
import { MenuItem } from "@mui/material";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";


export default function EvalEditInputCell(props) {
	const [currVal, setCurrVal] = useState('Pending');

	const { id, formattedValue, field, hasFocus } = props;
	const apiRef = useGridApiContext();
	const ref = useRef();

	const handleChange = (event, newValue) => {
		setCurrVal(event.target.value);
		console.log(event.target.value);
    apiRef.current.setEditCellValue({ id, field, formattedValue: currVal });
	};
	
	useEnhancedEffect(() => {
		if (hasFocus && ref.current) {
      const input = ref.current.querySelector(`input[value="${currVal}"]`);
      input?.focus();
    }
	}, [hasFocus, currVal]);
	
	console.log(currVal);
	
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