const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const category = require('../models/category.js');

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.tokenData.userId) {
		return res.status(400).send({ 'message': 'UserId missing.' });
	}

	category.getAll(req.tokenData.userId)
		.then(result => {
			res.send({
				categories: result.rows,
				fields: result.fields.map(field => field.name)
			});
		})
		.catch(err => next(err));
});

router.post('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name) {
		return res.status(400).send({ 'message': 'Name is missing.' });
	}

	category.create(
		req.tokenData.userId,
		req.body.name,
		req.body.description
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
	if (!req.body.name) {
		return res.status(400).send({ 'message': 'Name is required.' });
	}

	category.update(
		req.body.name,
		req.body.budget,
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
		.catch(err => next(err));
});

router.delete('/:id', authMiddleware.verifyToken, (req, res ,next) => {
	category.deleteOne(
		req.params.id
	)
		.then(result => {
			if(result.rowCount === 0) {
				res.status(400).send({ 'message': 'Nothing is deleted.' });
			} else {
				res.status(200).send({ 'message': 'OK.' });
			}
		})
		.catch(err => next(err));
});

module.exports = router;