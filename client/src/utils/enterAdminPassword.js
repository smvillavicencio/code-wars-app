import { ConfirmWindow } from 'components';
import { postFetch } from './apiRequest';
import { baseURL } from './constants';


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

	let passwordVerify = async (pw) => {
		// admin login POST request
		const loginResponse = await postFetch(`${baseURL}/login`, {
			username: 'Admin1',
			password: pw
		});

		if (!loginResponse.success) {
			return false;
		} else {
			return true;
		}
	};

	if (formValues) {
		return passwordVerify(formValues[0]);
	}
};

