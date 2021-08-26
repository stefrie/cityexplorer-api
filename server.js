'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
// (delete?) const weatherData = require('./data/weather.json')
// const { fetchWeather, fetchMovies, fetchYelp } = require('/api-fetcher');
// const notFound = require('./notFound);

// const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`; 
const PORT = process.env.PORT || 3001; 
const app = express();
app.use(cors());

// routes
// app.get('/weather', fetchWeather);
// app.get('/movies, fetchMovies);

// use this code when putting routes into separate modules to reference into the module, 
// then turn the app.get into a function
// 
// async function fetchWeather(request, response) {
// 		<add console.log down through try/catch block>
// }
app.get('/weather', getWeather);

async function getWeather (request, response) {
	console.log(request.query)
	// const lat = request.query.lat;
	// const lon = request.query.lon;
	console.log(process.env.WEATHER_API_KEY);

	const searchQuery = request.query.searchQuery;
	// (delete?) const cityObject = weatherData.find (city => city.city_name === searchQuery);
		const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5`;

	try {
		const apiResponse = await axios.get(url);
		console.log(apiResponse.data.data);
		const forecast = apiResponse.data.data.map(day => new Forecast(day));
		
		response.send(forecast);	
	} catch (error) {
		console.log(error);
		response.status(500).send('server error');
	}
}

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
