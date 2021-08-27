const axios = require('axios');
const inMemoryDB = require('./cache');

async function fetchMovies (request, response) {
	const searchQuery = request.query.searchQuery;
	const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
	
	try {
		const apiResponse = await axios.get(movieUrl);
		console.log(apiResponse.data.results); 
		const movieList = apiResponse.data.results.map(film => new MovieList(film));
		response.send(movieList);	
	} catch (error) {
		console.log(error);
		response.status(500).send('server error');
	}
}

class MovieList {
	constructor(film) {
		this.title = film.title;
		this.synopsis = film.overview;
		this.averageVotes = film.vote_average;
		this.totalVotes = film.vote_count;
		this.popularity = film.popularity;
		this.releaseDate = film.released_date;
	};
}

module.exports = fetchMovies;