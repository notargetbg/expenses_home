import AuthService from '../../core/services/AuthService';
import API from '../../core/client';

// Todo: consider moving back to actionCreator which'll get dispatched inside catch...
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
					dispatch((getUserData()));
					dispatch((getUserDetails()));
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

export const userRegister = (email, password, passwordConfirmation) => {
	return dispatch => {
		dispatch({
			type: 'USER_REGISTER_PENDING'
		});

		return AuthService.register(email, password, passwordConfirmation)
			.then((res) => {
				dispatch({
					type: 'USER_REGISTER_SUCCESS'
				});
				dispatch(userLogin(email, password));
			})
			.catch(handleError(dispatch));
	};
};

export const getUserData = () => {
	return dispatch => {
		dispatch({
			type: 'GET_USER_DATA_PENDING'
		});

		Promise.all([
			API.getUserData('income'),
			API.getUserData('expenses'),
			API.getUserData('categories')
		])
			.then(res => Promise.all(res.map(r => r.json())))
			.then(res => {
				const userData = res.reduce((acc, item) => {
					return acc = {...acc, ...item};
				}, {});

				dispatch({
					type: 'GET_USER_DATA_SUCCESS',
					payload: userData
				});
			})
			.catch(handleError(dispatch));
	};
};

export const getUserDetails = () => {
	return dispatch => {
		dispatch({
			type: 'GET_USER_DETAILS_PENDING'
		});

		API.getUserDetails()
			.then(res => res.json())
			.then(res => {

				dispatch({
					type: 'GET_USER_DETAILS_SUCCESS',
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};