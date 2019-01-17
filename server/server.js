const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./core/helper.js');

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

// create a GET route
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
	db.query('INSERT INTO users(email, password) VALUES($1, $2)', [
		req.body.email,
		helper.hashPassword(req.body.password)
	], (err) => {
		if(err) {
			return next(err);
		}
		res.sendStatus(200);
	});
});

// app.post('/api/auth/login', handleLogin);

// app.post('/api/category')
// app.post()