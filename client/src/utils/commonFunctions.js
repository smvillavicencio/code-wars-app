/* eslint-disable */
import { ConfirmWindow } from "components/";
import { socketClient } from "socket/socket";
import Cookies from "universal-cookie";

/*
 * Purpose: Handles termination of user session.
 * Params: None
 */
const handleLogout = (navigate) => {
  // fire success window
  ConfirmWindow.fire({
    text: "Are you sure you want to log out?",
  }).then((res) => {
    if (res["isConfirmed"]) {
      socketClient.emit("logout");

      localStorage.removeItem("user");
      navigate("/");

      // Delete cookie with authToken
      const cookies = new Cookies();
      cookies.remove("authToken");
    } else {
      return;
    }
  });
};

export { handleLogout };
