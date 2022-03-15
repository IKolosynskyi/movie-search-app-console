import Table from 'cli-table';
import inquirer from "inquirer";
import { FIND_MOVIES } from "../api/query/index.js";
import { graphQLClient as client, drawMovieList } from "../utils/index.js";


export const searchActionHandler = async (spinner) => {
	const { name } = await inquirer.prompt([{
		type: "input",
		name: "name",
		message: "Enter movie name"
	}]);

	spinner.start();

	const result = await client.request(FIND_MOVIES, { query: name });
	drawMovieList(result.searchMovies);
}