import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 1000,
  draggable: false,
});

export const getQuestions = () => dispatch => {
  axios
    .get('/v1/data/question')
    .then(response => {
      dispatch({
        type: 'GET_QUESTIONS',
        payload: response.data,
      });
    })
    .catch(error => {
      toast.error('Something Went Wrong. Please try again.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        draggable: false,
      });
    });
};

export const createSurvey = (data, callback) => dispatch => {
  if (data.question && data.question.length > 0) {
    axios
      .post('/v1/data/create', data)
      .then(response => {
        console.log('response', response.status);
        if (response.status == 201) {
          dispatch({
            type: 'CREATE_SURVEY',
            payload: { status: response.data },
          });
          toast.success(response.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            draggable: false,
          });
          callback(true);
          history.push(`/`);
        } else {
          callback(true);
          toast.error('Something went wrong', {
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
  } else {
    toast.error('Please select atleast one question', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      draggable: false,
    });
  }
};

export const getSurveys = () => dispatch => {
  axios
    .get('/v1/data/survey')
    .then(response => {
      dispatch({
        type: 'GET_SURVEY',
        payload: response.data,
      });
    })
    .catch(error => {
      toast.error('Something Went Wrong. Please try again.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        draggable: false,
      });
    });
};

export const changeFormStatus = (data, callback) => dispatch => {
  if (data && data.id) {
    axios
      .put('/v1/data/update', data)
      .then(response => {
        if (response.data.result == true) {
          callback(true);
          dispatch({
            type: 'CHANGE_STATUS',
            statusChanged: true,
          });
          getSurveys();
          toast.success('Status updated', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            draggable: false,
          });
        } else {
          callback(false);
          dispatch({
            type: 'CHANGE_STATUS',
            statusChanged: false,
          });
        }
      })
      .catch(error => {
        callback(true);
        dispatch({
          type: 'CHANGE_STATUS',
          statusChanged: false,
        });
        toast.error(error.response.data.error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          draggable: false,
        });
      });
  }
};
