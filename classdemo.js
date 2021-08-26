//Photo-server
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const { request } = require('http');

const PORT = process.env.PORT;

const application = express();

application.use(cors());
application.get('/photo', getPhotos);

async function getPhotos(request, response) {
	const searchQuery = req.query.query;

	const url = `https://api.blahblah=${process.env.WEBSITE_PRIVATE_KEY}&query=${searchQuery}`;

	try {
		const response = await axios.get(url);
		const photoArray = response.data.map(photo => new Photo(photo));
		response.send(photoArray);
	} catch (error) {
		console.error('error from API', error);
		response.status(500).send('server error');
	}
}

class Photo {
	constructor(obj) {
		this.img_url = obj.urls.regular;
		this.original_image = obj.links.self;
		this.photographer = obj.user.name;
	}
}

application.get('*', notFound);

function notFound(request, response) {

}

// add WEBSITE_PRIVATE_KEY=(API key)
// test w/localhost:3001/photo?query=burrito

// HEROKU
// go to heroku, create new app, give it a name, skip 'add to pipeline', create app
// deployment method: GitHub. search for your repo, connect to that repo





application.listen(PORT, () => console.log(`listening on port ${PORT}`));
