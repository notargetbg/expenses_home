
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

	static getUserDetails() {

		return fetch(`${BASE_API}/user`, {
			method: 'GET',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			}
		});
	}

	// Todo: do these dynamically based on userDataType requested
	static updateDataType(params, dataType) {

		return fetch(`${BASE_API}/${dataType}/${params.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
			body: JSON.stringify(params)
		});
	}

	static createDataType(params, dataType) {

		return fetch(`${BASE_API}/${dataType}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
			body: JSON.stringify(params)
		});
	}

	static deleteDataType(id, dataType) {

		return fetch(`${BASE_API}/${dataType}/${id}`, {
			method: 'DELETE',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
		});
	}
}