import { combineReducers } from 'redux';
import { login } from './loginReducer';
import { survey } from './surveyReducers';

const authReducers = combineReducers({
  login,
  survey,
});

export default authReducers;
