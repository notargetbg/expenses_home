const db = require('../../db');

function getAll(userId) {
	return db.query('SELECT * FROM category WHERE "userID" = $1', [
		userId
	]);
};

function create(...args) {
	return db.query('INSERT INTO categories("userID", name, budget, description, date) VALUES($1, $2, $3, $4, $5)', args);
};

function update(...args) {
	return db.query(`
	UPDATE categories SET 
		name = COALESCE($1, name), 
		budget = COALESCE($2, budget), 
		description = COALESCE($3, description), 
		date = COALESCE($4, date) 
	WHERE id = $5
	`, args);
}

function deleteOne(categoryId) {
	return db.query('DELETE FROM category WHERE id = $1', [
		categoryId,
	]);
}

module.exports = {
	getAll,
	create,
	update,
	deleteOne
};