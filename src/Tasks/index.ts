#! /usr/bin/env node
const utils = require('util');
const { exec } = require('child_process');
const execute = utils.promisify(exec);
const inquirer = require('inquirer');
const options = require('../Options');
import mainInstallerQuestions from './mainInstaller';
import features from './Features';
import scaffolding from './Scaffolding';

inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'));

let questions = [ ...mainInstallerQuestions ];

const run = async () => {
	for (const question of questions) {
		const val = await inquirer.prompt(question);
		await question.action(val[question.name]);
	}
	await features();
	await scaffolding();
};

export default run;
