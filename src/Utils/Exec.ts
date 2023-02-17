const { exec, spawnSync } = require('child_process');
const options = require('../Options');

const streamCommandOutput = async (command: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (options.getOption('installed')) {
			command = `cd ${options.getOption('name')} && ${command}`;
		}

		const commandExec = spawnSync(command, {
			stdio: 'inherit',
			stdin: 'inherit',
			shell: true
		});

		if (commandExec.status === 0) {
			resolve();
		} else {
			reject();
		}
	});
};

const inputCommand = async (command: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (options.getOption('installed')) {
			command = `cd ${options.getOption('name')} && ${command}`;
		}

		const commandExec = spawnSync(command, {
			stdio: 'inherit',
			stdin: 'inherit',
			shell: true
		});

		if (commandExec.status === 0) {
			resolve();
		} else {
			reject();
		}
	});
};

export { streamCommandOutput, inputCommand };
