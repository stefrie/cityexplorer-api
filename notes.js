// const { default: axios } = require("axios");
// const { response } = require("express");




// // caching data
// const inMemoryDB = {};

// app.get('/recipes', getRecipes)

// function getRecipes(req, res) {
// 	const ingredient = req.query.ingredient;

// 	//has the given ingredient already been fetched?
// 	if(inMemoryDB[ingredient]) {
// 		console.log('cache hit', ingredient);
// 		response.send(inMemoryDB[ingredient])
// 		return;
// 	}
// 	console.log('cache miss', ingredient);

// 	const url=`https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

// 	axios
// 		.get(url)
// 		.then(res => {
// 			const recipeArr = res.data.hits.map(recipe => new recipe(recipe.recipe));

// 			inMemoryDB[ingredient] = recipeArr;

// 			response.status(200).send(recipeArr);
// 		})
// 		.catch(err => {
// 			console.error('error', err);
// 			response.status(500).send('error', err);
// 		})
// }




