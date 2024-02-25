/* eslint-disable */ 
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";


export default function renderEval(props) {
	// console.log(props)
	return (
		<DropdownSelect
			readOnly
			variant="standard"
			minWidth="100%"
			options={optionsEval}
			isDisabled={props.row.hasFileDownloaded ? false : true}
			value={props.formattedValue}
		/>
	);
}