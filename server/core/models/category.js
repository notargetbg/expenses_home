const db = require('../../db');

function getAll(userId) {
	return db.query('SELECT * FROM categories WHERE "userID" = $1', [
		userId
	]);
}

function create(...args) {
	return db.query('INSERT INTO categories("userID", name, description) VALUES($1, $2, $3) RETURNING *', args);
}

function update(...args) {
	return db.query(`
	UPDATE categories SET 
		name = COALESCE($1, name),
		description = COALESCE($2, description)
	WHERE id = $3
	RETURNING *
	`, args);
}

function deleteOne(categoryId) {
	return db.query('DELETE FROM categories WHERE id = $1 RETURNING id', [
		categoryId,
	]);
}

module.exports = {
	getAll,
	create,
	update,
	deleteOne
};