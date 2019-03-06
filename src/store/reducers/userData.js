import { GET_DATA_PENDING } from '../actions/actionTypes';

const DEFAULT_STATE = {
	isLoading: false,
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

		if (action.type === `UPDATE_${dataType}_SUCCESS`) {
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

		return state;
	};
}