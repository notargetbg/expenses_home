import * as jwt from 'jsonwebtoken';
import API from '../client';

function handleResponce(response) {
	if(!response.ok) {
		return response.json().then(err => {
			const errorData = {
				status: response.status,
				statusText: response.statusText,
				payload: err
			};

			throw errorData;
		});
	}
	return response.json();
}

export default class AuthService {
	static login(email, password) {
		return API.login(email, password)
			.then(handleResponce);
	}

	static register(email, password) {
		return API.register(email, password)
			.then(handleResponce);
	}

	static saveToken(token) {
		localStorage.setItem('user_token', token);
	}

	static logout() {
		localStorage.removeItem('user_token');
	}

	static getToken() {
		return localStorage.getItem('user_token') || false;
	}

	static getUser() {
		const token = AuthService.getToken();
		return jwt.verify(token, 'jazzFizz');

		// Todo: Call db and get user data ?
	}

	static isTokenExpired(token) {
		try {
			const decoded = jwt.verify(token, 'jazzFizz');
			return decoded.exp < Date.now() / 1000;
		} catch (err) {
			console.log(err);
		}
	}

	static isUserLoggedIn() {
		return AuthService.getToken() && !AuthService.isTokenExpired(AuthService.getToken());
	}
}