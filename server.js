'use strict';

const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json')
const dotenv = require('dotenv');
// const axios = require('axios');

// const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`; 

const app = express();
dotenv.config();
// make sure to use dotenv.config BEFORE you use const PORT
app.use(cors());

const PORT = process.env.PORT || 3001; 

app.get('/weather', (request, response) => {
	console.log(request.query)
	const lat = request.query.lat;
	const lon = request.query.lon;
	const searchQuery = request.query.searchQuery;
	const cityObject = weatherData.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
	
	try {
		const forecast = cityObject.data.map(day => new Forecast(day));
		response.send(forecast);	
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
})

// const cityObject

class Forecast {
	constructor(day) {
		this.date = day.valid_date;
		this.low = day.low_temp;
		this.high = day.high_temp;
		this.desc = day.weather.description;
	};
}
app.get('*', notFoundHandler)

function notFoundHandler(request, response) {
	response.status(500).send('not found');
}

// if a get request to any other path there is a problem
// app.get('*', (request, response) => {
// 	response.status(404).send('not found');
// })
  
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
