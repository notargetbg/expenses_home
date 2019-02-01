const DEFAULT_STATE = {
	test: 'yeeey'
};

export default function(state = DEFAULT_STATE, action) {

	if (action.type === 'TEST_ACTION') {
		return {...state, ...{test: action.payload}};
	}

	return state;
}