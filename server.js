'use strict';

const express = require('express');
const cors = require('cors');
// const weatherData = require('./data/weather.json')
require('dotenv').config();
const axios = require('axios');
// const { fetchWeather, fetchMovies, fetchYelp } = require('/api-fetcher');
// const notFound = require('./notFound);

// const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`; 

const app = express();

// make sure to use dotenv.config BEFORE you use const PORT
app.use(cors());

const PORT = process.env.PORT || 3001; 

// routes
// app.get('/weather', fetchWeather);
// app.get('/)

// use this code when putting routes into separate modules to reference into the module, 
// then turn the app.get into a function
// 
// async function fetchWeather(request, response) {
// 		<add console.log down through try/catch block>
// }

app.get('/weather', (request, response) => {
	console.log(request.query)
	// const lat = request.query.lat;
	// const lon = request.query.lon;
	const searchQuery = request.query.searchQuery;
	// const cityObject = weatherData.find (city => city.city_name === searchQuery);
	
	const url = `https://api.weatherbit.io/v2.0/current=${process.env.WEATHER_API_KEY}&query=${searchQuery}`;

	try {
		const apiResponse = await axios.get(url);
		const forecast = apiResponse.data.map(day => new Forecast(day));
		response.send(forecast);	
	} catch (error) {
		console.log(error);
		response.status(500).send('server error');
	}
})

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
