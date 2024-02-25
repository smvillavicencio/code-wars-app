/* eslint-disable */ 
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useGridApiContext } from "@mui/x-data-grid";
import { DropdownSelect } from "components";
import { optionsEval } from "utils/dummyData";
import EvaluationModal from "../modals/EvaluationModal";
import { ConfirmWindow, SuccessWindow } from "components";
import { socketClient } from "socket/socket";


export default function EvalEditInputCell(props) {
	const { id, value, field, hasFocus, row } = props.props;

	// initial state should be the same as the value held by view state
	const [currVal, setCurrVal] = useState(value);

	// for dropdown select
	const [isDisabled, setIsDisabled] = useState(!props.props.row.hasFileDownloaded);

	const [openModal, setOpenModal] = useState(false);
	const [correctTestCases, setCorrectTestCases] = useState(10);

	console.log(props.props)
	const apiRef = useGridApiContext();
	const ref = useRef()

	const handleChange = (event) => {
		setCurrVal(event.target.value);
		apiRef.current.setEditCellValue({ id, field, value: event.target.value });
		
	};

	useLayoutEffect(() => {
		if (hasFocus && ref.current) {
			ref.current.focus()
		}

	}, [hasFocus])
	

	useEffect(() => {
		if (currVal === "Partially Correct") {
			setOpenModal(true);

		} else if (currVal !== "Pending") {
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
				innerRef={ref}
				displayEmpty
				variant="standard"
				isDisabled={isDisabled}
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
					rowValues={row}
					correctCases={correctTestCases}
					setCorrectCases={setCorrectTestCases}
				/>
				: null
			}
		</>
	)
};