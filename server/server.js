const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./core/routers/auth.js');
const usersRouter = require('./core/routers/users.js');
const expensesRouter = require('./core/routers/expenses.js');
const categoriesRouter = require('./core/routers/categories.js');
const incomeRouter = require('./core/routers/income.js');

const app = express();
const port = process.env.PORT || 5000;

const basePath = '/api';

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

app.use(`${basePath}/auth`, authRouter);
app.use(`${basePath}/users`, usersRouter);
app.use(`${basePath}/categories`, categoriesRouter);
app.use(`${basePath}/expenses`, expensesRouter);
app.use(`${basePath}/income`, incomeRouter);

app.use(function (err, req, res, next) {
	console.error('error:' ,err.stack);
	res.status(500).send('Something broke!');
});