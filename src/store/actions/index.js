export const testAction = data => {
	console.log('data:', data);
	return {
		type: 'TEST_ACTION',
		payload: data
	};
};

export const test2 = () => {
	console.log('called');
	return dispatch => {
		dispatch(testAction(2));;
	};
};