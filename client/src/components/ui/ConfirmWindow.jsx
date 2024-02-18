import Swal from 'sweetalert2';

/**
 * Purpose: Displays a popup window showing an error message/that the action is invalid
 * Params: None
 */
const ConfirmWindow = Swal.mixin({
	icon: 'warning',
	confirmButtonColor: '#395395',
	cancelButtonColor: '#8d2544',
	showCancelButton: true,
	focusConfirm: false,
});

export default ConfirmWindow;
