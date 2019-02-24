
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

	// Category
	static updateCategory(id, name, budget, date, description) {

		return fetch(`${BASE_API}/categories/${id}`, {
			method: 'PUT',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
			body: `name=${name}&budget=${budget}&date=${date}&description=${description}`
		});
	}

	static createCategory(name, budget, date, description) {

		return fetch(`${BASE_API}/categories`, {
			method: 'POST',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
			body: `name=${name}&budget=${budget}&date=${date}&description=${description}`
		});
	}

	static deleteCategory(id) {

		return fetch(`${BASE_API}/categories/${id}`, {
			method: 'DELETE',
			headers: {
				...headers,
				'Authorization': `Bearer ${localStorage.getItem('user_token')}`
			},
		});
	}
}