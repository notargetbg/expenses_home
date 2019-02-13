const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const db = require('../../db');

router.get('/', authMiddleware.verifyToken, (req, res, next) => {
	db.query('SELECT * FROM expenses WHERE "userID" = $1', [
		req.tokenData.userId
	], (err, result) => {
		if(err) {
			return next(err);
		}
		res.send({
			expenses: result.rows
		});
	});
});

router.post('/', authMiddleware.verifyToken, (req, res, next) => {
	if (!req.body.name || !req.body.amount || !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	db.query('INSERT INTO expenses("userID", "categoryID", name, amount, description, date) VALUES($1, $2, $3, $4, $5, $6)', [
		req.tokenData.userId,
		req.body.categoryId,
		req.body.name,
		req.body.amount,
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
	if (!req.body.name && !req.body.amount && !req.body.date) {
		return res.status(400).send({ 'message': 'Input data missing.' });
	}

	db.query(`
		UPDATE expenses SET 
			"categoryID" = COALESCE($1, "categoryID")
			name = COALESCE($2, name), 
			amount = COALESCE($3, amount), 
			description = COALESCE($4, description), 
			date = COALESCE($5, date) 
		WHERE id = $6
	`, [
		req.body.categoryId,
		req.body.name,
		req.body.amount,
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
	db.query('DELETE FROM expenses WHERE id = $1', [
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