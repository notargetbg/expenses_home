const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	hashPassword: (password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	},
	comparePassword: (password, hashPassword) => {
		return bcrypt.compareSync(password, hashPassword);
	},
	isEmailValid: (email) => {
		return /\S+@\S+\.\S+/.test(email);
	},
	generateToken: (id) => {
		return jwt.sign({
			userId: id
		},
		'jazzFizz',
		{expiresIn: '7d'});
	}
};