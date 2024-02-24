/* eslint-disable */ 
import { ToastContainer } from "react-toastify";

const ToastContainerConfig = () => {
  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      closeButton={false}
      theme="dark"
    />
  )
};

export default ToastContainerConfig;

