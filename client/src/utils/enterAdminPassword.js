import { ConfirmWindow } from 'components';

/**
 * Purpose: Takes in the admin's password and verifies in the server if it is correct.
 * Params: <String> title - title for the confirmation window
 */
export const enterAdminPassword = async ({ title }) => {
	// Swal with two textfields and a prompt to copy
	const { value: formValues } = await ConfirmWindow.fire({
		title: `${title}`,
		html:
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

