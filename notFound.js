function notFound(request, response) {
	response.status(500).send('not found');
}

module.exports = notFound;
