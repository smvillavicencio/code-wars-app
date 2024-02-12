import Swal from 'sweetalert2';

/**
 * Purpose: Displays a popup window showing a success message/that the action is successful.
 * Params: None
 */
const SuccessWindow = Swal.mixin({
	icon: 'success',
	title: 'Success',
	background: '#fff',
	showCloseButton: true,
	showConfirmButton: false,
	focusConfirm: false,
});

export default SuccessWindow;