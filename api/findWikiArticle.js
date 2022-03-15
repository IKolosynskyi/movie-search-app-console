import axios from "axios";

const wikiUrl = process.env.WIKI_BASE_URL;
const wikiRestApi = process.env.WIKI_REST_API;

export async function findWikiArticle(movieName, movieYear) {
	const { data } = await axios.get(`${wikiUrl}/${wikiRestApi}/search/page?q=${movieName} ${movieYear}&limit=1`);
	return data.pages[0];
}