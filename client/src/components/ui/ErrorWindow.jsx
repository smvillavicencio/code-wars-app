import Swal from 'sweetalert2';

const ErrorWindow = Swal.mixin({
	icon: 'error',
	title: 'Invalid Password',
	text: 'Password is incorrect',
	background: '#fff',
	showCloseButton: true,
	showConfirmButton: false,
	focusConfirm: false,
});

export default ErrorWindow;
