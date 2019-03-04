import { combineReducers } from 'redux';
import user from './user';
import userData from './userData';

export const rootReducer = combineReducers({
	user,
	userData
});

export function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		} else {
			return state;
		}
	};
}