import AuthService from '../../core/services/AuthService';
import API from '../../core/client';
import * as actionTypes from './actionTypes';

// Todo: consider moving back to actionCreator which'll get dispatched inside catch...
function handleError(dispatch) {
	return err => {
		console.log('Error:', err);

		dispatch({
			type: actionTypes.USER_ERROR,
			payload: err
		});
	};
}

export const clearError = () => {
	return {
		type: actionTypes.CLEAR_ERROR
	};
};

export const userLogin = (email, password) => {
	return dispatch => {
		dispatch({
			type: actionTypes.USER_LOGIN_PENDING
		});

		return AuthService.login(email, password)
			.then(res => {
				AuthService.saveToken(res.token);

				if (AuthService.isUserLoggedIn()) {
					dispatch({
						type: actionTypes.USER_LOGIN_SUCCESS,
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
		type: actionTypes.USER_LOGOUT
	};
};

export const userRegister = (email, password, passwordConfirmation) => {
	return dispatch => {
		dispatch({
			type: actionTypes.USER_REGISTER_PENDING
		});

		return AuthService.register(email, password, passwordConfirmation)
			.then(() => {
				dispatch({
					type: actionTypes.USER_REGISTER_SUCCESS
				});
				dispatch(userLogin(email, password));
			})
			.catch(handleError(dispatch));
	};
};

export const getUserData = () => {
	return dispatch => {
		dispatch({
			type: actionTypes.GET_USER_DATA_PENDING
		});

		Promise.all([
			API.getUserData('income'),
			API.getUserData('expenses'),
			API.getUserData('categories')
		])
			.then(res => Promise.all(res.map(r => r.json())))
			.then(res => {
				const userData = res.reduce((acc, item) => {
					return acc = { ...acc, ...item };
				}, {});

				dispatch({
					type: actionTypes.GET_USER_DATA_SUCCESS,
					payload: userData
				});
			})
			.catch(handleError(dispatch));
	};
};

export const getUserDetails = () => {
	return dispatch => {
		dispatch({
			type: actionTypes.GET_USER_DETAILS_PENDING
		});

		API.getUserDetails()
			.then(res => res.json())
			.then(res => {

				dispatch({
					type: actionTypes.GET_USER_DETAILS_SUCCESS,
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};