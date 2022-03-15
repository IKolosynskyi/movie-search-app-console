import open from "open"
import inquirer from "inquirer";
import { GET_MOVIE } from "../api/query/index.js";
import { graphQLClient as client } from "../utils/gqlClient.js";
import { findWikiArticle } from "../api/findWikiArticle.js";
import { getWikiArcticleShortDescription, findImdbMovie } from "../api/index.js";
import { askForMovieId } from '../utils/ui.js';

export const movieDetailsActionHandler = async (spinner) => {
	const { movieId } = await askForMovieId("Enter movie id for details");
	spinner.start();

	var { movie } = await client.request(GET_MOVIE, {
		id: movieId
	});
	const wikiArticle = await findWikiArticle(movie.name, new Date(movie.releaseDate).getFullYear());

	const [shortDescription, imdbMovie] = await Promise.all([getWikiArcticleShortDescription(wikiArticle.id), findImdbMovie(`${movie.name} ${new Date(movie.releaseDate).getFullYear()}`)]);
	spinner.stop();
	console.log("\n" + shortDescription.extract);

	const { openLinks } = await inquirer.prompt([{
		type: "list",
		name: "openLinks",
		message: "Open wiki and imdb in browser?",
		choices: [
			{ name: "yes", value: true },
			{ name: "no", value: false }
		]
	}]);

	console.log(openLinks);

	if (openLinks) {
		if (wikiArticle) open(`https://en.wikipedia.org/wiki/${wikiArticle.key}`);
		if (imdbMovie) open(`https://www.imdb.com/title/${imdbMovie.id}`)
	}
}