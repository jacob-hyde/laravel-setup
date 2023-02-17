import { readFileSync, writeFileSync } from 'fs';
const options = require('../Options');

interface PackageJson {
	[key: string]: string;
}

const updateNodePackages = async (callback: (packages: PackageJson) => PackageJson, dev: Boolean = false) => {
	const configurationKey = dev ? 'devDependencies' : 'dependencies';
	const packageJsonPath = `${options.getOption('name')}/package.json`;
	const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

	packageJson[configurationKey] = callback(packageJson[configurationKey] || {});

	Object.keys(packageJson[configurationKey]).sort().reduce((obj, key) => {
		obj[key] = packageJson[configurationKey][key];
		return obj;
	}, {});

	writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
};

const replaceInFile = (search: string, replace: string, path: string): void => {
	const fileContent: string = readFileSync(path, 'utf-8');
	const updatedContent: string = fileContent.replace(search, replace);
	writeFileSync(path, updatedContent, 'utf-8');
};

export { PackageJson, updateNodePackages, replaceInFile };
