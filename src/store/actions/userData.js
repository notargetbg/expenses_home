import API from '../../core/client';
import * as actionTypes from './actionTypes';
import { getUserData } from './index';

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

export const getCategories = () => {
	return dispatch => {
		dispatch({
			type: actionTypes.GET_CATEGORIES_PENDING
		});


		return API.getUserData('categories')
			.then(res => {
				dispatch({
					type: actionTypes.GET_CATEGORIES_SUCCESS,
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};

export const updateCategory = (args) => {
	const { id, name, budget, date, description } = args;
	return dispatch => {
		dispatch({
			type: actionTypes.UPDATE_CATEGORIES_PENDING
		});

		return API.updateCategory(id, name, budget, date, description)
			.then((res) => {
				dispatch({
					type: actionTypes.UPDATE_CATEGORIES_SUCCESS,
					payload: res
				});
				dispatch(getUserData());
			})
			.catch(handleError(dispatch));
	};
};

export const createCategory = (params) => {

	return dispatch => {
		dispatch({
			type: actionTypes.CREATE_CATEGORIES_PENDING
		});

		return API.createCategory(params)
			.then(res => {
				// Todo: update this when api returns updated row data...
				dispatch({
					type: actionTypes.CATEGORY_CREATE_SUCCESS,
					payload: res
				});
				dispatch(getUserData());
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
				dispatch(getUserData());
			})
			.catch(handleError(dispatch));
	};
};