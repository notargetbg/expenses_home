import AuthService from '../../core/services/AuthService';

function handleError(dispatch) {
	return err => {
		console.log('Error:', err);
		dispatch({
			type: 'USER_ERROR',
			payload: err
		});
	};
}

export const clearError = () => {
	return {
		type: 'CLEAR_ERROR'
	};
};

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
			.then(res => {
				AuthService.saveToken(res.token);

				if (AuthService.isUserLoggedIn()) {
					dispatch({
						type: 'USER_LOGIN_SUCCESS',
						payload: true
					});
				}
			})
			.catch(handleError(dispatch));
	};
};

export const userLogout = () => {
	AuthService.logout();

	return {
		type: 'USER_LOGOUT'
	};
};

export const userRegister = (email, password) => {
	return dispatch => {
		dispatch({
			type: 'USER_REGISTER_PENDING'
		});

		return AuthService.register(email, password)
			.then((res) => {
				dispatch({
					type: 'USER_REGISTER_SUCCESS'
				});
				dispatch(userLogin(email, password));
			})
			.catch(handleError(dispatch));
	};
};