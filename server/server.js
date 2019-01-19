const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./core/helper.js');
const authMiddleware = require('./core/authMiddleware.js');

const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Pass to next layer of middleware
	next();
});

// Auth routes
app.get('/api/users', (req, res, next) => {
	db.query('SELECT * FROM users', (err, result) => {
		if(err) {
			return next(err);
		}
		res.send({
			express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
			users: result.rows
		});
	});
});

app.post('/api/auth/create', (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ 'message': 'Input data missing.' });
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

app.post('/api/auth/login', (req, res, next) => {
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

// API expenses routes
app.post('/api/expenses', authMiddleware.verifyToken, (req, res, next) => {
	// res.status(200).send({ 'message': 'Token valid.' });
	if (!req.body.date || !req.body.name || !req.body.amount) {
		res.status(400).send({ 'message': 'Input data missing.' });
	}

	db.query('INSERT INTO expenses( "userID", "categoryID", name, amount, date, description) VALUES($1, $2, $3, $4, $5, $6)', [
		req.tokenData.userID,
		44, // get dropdown options for all cats here
		req.body.name,
		req.body.amount,
		req.body.date,
		req.body.description
	])
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			e => console.error(e.stack);
		});

});

// app.post('/api/category')
// app.post()