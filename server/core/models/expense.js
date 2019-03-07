const db = require('../../db');

function getAll(userId) {
	return db.query('SELECT * FROM expenses WHERE "userID" = $1', [
		userId
	]);
}

function create(...args) {
	return db.query('INSERT INTO expenses("userID", "categoryID", name, amount, description, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', args);
}

function update(...args) {
	return db.query(`
		UPDATE expenses SET 
			"categoryID" = COALESCE($1, "categoryID"),
			name = COALESCE($2, name), 
			amount = COALESCE($3, amount), 
			description = COALESCE($4, description), 
			date = COALESCE($5, date) 
		WHERE id = $6
		RETURNING *
	`, args);
}

function deleteOne(expenseId) {
	return db.query('DELETE FROM expenses WHERE id = $1 RETURNING id', [
		expenseId,
	]);
}

module.exports = {
	getAll,
	create,
	update,
	deleteOne
};