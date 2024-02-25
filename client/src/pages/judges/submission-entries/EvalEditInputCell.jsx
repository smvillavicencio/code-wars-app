/* eslint-disable */ 
import { useState, useEffect } from "react";
import { useGridApiContext } from "@mui/x-data-grid";
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";
import EvaluationModal from "../modals/EvaluationModal";
import { ConfirmWindow, SuccessWindow } from "components";
import { socketClient } from "socket/socket";


export default function EvalEditInputCell(props) {
	const [currVal, setCurrVal] = useState('Pending');
	const [openModal, setOpenModal] = useState(false);
	const [correctTestCases, setCorrectTestCases] = useState(10);

	const { id, formattedValue, field, hasFocus, row } = props.props;
	const apiRef = useGridApiContext();

	const handleChange = (event, newValue) => {
		setCurrVal(event.target.value);

		apiRef.current.setEditCellValue({ id, field, formattedValue: currVal });
	};
	

	useEffect(() => {
		if (currVal === "Partially Correct") {
			setOpenModal(true);
		} else if (currVal !== "Pending"){
			console.log(currVal);

			// ask for confirmation of action
			ConfirmWindow.fire({
				text: 'Are you sure you want to choose ' + `${currVal}` + ' as the evaluation?',
				
			}).then((res) => {
				let judgeID = JSON.parse(localStorage?.getItem("user"))?._id;
				let judgeName = JSON.parse(localStorage?.getItem("user"))?.username;
				
				if (res['isConfirmed']) {
					// websocket for judge evaluation
					socketClient.emit("submitEval", {
						submissionId: row.id,
						evaluation: currVal,
						judgeId: judgeID,
						judgeName: judgeName,
						correctCases: correctTestCases,
						possiblePoints: row.possible_points
					});

					SuccessWindow.fire({
						text: 'Successfully submitted evaluation!'
					});

				} 
			});
		}
	}, [currVal])
	

	return (
		<>
			<DropdownSelect
				displayEmpty
				variant="standard"
				isDisabled={props.props.row?.hasFileDownloaded ? false : true}
				minWidth="100%"
				options={optionsEval}
				handleChange={handleChange}
				value={currVal}
			/>

			{openModal ?
				<EvaluationModal
					open={openModal}
					setOpen={setOpenModal}
					currEval={currVal}
					value={correctTestCases}
					rowValues={row}
					handleValue={(n) => setCorrectTestCases(n)}
				/>
				: null
			}
		</>
	)
};