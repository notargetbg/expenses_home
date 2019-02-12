import AuthService from '../../core/services/AuthService';


export const testAction = data => {
	return {
		type: 'TEST_ACTION',
		payload: data
	};
};

export const test2 = () => {
	return (dispatch, getState) => {
		console.log(getState());
		dispatch(testAction(2));
	};
};

export const userLogin = (email, password) => {
	return dispatch => {
		dispatch({
			type: 'USER_LOGIN_PENDING'
		});

		return AuthService.login(email, password)
			.then(() => {
				if (AuthService.isUserLoggedIn()) {
					dispatch({
						type: 'USER_LOGIN_SUCCESS',
						payload: true
					});
				} else {
					dispatch({
						type: 'USER_LOGIN_ERROR'
					});
				}
			});
	};
};

export const userLogout = () => {
	AuthService.logout();

	return {
		type: 'USER_LOGOUT'
	};
};