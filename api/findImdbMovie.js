import axios from "axios";
const imdbApi = process.env.IMDB_API;
const imdbApiKey = process.env.IMDB_API_KEY;


export async function findImdbMovie(movieExpresion) {
	const { data } = await axios.get(`${imdbApi}/${imdbApiKey}/${movieExpresion}`);
	if (data.errorMessage) {
		alert(data.errorMessage);
		throw data.errorMessage;
	}

	if (data.results.length === 0) {
		return undefined;
	}

	return data.results[0];
}