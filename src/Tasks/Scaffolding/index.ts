const inquirer = require('inquirer');
const options = require('../../Options');
import { streamCommandOutput } from '../../Utils/Exec';
import { option as vueOption } from './Vue';

const question = {
	name: 'scaffold',
	type: 'list',
	message: 'Which features do you want to include?',
	choices: [ vueOption ]
};
export default async () => {
	const { scaffold } = await inquirer.prompt(question);
	if (scaffold === 'none') {
		return;
	}

	// Remove default boilerplate
	await streamCommandOutput(`rm -rf resources/`);

	const scaffoldType = await import(`./${scaffold}`);
	await scaffoldType.default();
};
