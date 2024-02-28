/* eslint-disable */ 
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";
import { useGridApiContext } from "@mui/x-data-grid";


export default function renderEval(props) {
	const apiRef = useGridApiContext();

	// console.log("Downloaded?", props.row.hasFileDownloaded)
	return (
		<DropdownSelect
			readOnly
			variant="standard"
			minWidth="100%"
			options={optionsEval}
			isDisabled={props.row.isDisabled}
			value={props.value}
			onClick={() => {
				if (props.row.hasOwnProperty("isDisabled") && !props.row.isDisabled) {
					apiRef.current.startCellEditMode({id: props.id, field: props.field});
				}
			}}
		/>
	);
}