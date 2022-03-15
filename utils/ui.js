import inquirer from "inquirer";
import Table from 'cli-table';

export const askForMovieId = async (text) => await inquirer.prompt([{
	type: "input",
	name: "movieId",
	message: text
}]);

export const drawMovieList = (movies) => {

	const table = new Table({
		head: ['Movie ID', 'Name', 'Score', 'Genrec'],
	});

	const mappedData = movies.map((item) => ([
		item.id,
		item.name,
		item.score,
		item.genres.map((genre) => genre.name).join(",")
	]));

	table.push(...mappedData);

	console.log(table.toString());
}