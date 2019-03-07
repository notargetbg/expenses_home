import * as jwt from 'jsonwebtoken';
import { handleResponse } from '../helpers';
import API from '../client';

export default class AuthService {
	static login(email, password) {
		return API.login(email, password)
			.then(handleResponse);
	}

	static register(email, password, passwordConfirmation) {
		return API.register(email, password, passwordConfirmation)
			.then(handleResponse);
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