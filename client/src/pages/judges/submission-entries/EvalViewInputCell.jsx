/* eslint-disable */ 
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";
import { useGridApiContext } from "@mui/x-data-grid";

export default function renderEval(props) {
	const apiRef = useGridApiContext();

	// console.log(props)
	return (
		<DropdownSelect
			readOnly
			variant="standard"
			minWidth="100%"
			options={optionsEval}
			isDisabled={props.row.hasFileDownloaded ? false : true}
			value={props.value}
			onClick={()=>{
				apiRef.current.startCellEditMode({id: props.id, field: props.field});
			}}
		/>
	);
}