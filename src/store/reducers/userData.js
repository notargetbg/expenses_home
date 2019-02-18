const DEFAULT_STATE = {
	isLoading: false
};

export default function(state = DEFAULT_STATE, action) {

	if (action.type === 'GET_USER_DATA_PENDING') {
		return {
			...state,
			isLoading: true
		};
	}

	if (action.type === 'GET_USER_DATA_SUCCESS') {
		return {
			...state,
			...action.payload,
			isLoading: false
		};
	}

	return state;
}