import AuthService from '../../core/services/AuthService';

const DEFAULT_STATE = {
	isUserLoggedIn: AuthService.isUserLoggedIn(),
	loginPending: false
};

export default function(state = DEFAULT_STATE, action) {

	if (action.type === 'USER_LOGIN_PENDING') {
		return {
			...state,
			loginPending: true
		};
	};

	if (action.type === 'USER_LOGIN_SUCCESS') {
		return {
			...state,
			isUserLoggedIn: action.payload,
			loginPending: false
		};
	};

	if (action.type === 'USER_LOGIN_ERROR') {
		return {
			...state,
			loginPending: false
		};
	};

	if (action.type === 'USER_LOGOUT') {
		return {
			...state,
			isUserLoggedIn: false
		};
	};

	return state;
}