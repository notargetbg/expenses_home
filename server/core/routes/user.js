const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const db = require('../../db');
const user = require('../models/user.js');

// router.get('/', (req, res, next) => {
// 	db.query('SELECT * FROM users', (err, result) => {
// 		if(err) {
// 			return next(err);
// 		}
// 		res.send({
// 			users: result.rows
// 		});
// 	});
// });

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	user.get(
		req.tokenData.userId,
	)
		.then(result => {
			const { email, id } = result.rows[0];

			res.status(200).send({
				email,
				id
			});
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;