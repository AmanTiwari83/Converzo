import { toast, Zoom } from 'react-toastify';

const showToast = (message, type = 'success') => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Zoom,
  });
};

export default showToast;