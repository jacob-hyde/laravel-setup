const { program } = require('commander');
const options = require('./Options');
import tasks from './Tasks';

program
	.option('-v, --version <version>', 'Laravel Version Number')
	.option('-n, --name <name>', 'Project Name')
	.option('--verbose', 'Verbose output');

program.parse();

const programOptions = program.opts();
options.setOptions(programOptions);

async function main() {
	await tasks();
}

main();
