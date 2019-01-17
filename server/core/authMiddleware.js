// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token ( Middleware Function )
module.exports = function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined.
	if(typeof bearerHeader !== 'undefined') {
		// 1. Get token from header
		const bearerToken = bearerHeader.split(' ')[1];
		// 2. Set token
		req.token = bearerToken;
		// 3. Call next middleware
		next();
	} else {
		// We can do .json to put our own message if we want
		res.sendStatus(403);
	}
};