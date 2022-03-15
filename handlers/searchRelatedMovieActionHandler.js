import { GET_SIMILAR_MOVIE } from "../api/query/getSimilarMovieQuery.js";
import { drawMovieList, askForMovieId, graphQLClient } from "../utils/index.js";

export const searchRelatedMovieActionHandler = async (spinner) => {
	const { movieId } = await askForMovieId("Enter movie id for find related movies");

	spinner.start();

	const { movie } = await graphQLClient.request(GET_SIMILAR_MOVIE, { id: movieId });
	drawMovieList(movie.similar);
}