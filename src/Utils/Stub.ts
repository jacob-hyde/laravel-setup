const fs = require('fs');
const options = require('../Options');
import { createPathIfNotExists } from './Path';
export default class Stub {
	public stubFile: string;
	private data: [string, string][] | undefined;
	private callback: ((stub: string) => string) | undefined;

	constructor(stubFile: string) {
		this.stubFile = stubFile;
	}

	public withData(data: [string, string][]): Stub {
		this.data = data;
		return this;
	}

	public withCallback(callback: (stub: string) => string): Stub {
		this.callback = callback;
		return this;
	}

	public save(): void {
		const stubFile = this.readStubFile();
		const modifiedStub = this.modifyStub(stubFile);
		this.publishStub(modifiedStub);
	}

	private readStubFile(): string {
		return fs.readFileSync(this.stubFile, 'utf8');
	}

	private modifyStub(stub: string): string {
		if (this.data) {
			stub = this.data.reduce((stub, [ key, value ]) => {
				return stub.replace(new RegExp(`\\[\\-\\-${key}\\-\\-\\]`, 'g'), value);
			}, stub);
		}
		if (this.callback) {
			stub = this.callback(stub);
		}
		return stub;
	}

	private publishStub(stub: string): void {
		const path = Stub.convertPathToProjectPath(this.stubFile);
		createPathIfNotExists(path);
		fs.writeFileSync(path, stub);
	}

	public static convertPathToProjectPath(path: string): string {
		if (path.includes('Stubs/')) {
			path = path.replace(/.*Stubs\/[^\/]+\/(.*)/, `${options.getOption('name')}/$1`);
		} else {
			path = `${options.getOption('name')}/${path}`;
		}
		return path;
	}
}
