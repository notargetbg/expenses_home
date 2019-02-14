const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const db = require('../../db');

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	db.query('SELECT * FROM categories WHERE "userID" = $1', [
		req.tokenData.userId
	], (err, result) => {
		if(err) {
			return next(err);
		}
		res.send({
			categories: result.rows
		});
	});
});

router.post('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name || !req.body.budget || !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	db.query('INSERT INTO categories("userID", name, budget, description, date) VALUES($1, $2, $3, $4, $5)', [
		req.tokenData.userId,
		req.body.name,
		req.body.budget,
		req.body.description,
		req.body.date,
	])
		.then(result => {
			res.status(200).send({ 'message': 'OK.' });
		})
		.catch(err => {
			next(err);
		});
});

router.put('/:id', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name && !req.body.budget && !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	db.query(`
		UPDATE categories SET 
			name = COALESCE($1, name), 
			budget = COALESCE($2, budget), 
			description = COALESCE($3, description), 
			date = COALESCE($4, date) 
		WHERE id = $5
	`, [
		req.body.name,
		req.body.budget,
		req.body.description,
		req.body.date,
		req.params.id,
	])
		.then(result => {
			if(result.rowCount === 0) {
				res.status(400).send({ 'message': 'Nothing is updated.' });
			} else {
				res.status(200).send({ 'message': 'OK.' });
			}
		})
		.catch(err => {
			next(err);
		});
});

router.delete('/:id', authMiddleware.verifyToken, (req, res ,next) => {
	db.query('DELETE FROM categories WHERE id = $1', [
		req.params.id,
	])
		.then(result => {
			if(result.rowCount === 0) {
				res.status(400).send({ 'message': 'Nothing is deleted.' });
			} else {
				res.status(200).send({ 'message': 'OK.' });
			}
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;