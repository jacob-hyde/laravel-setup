const options = require('../../Options');
import { streamCommandOutput } from '../../Utils/Exec';
import { PackageJson, updateNodePackages } from '../../Utils/FileUpdates';
import Stub from '../../Utils/Stub';
import { createPathIfNotExists } from '../../Utils/Path';
export const option = { name: 'Vue 3', value: 'vue' };
export default async () => {
	await updateNodePackages((packages: PackageJson) => {
		return {
			...packages,
			vue: '^3.2.41',
			'vue-router': '^4.1.6',
			pinia: '^2.0.22'
		};
	});

	await updateNodePackages((packages: PackageJson) => {
		return {
			...packages,
			'@rushstack/eslint-patch': '^1.2.0',
			'@vitejs/plugin-vue': '^4.0.0',
			'@vue/eslint-config-prettier': '^7.0.0',
			eslint: '^8.23.1',
			'eslint-plugin-vue': '^9.5.1',
			postcss: '^8.4.16',
			'postcss-import': '^15.0.0',
			prettier: '^2.7.1',
			sass: '^1.54.9',
			axios: '^1.2.2',
			lodash: '^4.17.19'
		};
	}, true);

	await installStubFiles();

	// Run npm install
	await streamCommandOutput('npm install');
};

const stubsPath = `${__dirname}/../../Stubs/`;
const stubs = [
	new Stub(stubsPath + 'vue-react/resources/views/index.blade.html').withData([
		[ 'name', options.getOption('name') ]
	]),
	new Stub(stubsPath + 'vue-react/postcss.config.js'),
	new Stub(stubsPath + 'vue-react/resources/css/app.css'),
	new Stub(stubsPath + 'vue3/.eslintrc.cjs'),
	new Stub(stubsPath + 'vue3/resources/js/app.js'),
	new Stub(stubsPath + 'vue3/resources/js/bootstrap.js'),
	new Stub(stubsPath + 'vue3/resources/js/App.vue'),
	new Stub(stubsPath + 'vue3/resources/js/Views/IndexView.vue'),
	new Stub(stubsPath + 'vue3/resources/js/Router/index.js'),
	new Stub(stubsPath + 'vue3/resources/js/Layouts/MainLayout.vue'),
	`${stubsPath}vue3/resources/js/Components/`
];

const installStubFiles = async () => {
	for (const stub of stubs) {
		if (typeof stub === 'string') {
			const path = Stub.convertPathToProjectPath(stub);
			createPathIfNotExists(path);
		} else {
			stub.save();
		}
	}
};
