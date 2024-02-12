import Swal from 'sweetalert2';

const SuccessWindow = Swal.mixin({
	icon: 'success',
	title: 'Success',
	background: '#fff',
	showCloseButton: true,
	showConfirmButton: false,
	focusConfirm: false,
});

export default SuccessWindow;