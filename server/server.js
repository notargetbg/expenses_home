const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./core/routes/auth.js');
const userRouter = require('./core/routes/user.js');
const expensesRouter = require('./core/routes/expenses.js');
const categoriesRouter = require('./core/routes/categories.js');
const incomeRouter = require('./core/routes/income.js');
const moment = require('moment');

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
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Content-Type, Accept, Authorization');
	// Pass to next layer of middleware
	next();
});

app.use(function (req, res, next) {
	if (req.body.date) {
		req.body.date = moment.utc(req.body.date);
	}
	next();
});

app.use(`${basePath}/auth`, authRouter);
app.use(`${basePath}/user`, userRouter);
app.use(`${basePath}/categories`, categoriesRouter);
app.use(`${basePath}/expenses`, expensesRouter);
app.use(`${basePath}/income`, incomeRouter);

app.use(function (err, req, res, next) {
	console.error('error:' ,err.stack);
	res.status(500).send({
		message: 'Something broke!',
		error: err
	});
});