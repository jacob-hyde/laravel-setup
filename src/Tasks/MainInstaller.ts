const options = require('../Options');
import { streamCommandOutput } from '../Utils/Exec';
const questions = [
	{
		name: 'name',
		type: 'input',
		message: 'What is the name of your project?',
		validate: function(value: string) {
			return value.length ? true : 'Please enter your project name.';
		},
		action: async function(value: string) {
			options.setOption('name', value);
		}
	},
	{
		name: 'version',
		type: 'suggest',
		message: 'What Version do you want to install?',
		default: 'latest',
		suggestions: [ 'latest', '^10', '^9', '^8', '^7', '^6', '^5' ],
		validate: function(value: string) {
			return parseFloat(value) || value.charAt(0) === '^' || value === 'latest'
				? true
				: 'Please enter a valid version.';
		},
		filter: function(value: string) {
			return value === 'latest' ? '^10' : value;
		},
		action: async function(value: string) {
			options.setOption('version', value);
			await streamCommandOutput(
				`composer create-project laravel/laravel=${value} ${options.getOption('name')} --prefer-dist`
			);
			options.setOption('installed', true);
		}
	}
];

export default questions;
