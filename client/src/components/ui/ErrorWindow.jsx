import Swal from 'sweetalert2';

/**
 * Purpose: Displays a popup window showing an error message/that the action is invalid
 * Params: None
 */
const ErrorWindow = Swal.mixin({
	icon: 'error',
	background: '#fff',
	showCloseButton: true,
	showConfirmButton: false,
	focusConfirm: false,
});

export default ErrorWindow;
