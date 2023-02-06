import axios from 'axios';
import { toast } from 'react-toastify';
import history from '../../../utils/history';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 1000,
  draggable: false,
});

export const loginWithEmail = (email, password, callback) => dispatch => {
  axios
    .post('/v1/auth/login', {
      email,
      password,
    })
    .then(response => {
      if (response.data.status) {
        dispatch({
          type: 'LOGIN_WITH_EMAIL',
          payload: { status: response.data.status },
        });
        callback(true);
        history.push(`/`);
      } else {
        callback(true);
        toast.error('Wrong Credentails. Please try again.', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          draggable: false,
        });
      }
    })
    .catch(() => {
      callback(true);
      toast.error('Wrong Credentails. Please try again.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        draggable: false,
      });
    });
};

export const userRegister = (data, callback) => dispatch => {
  axios
    .post('/v1/users/registration', {
      data,
    })
    .then(response => {
      if (response.data.status) {
        dispatch({
          type: 'CREATE_USER',
          payload: { status: response.data.status },
        });
        toast.success('You are registered successfully.', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          draggable: false,
        });
        callback(true);
        history.push(`/`);
      } else {
        callback(true);
        toast.error('Something went wrong.', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          draggable: false,
        });
      }
    })
    .catch(() => {
      callback(true);
      toast.error('Something went wrong.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        draggable: false,
      });
    });
};

export const logout = () => dispatch => {
  axios.post('/v1/auth/logout').then(response => {
    if (response.data.status) {
      dispatch({ type: 'LOGOUT' });
      dispatch({ type: 'CLEAR_DISTRIBUTOR' });
      history.push(`/login`);
    }
  });
};

export const validateAccess = () => dispatch => {
  if (getCookie('session')) {
    axios.post('/v1/auth/validateAccess').then(response => {
      if (response.data.result === true) {
        console.log('response', response);
        dispatch({
          type: 'CHANGE_ROLE',
          userRole: response.data.user.role,
          loggedInUser: response.data.user,
        });
      }
      if (!response.data.result) {
        history.push(`/login`);
      }
    });
  } else {
    history.push(`/login`);
  }
};

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = document.cookie.split(';');

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i += 1) {
    const cookiePair = cookieArr[i].split('=');

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
