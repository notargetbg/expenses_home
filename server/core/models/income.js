const db = require('../../db');

function getAll(userId) {
	return db.query('SELECT * FROM income WHERE "userID" = $1', [
		userId
	]);
}

function create(...args) {
	return db.query('INSERT INTO income("userID", name, amount, description, date) VALUES($1, $2, $3, $4, $5) RETURNING *', args);
}

function update(...args) {
	return db.query(`
	UPDATE income SET 
		name = COALESCE($1, name), 
		amount = COALESCE($2, amount), 
		description = COALESCE($3, description), 
		date = COALESCE($4, date) 
	WHERE id = $5
	RETURNING *
	`, args);
}

function deleteOne(expenseId) {
	return db.query('DELETE FROM income WHERE id = $1 RETURNING id', [
		expenseId,
	]);
}

module.exports = {
	getAll,
	create,
	update,
	deleteOne
};