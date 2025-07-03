import swal from 'sweetalert';
import { useLocation } from 'wouter';
import showToast from './Toast';

const useQuestionAlert = () => {
  const [, navigate] = useLocation();

  const showAlert = () => {
    swal({
      title: "Are you sure?",
      text: "Once you logout, you will need to login again.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        showToast("You are logged out successfully");
        localStorage.removeItem('user');
        localStorage.removeItem('roomUser');
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate("/login");
        }, 2200);
      } else {
        showToast("You are still logged in", "info");
      }
    });
  };

  return showAlert;
};

export default useQuestionAlert;
