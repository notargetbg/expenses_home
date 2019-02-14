const express = require('express');
const router = express.Router();
const db = require('../../db');
const helper = require('../helper.js');
const { check, validationResult } = require('express-validator/check');

router.post('/create', [
	check('email').isEmail().withMessage('Must be a valid email.'),
	check('password').isLength({min: 5}).withMessage('Must be at least 5 letters long.'),
], (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ 'errors': errors.mapped() });
	}

	db.query('INSERT INTO users(email, password) VALUES($1, $2)', [
		req.body.email,
		helper.hashPassword(req.body.password)
	])
		.then(result => {
			res.status(200).send({ 'message': 'OK.' });
		})
		.catch(err => {
			if (err.code === '23505') {
				res.status(400).send({ 'message': 'Email is in use.' });
			}

			return next(err);
		});
});

router.post('/login', (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ 'message': 'Credentials missing.' });
	}

	db.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, result) => {
		if (err) {
			return next(err);
		}

		if (result.rows.length === 0) {
			return res.status(400).send({ 'message': 'No such user.' });
		}

		const hashedPassword = result.rows[0].password;
		const userID = result.rows[0].id;

		if (!helper.comparePassword(req.body.password, hashedPassword)) {
			res.status(400).send({ 'message': 'Credentials wrong' });
		} else {
			const token = helper.generateToken(userID);
			res.status(200).send({ token: token });
		}

	});
});

module.exports = router;