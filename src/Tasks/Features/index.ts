const inquirer = require('inquirer');
const options = require('../../Options');
import { option as sailOption } from './Sail';
import { option as horizonOption } from './Horizon';
import { option as cashierOption } from './Cashier';
import { option as telescopeOption } from './Telescope';
import { option as socialiteOption } from './Socialite';

const question = {
	name: 'features',
	type: 'checkbox',
	message: 'Which features do you want to include?',
	default: [],
	choices: [ sailOption, horizonOption, cashierOption, telescopeOption, socialiteOption ]
};

export default async () => {
	const features = await inquirer.prompt(question);
	options.setOption('features', features.features);
	for (let feature of features.features) {
		const featureModule = await import(`./${feature}`);
		await featureModule.default();
	}
};
