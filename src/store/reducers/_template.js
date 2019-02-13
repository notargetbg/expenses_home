const DEFAULT_STATE = {
	foo: 'bar'
};

export default function(state = DEFAULT_STATE, action) {

	if (action.type === 'FOO') {
		return {...state, ...{foo: action.payload}};
	}

	return state;
}