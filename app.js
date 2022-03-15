import inquirer from "inquirer";
import ora from 'ora';
import 'dotenv/config';

import { MainMenuActions } from "./models/mainMenuActions.js";
import { searchActionHandler, movieDetailsActionHandler, searchRelatedMovieActionHandler } from "./handlers/index.js";

const questions = [{
	type: "list",
	name: "action",
	message: "Choose a action",
	choices: [
		{ name: 'Search a movie', value: MainMenuActions.Search },
		{ name: 'Movie details', value: MainMenuActions.Details },
		{ name: 'Related movie', value: MainMenuActions.Related }
	]
}];

const spinner = ora('Searching');
const showMainMenu = () => inquirer.prompt(questions).then(mainMenuActionHandler);


async function mainMenuActionHandler({ action }) {
	try {
		switch (action) {
			case MainMenuActions.Search: {
				await searchActionHandler(spinner);
				break;
			}
			case MainMenuActions.Details: {
				await movieDetailsActionHandler(spinner);
				break;
			}
			case MainMenuActions.Related: {
				await searchRelatedMovieActionHandler(spinner);
			}
		}
	} catch (error) {
		throw error;
	} finally {
		spinner.stop();
	}

	showMainMenu();
}

showMainMenu();