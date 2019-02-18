
const BASE_API = 'http://localhost:5000/api';

const headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
};

export default class API {

	static login(email, password) {
		return fetch(`${BASE_API}/auth/login`, {
			method: 'POST',
			headers,
			body: `email=${email}&password=${password}`
		});

	}

	static register(email, password, passwordConfirmation) {
		return fetch(`${BASE_API}/auth/create`, {
			method: 'POST',
			headers,
			body: `email=${email}&password=${password}&passwordConfirmation=${passwordConfirmation}`
		});
	}

	static getUserData(type) {

		return fetch(`${BASE_API}/${type}`, {
			method: 'GET',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			}
		});
	}
};