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
			.then(res => res.json())
			.then(res => {
				dispatch({
					type: actionTypes.GET_CATEGORIES_SUCCESS,
					payload: res
				});
			})
			.catch(handleError(dispatch));
	};
};

export const updateCategory = (params) => {
	return dispatch => {
		dispatch({
			type: actionTypes.CATEGORIES_UPDATE_PENDING
		});

		return API.updateCategory(params)
			.then(res => res.json())
			.then(res => {
				dispatch({
					type: actionTypes.CATEGORIES_UPDATE_SUCCESS,
					payload: res.result
				});
			})
			.catch(handleError(dispatch));
	};
};

export const createCategory = (params) => {
	return dispatch => {
		dispatch({
			type: actionTypes.CATEGORIES_CREATE_PENDING
		});

		return API.createCategory(params)
			.then(res => res.json())
			.then(res => {
				dispatch({
					type: actionTypes.CATEGORIES_CREATE_SUCCESS,
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
			.then(res => res.json())
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