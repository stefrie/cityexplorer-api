'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetchWeather = require('./fetch-weather');
const fetchMovies = require('./fetch-movies');
const notFound = require('./notFound');

const PORT = process.env.PORT || 3001; 
const app = express();
app.use(cors());

// routes
app.get('/', (req, res) => {
	res.send('server connection successful');
});
app.get('/weather', fetchWeather);
app.get('/movies', fetchMovies);
app.get('*', notFound)

// if a get request to any other path there is a problem
// app.get('*', (request, response) => {
// 	response.status(404).send('not found');
// })
  
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
