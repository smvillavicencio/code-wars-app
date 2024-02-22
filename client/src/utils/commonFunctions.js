/* eslint-disable */
import { ConfirmWindow } from 'components/';
import Cookies from "universal-cookie";

/*
  * Purpose: Handles termination of user session.
  * Params: None
  */
const handleLogout = (setUserDetails, navigate) => {

    // fire success window
    ConfirmWindow.fire({
    text: 'Are you sure you want to log out?',
        }).then((res) => {
            if (res['isConfirmed']) {
                localStorage.removeItem("user");
                setUserDetails(null);
                navigate('/');

                // Delete cookie with authToken
                const cookies = new Cookies();
                cookies.remove("authToken");
            } else {
                return;
            }
        })
    };

export { handleLogout };