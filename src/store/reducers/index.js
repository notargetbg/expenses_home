import { combineReducers } from 'redux';
import user from './user';
import createUserDataReducer from './userData';

export const rootReducer = combineReducers({
	user,
	categories: createUserDataReducer('CATEGORIES'),
	income: createUserDataReducer('INCOME'),
	expenses: createUserDataReducer('EXPENSES')
});