const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const expense = require('../models/expense');

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.tokenData.userId) {
		return res.status(400).send({ 'message': 'UserId missing.' });
	}

	expense.getAll(req.tokenData.userId)
		.then(result => {
			res.status(200).send({
				expenses: result.rows,
				fields: result.fields.map(field => field.name)
			});
		})
		.catch(err => next(err));
});

router.post('/', authMiddleware.verifyToken,
	(req, res, next) => {
		if (!req.body.name || !req.body.amount || !req.body.date || !req.body.categoryID) {
			return res.status(400).send({ 'message': 'Input data missing.' });
		}

		// Todo: validate cats..

		expense.create(
			req.tokenData.userId,
			req.body.categoryID,
			req.body.name,
			req.body.amount,
			req.body.description,
			req.body.date
		)
			.then(result => {
				res.status(200).send({
					'message': 'OK.',
					'result': result.rows[0]
				});
			})
			.catch(err => {
				next(err);
			});
	});

router.put('/:id', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name && !req.body.amount && !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	expense.update(
		req.body.categoryID,
		req.body.name,
		req.body.amount,
		req.body.description,
		req.body.date,
		req.params.id
	)
		.then(result => {
			if(result.rowCount === 0) {
				res.status(400).send({ 'message': 'Nothing is updated.' });
			} else {
				res.status(200).send({
					'message': 'OK.',
					'result': result.rows[0]
				});
			}
		})
		.catch(err => {
			next(err);
		});
});

router.delete('/:id', authMiddleware.verifyToken, (req, res ,next) => {

	expense.deleteOne(
		req.params.id
	)
		.then(result => {
			if(result.rowCount === 0) {
				res.status(400).send({ 'message': 'Nothing is deleted.' });
			} else {
				res.status(200).send({
					'message': 'OK.',
					'result': result.rows[0]
				});
			}
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;