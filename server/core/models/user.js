const db = require('../../db');

function get(userId) {
	return db.query('SELECT * FROM users WHERE id = $1', [
		userId
	]);
};

function update(...args) {
	return db.query(`
		UPDATE expenses SET 
			"categoryID" = COALESCE($1, "categoryID"),
			name = COALESCE($2, name), 
			amount = COALESCE($3, amount), 
			description = COALESCE($4, description), 
			date = COALESCE($5, date) 
		WHERE id = $6
	`, args);
}

function deleteUser() {
	return db.query('DELETE FROM expenses WHERE id = $1', [
		expenseId,
	]);
}

module.exports = {
	get,
	update,
	deleteUser
};