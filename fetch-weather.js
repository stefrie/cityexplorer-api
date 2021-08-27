const axios = require('axios');
// const inMemoryDB = require('./cache');

async function fetchWeather (request, response) {
	console.log(request.query)
	// const lat = request.query.lat;
	// const lon = request.query.lon;
	console.log(process.env.WEATHER_API_KEY);
	const searchQuery = request.query.searchQuery;
		const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&days=5`;
	try {
		const apiResponse = await axios.get(weatherUrl);
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

module.exports = fetchWeather;
