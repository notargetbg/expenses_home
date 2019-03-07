import { GET_DATA_PENDING } from '../actions/actionTypes';

const DEFAULT_STATE = {
	isLoading: false,
	error: null,
	items: []
};

export default function createUserDataReducer(dataType = '') {
	return function userData(state = DEFAULT_STATE, action) {

		if (action.type === GET_DATA_PENDING) {
			return {
				...state,
				isLoading: true
			};
		}

		if (action.type === `GET_${dataType}_SUCCESS`) {
			return {
				...state,
				...action.payload,
				isLoading: false
			};
		}

		if (action.type === `${dataType}_CREATE_SUCCESS`) {
			return {
				...state,
				items: [...state.items, action.payload.result],
				isLoading: false
			};
		}

		if (action.type === `${dataType}_UPDATE_SUCCESS`) {
			return {
				...state,
				items: state.items.map(item => {
					if (item.id === action.payload.id) {
						return action.payload;
					}
					return item;
				})
			};
		}

		if (action.type === `${dataType}_DELETE_SUCCESS`) {
			return {
				...state,
				items: state.items.filter(item => {
					return item.id !== action.payload.result.id;
				})
			};
		}

		if (action.type === `${dataType}_SHOW_ERROR`) {
			return {
				...state,
				error: action.payload
			};
		}

		if (action.type === `${dataType}_DISMISS_ERROR`) {
			return {
				...state,
				error: null
			};
		}

		return state;
	};
}