import Swal from 'sweetalert2';

export const enterAdminPassword = async ({ title }) => {
	// Swal with two textfields and a prompt to copy
	const { value: formValues } = await Swal.fire({
		icon: 'warning',
		title: `${title}`,
		confirmButtonColor: '#395395',
		cancelButtonColor: '#8d2544',
		showCancelButton: true,
		focusConfirm: false,

		html:
			'<style>{cssStyles}</style>' +
			'<p> Enter admin password to confirm action:</p> ' +
			'<input id="swal-input1" class="swal2-input" type="password" placeholder="Enter password">',
		
		preConfirm: () => {
			return [
				document.getElementById('swal-input1').value,
			];
		}
	});

	// replace with post request verify admin password here
	// pwede siguro parang admin login lang din
	let passwordVerify = (pw) => {
		if (pw == 'admin') {
			return true;
		} else {
			return false;
		}
	};

	if (formValues) {
		return passwordVerify(formValues[0]);
	}
};

