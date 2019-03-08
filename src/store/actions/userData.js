import API from '../../core/client';
import { handleResponse } from '../../core/helpers';
import * as actionTypes from './actionTypes';

function handleError(dispatch, dataType) {
	return err => {
		/* eslint-disable no-console */
		console.log('Error:', err);

		dispatch({
			type: `${dataType}_SHOW_ERROR`,
			payload: err
		});
	};
}

function makeDissmissErrorDataType(dataType) {
	return () => dispatch => {
		dispatch({
			type: actionTypes[`${dataType}_DISMISS_ERROR`]
		});
	};
}

function makeGetUserDataType(dataType) {
	return () => {
		return dispatch => {
			dispatch({
				type: actionTypes[`GET_${dataType}_PENDING`]
			});


			return API.getUserData(dataType.toLowerCase())
				.then(handleResponse)
				.then(res => {
					dispatch({
						type: actionTypes[`GET_${dataType}_SUCCESS`],
						payload: res
					});
				})
				.catch(handleError(dispatch, dataType));
		};
	};
}

function makeUpdateUserDataType(dataType) {
	return params => {
		return dispatch => {
			dispatch({
				type: actionTypes[`${dataType}_UPDATE_PENDING`]
			});

			return API.updateDataType(params, dataType.toLowerCase())
				.then(handleResponse)
				.then(res => {
					dispatch({
						type: actionTypes[`${dataType}_UPDATE_SUCCESS`],
						payload: res.result
					});
				})
				.catch(handleError(dispatch, dataType));
		};
	};
}

function makeCreateUserDataType(dataType) {
	return (params) => {
		return dispatch => {
			dispatch({
				type: actionTypes[`${dataType}_CREATE_PENDING`]
			});

			return API.createDataType(params, dataType.toLowerCase())
				.then(handleResponse)
				.then(res => {
					dispatch({
						type: actionTypes[`${dataType}_CREATE_SUCCESS`],
						payload: res
					});
				})
				.catch(handleError(dispatch, dataType));
		};
	};
}

function makeDeleteUserDataType(dataType) {
	return (id) => {
		return dispatch => {
			dispatch({
				type: actionTypes[`${dataType}_DELETE_PENDING`]
			});

			return API.deleteDataType(id, dataType.toLowerCase())
				.then(handleResponse)
				.then(res => {
					dispatch({
						type: actionTypes[`${dataType}_DELETE_SUCCESS`],
						payload: res
					});
				})
				.catch(handleError(dispatch, dataType));
		};
	};
}

export const getCategories = makeGetUserDataType('CATEGORIES');
export const updateCategory = makeUpdateUserDataType('CATEGORIES');
export const createCategory = makeCreateUserDataType('CATEGORIES');
export const deleteCategory = makeDeleteUserDataType('CATEGORIES');
export const dismissErrorCategory = makeDissmissErrorDataType('CATEGORIES');

export const getIncome = makeGetUserDataType('INCOME');
export const updateIncome = makeUpdateUserDataType('INCOME');
export const createIncome = makeCreateUserDataType('INCOME');
export const deleteIncome = makeDeleteUserDataType('INCOME');
export const dismissErrorIncome = makeDissmissErrorDataType('INCOME');

export const getExpenses = makeGetUserDataType('EXPENSES');
export const updateExpenses = makeUpdateUserDataType('EXPENSES');
export const createExpenses = makeCreateUserDataType('EXPENSES');
export const deleteExpenses = makeDeleteUserDataType('EXPENSES');
export const dismissErrorExpenses = makeDissmissErrorDataType('EXPENSES');