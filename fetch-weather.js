



//  async function fetchWeather(request, response) {
// 	console.log(request.query)
// 	const lat = request.query.lat;
// 	const lon = request.query.lon;
// 	const searchQuery = request.query.searchQuery;
// 	const cityObject = weatherData.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
	
// 	try {
// 		// const apiResponse = await axios.get(url);
// 		const forecast = cityObject.data.map(day => new Forecast(day));
// 		response.send(forecast);	
// 	} catch (error) {
// 		console.log(error);
// 		response.status(500).send('error');
// 	}
// })


// module.exports = fetch-weather;