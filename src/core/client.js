
const BASE_API = 'http://localhost:5000/api';

export default class API {

	static login(email, password) {
		return fetch(`${BASE_API}/auth/login`, {
			method: 'POST',
			headers: {
				// "Content-Type": "application/json",
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `email=${email}&password=${password}`
		});

	}
};