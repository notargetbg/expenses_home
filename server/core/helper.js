const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	hashPassword: (password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	},
	comparePassword: (hashPassword, password) => {
		return bcrypt.compareSync(password, hashPassword);
	},
	isEmailValid: (email) => {
		return /\S+@\S+\.\S+/.test(email);
	},
	generateToken: (id) => {
		const token = jwt.sign({
			userId: id
		},
		'testBaz',
		{expiresIn: '7d'});
	}
};