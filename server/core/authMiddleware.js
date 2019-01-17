const jwt = require('jsonwebtoken');
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token ( Middleware Function )
exports.verifyToken = function(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined.
	if(typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];

		jwt.verify(bearerToken, 'testBaz', (err, authData) => {
			if(err) {
				res.sendStatus(403);
			} else {
				next();
			}
		});
	} else {
		// We can do .json to put our own message if we want
		res.sendStatus(403);
	}
};