import axios from "axios";

const wikiUrl = process.env.WIKI_BASE_URL;
const wikiActionApi = process.env.WIKI_ACTION_API;


export async function getWikiArcticleShortDescription(pageId) {
	const { data } = await axios.get(`${wikiUrl}/${wikiActionApi}?action=query&format=json&prop=extracts&pageids=${pageId}&formatversion=2&exsentences=5&exlimit=1&explaintext=1&origin=*`);

	if (data.error) {
		alert(data.error);
		throw data.error;
	}
	return data.query.pages[0];
}