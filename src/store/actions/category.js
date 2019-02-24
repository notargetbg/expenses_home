import API from '../../core/client';

function handleError(dispatch) {
	return err => {
		/* eslint-disable no-console */
		console.log('Error:', err);

		dispatch({
			type: 'USER_ERROR',
			payload: err
		});
	};
}

export const updateCategory = (args) => {
	const { id, name, budget, date, description } = args;
	return dispatch => {
		dispatch({
			type: 'CATEGORY_UPDATE_PENDING'
		});

		return API.updateUserCategory(id, name, budget, date, description)
			.then((res) => {
				dispatch({
					type: 'CATEGORY_UPDATE_SUCCESS',
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};

export const createCategory = (args) => {
	const { name, budget, date, description } = args;

	return dispatch => {
		dispatch({
			type: 'CATEGORY_CREATE_PENDING'
		});

		return API.createUserCategory(name, budget, date, description)
			.then(res => {
				dispatch({
					type: 'CATEGORY_CREATE_SUCCESS',
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};

export const deleteCategory = (id) => {
	return dispatch => {
		dispatch({
			type: 'CATEGORY_DELETE_PENDING'
		});

		return API.deleteCategory(id)
			.then(res => {
				dispatch({
					type: 'CATEGORY_DELETE_SUCCESS',
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};