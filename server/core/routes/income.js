const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const income = require('../../core/models/income.js');

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	income.getAll(
		req.tokenData.userId
	)
		.then(result => {
			res.status(200).send({
				income: result.rows,
				fields: result.fields.map(field => field.name)
			});
		})
		.catch(err => next(err));
});

router.post('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name || !req.body.amount || !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	income.create(
		req.tokenData.userId,
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

	income.update(
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
	income.deleteOne(
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