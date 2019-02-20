import API from '../../core/client';

function handleError(dispatch) {
	return err => {
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