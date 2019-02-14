const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const db = require('../../db');

router.get('/', (req, res, next) => {
	db.query('SELECT * FROM users', (err, result) => {
		if(err) {
			return next(err);
		}
		res.send({
			users: result.rows
		});
	});
});

module.exports = router;