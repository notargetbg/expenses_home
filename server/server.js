const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Pass to next layer of middleware
	next();
});

// create a GET route
app.get('/express_backend', (req, res, next) => {
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