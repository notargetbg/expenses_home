import AuthService from '../../core/services/AuthService';

const DEFAULT_STATE = {
	isUserLoggedIn: AuthService.isUserLoggedIn(),
	loginPending: false,
	registerPending: false,
	error: null
};

export default function(state = DEFAULT_STATE, action) {
	// REGISTER
	if (action.type === 'USER_REGISTER_PENDING') {
		return {
			...state,
			registerPending: true
		};
	}

	if (action.type === 'USER_REGISTER_SUCCESS') {
		return {
			...state,
			registerPending: false
		};
	}

	// LOGIN
	if (action.type === 'USER_LOGIN_PENDING') {
		return {
			...state,
			loginPending: true
		};
	}

	if (action.type === 'USER_LOGIN_SUCCESS') {
		return {
			...state,
			isUserLoggedIn: action.payload,
			loginPending: false,
			error: null
		};
	}

	// LOGOUT

	if (action.type === 'USER_LOGOUT') {
		return {
			...state,
			isUserLoggedIn: false
		};
	}

	// USER DETAILS

	if (action.type === 'GET_USER_DETAILS_SUCCESS') {
		return {
			...state,
			...action.payload
		};
	}

	// ERROR HANDLER
	if (action.type === 'USER_ERROR') {
		return {
			...state,
			loginPending: false,
			registerPending: false,
			error: action.payload
		};
	}

	if (action.type === 'CLEAR_ERROR') {
		return {
			...state,
			error: null
		};
	}

	return state;
}
