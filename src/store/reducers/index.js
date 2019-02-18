import { combineReducers } from 'redux';
import user from './user';
import userData from './userData';

export default combineReducers({
	user,
	userData,
});